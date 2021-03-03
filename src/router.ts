import App from './components';
import pages from './pages';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: pages.Dashboard,
      },
      {
        component: pages.NotFound,
      },
    ],
  },
];
