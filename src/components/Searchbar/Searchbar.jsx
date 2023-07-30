import { IconButton } from 'components/IconButton/IconButton';
import searchBarCSS from './Searchbar.module.css';

import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';

export const Searchbar = ({
  valueInput,
  setSearchParams,
  onSearchByKeyword,
}) => {
  const onChangeMovieTitle = ({ target: { value } }) => {
    setSearchParams({ query: value });
  };

  const onSubmit = evt => {
    evt.preventDefault();
    onSearchByKeyword(valueInput);
  };
  return (
    <div>
      <form onSubmit={onSubmit} className={searchBarCSS.formSearch}>
        <input
          className={searchBarCSS.inputSearch}
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
          value={valueInput}
          onChange={onChangeMovieTitle}
        />

        <IconButton type="submit">
          <SearchIcon width="35" height="35" />
        </IconButton>
      </form>
    </div>
  );
};

// https://api.themoviedb.org/3/search/movie/?api_key=d277c204a2c30c818c2befd49f072a72&query=bat&page=1
// https://api.themoviedb.org/3/search/movie?api_key=d277c204a2c30c818c2befd49f072a72&query=batman&total_pages=40
