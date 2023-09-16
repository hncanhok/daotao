
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
        path: "/:id/khoa-hoc",
        name: "KhoaHoc",       
        component: () => import("../components/TinTuc.vue"),       
    },    
    {
        path: "/:id/tieu-diem",
        name: "TieuDiem",       
        component: () => import("../components/TinTuc.vue"),       
    },         
    {
        path: "/:id:urldetail/:title",   
        name: "Page",
        component: () => import("../pages/Page.vue"),  
        props: true     
    }, 
    {
        path: "/:urldetail",   
        name: "DetailPage",
        component: () => import("../pages/DetailPage.vue"),  
        props: true     
    },
    {
        path: "/:pathMatch(.*)*",           
        component: () => import("../pages/NotFound.vue"),       
    }
];

export default admin;