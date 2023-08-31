const admin = [
    {
        path: "/",
        name: "Home",
        component: () => import("../pages/Home.vue"),  
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            layout: "auth"
        },
        component: () => import("../pages/Login.vue"),       
    },
    {
        path: "/:pathMatch(.*)*",   
        meta: {
            layout: "auth"
        },     
        component: () => import("../pages/NotFound.vue"),       
    }
];

export default admin;