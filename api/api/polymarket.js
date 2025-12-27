export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const response = await fetch(
      'https://gamma-api.polymarket.com/markets?active=true&limit=100&order=volume24hr&ascending=false',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'PredictionDashboard/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Polymarket API returned ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Polymarket error:', error);
    res.status(500).json({ error: error.message });
  }
}
