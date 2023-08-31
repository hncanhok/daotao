<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :inline-collapsed="collapsed"
  >
    <a-menu-item v-for="menu in menus" :key="menu.id">
      <span v-if="menu.menuParent == 0">
        {{ menu.menuName.toUpperCase() }}</span
      >
    </a-menu-item>
  </a-menu>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let menus = ref([]);
    const loadMenu = () => {
      axios
        .get("http://10.16.100.33:7150/api/MenuInfo/GetallMenu")
        .then((response) => {
          menus.value = response.data;
          console.log(menus);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadMenu();

    return { menus };
  },
};
</script>
