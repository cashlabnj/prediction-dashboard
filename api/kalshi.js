export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const response = await fetch(
      'https://trading-api.kalshi.com/trade-api/v2/markets?status=open&limit=100',
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Kalshi API returned ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, markets: [] }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
