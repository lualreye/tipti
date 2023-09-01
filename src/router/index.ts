import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

// Import web views
const Home = () => import('@/views/Home.vue');
const Detail = () => import('@/views/Detail.vue');
const History = () => import('@/views/History.vue');
const Saved = () => import('@/views/Saved.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Marvel. Find your best stories.'
    },
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      title: 'Marvel. Check what you have seen.'
    },
  },
  {
    path: '/saved',
    name: 'Saved',
    component: Saved,
    meta: {
      title: 'Marvel. Check what you have saved.'
    },
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: {
      title: 'Story Detail.'
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