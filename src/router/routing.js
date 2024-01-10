import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; 
import Spending from '../views/Spending.vue'; 
import Earned from '../views/Earned.vue'; 
import Rating from '../views/Rating.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }, 
  {
    path: '/spending',
    name: 'Spending',
    component: Spending,
  }, 
  {
    path: '/earned',
    name: 'Earned',
    component: Earned,
  }, 
  {
    path: '/rating',
    name: 'Rating',
    component: Rating,
  }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
