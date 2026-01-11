import React, { useState, useEffect } from 'react';
import quotesData from '../../../../src/assets/json/quotes.json';
import { toast } from 'react-toastify';
import { TfiReload } from "react-icons/tfi";
import { FaXTwitter } from 'react-icons/fa6';
import { FaCopy } from 'react-icons/fa';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState({
    content: 'Click the button to get inspired!',
    author: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [usedQuotes, setUsedQuotes] = useState([]);

  // Get random quote from JSON
  const getRandomQuote = () => {
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      let availableQuotes = quotesData.filter((_, index) => !usedQuotes.includes(index));
      
      // Reset if all quotes have been used
      if (availableQuotes.length === 0) {
        setUsedQuotes([]);
        availableQuotes = quotesData;
      }
      
      const randomIndex = Math.floor(Math.random() * availableQuotes.length);
      const selectedQuote = availableQuotes[randomIndex];
      const originalIndex = quotesData.indexOf(selectedQuote);
      
      setQuote(selectedQuote);
      setUsedQuotes([...usedQuotes, originalIndex]);
      setIsLoading(false);
    }, 300);
  };

  // Get random quote on mount
  useEffect(() => {
    getRandomQuote();
  }, []);

  // Share on Twitter
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quote.content}" - ${quote.author}`;
    window.open(twitterUrl, '_blank');
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    const text = `"${quote.content}" - ${quote.author}`;
    navigator.clipboard.writeText(text);
    
    toast('Quote copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        

        {/* Quote Card */}
        <div className="card bg-base-100 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
          <div className="card-body p-8 sm:p-10 lg:p-12 relative">
            
            <div className="absolute top-4 left-4 text-7xl sm:text-8xl opacity-10 select-none text-primary">
              ❝
            </div>

            
            <div className={`relative z-10 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
              <div className="min-h-[200px] sm:min-h-[180px] flex flex-col justify-center">
                <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-base-content leading-relaxed mb-6 sm:mb-8">
                  {quote.content}
                </p>
                
                {quote.author && (
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-12 h-0.5 bg-primary"></div>
                    <p className="text-lg sm:text-xl font-medium text-primary">
                      {quote.author}
                    </p>
                  </div>
                )}
              </div>
            </div>

            
            <div className="divider my-6"></div>

           
            <div className="card-actions flex-col sm:flex-row gap-4">
              <button
                onClick={getRandomQuote}
                disabled={isLoading}
                className="btn btn-primary flex-1 gap-2 text-white font-semibold"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Loading...
                  </>
                ) : (
                  <>
                    <TfiReload />
                    New Quote
                  </>
                )}
              </button>

              <button
                onClick={copyToClipboard}
                disabled={isLoading}
                className="btn btn-secondary gap-2 text-white font-semibold"
              ><FaCopy />
                Copy
              </button>

              <button
                onClick={shareOnTwitter}
                disabled={isLoading}
                className="btn btn-secondary gap-2 text-white font-semibold"
              >
                <FaXTwitter />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
