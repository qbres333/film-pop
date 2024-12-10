// search form with options for genre and rating
// import semantic UI


// genre options
const genreOptions = [
  { key: 1, text: "", value: 1 },
  { key: 2, text: "Action", value: 2 },
  { key: 3, text: "Adventure", value: 3 },
  { key: 4, text: "Animation", value: 4 },
  { key: 5, text: "Biography", value: 5 },
  { key: 6, text: "Comedy", value: 6 },
  { key: 7, text: "Crime", value: 7 },
  { key: 8, text: "Drama", value: 8 },
  { key: 9, text: "Family", value: 9 },
  { key: 10, text: "Fantasy", value: 10 },
  { key: 11, text: "History", value: 11 },
  { key: 12, text: "Horror", value: 12 },
  { key: 13, text: "Music", value: 13 },
  { key: 14, text: "Mystery", value: 14 },
  { key: 15, text: "Romance", value: 15 },
  { key: 16, text: "Sci - Fi", value: 16 },
  { key: 17, text: "Short", value: 17 },
  { key: 18, text: "Thriller", value: 18 },
  { key: 19, text: "War", value: 19 },
];

// rating options
const ratingOptions = [
  { key: 1, text: "", value: 1 },
  { key: 1, text: "Abysmal", value: 1 },
  { key: 2, text: "Bad", value: 2 },
  { key: 3, text: "Average", value: 3 },
  { key: 4, text: "Good", value: 4 },
  { key: 5, text: "Excellent", value: 5 },
];

export default function SearchForm(props) {
    
    return (
      <div className="search-form">
        <form className="form">
          <div className="two fields">

            <div className="field genres">
              <div className="select-genre">
                <select className="ui fluid dropdown">
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

