
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
        path: "/:id/thu-vien",
        name: "ThuVien",       
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
        path: "/danh-sach-bai-kiem-tra-cua-ban",   
        name: "BaiKiemTra",
        component: () => import("../components/BaiKiemTra.vue"),  
        props: true     
    },
    {
        path: "/:classID:exambleID/khao-sat",   
        name: "KhaoSat",
        component: () => import("../components/KhaoSat.vue"),  
          
    },
    {
        path: "/:classID:exambleID/:informationName",   
        name: "Test",
        component: () => import("../components/Test.vue"),  
        props: true   
    },
    {
        path: "/:pathMatch(.*)*",           
        component: () => import("../pages/NotFound.vue"),       
    }
];

export default admin;