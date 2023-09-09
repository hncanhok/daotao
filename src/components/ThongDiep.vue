<template>
    <div class="container">
      <div class="row p-5">
        <div class="col-12 text-center" style="position: relative">
          <h1 style="color: #a10707">THÔNG ĐIỆP TỪ BAN LÃNH ĐẠO</h1>
          <div class="gachchan">
            <img
              src="../assets/logo/Icon-Web-dao-tao-02.png"
              alt="thong diep"
              width="150"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p v-html="content" class="p-5" style="border: 1px solid #303030;border-radius: 25px;"></p>
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