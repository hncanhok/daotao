<template>
  <div class="container pt-5 pb-5">
    <div class="row">
      <div class="col-12 text-center" style="position: relative">
        <h1 style="color: #a10707; font-weight: bold">
          {{ this.$route.params.informationName }}
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
    <div class="row pt-4 pb-4">
      <div class="col text-center" style="color: #a10707; font-weight: bold">
        <i class="fa-solid fa-clock fa-lg pe-2"></i>
        <span>THỜI GIAN CÒN LẠI</span>
        <a-button
          size="large"
          class="ms-2"
          shape="round"
          style="color: #faf577; font-weight: bold; background: #a10707"
        >
          <span>{{ day }}:{{ hour }}:{{ minute }}:{{ second }}</span>
        </a-button>
      </div>
    </div>
    <div
      v-for="(test, index) in data"
      :key="test.id"
      class="row mt-2"
      style="background-color: #e0bcbc"
    >
      <div class="col p-4">
        <div>
          <p>
            <span style="font-weight: bold">Câu số {{ index + 1 }}: </span
            ><span>{{ test.questionName }}</span>
          </p>
        </div>
        <div class="bg-white p-3" v-if="test.questionType == '1'">
          <a-radio-group
            v-model:value="test.user_Selected"
            @change="
              onchange(
                test.chitietID,
                test.questionID,
                test.questionType,
                test.user_Selected
              )
            "
          >
            <a-radio
              v-if="test.option_1 != ''"
              :style="radioStyle"
              :value="parseInt(1)"
              >{{ test.option_1 }}</a-radio
            >
            <a-radio
              v-if="test.option_2 != ''"
              :style="radioStyle"
              :value="parseInt(2)"
              >{{ test.option_2 }}</a-radio
            >
            <a-radio
              v-if="test.option_3 != ''"
              :style="radioStyle"
              :value="parseInt(3)"
              >{{ test.option_3 }}</a-radio
            >
            <a-radio
              v-if="test.option_4 != ''"
              :style="radioStyle"
              :value="parseInt(4)"
              >{{ test.option_4 }}</a-radio
            >
            <a-radio
              v-if="test.option_5 != ''"
              :style="radioStyle"
              :value="parseInt(5)"
              >{{ test.option_5 }}</a-radio
            >
          </a-radio-group>
        </div>
        <div class="bg-white p-3" v-if="test.questionType == '2'">
          <a-textarea
            v-model:value="test.optionText"
            :rows="4"
            @change="
              onChangeText(
                test.chitietID,
                test.questionID,
                test.questionType,
                test.optionText
              )
            "
          />
          <input
            type="file"                                   
            @change="handleChangeFileUpload($event, test.chitietID, test.className, index)"           
            :class="test.className"
            class="pt-3"
            ref="attachments"
          />
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col text-center">
        <a-button
          @click="onEndTest()"
          size="large"
          class="ms-2"
          shape="round"
          style="color: #faf577; font-weight: bold; background: #a10707"
        >
          <span>HOÀN THÀNH</span>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, inject } from "vue";
