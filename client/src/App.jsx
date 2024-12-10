import { useState } from 'react'
import popcorn from './images/popcorn.png'
import './App.css';
import "semantic-ui-css/semantic.min.css";
import SearchForm from './components/SearchForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>
          <img src={popcorn} width={100} className="filmpop-logo"></img>FilmPop
        </h1>
        <SearchForm/>
      </div>
    </>
  );
}

export default App

/** 
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
*/