export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        name: 'home',
        icon: 'smile',
        component: './HomePage',
      },
      {
        path: '/login',
        name: 'Login',
        icon: 'smile',
        component: './LoginPage',
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
