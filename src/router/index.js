import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin.js";
import { useUser } from "../store/use-user.js";

const routes = [...admin];
const router = createRouter({
  history: createWebHistory(),
  routes,
 /*  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { 
      top: 0,
      behavior: 'smooth'
     }
  }, */
});

router.beforeEach((to) => {
  const store = useUser();
  const { isUser } = store;
  
  if (to.meta.requiresAuth && !isUser) return "/login";
});

export default router;
