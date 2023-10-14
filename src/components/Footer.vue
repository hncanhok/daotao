<template>
  <div class="container-fluid pb-5" style="background-color: #9b1a1e">
    <div class="container">
      <div class="row">
        <div class="col-12 mt-5 mb-5">
          <img src="../assets/logo/Logo-E-Learning-04.png" alt="" width="200" />
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row justify-content-between">
        <div>
          <h3 class="pb-2" style="color: #ffea76">
            PHÒNG CHẤT LƯỢNG ĐÀO TẠO - ALPHANAM GROUP
          </h3>
          <p class="text-white">
            <i class="fa-solid fa-location-dot me-2"></i>
            <span>108 Nguyễn Trãi, Thanh Xuân, Hà Nội</span>
          </p>
          <p class="text-white">
            <i class="fa-solid fa-phone me-2"></i>
            <span>(+84) 24 3558 7979 (Ext 1020)</span>
          </p>
          <p class="text-white">
            <i class="fa-solid fa-envelope me-2"></i>
            <span>phongchatluongdaotao@alphanam.com</span>
          </p>
        </div>
        <div>
          <h3 class="pb-2" style="color: #ffea76">WEBSITE LIÊN KẾT</h3>
          <p><a href="https://alphanam.com.vn/">Alphanam.com.vn</a></p>
          <p><a href="https://alphanamfamily.com/">Alphanamfamily.com</a></p>
          <p>
            <a href="https://eoffice.alphanam.com/">Eoffice.alphanam.com</a>
          </p>
        </div>
        <div>
          <h3 class="pb-2" style="color: #ffea76">TRANG CHỦ</h3>
          <p><a href="https://alphanam.com.vn/">Giới thiệu</a></p>
          <p><a href="https://alphanamfamily.com/">Khóa học đang diễn ra</a></p>
          <p>
            <a href="https://eoffice.alphanam.com/">Chương trình đào tạo</a>
          </p>
        </div>
        <div>
          <h3 class="pb-2" style="color: #9b1a1e">TRANG CHỦ</h3>
          <p><a href="https://alphanam.com.vn/">Kỳ thi - Kiểm tra</a></p>
          <p><a href="https://alphanamfamily.com/">Tin tức</a></p>
          <p><a href="https://eoffice.alphanam.com/">Thư viện</a></p>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid pt-3" style="background-color: #651114">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center p-4">
          <h3 class="text-white" style="opacity: 0.6">
            <i class="fa-regular fa-copyright fa-xs me-2"></i>
            <span class="copyright">2023 COPYRIGHT BY ALPHANAM GROUP</span>
          </h3>
        </div>
      </div>
    </div>
  </div>

  <div class="up" v-if="display == true" @click="scrollToTop()">
    <i class="fas fa-arrow-up text-black fa-lg"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: false,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      if (window.scrollY > 350) {
        this.display = true;
      } else {
        this.display = false;
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none;
  color: white;
}
.copyright {
  letter-spacing: 10px;
}

.up {
  position: fixed;
  bottom: 150px;
  right: 30px;
  background-color: white;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  opacity: 0.8;
  text-align: center;
}
.up:hover {
  opacity: 1;
}
</style>
