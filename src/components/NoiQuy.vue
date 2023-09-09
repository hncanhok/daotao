<template>
    <div class="container">
      <div class="row pt-5 pb-2">
        <div class="col-12 text-center" style="position: relative">
          <h1 style="color: #a10707">NỘI QUY LỚP HỌC</h1>
          <div class="gachchan">
            <img
              src="../assets/logo/Icon-Web-dao-tao-02.png"
              alt="noi quy lop hoc"
              width="150"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg"></div>
        <div class="col-12 col-lg-6 text-center">
            <div class="mb-4">
                <img src="../assets/icon/icon-web-dao-tao-05.png" alt="" width="250">
            </div>
          <router-link :to="{name: 'DetailPage', params: {urldetail: urldetail, title: title}}">
            <a-button
              shape="round"
              style="color: #b80000; border: 1px solid #b80000"
            >
              <span style="font-weight: bold">Xem chi tiết</span>
              <i class="fa-solid fa-angles-right fa-2xs ms-1"></i>
            </a-button>
          </router-link>
        
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
          .get("http://10.16.100.33:7150/api/NewPaper/GetNewsbyID", {
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
    top: 40px;
    left: 44%;
  }
  
  @media only screen and (max-width: 576px) {
    .gachchan {
      left: 23%;
    }
  }
  
  @media only screen and (min-width: 576px) and (max-width: 820px) {
    .gachchan {
      left: 38%;
    }
  }
  </style>