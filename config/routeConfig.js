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
        path: '/map',
        name: 'map',
        icon: 'smile',
        component: './MapLocation',
      },
    ],
  },
];
