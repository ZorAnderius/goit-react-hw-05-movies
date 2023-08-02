import { Link } from 'react-router-dom';
import backBtnCSS from './BackButton.module.css';
import { Button } from 'components/Button/Button';

import propTypes from 'prop-types';

export const BackButton = ({ linkTo }) => {
  return (
    <Link className={backBtnCSS.back_btn} to={linkTo}>
      <Button>Back</Button>
    </Link>
  );
};

BackButton.propTypes = {
  linkTo: propTypes.shape(),
};
