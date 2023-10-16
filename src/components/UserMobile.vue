<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :inline-collapsed="collapsed"
  >
    <a-menu-item>
      <img
        class="avatar me-2"
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt=""
      />
      <span style="color: #a10707; font-weight: bold">
        {{ userName.toUpperCase() }}
      </span>
    </a-menu-item>
    <a-menu-item v-for="menu in menus" :key="menu.id">
      <router-link
        style="text-decoration: none; color: inherit"
        :to="{
          name: 'Page',
          params: {
            title: menu.urlFriendLink,
            id: menu.id,
            urldetail: menu.urlDetail,
          },
        }"
      >
        <span> <i class="fa-solid fa-caret-right me-2"></i>{{ menu.menuName }}</span>
      </router-link>
    </a-menu-item>
    <a-menu-item>
      <div
        @click="onLogout()"
        style="cursor: pointer"
        class="d-flex justify-content-left pb-2"
      >
        <span>
          <i class="fa-solid fa-caret-right me-2"></i>
          Đăng xuất
        </span>
      </div>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "../store/use-user.js";
export default {
  setup() {
    const router = useRouter();
    const { userName, useID, userEmail, screptionID } = useUser();
    const menus = ref([]);
    const loadMenu = () => {
      axios
        .get("https://daotao.alphanam.com:7150/api/MenuInfo/GetUserMenu")
        .then((response) => {
          menus.value = response.data;
          console.log(menus.value);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadMenu();

    const onLogout = () => {
      useUser().onLogin(false);
      useUser().onUserEmail("");
      useUser().onUseID("");
      useUser().onScreptionID("");
      router.push({ name: "Login" });
    };

    return {
      menus,
      userName,
      onLogout
    };
  },
};
</script>

<style scoped>
.avatar {
  vertical-align: middle;
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
</style>
