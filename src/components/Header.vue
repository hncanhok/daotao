<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row p-2 pb-lg-4 pt-lg-4 ps-lg-0">
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
          <router-link :to="{ name: 'Home'}">
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
            <i class="fa-solid fa-circle-user fa-xl" style="color: #a10707"></i>
            <span @click="onLogout()" class="ms-2">THOÁT</span>
          </div>
        </div>
        <div
          class="col d-block d-lg-none text-end d-flex align-items-center justify-content-end p-0"
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
    return {
      visible,
      afterVisibleChange,
      showDrawer,
      onLogout,
    };
  },
});
</script>

<style scoped></style>
