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
        path: '/estate/detail',
        name: 'estate',
        icon: 'solution',
        component: './ExamplePage',
      },
    ],
  },
];
