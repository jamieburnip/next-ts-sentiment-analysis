import { act, fireEvent, render, screen } from '@testing-library/react';
import App from '../pages/index';

describe('App render', () => {
  it('renders the Login page', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Message Sentiment Analysis/i)).toBeInTheDocument();
  });

  it('render input component', () => {
    const { getByLabelText } = render(<App />);
    expect(getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    const { getByText } = render(<App />);
    expect(getByText('Analyse')).toBeInTheDocument();
  });
});

describe('Form behaviour', () => {
  it('validates user input and provides error message', async () => {
    const { getByTestId, getByText, getByLabelText } = render(<App />);

    await act(async () => {
      fireEvent.change(getByLabelText(/Message/i), { target: { value: '' } });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('form'));
    });

    expect(getByText('Please enter a message.')).toBeInTheDocument();
  });

  it('should submit when form inputs contain text', async () => {
    const { getByTestId, queryByText, getByLabelText } = render(<App />);
    let expectedMessage = `This product is awesome!`;

    await act(async () => {
      fireEvent.change(getByLabelText(/Message/i), { target: { value: expectedMessage } });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('form'));
    });

    expect(queryByText('Please enter a message.')).not.toBeInTheDocument();
  });

  it('message is analysed as positive', async () => {
    const { getByTestId, queryByText, getByLabelText } = render(<App />);
    let expectedMessage = `This product is awesome!`;

    await act(async () => {
      fireEvent.change(getByLabelText(/Message/i), { target: { value: expectedMessage } });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('form'));
    });

    expect(queryByText('Sentiment Analysis Results: Positive')).toBeInTheDocument();
  });

  it('message is analysed as neutral', async () => {
    const { getByTestId, queryByText, getByLabelText } = render(<App />);
    let expectedMessage = `This product is okay`;

    await act(async () => {
      fireEvent.change(getByLabelText(/Message/i), { target: { value: expectedMessage } });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('form'));
    });

    expect(queryByText('Sentiment Analysis Results: Neutral')).toBeInTheDocument();
  });

  it('message is analysed as negative', async () => {
    const { getByTestId, queryByText, getByLabelText } = render(<App />);
    let expectedMessage = `This product is terrible and I'll never order again!`;

    await act(async () => {
      fireEvent.change(getByLabelText(/Message/i), { target: { value: expectedMessage } });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('form'));
    });

    expect(queryByText('Sentiment Analysis Results: Negative')).toBeInTheDocument();
  });
});
