import { Header } from 'components/Header/Header';
import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { Suspense } from 'react';
import { Loader } from '../../components/Loader/Loader';
import layoutCSS from './SharedLayout.module.css';

export const SharedLayout = () => {
  const location = useLocation();

  return (
    <div>
      <Header>
        <nav className={layoutCSS.navigation}>
          <Link
            className={clsx(
              layoutCSS.nav_link,
              location?.pathname === '/' && layoutCSS.active
            )}
            to="/"
          >
            Home
          </Link>
          <Link
            className={clsx(
              layoutCSS.nav_link,
              location?.pathname === '/movies' && layoutCSS.active
            )}
            to="/movies"
            state={{ from: location }}
          >
            Movies
          </Link>
        </nav>
      </Header>
      <div className={layoutCSS.container}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
