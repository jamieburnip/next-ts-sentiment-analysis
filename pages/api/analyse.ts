import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export default (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const {
    body: { text }
  } = req;

  const score: number = sentiment.analyze(text).score;
  const result: string = score > 0 ? 'Positive' : score === 0 ? 'Neutral' : 'Negative';

  res.status(200).json({ text, result });
};
