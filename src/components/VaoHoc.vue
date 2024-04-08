<template>
  <div class="container mt-4 mb-5">
    <div class="row">
      <div class="col ms-4 mb-2 text-center">
        <a :href="linkDownload" download style="text-decoration: none; color: inherit">
          <a-button type="primary" shape="round" size="large">
            <template #icon>
              <DownloadOutlined />
            </template>
            Tải Phiếu bài tập
          </a-button>
        </a>
      </div>
    </div>
    <div class="row mb-5" v-for="(url, index) in urls" :key="index">
      <p class="ps-5">VIDEO {{ index + 1 }}</p>
      <div class="col d-flex justify-content-center">
        <iframe
          v-if="index == 0"
          width="1250"
          height="655"
          :src="`${url}?autoplay=1&mute=1`"
        >
        </iframe>
        <iframe v-else width="1250" height="655" :src="`${url}`"> </iframe>
      </div>
    </div>

    <div class="row">
      <div class="col text-center">
        <router-link :to="{ name: 'BaiKiemTra' }">
          <a-button
            type="primary"
            shape="round"
            size="large"
            style="padding: 6px 40px 0 40px"
          >
            <h4 style="color: #ffe760">LÀM BÀI KIỂM TRA</h4>
          </a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject, onMounted } from "vue";
import { DownloadOutlined } from '@ant-design/icons-vue';
import { useUser } from "../store/use-user";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    DownloadOutlined,
  },
  props: ["id"],

  setup(props) {
    onMounted(() => {
      getUrls();
    });
    const router = useRouter();
    const numberTest = ref(0);
    const store = useUser();
    const { useID, userEmail, screptionID } = store;

    const urls = ref([]);
    const linkDownload = ref('');
    const arrayUrls = ref([]);
    const xuLyUrl = () => {
      if (props.urls) {
        arrayUrls.value = props.urls.split(";");
        
      }
    };

    const getUrls = () => {
      axios({
        method: "post",
        // url: "https://daotao.alphanam.com:7150/api/ClassInfo/GetallHome",
        url: "https://daotao.alphanam.com:7150/api/ClassInfo/GetallHome",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
        },
      })
        .then((response) => {
          
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].id == props.id) {
              linkDownload.value = response.data[i].tailieuDaotao;
              if (response.data[i].ulrVideo.includes(";")) {
                urls.value = response.data[i].ulrVideo.split(";");
              } else {
                urls.value.push(response.data[i].ulrVideo);
              }

              
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const headerSurvey = (classID, exambleID) => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/KhaoSat/HeaderSurvey",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: classID,
          exambleID: 0,
        },
      })
        .then((response) => {
          if (response.data.resposeId > 0) {
            router.push({
              name: "KhaoSat",
              params: { classID: classID, exambleID: exambleID },
            });
          } else {
            axios({
              method: "post",
              url: "https://daotao.alphanam.com:7150/api/Kiemtra/GetHeadKiemtra",
              headers: {},
              data: {
                userEmail: userEmail,
                useID: useID,
                screptionID: screptionID,
                classID: classID,
                exambleID: exambleID,
              },
            })
              .then((response) => {
                console.log(userEmail);
                console.log(useID);
                console.log(screptionID);
                console.log(classID);
                console.log(exambleID);
                console.log(response.data);
                if (response.data.resposeId > 0) {
                  router.push({
                    name: "Test",
                    params: {
                      classID: classID,
                      exambleID: 0,
                      informationName: response.data.informationName,
                    },
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      urls,
      headerSurvey,
      numberTest,
      linkDownload
    };
  },
});
</script>

<style scoped>
.gachchan {
  position: absolute;
  top: 50px;
  left: 44%;
}

@media only screen and (max-width: 576px) {
  .gachchan {
    top: 35px;
    left: 30%;
  }
  .khoahoc {
    font-size: 24px;
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    top: 50px;
    left: 38%;
  }
}
</style>
