export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const response = await fetch(
      'https://trading-api.kalshi.com/trade-api/v2/markets?status=open&limit=100',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'PredictionDashboard/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Kalshi API returned ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Kalshi error:', error);
    res.status(500).json({ error: error.message, markets: [] });
  }
}
