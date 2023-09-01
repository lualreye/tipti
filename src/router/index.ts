import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

// Import web views
const Home = () => import('@/views/Home.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Marvel. Encuentra a tus super heroes.'
    },
  },
];


const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title as string;
  next()
});

export default router;