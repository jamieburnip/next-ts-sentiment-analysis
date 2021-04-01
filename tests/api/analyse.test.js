import { createMocks } from 'node-mocks-http';
import handleAnalyse from '../../pages/api/analyse';

describe('/api/analyse', () => {
  test('returns good with POST', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        text: 'This product is awesome!'
      }
    });

    await handleAnalyse(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        text: 'This product is awesome!'
      })
    );
  });

  test('returns an error for GET', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    });

    await handleAnalyse(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toBe('Method GET Not Allowed');
    expect(res._getHeaders()).toEqual(
      expect.objectContaining({
        allow: ['POST']
      })
    );
  });
});

describe('Endpoint results', () => {
  test('result is positive', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        text: 'This product is awesome!'
      }
    });

    await handleAnalyse(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        text: 'This product is awesome!',
        result: 'Positive'
      })
    );
  });
  test('result is neutral', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        text: 'This product is okay!'
      }
    });

    await handleAnalyse(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        text: 'This product is okay!',
        result: 'Neutral'
      })
    );
  });

  test('result is negative', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        text: `This product is terrible and I'll never order again!`
      }
    });

    await handleAnalyse(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        text: `This product is terrible and I'll never order again!`,
        result: 'Negative'
      })
    );
  });
});
