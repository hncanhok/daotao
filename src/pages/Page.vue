<template>
  <div v-if="title == 'trang_chu'">
    {{ this.$router.push("/") }}
  </div>

  <div v-if="title == 'thong_diep'">
    <Thongdiep :urldetail="urldetail" />
  </div>

  <div v-if="title == 'cot_loi'">
    <Cotloi :urldetail="urldetail" />
  </div>

  <div v-if="title == 'van_hoa_hoc_tap'">
    <Vanhoa :urldetail="urldetail" />
  </div>
  <div v-if="title == 'giang_vien'">
    <Giangvien :urldetail="urldetail" />
  </div>

  <div v-if="title == 'noi_quy'">
    <NoiQuy :urldetail="urldetail" />
  </div>

  <div v-if="title == 'khoa_hoc_goi_y'">
    <LopHoc :urldetail="urldetail" />
  </div>
</template>

<script>
import Thongdiep from "../components/ThongDiep.vue";
import Cotloi from "../components/CotLoi.vue";
import Vanhoa from '../components/VanHoa.vue';
import Giangvien from "../components/GiangVien.vue";
import NoiQuy from '../components/NoiQuy.vue';
import LopHoc from '../components/LopHoc.vue';

export default {
  components: {
    Thongdiep,
    Cotloi,
    Vanhoa,
    Giangvien,
    NoiQuy,
    LopHoc
  },
  props: ["id", "urldetail", "title"],
};
</script>
