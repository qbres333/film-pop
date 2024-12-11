import popcorn from '../images/popcorn.png'

export default function Home() {
    return (
      <>
        <div>
          <h1 className="knewave-regular">
            <img src={popcorn} width={100} className="filmpop-logo"></img>
            FilmPop
          </h1>
          <SearchForm />
        </div>
      </>
    );
}
