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
          <span>0:00:01:30</span>
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
            v-model:value="question[index]"
            @change="onchange(khaosat.surveyQuestionID, question[index])"
          >
            <a-radio
              :style="radioStyle"
              :value="khaosat.dapan_So1.split('.')[0]"
              >{{ khaosat.dapan_So1 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="khaosat.dapan_So2.split('.')[0]"
              >{{ khaosat.dapan_So2 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="khaosat.dapan_So3.split('.')[0]"
              >{{ khaosat.dapan_So3 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="khaosat.dapan_So4.split('.')[0]"
              >{{ khaosat.dapan_So4 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="khaosat.dapan_So5.split('.')[0]"
              >{{ khaosat.dapan_So5 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="khaosat.dapan_So6.split('.')[0]"
              >{{ khaosat.dapan_So6 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="khaosat.dapan_So7.split('.')[0]"
              >{{ khaosat.dapan_So7 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="khaosat.dapan_So8.split('.')[0]"
              >{{ khaosat.dapan_So8 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="khaosat.dapan_So9.split('.')[0]"
              >{{ khaosat.dapan_So9 }}</a-radio
            >
            <a-radio
              :style="radioStyle"
              :value="khaosat.dapan_So10.split('.')[0]"
              >{{ khaosat.dapan_So10 }}</a-radio
            >
          </a-radio-group>
        </div>
        <div class="bg-white p-3" v-if="khaosat.surveyType == '2'">
          <a-textarea :rows="4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useUser } from "../store/use-user";
import { useRoute } from "vue-router";

export default {
  props: ["classID", "exambleID"],
  watch: {
    value() {
      console.log(this.value);
    },
  },
  
  setup() {
    const route = useRoute();
    const store = useUser();
    const { useID, userEmail, screptionID } = store;
    const data = ref([]);
    const value = ref([]);
    const question = ref([]);
    const radioStyle = reactive({
      display: "flex",
      height: "30px",
      lineHeight: "30px",
    });

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
          exambleID: route.params.exambleID,
        },
      })
        .then((response) => {
          data.value = response.data;
          for (let i = 0; i < data.value.length; i++) {
            question.value[i] = data.value[i].surveyQuestionID;
          }

          console.log(question.value);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadData();

    const onchange = (question, answer) => {
        
      axios({
        method: "post",
        url: "http://10.16.100.33:7150/api/KhaoSat/ThuchienKS",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          classID: route.params.classID,
          exambleID: data.surveyStrureID,
          id: data.id,
          questionID: data.surveyQuestionID,
          questionType: data.surveyType,
          luachon: answer,
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
      console.log(question + " va " + answer);
    };
    return {
      value,
      radioStyle,
      data,
      question,
      onchange
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
