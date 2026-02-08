import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dane, setDane] = useState(null);
  const [ladowanie, setLadowanie] = useState(true);

  const fetchData = async () => {
    try {
      console.log('Próba pobrania z localhost...');
      const response = await fetch('http://localhost:8000/api/tekst/');
      if (!response.ok) throw new Error('Odpowiedź nie jest OK');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Błąd z localhost, próba z 127.0.0.1...');
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tekst/');
        if (!response.ok) throw new Error('Odpowiedź nie jest OK');
        const data = await response.json();
        return data;
      } catch (fallbackError) {
        throw fallbackError;
      }
    }
  };

  useEffect(() => {
    console.log('Pobieranie danych z API...');
    fetchData()
      .then(data => {
        console.log('Otrzymane dane:', data);
        setDane(data);
        setLadowanie(false);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych:', error);
        setLadowanie(false);
      });
  }, []);

  if (ladowanie) {
    return <div className="App">Ładowanie danych z Django...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplikacja React + Django</h1>
        {dane ? (
          <div>
            <p>{dane.moj_tekst}</p>
            <p>Data z serwera: {dane.data}</p>
            <p>Autor: {dane.autor}</p>
          </div>
        ) : (
          <p>Brak danych</p>
        )}
      </header>
    </div>
  );
}

export default App;