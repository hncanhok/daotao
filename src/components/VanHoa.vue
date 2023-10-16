<template>
  <div class="container">
    <div class="row p-5">
      <div class="col-12 text-center" style="position: relative">
        <h1 class="vanhoa" style="color: #a10707; font-weight: bold;">VĂN HÓA HỌC TẬP ALPHANAM</h1>
        <div class="gachchan">
          <img
            src="../assets/logo/Icon-Web-dao-tao-02.png"
            alt="van-hoa-hoc-tap"
            width="150"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg"></div>
      <div class="col-12 col-lg-6 text-center">
        <p v-html="description"></p>
        <router-link :to="{name: 'DetailPage', params: {urldetail: urldetail, title: title}}">
          <a-button
            shape="round"
            style="color: #b80000; border: 1px solid #b80000"
          >
            <span style="font-weight: bold">Xem chi tiết</span>
            <i class="fa-solid fa-angles-right fa-2xs ms-1"></i>
          </a-button>
        </router-link>
        <div class="pt-4">
          <img :src="urlImage" alt="" />
        </div>
      </div>
      <div class="col-lg"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["urldetail", "title"],
  data() {
    return {
      content: "",
      description: "",
      urlImage: "",
    };
  },
  mounted() {
    this.loadContent();
  },
  methods: {
    loadContent() {
      axios
        .get("https://daotao.alphanam.com:7150/api/NewPaper/GetNewsbyID", {
          params: {
            id: this.urldetail,
          },
        })
        .then((response) => {
          this.content = response.data.newPageContent;
          this.description = response.data.newPageDescription;
          this.urlImage = response.data.imgHienthi;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.gachchan {
  position: absolute;
  top: 50px;
  left: 44%;
}

@media only screen and (max-width: 576px) {
  .gachchan {
    top: 20px;
    left: 23%;
  }
  .vanhoa {
    font-size: 16px;
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    top: 50px;
    left: 38%;
  }
}
</style>