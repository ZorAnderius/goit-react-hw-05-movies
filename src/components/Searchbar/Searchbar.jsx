import { IconButton } from 'components/IconButton/IconButton';
import searchBarCSS from './Searchbar.module.css';

import propTypes from 'prop-types';

import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';

export const Searchbar = ({
  valueInput,
  setSearchParams,
  onSearchByKeyword,
  firstRender,
}) => {
  const onChangeMovieTitle = ({ target: { value } }) => {
    setSearchParams({ query: value });
    firstRender.current = false;
  };

  const onSubmit = evt => {
    evt.preventDefault();
    onSearchByKeyword(valueInput);
  };
  return (
    <div className={searchBarCSS.form_wrapper}>
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
          <SearchIcon width="26" height="26" />
        </IconButton>
      </form>
    </div>
  );
};

Searchbar.propTypes = {
  valueInput: propTypes.string.isRequired,
  setSearchParams: propTypes.func.isRequired,
  onSearchByKeyword: propTypes.func.isRequired,
};
