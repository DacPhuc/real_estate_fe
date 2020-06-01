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
        path: '/test',
        name: 'socket',
        icon: 'smile',
        component: './TestSocket',
      },
    ],
  },
];
