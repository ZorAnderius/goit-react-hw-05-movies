import BtnCSS from './Button.module.css';

export const Button = ({ children }) => {
  return <button className={BtnCSS.btn}>{children}</button>;
};
