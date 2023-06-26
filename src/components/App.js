import React, { useEffect, useState } from 'react';
import '../styles/App.scss';

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('Todos');

  useEffect(() => {
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    )
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data);
        setFilteredQuotes(data);
      });
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = quotes.filter((quote) => {
      const quoteText = quote.quote.toLowerCase();
      const character = quote.character.toLowerCase();

      return (
        quoteText.includes(searchValue) &&
        (selectedCharacter === 'Todos' ||
          character === selectedCharacter.toLowerCase())
      );
    });

    setFilteredQuotes(filtered);
  };

  const handleCharacterChange = (event) => {
    const character = event.target.value;
    setSelectedCharacter(character);

    const filtered = quotes.filter((quote) => {
      const quoteText = quote.quote.toLowerCase();
      const quoteCharacter = quote.character.toLowerCase();

      return (
        quoteText.includes(searchText) &&
        (character === 'Todos' || quoteCharacter === character.toLowerCase())
      );
    });

    setFilteredQuotes(filtered);
  };

  return (
    <div className='page'>
      <header className='header'>
        <h1 className='title'>Frases de Friends</h1>
      </header>
      <div className='form'>
        <label className='filter'>Filtrar por frase:</label>
        <input
          type='text'
          id='searchInput'
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className='form'>
        <label className='filter'>Filtrar por personaje:</label>
        <select
          id='characterSelect'
          value={selectedCharacter}
          onChange={handleCharacterChange}
        >
          <option value='Todos'>Todos</option>
          <option value='Ross'>Ross</option>
          <option value='Monica'>Monica</option>
          <option value='Joey'>Joey</option>
          <option value='Phoebe'>Phoebe</option>
          <option value='Chandler'>Chandler</option>
          <option value='Rachel'>Rachel</option>
        </select>
      </div>

      <ul>
        {filteredQuotes.map((quote, index) => (
          <li className='list' key={index}>
            <span className='quote_name'>{quote.character}</span>: {quote.quote}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
