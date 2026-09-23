#!/usr/bin/env bash
set -Eeuo pipefail

: "${PORT:?Set PORT to the existing host port}"
: "${DEPLOY_IMAGE:?Set DEPLOY_IMAGE to the built image}"
if [[ ! "$PORT" =~ ^[1-9][0-9]{0,4}$ ]] || (( PORT > 65535 )); then
  echo 'PORT must be between 1 and 65535.' >&2
  exit 1
fi

app=ugurdindar.com
candidate="$app-candidate"
previous="$app-previous"
switch_started=false
old_saved=false

cleanup() {
  result=$?
  trap - EXIT INT TERM
  docker rm -f "$candidate" >/dev/null 2>&1 || true
  if (( result != 0 )) && [[ "$switch_started" == true ]]; then
    docker logs --tail 50 "$app" >&2 || true
    docker rm -f "$app" >/dev/null 2>&1 || true
    if [[ "$old_saved" == true ]]; then
      docker rename "$previous" "$app"
      docker start "$app" >/dev/null
      echo 'Deployment failed; the previous container was restored.' >&2
    fi
  fi
  exit "$result"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

wait_healthy() {
  for attempt in {1..30}; do
    status=$(docker inspect --format '{{.State.Health.Status}}' "$1")
    if [[ "$status" == healthy ]]; then return 0; fi
    if [[ "$status" == unhealthy ]]; then break; fi
    sleep 2
  done
  docker logs --tail 50 "$1" >&2
  echo 'Container did not become healthy.' >&2
  return 1
}

# Check the new image through a published port while the current site still runs.
docker rm -f "$candidate" >/dev/null 2>&1 || true
docker run -d --name "$candidate" -p 127.0.0.1::3000 "$DEPLOY_IMAGE" >/dev/null
wait_healthy "$candidate"
address=$(docker port "$candidate" 3000/tcp)
curl -fsS --max-time 10 "http://$address/en" -o /dev/null

if docker container inspect "$previous" >/dev/null 2>&1; then
  # A stopped backup belongs to the preceding successful deployment.
  docker rm "$previous" >/dev/null
fi
if docker container inspect "$app" >/dev/null 2>&1; then
  docker rename "$app" "$previous"
  old_saved=true
fi
switch_started=true
if [[ "$old_saved" == true ]]; then docker stop --time 20 "$previous" >/dev/null; fi
docker run -d --name "$app" -p "$PORT:3000" --restart unless-stopped "$DEPLOY_IMAGE" >/dev/null
wait_healthy "$app"
curl -fsS --max-time 10 "http://127.0.0.1:$PORT/en" -o /dev/null
docker tag "$DEPLOY_IMAGE" "$app:latest"
echo 'Production container is healthy; the stopped previous container is retained for rollback.'
