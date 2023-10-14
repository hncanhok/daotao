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
        <span> {{ menu.menuName.toUpperCase() }}</span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { ref } from "vue";
import { useUser } from "../store/use-user.js";
export default {
  setup() {
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

    return {
      menus,
      userName,
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
