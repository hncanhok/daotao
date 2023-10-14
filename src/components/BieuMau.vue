<template>
    <div class="container-fluid pb-5" style="background-color: #ffffff">
      <div class="container pb-5">
        <div class="row p-5">
          <div class="col-12 text-center" style="position: relative">
            <h1 style="color: #b80000; font-weight: bold">
              <span v-if="this.$route.params.id == 6">TIN TỨC</span>
              <span v-if="this.$route.params.id == -1">KHÓA HỌC GỢI Ý</span>
              <span v-if="this.$route.params.id == -2">TIÊU ĐIỂM</span>
              <span v-if="this.$route.params.id == 22">TÀI LIỆU</span>
              <span v-if="this.$route.params.id == 23">BIỂU MẪU</span>
              <span v-if="this.$route.params.id == 24">HƯỚNG DẪN ĐÀO TẠO</span>
              <span v-if="this.$route.params.id == 25">HƯỚNG DẪN SỬ DỤNG E-LEARNING</span>
            </h1>
            <div class="gachchan">
              <img
                src="../assets/logo/Icon-Web-dao-tao-02.png"
                alt="khoa hoc goi y"
                width="150"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div
            v-for="tieudiem in data"
            :key="tieudiem.id"
            class="col-12 col-lg-4 col-sm-6"
          >
            <div class="tieudiem">
              <router-link
                :to="{
                  name: 'DetailPage',
                  params: {
                    // title: tieudiem.urlFriendLink,
                    urldetail: tieudiem.id,
                    id: this.$route.params.id
                  },
                }"
              >
                <div
                  class="anhtieudiem"
                  :style="{ backgroundImage: 'url(' + tieudiem.imgHienthi + ')' }"
                ></div>
              </router-link>
              <router-link
                style="text-decoration: none; color: inherit"
                :to="{
                  name: 'DetailPage',
                  params: {
                    // title: tieudiem.urlFriendLink,
                    urldetail: tieudiem.id,
                  },
                }"
              >
                <h3 class="pt-4" style="font-weight: bold">
                  {{ tieudiem.title.toUpperCase() }}
                </h3>
              </router-link>
              <p class="pt-2 pb-2" style="text-align: justify">
                {{ tieudiem.newPageDescription }}...
              </p>
              <div class="text-center mb-5">
                <a-button
                  shape="round"
                  style="color: #b80000; border: 1px solid #b80000"
                >
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{
                      name: 'DetailPage',
                      params: {
                        // title: tieudiem.urlFriendLink,
                        urldetail: tieudiem.id,
                      },
                    }"
                  >
                    <span style="font-weight: bold">Xem thêm</span>
                  </router-link>
                  <i class="fa-solid fa-angles-right fa-2xs ms-1"></i>
                </a-button>
              </div>
            </div>
          </div>
        </div>
        <div class="row p-5">
          <div class="col text-center">
            <a-pagination
              v-model:current="current"
              v-model:pageSize="pageSize"
              v-model:pageSizeOptions="pageSizeOptions"
              show-size-changer
              :total="total"
              @showSizeChange="onShowSizeChange"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        data: [],
        current: 1,
        pageSize: 6,
        pageSizeOptions: ["6", "12", "18", "24"],
        total: 0,
        title: "",
      };
    },
    watch: {
      current() {
        window.scrollTo(0, 800);
        this.loadData();
      },
      pageSize() {
        this.loadData();
      },
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        console.log("TINTUC "+ this.$route.params.id);
        if (this.$route.params.id == 6) this.title = "tintuc";
        if (this.$route.params.id == -1) this.title = "khoahocgoiy";
        if (this.$route.params.id == -2) this.title = "tieudiem";
        if (this.$route.params.id == 22) this.title = "tailieudaotao";
        if (this.$route.params.id == 23) this.title = "danhmucbieumau";
        if (this.$route.params.id == 24) this.title = "huongdan";
        if (this.$route.params.id == 25) this.title = "huongdansudungelearning";
       
        axios
          .get("https://daotao.alphanam.com:7150/api/NewPaper/GetNewsCustomerSize", {
            params: {
              title: this.title,
              pages: this.current,
              pagesize: this.pageSize,
            },
          })
          .then((response) => {
            this.data = response.data;
            this.total = this.data[0].totalPage;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .anhtieudiem {
    width: 100%;
    height: 230px;
    background-repeat: no-repeat;
    background-size: cover;
    transition: 1s;
  }
  .gachchan {
    position: absolute;
    top: 50px;
    left: 44%;
  }
  
  .anhtieudiem:hover {
    transform: scale(1.05);
  }
  .tieudiem {
    overflow: hidden;
  }
  
  @media screen and (max-width: 576px) {
    /* .phanhoi {
        margin-left: 2rem;
      } */
    .gachchan {
      top: 50px;
      left: 23%;
    }
  }
  @media screen and (min-width: 576px) and (max-width: 835px) {
    /* .phanhoi {
        margin-left: 2rem;
      } */
    .gachchan {
      top: 50px;
      left: 38%;
    }
  }
  
  @media screen and (min-width: 1080px) {
    .tieudiem {
      margin: 0 0 0 20px;
    }
  }
  </style>
  