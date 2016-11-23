export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/MainPane')
  },
  {
    path: '/host',
    name: 'host-page',
    component: require('components/TabPane')
  },
  // {
  //   path: '/image',
  //   name: 'landing-page',
  //   component: require('components/Image')
  // },
  {
    path: '*',
    redirect: '/'
  }
]
