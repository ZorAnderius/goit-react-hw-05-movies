import ScrollToTop from 'react-scroll-up';
import ScrollUpCSS from './ScrollUp.module.css';

import { ReactComponent as UpArrow } from '../../icons/up-arrow.svg';

export const ScrollUp = () => {
  return (
    <ScrollToTop className={ScrollUpCSS.styles} showUnder={160}>
      <div className={ScrollUpCSS.up_arrow_wrap}>
        <UpArrow className={ScrollUpCSS.up_arrow} width="36" height="36" />
      </div>
    </ScrollToTop>
  );
};
