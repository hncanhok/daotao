<template>
  <div v-if="title == 'trang_chu'">
    {{ this.$router.push("/") }}
  </div>

  <!-- <div class="banner" :style="{ backgroundImage: 'url(' + url + ')' }"></div> -->

  <div v-if="title == 'thong_diep'">
    <Thongdiep :urldetail="urldetail" />
  </div>

  <div v-if="title == 'gioi_thieu'">
    <Thongdiep :urldetail="6127" />
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
    <DetailPage :urldetail="urldetail" />
  </div>

  <div v-if="title == 'khoa_hoc_goi_y'">
    <LopHoc :urldetail="urldetail" />
  </div>  

  <div v-if="title == 'khoa_hoc'">
    <TatCaLopHoc :urldetail="urldetail" />
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

  <div v-if="title == 'lop_hoc_cua_ban'">
    <LopHocCuaBan :urldetail="urldetail" />
  </div>

  <div v-if="title == 'thong_tin_ca_nhan'">
    <ThongTinCaNhan :urldetail="urldetail" />
  </div>

  <div v-if="title == 'huong_dan_su_dung_elearning'">
    <HuongDanSuDung id="id" />
  </div>
  <div v-if="title == 'tai_lieu'">
    <TaiLieu :id="id" />
  </div>
  <div v-if="title == 'bieu_mau'">
    <BieuMau id="id" />
  </div>
  <div v-if="title == 'huong_dan_dao_tao'">
    <HuongDanDaoTao :id="id" />
  </div>
  <div v-if="title == 'danh-sach-bai-kiem-tra-cua-ban'">
    <BaiKiemTra />
  </div>

  <div
    v-if="
      title == 'Dao_tao_Nen_tang' ||
      title == 'Dao_tao_phat_trien' ||
      title == 'Dao_tao_truong_Thanh' ||
      title == 'Dao_tao_chuyen_mon' ||
      title == 'Dao_tao_Hoi_nhap' 
    "
  >
    <DetailPage :urldetail="urldetail" />
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
import DetailPage from "./DetailPage.vue";
import LopHocCuaBan from "../components/LopHocCuaBan.vue";
import ThongTinCaNhan from "../components/ThongTinCaNhan.vue";
import TaiLieu from "../components/TaiLieu.vue";
import BieuMau from "../components/BieuMau.vue";
import HuongDanSuDung from "../components/HuongDanSuDung.vue";
import HuongDanDaoTao from "../components/HuongDanDaoTao.vue";
import TatCaLopHoc from "../components/TatCaLopHoc.vue";
import BaiKiemTra from "../components/BaiKiemTra.vue";

export default {
  data() {
    return {
      url: "",
    };
  },
  components: {
    Thongdiep,
    Cotloi,
    Vanhoa,
    Giangvien,
    NoiQuy,
    LopHoc,
    ChuongTrinh,
    TinTuc,
    ThuVien,
    DetailPage,
    LopHocCuaBan,
    ThongTinCaNhan,
    TaiLieu,
    BieuMau,
    HuongDanDaoTao,
    HuongDanSuDung,
    TatCaLopHoc,
    BaiKiemTra    
  },
  props: ["id", "urldetail", "title"],
  created() {
    this.loadBanner();
  },
  methods: {
    loadBanner() {
      axios
        .get(
          "https://daotao.alphanam.com:7150/api/MenuInfo/GetallMenuByGroup?groupid=4"
        )
        .then((response) => {
          this.url = response.data[0].urlDetail;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.banner {
  height: 35rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
