export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/MainPane')
  },
  {
    path: '/:id',
    name: 'tab-page',
    component: require('components/TabPane')
  },
  {
    path: '*',
    redirect: '/'
  }
]
