export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/example',
        name: 'example',
        icon: 'smile',
        component: './ExamplePage',
      },
    ],
  },
];
