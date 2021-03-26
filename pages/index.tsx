import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import sentiment from 'sentiment';

type Inputs = {
  message: string;
};
type Results = 'Positive' | 'Neutral' | 'Negative';

export default function Home() {
  const [result, setResult] = useState<Results>('Neutral');
  const { register, handleSubmit, formState, errors } = useForm<Inputs>({ mode: 'onChange' });
  const { isDirty, isValid } = formState;

  const onSubmit = async (data: Inputs) => {
    const Sentiment = new sentiment();
    const sentimentScore = await Sentiment.analyze(data.message).score;

    setResult(sentimentScore > 0 ? 'Positive' : sentimentScore === 0 ? 'Neutral' : 'Negative');
  };

  return (
    <main>
      <Head>
        <title>Sentiment Analysis Tool!</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow max-w-3xl mx-auto px-6 sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Message Sentiment Analysis
            </h3>
            {isValid && (
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Sentiment Analysis Results: {result}</p>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5" data-testid="form">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={cn('block w-full pr-10 sm:text-sm rounded-md focus:outline-none', {
                    'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500':
                      errors.message
                  })}
                  defaultValue={`Cat's are awesome`}
                  ref={register({ required: true })}
                ></textarea>
              </div>
              {errors.message && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  Please enter a message.
                </p>
              )}
              <div className="text-right">
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-3 sm:w-auto sm:text-sm"
                >
                  Analyse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
