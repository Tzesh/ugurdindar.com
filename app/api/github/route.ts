import { loadGithubPortfolio } from '../../../lib/github';

export async function GET() {
  try {
    const portfolio = await loadGithubPortfolio();
    return Response.json(portfolio, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600' },
    });
  } catch {
    return Response.json({ error: 'github_unavailable' }, {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}
