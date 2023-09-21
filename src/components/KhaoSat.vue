<template>
  <div class="container pt-5 pb-5">
    <div class="row">
      <div class="col-12 text-center" style="position: relative">
        <h1 style="color: #a10707; font-weight: bold">KHẢO SÁT LỚP HỌC</h1>
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
      v-for="(khaosat, index) in data"
      :key="khaosat.id"
      class="row mt-2"
      style="background-color: #e0bcbc"
    >
      <div class="col p-4">
        <div>
          <p>
            <span style="font-weight: bold">Câu số {{ index + 1 }}: </span
            ><span>{{ khaosat.questionName }}</span>
          </p>
        </div>
        <div class="bg-white p-3" v-if="khaosat.surveyType == '1'">
          <a-radio-group
            v-model:value="khaosat.user_Selected"
            @change="
              onchange(
                khaosat.surveyStrureID,
                khaosat.id,
                khaosat.surveyType,
                khaosat.surveyQuestionID,
                khaosat.user_Selected
              )
            "
          >
            <a-radio
              :style="radioStyle"
              :value="parseInt(khaosat.dapan_So1.split('.')[0])"
              >{{ khaosat.dapan_So1 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="parseInt(khaosat.dapan_So2.split('.')[0])"
              >{{ khaosat.dapan_So2 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="parseInt(khaosat.dapan_So3.split('.')[0])"
              >{{ khaosat.dapan_So3 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="parseInt(khaosat.dapan_So4.split('.')[0])"
              >{{ khaosat.dapan_So4 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="parseInt(khaosat.dapan_So5.split('.')[0])"
              >{{ khaosat.dapan_So5 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="parseInt(khaosat.dapan_So6.split('.')[0])"
              >{{ khaosat.dapan_So6 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="parseInt(khaosat.dapan_So7.split('.')[0])"
              >{{ khaosat.dapan_So7 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="parseInt(khaosat.dapan_So8.split('.')[0])"
              >{{ khaosat.dapan_So8 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="parseInt(khaosat.dapan_So9.split('.')[0])"
              >{{ khaosat.dapan_So9 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="parseInt(khaosat.dapan_So10.split('.')[0])"
              >{{ khaosat.dapan_So10 }}</a-radio
            >
          </a-radio-group>
        </div>
        <div class="bg-white p-3" v-if="khaosat.surveyType == '2'">
          <a-textarea
            v-model:value="khaosat.gopy"
            :rows="4"
            @change="
              onChangeText(
                khaosat.surveyStrureID,
                khaosat.id,
                khaosat.surveyType,
                khaosat.surveyQuestionID,
                khaosat.gopy
              )
            "
          />
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col text-center">
        <a-button
          @click="onEndSurvey()"
          size="large"
          class="ms-2"
          shape="round"
          style="color: #faf577; font-weight: bold; background: #a10707"
        >
          <span>KẾT THÚC & CHUYỂN SANG LÀM BÀI KIỂM TRA</span>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, inject } from "vue";
import { useUser } from "../store/use-user";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export default {
  props: ["classID, exambleID"],
  created() {},
  setup() {
    const swal = inject("$swal");

    const route = useRoute();
    const router = useRouter();
    const store = useUser();
    const { useID, userEmail, screptionID } = store;
    const data = ref([]);
    const value = ref("1");
    const question = ref([]);
    const radioStyle = reactive({
      display: "flex",
      height: "30px",
      lineHeight: "30px",
    });

    let timer = ref(0);
    const headerSurvey = () => {
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/KhaoSat/HeaderSurvey",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: route.params.classID,
          exambleID: 0,
        },
      })
        .then((response) => {
          let endSurvey = new Date(response.data.endSurvey);
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
            title: "Bạn đã hết thời gian khảo sát.",
            icon: "info",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          })
          .then(() => {
            onEndSurvey();
          });
      }
    }, 1000);

    const loadData = () => {
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/KhaoSat/ChiTietKhaoSat",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: route.params.classID,
          exambleID: route.params.classID,
        },
      })
        .then((response) => {
          data.value = response.data;
          for (let i = 0; i < data.value.length; i++) {
            question.value[i] = data.value[i].surveyQuestionID;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadData();

    const onChangeText = (exambleID, id, questionType, questionID, luachon) => {
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/KhaoSat/ThuchienKS",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: route.params.classID,
          exambleID: exambleID,
          id: id,
          questionID: questionID,
          questionType: questionType,
          luachon: 0,
          gopy: luachon,
          muticheck: "string",
        },
      })
        .then((response) => {
          /*  console.log("userEmail: " + userEmail);
            console.log("useID: " + useID);
            console.log("screptionID: " + screptionID);
            console.log("classID: " + route.params.classID);
            console.log("exambleID: " + exambleID);
            console.log("id: " + id);
            console.log("questionID: " + questionID);
            console.log("questionType: " + questionType);
            console.log("luachon: " + luachon);
            console.log("gopy: "+ luachon);
            console.log("muticheck: " + "string");
          console.log(response.data.reposeMessage); */
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const onchange = (exambleID, id, questionType, questionID, luachon) => {
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/KhaoSat/ThuchienKS",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: route.params.classID,
          exambleID: exambleID,
          id: id,
          questionID: questionID,
          questionType: questionType,
          luachon: luachon,
          gopy: "",
          muticheck: "string",
        },
      })
        .then((response) => {
          /* console.log("userEmail: " + userEmail);
          console.log("useID: " + useID);
          console.log("screptionID: " + screptionID);
          console.log("classID: " + route.params.classID);
          console.log("exambleID: " + exambleID);
          console.log("id: " + id);
          console.log("questionID: " + questionID);
          console.log("questionType: " + questionType);
          console.log("luachon: " + luachon);
          console.log("gopy: "+ luachon);
          console.log("muticheck: " + "string");
          console.log(response.data.reposeMessage); */
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(questionID + " va " + luachon);
    };

    const onEndSurvey = () => {
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/Kiemtra/GetHeadKiemtra",
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
          if (response.data.resposeId > 0) {
            router.push({
              name: "Test",
              params: {
                classID: route.params.classID,
                exambleID: route.params.exambleID,
                informationName: response.data.informationName,
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      value,
      radioStyle,
      data,
      question,
      onchange,
      onChangeText,
      second,
      day,
      hour,
      minute,
      second,
      onEndSurvey,
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
    top: 50px;
    left: 23%;
  }
}

@media only screen and (min-width: 576px) and (max-width: 835px) {
  .gachchan {
    top: 50px;
    left: 38%;
  }
}
</style>
