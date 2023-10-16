<template>
    <div class="container">
      <div class="row pt-5">
        <div class="col-12 text-center" style="position: relative">
          <h1 class="thongdiep" style="color: #a10707; font-weight: bold;">THÔNG ĐIỆP BAN LÃNH ĐẠO</h1>
          <div class="gachchan">
            <img
              src="../assets/logo/Icon-Web-dao-tao-02.png"
              alt="thong diep"
              width="150"
            />
          </div>
        </div>
      </div>
      <div class="row anhnen" :style="{ backgroundImage: 'url(' + anhnen + ')' }">
        <div class="col">
          <p v-html="content" style="padding: 300px 200px;"></p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: ["urldetail"],
    data() {
    return {
      content: "",
      anhnen: "https://daotao.alphanam.com/images/thong_diep_BLĐ.png"
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
            id: this.urldetail
          },
        })
        .then((response) => {         
          this.content = response.data.newPageContent;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
}
</script>

<style scoped>
.gachchan {
  position: absolute;
  top: 50px;
  left: 44%;
}

.anhnen {
  height: 1900px;
  background-repeat: no-repeat;
}

@media only screen and (max-width: 576px) {
  .gachchan {
    top: 20px;
    left: 23%;
  }
  .thongdiep {
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