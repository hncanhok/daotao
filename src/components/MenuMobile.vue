<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="inline"
    :open-keys="openKeys"
    @openChange="onOpenChange"
  >
    <a-sub-menu v-for="menu in menus" :key="menu.id">
      <template #title v-if="menu.menuParent == 0">
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
          <div @click="loadBoxMenu(menu.id)">{{ menu.menuName }}</div>
        </router-link>
      </template>

      <a-menu-item v-for="m2 in menucap2" :key="m2.id">
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{
            name: 'Page',
            params: {
              title: m2.urlFriendLink,
              id: m2.id,
              urldetail: m2.urlDetail,
            },
          }"
        >
          <div>{{ m2.menuName }}</div>
        </router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      selectedKeys: [],
    });
    const onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      );
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    let menus = ref([]);
    let menucap2 = ref([]);
    const loadMenu = () => {
      axios
        .get("https://daotao.alphanam.com:7150/api/MenuInfo/GetallMenu")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].menuParent == 0) {
              menus.value.push(response.data[i]);
              state.rootSubmenuKeys.push(response.data[i].id);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadMenu();

    const loadBoxMenu = (id) => {
      menucap2.value = [];
      axios
        .get("https://daotao.alphanam.com:7150/api/MenuInfo/GetallMenu")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].menuParent == id) {
              menucap2.value.push(response.data[i]);
            }
          }
          console.log(menucap2.value);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      menus,
      menucap2,
      loadBoxMenu,
      ...toRefs(state),
      onOpenChange,
    };
  },
};
</script>
