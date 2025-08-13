import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin.js";
import { useUser } from "../store/use-user.js";
import { webBaseURL } from "../config.js";

const routes = [...admin];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return {
      top: 0,
      behavior: 'smooth'
    }
  },
});

router.beforeEach(async (to, from, next) => {
  const store = useUser();

  // Lấy reactive state
  const { isUser } = store;

  if (to.meta.requiresAuth && !isUser) {
    window.location.href = `${webBaseURL}/auth/azure`;
    return;
    /* const res = await fetch('/check-auth');
    const data = await res.json();
    if (!data.authenticated) {
      return next('/login');
    }
    next(); */
  } else {
    next();
  }
});

export default router;
