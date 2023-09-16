<template>
  <div v-if="title == 'trang_chu'">
    {{ this.$router.push("/") }}
  </div>

  <div>
    <img src="https://daotao.alphanam.com/images_share/QuyI_2022_2.jpg"/>
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

  <div v-if="title == 'chuong_trinh'">
    <ChuongTrinh :urldetail="urldetail" />
  </div>

  <div v-if="title == 'tin_tuc'">
    <TinTuc :urldetail="urldetail" />
  </div>

  <div v-if="title == 'thu_vien'">
    <ThuVien :urldetail="urldetail" />
  </div>
</template>

<script>
import Thongdiep from "../components/ThongDiep.vue";
import Cotloi from "../components/CotLoi.vue";
import Vanhoa from "../components/VanHoa.vue";
import Giangvien from "../components/GiangVien.vue";
import NoiQuy from "../components/NoiQuy.vue";
import LopHoc from "../components/LopHoc.vue";
import ChuongTrinh from "../components/ChuongTrinh.vue";
import TinTuc from "../components/TinTuc.vue";
import ThuVien from "../components/ThuVien.vue";

export default {
  components: {
    Thongdiep,
    Cotloi,
    Vanhoa,
    Giangvien,
    NoiQuy,
    LopHoc,
    ChuongTrinh,
    TinTuc,
    ThuVien
  },
  props: ["id", "urldetail", "title"],
};
</script>

<style scoped></style>
