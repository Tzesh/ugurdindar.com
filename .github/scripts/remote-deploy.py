#!/usr/bin/env python3
"""Send one release request over a pinned, application-bound SSH connection."""
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile


def request(env):
    mode = env['DEPLOY_MODE']
    if mode not in {'probe', 'deploy'}:
        raise ValueError('DEPLOY_MODE must be probe or deploy')
    result = {'version': 1, 'mode': mode, 'commit': env['GITHUB_SHA'],
              'image': env['WEB_IMAGE'], 'maintenance_image': env.get('MAINTENANCE_IMAGE') or None,
              'run_id': env['GITHUB_RUN_ID'], 'attempt': env['GITHUB_RUN_ATTEMPT'],
              'actor': env['GITHUB_ACTOR'], 'registry_token': env['REGISTRY_TOKEN'], 'options': {}}
    for name in ['BACKUP_CONTENT_MEDIA', 'IMPORT_GALLERY_WALLPAPERS',
                 'RECONCILE_EDITORIAL_CONTENT', 'IMPORT_WIKI_DRAFTS']:
        value = env.get(name, 'false')
        if value not in {'true', 'false'}:
            raise ValueError('Release option must be true or false')
        result['options'][name] = value == 'true'
    return result


def main():
    env = os.environ
    host = env.get('DEPLOY_HOST', 'ugurdindar.com')
    port = env.get('DEPLOY_PORT', '1078')
    if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9.-]*', host) or not port.isdecimal() or not 1 <= int(port) <= 65535:
        raise ValueError('Invalid SSH destination')
    payload = json.dumps(request(env))
    os.umask(0o077)
    with tempfile.TemporaryDirectory(prefix='production-ssh-') as directory:
        key, known = Path(directory) / 'key', Path(directory) / 'known_hosts'
        key.write_text(env['DEPLOY_SSH_KEY'].rstrip() + '\n')
        known.write_text(env['DEPLOY_KNOWN_HOSTS'].rstrip() + '\n')
        subprocess.run(['ssh', '-T', '-i', str(key), '-p', port,
                        '-o', 'BatchMode=yes', '-o', 'IdentitiesOnly=yes',
                        '-o', 'StrictHostKeyChecking=yes', '-o', 'UserKnownHostsFile=' + str(known),
                        '-o', 'ConnectTimeout=15', '-o', 'ServerAliveInterval=30',
                        '-o', 'ServerAliveCountMax=6', 'production-deploy@' + host],
                       input=payload, text=True, check=True, timeout=2700)


if __name__ == '__main__':
    main()
