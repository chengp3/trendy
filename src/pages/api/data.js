// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  res.status(200).json([{time: 10000, open: 12, high: 18, low: 11, close: 14}])

  const ticker = 'ES=F'
    try {
      const endpoint = process.env.ep + 'i=' + ticker; // Replace with your actual API endpoint.
      const apiKey = process.env.ak; 
  
      const response = axios.get(endpoint, {
          headers: {
              'x-api-key': apiKey
          }
      });
  
      const data = response.data.map(item => ({
        time: item['Datetime'] / 1000,
        open: item['Open'],
        high: item['High'],
        low: item['Low'],
        close: item['Close']
      }));
  
      res.status(200).json(data);

    } catch (error) {
      if (error.response && error.response.status === 502) {
            console.error('Received a 502 error');
     }
    }
}
