const routes = [
  { path: '/', name: 'game', component: () => import('@/pages/game') },
  { path: '/statistic', name: 'statistic', component: () => import('@/pages/statistic') },
]

export default routes
