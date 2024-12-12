import { Outlet } from 'react-router-dom';
import popcorn from './images/popcorn.png'
import './App.css';
import "semantic-ui-css/semantic.min.css";
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <div>
        <Nav />
        <h1 className="knewave-regular">
          <img src={popcorn} alt="Popcorn Icon" width={100} className="filmpop-logo"></img>FilmPop
        </h1>
        <Outlet />
        <SearchForm />
      </div>
    </>
  );
}

export default App;

/** 
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
*/