import { useUser } from "../store/use-user";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from 'ant-design-vue';
export default {
  components: {
    UploadOutlined,
  },
  setup() {
    const fileList = ref([]);

    const swal = inject("$swal");
    const route = useRoute();
    const router = useRouter();
    const store = useUser();
    const { useID, userEmail, screptionID } = store;
    const data = ref([]);
    let timer = ref(0);
    const headerSurvey = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/Kiemtra/GetHeadKiemtra",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: route.params.classID,
          exambleID: route.params.exambleID,
        },
      })
        .then((response) => {
          let endSurvey = new Date(response.data.endChecktime);
          let startSurvey = new Date();
          timer.value = (endSurvey.getTime() - startSurvey.getTime()) / 1000;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    headerSurvey();

    let day = ref(0);
    let hour = ref(0);
    let minute = ref(0);
    let second = ref(0);

    const CounterTimer = setInterval(() => {
      day.value = Math.floor(timer.value / (60 * 60 * 24));
      hour.value = Math.floor(timer.value / 3600) - day.value * 24;
      minute.value =
        Math.floor(timer.value / 60) - day.value * 24 * 60 - hour.value * 60;
      second.value =
        Math.floor(timer.value) -
        day.value * 24 * 60 * 60 -
        hour.value * 60 * 60 -
        minute.value * 60;
      hour.value = hour.value < 10 ? "0" + hour.value : hour.value;
      minute.value = minute.value < 10 ? "0" + minute.value : minute.value;
      second.value = second.value < 10 ? "0" + second.value : second.value;
      var remain =
        day.value + ":" + hour.value + ":" + minute.value + ":" + second.value;
      timer.value = timer.value - 1;
      if (
        day.value == 0 &&
        hour.value == 0 &&
        minute.value == 0 &&
        second.value == 0
      ) {
        clearInterval(CounterTimer);
        swal
          .fire({
            title: "Bạn đã hết thời gian làm bài.",
            icon: "info",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          })
          .then(() => {
            router.push({ name: "BaiKiemTra" });
          });
      }
    }, 1000);

    const loadData = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/ChitietKiemtra/Chitietdethi",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: route.params.classID,
          exambleID: route.params.exambleID,
        },
      })
        .then((response) => {
          // data.value = response.data;
          console.log(response.data);

          for(let i=0; i<response.data.length;i++){
            data.value.push(response.data[i]);
            data.value[i].className = "className"+response.data[i].questionID;
            
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadData();

    const onAnswer = (index) => {
      let chuoi = "option_" + index;
      return "test." + chuoi;
    };
    const radioStyle = reactive({
      display: "flex",
      lineHeight: "30px",
    });

    const onchange = (id, questionID, questionType, luachon) => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/ChitietKiemtra/ThuchienKT",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: route.params.classID,
          exambleID: route.params.exambleID,
          id: id,
          questionID: questionID,
          questionType: questionType,
          luachon: luachon,
          gopy: "",
          muticheck: "string",
        },
      })
        .then((response) => {
          
          console.log(response.data.reposeMessage);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const onChangeText = (id, questionID, questionType, gopy) => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/ChitietKiemtra/ThuchienKT",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: route.params.classID,
          exambleID: route.params.exambleID,
          id: id,
          questionID: questionID,
          questionType: questionType,
          luachon: 0,
          gopy: gopy,
          muticheck: "string",
        },
      })
        .then((response) => {
          console.log("userEmail: " + userEmail);
          console.log("useID: " + useID);
          console.log("screptionID: " + screptionID);
          console.log("classID: " + route.params.classID);
          console.log("exambleID: " + route.params.exambleID);
          console.log("id: " + id);
          console.log("questionID: " + questionID);
          console.log("questionType: " + questionType);
          console.log("muticheck: " + "string");
          console.log("gop y: " + gopy);
          console.log(response.data.reposeMessage);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const onEndTest = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/Kiemtra/KetthucKiemtra",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: route.params.classID,
          exambleID: route.params.exambleID,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      swal
        .fire("Chúc mừng!", "Bạn đã hoàn thành bài kiểm tra.", "success")
        .then(() => {
          router.push({ name: "BaiKiemTra" });
        });
    };
    const attachments = ref(null);
    const handleChangeFileUpload = (e, questionID, className, index) => {    
      /* let files = attachments.value[index];
      console.log(e.target.files[0]);
      console.log(attachments.value[2].files[0]); */
      let files = e.target.files[0];

      var formData = new FormData();      
      formData.append("files", files);
      formData.append("UserEmail", userEmail);
      formData.append("UseID", useID);
      formData.append("ScreptionID", screptionID);
      formData.append("ClassID", route.params.classID);
      formData.append("ID_Dapan", questionID);

      
     
      axios
        .post("https://daotao.alphanam.com:7150/api/MngUpload/UploadsimbleFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
         
          if(res.data.resposeId == 1){
            message.success(res.data.reposeMessage);
          }else{
            message.error(res.data.reposeMessage);
          }
        });
    };

    return {
      second,
      day,
      hour,
      minute,
      second,
      data,
      onAnswer,
      radioStyle,
      onchange,
      onChangeText,
      onEndTest,
      fileList,
      handleChangeFileUpload,
      attachments
    };
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
    display: none;
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    top: 50px;
    left: 38%;
  }
}
</style>
