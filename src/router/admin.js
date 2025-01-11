
const admin = [
    {
        path: "/Trangchu",
        name: "Home2",
        component: () => import("../pages/Home.vue"),  
        meta: { requiresAuth: true },
    },
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
        component: () => import("../components/ChiTietKhoaHoc.vue"),       
        meta: { requiresAuth: true },
    },    
    {
        path: "/:urldetail/khoa-hoc-dang-dien-ra",
        name: "LopHoc",       
        component: () => import("../components/LopHoc.vue"),       
        meta: { requiresAuth: true },
    },   
    {
        path: "/:id/tieu-diem",
        name: "TieuDiem",       
        component: () => import("../components/TinTuc.vue"),     
        meta: { requiresAuth: true },  
    },       
    {
        path: "/:id/thu-vien",
        name: "ThuVien",       
        component: () => import("../components/TinTuc.vue"),     
        meta: { requiresAuth: true },  
    },     
    {
        path: "/:urldetail/:title",   
        name: "Page",
        component: () => import("../pages/Page.vue"),  
        props: true,     
        meta: { requiresAuth: true },
    }, 
    {
        path: "/:urldetail",   
        name: "DetailPage",
        component: () => import("../pages/DetailPage.vue"),  
        props: true,     
        meta: { requiresAuth: true },
    },
    {
        path: "/danh-sach-bai-kiem-tra-cua-ban",   
        name: "BaiKiemTra",
        component: () => import("../components/BaiKiemTra.vue"),  
        props: true,     
        meta: { requiresAuth: true },
    },
    {
        path: "/:classID:exambleID/khao-sat",   
        name: "KhaoSat",
        component: () => import("../components/KhaoSat.vue"),  
        meta: { requiresAuth: true },
          
    },
    {
        path: "/:classID:exambleID/bai-kiem-tra/:informationName",   
        name: "Test",
        component: () => import("../components/Test.vue"),  
        props: true,
        meta: { requiresAuth: true },   
    },
    {
        path: "/url/:id",   
        name: "VaoHoc",
        component: () => import("../components/VaoHoc.vue"),  
        props: true,     
        meta: { requiresAuth: true },
    }, 
    {
        path: "/testupload",           
        component: () => import("../components/testupload.vue"),  
        props: true,     
        meta: { requiresAuth: true },
    }, 
   
    {
        path: "/:pathMatch(.*)*",     
        name: "NotFound",      
        component: () => import("../pages/NotFound.vue"),     
        meta: { 
            layout: "auth",
            requiresAuth: true },  
    }
];

export default admin;