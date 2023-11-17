<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row p-4">
        <div class="col d-block d-lg-none d-flex align-items-center p-0">
          <i
            @click="showDrawer()"
            class="fa-solid fa-bars fa-xl"
            style="color: #a10707"
          ></i>
        </div>
        <div
          class="col-6 d-flex justify-content-center justify-content-lg-start text-sm-start"
        >
          <router-link :to="{ name: 'Home' }">
            <img
              src="../assets/logo/Logo-E-Learning-03.png"
              alt="Logo E-Learning"
              width="200"
              height="auto"
            />
          </router-link>
        </div>
        <div class="col pt-3 text-end d-none d-lg-block">
          <a-input-search
            class="rounded-pill p-2"
            style="width: 250px"
            placeholder="Tìm kiếm..."
            enter-button
          />
          <div
            style="display: inline-block; position: relative"
            class="ms-2 p-2"
            @click="onWatched()"
          >
            <router-link
              :to="{ name: 'BaiKiemTra' }"
              style="text-decoration: none; color: inherit"
            >
              <i class="fa-solid fa-bell fa-2xl me-lg-3"></i>

              <div class="thongbao d-inline-block">
                <span v-show="thongbao > 0 && watched == false" class="circle">{{ thongbao }}</span>
              </div>
            </router-link>
            <div
              @mouseover="mouseover"
              @mouseleave="mouseleave"
              class="d-inline-block mt-1"
              style="position: relative"
            >
            <img
                    class="avatar ms-2 me-2"
                    style="width: 30px;height: 30px;"
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt=""
                  />
              <span style="color: #a10707; font-weight: bold">{{ userName.toUpperCase() }}</span>
              <div class="boxuser" v-show="active">
               
                <div class="box2">
                  <div v-for="(user, index) in menuUser" :key="user.id">
                    <router-link
                      style="text-decoration: none; color: inherit"
                      :to="{
                        name: 'Page',
                        params: {
                          title: user.urlFriendLink,
                          id: user.id,
                          urldetail: user.urlDetail,
                        },
                      }"
                    >
                      <div
                        class="thongtin"
                        :class="{ gachchan: index < menuUser.length }"
                      >
                        <i class="fa-solid fa-caret-right me-2"></i
                        >{{ user.menuName }}
                      </div>
                    </router-link>
                  </div>
                  <div @click="onLogout()" style="cursor: pointer;" class="d-flex justify-content-left pb-2">
                    <span>
                      <i class="fa-solid fa-caret-right me-2"></i>                                                                                 
                      Đăng xuất
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col d-block d-lg-none text-end d-flex align-items-center justify-content-end"
        >
          <div
            style="display: inline-block; position: relative"
            class="ms-2 p-2"
            @click="onWatched()"
          >
            <router-link
              :to="{ name: 'BaiKiemTra' }"
              style="text-decoration: none; color: inherit"
            >
              <i class="fa-solid fa-bell fa-xl fa-lg-2xl me-2 me-lg-3"></i>

              <div class="thongbao d-inline-block">
                <span v-show="thongbao > 0 && watched == false " class="circle">{{ thongbao }}</span>
              </div>
            </router-link>
          </div>
          <i
            class="fa-solid fa-circle-user fa-xl"
            @click="showDrawer2()"
            style="color: #a10707"
          ></i>
        </div>
      </div>
    </div>
  </div>

  <a-drawer v-model:visible="visible" placement="left">
    <MenuMobile />
  </a-drawer>
  <a-drawer v-model:visible="visible2" placement="right">
    <UserMobile />
  </a-drawer>

  <div class="noti" v-if="showNoti">
    <div style="position: relative;">   
      <p style="position: absolute;top:0;right:0;cursor: pointer;">
        <i class="fa-solid fa-xmark" @click="showNoti=false"></i>
      </p>
      <p>Thông báo</p>
      <ul>
        <li v-for="( title, index ) in noti" :key="index">
          <span style="font-weight: bold;">{{ title.informationCode }}</span> : {{ title.informationName }}      
        </li>      
      </ul>    
    </div>   
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import MenuMobile from "./MenuMobile.vue";
import UserMobile from "./UserMobile.vue";
import { useUser } from "../store/use-user.js";
import { notification } from 'ant-design-vue';

