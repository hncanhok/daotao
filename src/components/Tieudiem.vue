<template>
  <div class="container-fluid pb-5" style="background-color: #ededed">
    <div class="container pb-5">
      <div class="row p-5">
        <div class="col-12 text-center" style="position: relative">
          <h1 style="color: #b80000; font-weight: bold">TIÊU ĐIỂM</h1>
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
            <div class="tieudiem">
              <div class="khunganh">
                <div
                  class="anhtieudiem"
                  :style="{
                    backgroundImage: 'url(' + tieudiem.imgHienthi + ')',
                  }"
                ></div>
              </div>
              <h3 class="pt-4" style="font-weight: bold">
                {{ tieudiem.title.toUpperCase() }}
              </h3>
              <p class="pt-2 pb-2" style="text-align: justify">
                {{ tieudiem.newPageDescription }}...
              </p>
              <div class="text-center mb-4 mb-sm-0">
                <a-button
                  shape="round"
                  style="color: #b80000; border: 1px solid #b80000"
                >
                  <span style="font-weight: bold">Xem thêm</span>
                  <i class="fa-solid fa-angles-right fa-2xs ms-1"></i>
                </a-button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row p-5">
        <div class="col text-center">
          <router-link
            :to="{
              name: 'TieuDiem',
              params: {
                id: -2,
              },
            }"
          >
            <a-button
              type="primary"
              shape="round"
              size="large"
              style="padding: 6px 60px 0 60px"
            >
              <h4 style="color: #ffe760">XEM TẤT CẢ</h4>
            </a-button>
          </router-link>
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
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios({
        method: "get",
        url: "http://10.16.100.33:7150/api/NewPaper/GetNewsbyCate?title=tieudiem&pages=0",
      })
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.khunganh {
  overflow: hidden;
  width: 100%;
}
.anhtieudiem {
  width: 100%;
  height: 230px;
  background-repeat: no-repeat;
  background-size: cover;
  transition: 1s;
}
.anhtieudiem:hover {
  transform: scale(1.05);
}
.gachchan {
  position: absolute;
  top: 50px;
  left: 44%;
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
