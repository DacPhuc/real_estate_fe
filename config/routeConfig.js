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
        name: 'home',
        icon: 'smile',
        component: './HomePage',
      },
    ],
  },
];