const key = 'updatable';

export default defineComponent({
  components: {
    MenuMobile,
    UserMobile,
  },
  setup() {
    const watched = ref(false);
    const showNoti = ref(false);
    const thongbao = ref(0);
    const noti=ref([]);
    const active = ref(false);
    const menuUser = ref([]);
    const { userName, useID, userEmail, screptionID } = useUser();

    const router = useRouter();
    const visible = ref(false);
    const visible2 = ref(false);
    const afterVisibleChange = (bool) => {
      console.log("visible", bool);
    };
    const showDrawer = () => {
      visible.value = true;
    };
    const showDrawer2 = () => {
      visible2.value = true;
    };

    const onLogout = () => {
      useUser().onLogin(false);
      useUser().onUserEmail("");
      useUser().onUseID("");
      useUser().onScreptionID("");
      router.push({ name: "Login" });
    };

    const loadMenuUser = () => {
      axios({
        method: "get",
        url: "https://daotao.alphanam.com:7150/api/MenuInfo/GetUserMenu",
      })
        .then((response) => {
          menuUser.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadMenuUser();

    const mouseover = () => {
      active.value = true;
    };

    const mouseleave = () => {
      active.value = false;
    };

    const loadTest = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/Kiemtra/dskiemtra",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
        },
      })
        .then((response) => {
          thongbao.value = response.data.length;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadTest();

    let message = ref('Thông báo');
    let description = ref('');

    const openNotification = placement => {
     
      notification.open({
        key,
        message: () => message.value,
        description: () => description.value,   
        placement,
        duration: 0,
       
      });
      
    };

    const loadNoti = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/Kiemtra/dskiemtra",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
        },
      })
        .then((response) => {
          noti.value = response.data;
          
          if(noti.value[0].strucID == 1 && noti.value[0].statustCode == "Thongbao"){
            watched.value = true;
          }
         
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadNoti();

    const onWatched = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/Noti/NotificationReaded",
        headers: {},
        data: {         
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,         
        },
      })
      .then((response) => {
          console.log(response);
         
        })
        .catch((error) => {
          console.log(error);
        });
      showNoti.value = !showNoti.value;
      watched.value=true;
    }

    return {
      visible,
      visible2,
      afterVisibleChange,
      showDrawer,
      showDrawer2,
      onLogout,
      userName,
      menuUser,
      active,
      mouseover,
      mouseleave,
      thongbao,
      openNotification,
      noti,
      showNoti,
      watched,
      onWatched
    };
  },
});
</script>

<style scoped>
.boxuser {
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 2;
  background-color: white;
  color: black;
  width: max-content;
  /* clip-path: polygon(0 5%, 8% 5%, 10% 0, 12% 5%, 83% 5%, 100% 5%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%); */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.box1 {
  height: 100%;
}
.box2 {
  padding: 0 35px 0 35px;
}
.thongtin {
  margin: 10px 0;
  padding: 5px 50px 5px 0;
  text-align: left;
}
.gachchan {
  border-bottom: 1px solid #bbbbbb;
}
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.thongbao {
  position: absolute;
  top: 5px;
  left: 20px;
}
span.circle {
  background: red;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  color: #ffffff;
  display: inline-block;
  font-weight: bold;
  line-height: 18px;
  margin-right: 5px;
  text-align: center;
  width: 18px;
  font-size: 12px;
}

.noti {
  position:fixed; 
  bottom:40px;
  right:20px;  
  width: 400px;
  height: max-content;
  min-height: 120px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
  padding: 10px;
  animation: mymove 0.1s;
  
}

@keyframes mymove {
  from {right: -20px;}
  to {right: 20px;}
}
</style>
