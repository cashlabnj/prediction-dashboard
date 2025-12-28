export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // Kalshi now requires auth - return empty gracefully
    // Users can still see Polymarket data
    res.status(200).json({ 
      markets: [], 
      note: 'Kalshi API requires authentication. Showing Polymarket data only.' 
    });
  } catch (error) {
    res.status(200).json({ markets: [], error: error.message });
  }
}
