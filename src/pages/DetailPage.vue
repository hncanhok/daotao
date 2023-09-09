<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p v-html="content"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
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
            id: this.$route.params.urldetail,
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
};
</script>
