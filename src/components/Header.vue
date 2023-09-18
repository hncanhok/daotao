<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row p-4">
        <div class="col-2 d-block d-lg-none d-flex align-items-center p-0">
          <i
            @click="showDrawer()"
            class="fa-solid fa-bars fa-xl"
            style="color: #a10707"
          ></i>
        </div>
        <div
          class="col-8 d-flex justify-content-center justify-content-lg-start text-sm-start"
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
            class="rounded-pill"
            style="width: 250px"
            placeholder="Tìm kiếm..."
            enter-button
          />
          <div style="display: inline-block" class="mt-2 ms-3">
            <i class="fa-solid fa-bell fa-xl me-2"></i>
            <div
              @mouseover="mouseover"
              @mouseleave="mouseleave"
              class="d-inline-block"
              style="position: relative"
            >
              <i
                class="fa-solid fa-circle-user fa-xl"
                style="color: #a10707"
              ></i>
              <span @click="onLogout()" class="ms-2" style="cursor: pointer"
                >THOÁT</span
              >
              <div class="boxuser" v-show="active">
                <div
                  class="box1 gachchan d-flex justify-content-center align-items-center pt-2 pb-2"
                >
                  <img
                    class="avatar ms-2"
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt=""
                  />
                  <p
                    class="pt-4 ps-3 pe-3"
                    style="color: #a10707; font-weight: bold"
                  >
                    {{ userName.toUpperCase() }}
                  </p>
                </div>
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
                        :class="{ gachchan: index < menuUser.length - 1 }"
                      >
                        <i class="fa-solid fa-caret-right me-2"></i
                        >{{ user.menuName }}
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col d-block d-lg-none text-end d-flex align-items-center justify-content-end"
        >
          <i class="fa-solid fa-circle-user fa-xl" style="color: #a10707"></i>
        </div>
      </div>
    </div>
  </div>

  <a-drawer v-model:visible="visible" title="DANH MỤC" placement="left">
    <MenuMobile />
  </a-drawer>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import MenuMobile from "./MenuMobile.vue";
import { useUser } from "../store/use-user.js";

export default defineComponent({
  components: {
    MenuMobile,
  },
  setup() {
    const active = ref(false);
    const menuUser = ref([]);
    const { userName } = useUser();
    const router = useRouter();
    const visible = ref(false);
    const afterVisibleChange = (bool) => {
      console.log("visible", bool);
    };
    const showDrawer = () => {
      visible.value = true;
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
        url: "http://10.16.100.33:7150/api/MenuInfo/GetUserMenu",
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

    return {
      visible,
      afterVisibleChange,
      showDrawer,
      onLogout,
      userName,
      menuUser,
      active,
      mouseover,
      mouseleave,
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
</style>
