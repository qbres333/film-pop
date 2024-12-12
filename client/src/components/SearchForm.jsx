// search form with options for genre and rating

// genre options
const genreOptions = [
  { key: 1, text: "Action", value: "Action" },
  { key: 2, text: "Adventure", value: "Adventure" },
  { key: 3, text: "Animation", value: "Animation" },
  { key: 4, text: "Biography", value: "Biography" },
  { key: 5, text: "Comedy", value: "Comedy" },
  { key: 6, text: "Crime", value: "Crime" },
  { key: 7, text: "Drama", value: "Drama" },
  { key: 8, text: "Family", value: "Family" },
  { key: 9, text: "Fantasy", value: "Fantasy" },
  { key: 10, text: "History", value: "History" },
  { key: 11, text: "Horror", value: "Horror" },
  { key: 12, text: "Music", value: "Music" },
  { key: 13, text: "Mystery", value: "Mystery" },
  { key: 14, text: "Romance", value: "Romance" },
  { key: 15, text: "Sci - Fi", value: "Sci - Fi" },
  { key: 16, text: "Short", value: "Short" },
  { key: 17, text: "Thriller", value: "Thriller" },
  { key: 18, text: "War", value: "War" },
  { key: 19, text: "Western", value: "Western" },
];

// rating options
const ratingOptions = [
  { key: 1, text: "Abysmal", value: "Abysmal" }, //rating 0 (inclusive) to 2
  { key: 2, text: "Bad", value: "Bad" }, //rating 2 (inclusive) to 4
  { key: 3, text: "Average", value: "Average" }, //rating 4 (inclusive) to 6
  { key: 4, text: "Good", value: "Good" }, //rating 6 (inclusive) to 8
  { key: 5, text: "Good", value: "Good" }, //rating 8 (inclusive) to 10
];

export default function SearchForm(props) {
    
    return (
      <div className="search-form">
        <form className="form">
          <div className="two fields">

            <div className="field genres">
              <div className="select-genre">
                <select className="dropdown">
                  <option value="" disabled selected>
                    Select Genre
                  </option>
                  {genreOptions.map((option) => (
                    <option key={option.key} value={option.text}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field rating">
              <div className="select-rating">
                <select className="dropdown">
                  <option value="" disabled selected>
                    Select Rating
                  </option>
                  {ratingOptions.map((option) => (
                    <option key={option.key} value={option.text}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>

        
          </div>
          <br />

          <button type="submit" className="btn-find-movies">Find Movies!</button>
        </form>
      </div>
    );
}

