// src/hooks/useQuotes.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/quotes/random?limit=3');
        setQuotes(response.data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return { quotes, loading };
};