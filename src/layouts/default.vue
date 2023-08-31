<template>
  <Header />
  <Menu />

  <slot />
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Menu,
    Footer
  },
  setup() {},
};
</script>
