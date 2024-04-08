<template>
  <Slider />
  <Khoahoc />
  <Vinhdanh />
  <Phanhoi />
  <Tieudiem />
</template>

<script>
import Slider from "../components/Slider.vue";
import Khoahoc from "../components/KhoaHoc.vue";
import Vinhdanh from "../components/VinhDanh.vue";
import Phanhoi from "../components/PhanHoi.vue";
import Tieudiem from "../components/TieuDiem.vue";

export default {
  components: {
    Slider,
    Khoahoc,
    Vinhdanh,
    Phanhoi,
    Tieudiem,
  },
  mounted() {
    
  },
  setup() {},
};
</script>
