<template>
  <div class="container pt-4 pb-5">
    <div class="row">
      <div class="col-12 col-lg-8">
        <h3 style="color: #a10707; font-weight: bold" class="pb-4">
          TRANG CHỦ > TIN TỨC
        </h3>
        <h3 style="font-weight: bold">{{ data.title }}</h3>
        <p v-html="data.newPageContent"></p>

        <a-button
            v-if="data.taiLieuURL != ''"
            class="mt-2"
            type="primary"
            shape="round"
            :size="size"
            @click="downloadItem(data.taiLieuURL)"
          >
            <i class="fa-solid fa-download pe-2"></i>Download
          </a-button>
       
      </div>
      <div class="col-12 col-lg-4 ps-lg-5" style="text-align: justify">
        <div style="border-bottom: 2px solid #a10707" class="text-center mb-5">
          <h1 style="font-weight: bold; color: #a10707" class="p-0 m-0">
            CÁC TIN TỨC KHÁC
          </h1>
        </div>
        <div v-for="tieudiem in otherNews" :key="tieudiem.id">
          <div class="tieudiem">
            <router-link
              :to="{
                name: 'DetailPage',
                params: {
                  // title: tieudiem.urlFriendLink,
                  urldetail: tieudiem.id,
                },
              }"
            >
              <div
                class="anhtieudiem"
                :style="{
                  backgroundImage: 'url(' + tieudiem.imgHienthi + ')',
                }"
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
                {{ tieudiem.title }}
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
    </div>
  </div>
</template>

<script>
export default {
  props: ["urldetail"],
  data() {
    return {
      data: {},
      otherNews: [],
    };
  },
  mounted() {
    this.loadData();
    this.loadOtherNews();
  },
  watch: {
    urldetail() {
      window.scrollTo(0, 0);
      this.loadData();
      this.loadOtherNews();
    },
  },
  methods: {
    loadData() {
     
      axios
        .get("https://daotao.alphanam.com:7150/api/NewPaper/GetNewsbyID", {
          params: {
            id: this.urldetail,
          },
        })
        .then((response) => {
          this.data = response.data;
          console.log("download " + response.data.taiLieuURL);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    loadOtherNews() {
      axios
        .get("https://daotao.alphanam.com:7150/api/NewPaper/GetOtherNewsByID", {
          params: {
            id: this.urldetail,
          },
        })
        .then((response) => {
          this.otherNews = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    downloadItem(url) {
      axios({
        url: url,
        method: "GET",
        responseType: "blob"
      })
      .then((response) => {
          var fileUrl = window.URL.createObjectURL(new Blob([response.data]))
          var fileLink = document.createElement('a')
          fileLink.href = fileUrl
          fileLink.setAttribute('download', 'image.jpg')
          document.body.appendChild(fileLink)
          fileLink.click()
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

.anhtieudiem:hover {
  transform: scale(1.05);
}
.tieudiem {
  overflow: hidden;
}
</style>
