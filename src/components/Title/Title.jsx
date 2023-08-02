import titleCSS from './Title.module.css';

export const Title = ({ children }) => {
  return <div className={titleCSS.fire}>{children}</div>;
};
