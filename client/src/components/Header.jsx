import popcorn from "../images/popcorn.png";

export default function Header() {
  return (
    <>
      <div className="filmpop-container">
        <h1 className="knewave-regular">
          <img
            src={popcorn}
            alt="Popcorn Icon"
            width={100}
            className="filmpop-logo"
          ></img>
          FilmPop
        </h1>
      </div>
      <div className="sub-title"><i>Movie Roulette</i></div>
    </>
  );
  
}
