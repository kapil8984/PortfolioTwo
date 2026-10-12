export interface SearchResultItem {
  title: string;
  url: string;
  snippet: string;
  publishedDate?: string;
}

export interface SearchResults {
  query: string;
  results: SearchResultItem[];
}

export async function performWebSearch(query: string): Promise<SearchResults | null> {
  const apiKey = process.env.SEARCH_PROVIDER_API_KEY;
  const provider = (process.env.SEARCH_PROVIDER || 'tavily').toLowerCase();

  if (!apiKey) {
    // Search is not configured; caller will gracefully note that live web search is unconfigured
    return null;
  }

  try {
    if (provider === 'tavily') {
      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: apiKey,
          query,
          search_depth: 'basic',
          max_results: 3,
        }),
      });

      if (!response.ok) return null;
      const data = await response.json();
      const results: SearchResultItem[] = (data.results || []).map((r: any) => ({
        title: r.title || 'Untitled',
        url: r.url || '',
        snippet: r.content || r.snippet || '',
        publishedDate: r.published_date,
      }));

      return { query, results };
    }

    if (provider === 'serper') {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: query,
          num: 3,
        }),
      });

      if (!response.ok) return null;
      const data = await response.json();
      const results: SearchResultItem[] = (data.organic || []).map((r: any) => ({
        title: r.title || 'Untitled',
        url: r.link || '',
        snippet: r.snippet || '',
      }));

      return { query, results };
    }

    return null;
  } catch (err: any) {
    console.error('[SearchService:ERROR] Failed to query search provider:', err.message);
    return null;
  }
}
