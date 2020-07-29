export default [
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/login',
        name: 'Login',
        icon: 'smile',
        component: './LoginPage',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        name: 'Home',
        icon: 'smile',
        component: './HomePage',
      },
      {
        path: '/visualize',
        name: 'Real Estate Charts',
        icon: 'smile',
        component: './Charts',
      },
    ],
  },
];
