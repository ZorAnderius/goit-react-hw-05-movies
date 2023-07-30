import { Header } from 'components/Header/Header';
import { Link, Outlet } from 'react-router-dom';

export const SharedLayout = () => {
  return (
    <div>
      <Header>
        <nav className="">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      <Outlet />
    </div>
  );
};
