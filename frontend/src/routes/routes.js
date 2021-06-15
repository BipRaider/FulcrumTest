/* eslint-disable import/no-anonymous-default-export */
import { lazy } from 'react';

export default [
  {
    path: '/',
    label: 'Home',
    exact: true,
    component: lazy(() =>
      import('../components/views/MainPage/MainPage.js' /* webpackChunkName: "home-page" */),
    ),
    private: false,
    restricted: false,
    all: true,
  },
  {
    path: '/login',
    label: 'Login',
    exact: true,
    component: lazy(() =>
      import('../components/views/LoginPage/LoginPage.js' /* webpackChunkName: "login" */),
    ),
    private: false,
    restricted: true,
    all: false,
  },
  {
    path: '/register',
    label: 'Register',
    exact: true,
    component: lazy(() =>
      import(
        '../components/views/RegisterPage/RegisterPage.js'
        /* webpackChunkName: "register" */
      ),
    ),
    private: false,
    restricted: true,
    all: false,
  },
  {
    path: '/user',
    label: 'User',
    exact: true,
    component: lazy(() => import('../components/views/UserPage' /* webpackChunkName: "user" */)),
    private: true,
    all: true,
    restricted: true,
  },
  {
    path: '/fork',
    label: 'Fork',
    exact: true,
    component: lazy(() => import('../components/views/ForkPage' /* webpackChunkName: "fork" */)),
    private: true,
    restricted: true,
    all: true,
  },
  {
    path: '/categories',
    label: 'Categories',
    exact: true,
    component: lazy(() =>
      import('../components/views/CategoriesPage' /* webpackChunkName: "categories" */),
    ),
    private: true,
    restricted: true,
    all: true,
  },
];
