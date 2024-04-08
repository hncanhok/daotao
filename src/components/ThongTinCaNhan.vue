<template>
  <div class="container-fluid pt-5 pb-5" style="background-color: #e2e8f0">
    <div class="container">
      <div class="main-body">
        <div class="row">
          <div class="col-md-4 mb-3 bg-white p-md-5">
            <div class="row">
              <div class="col">
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Admin"
                    class="rounded-circle"
                    width="150"
                  />
                  <div class="mt-3">
                    <h4>{{ user.userName }}</h4>
                    <p class="text-secondary mb-1">{{ user.chucvuName }}</p>
                    <p style="font-weight: bold">
                      Tài khoản cấp độ {{ capdo }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p style="font-weight: bold">Lớp Nền tảng:</p>
                <ProgressBar
                  style="cursor: pointer"
                  :value="nentangPhantram"
                  @click="showModalNentang"
                  >{{ nentangDat }} / {{ nentangTong }}
                </ProgressBar>
                <p style="font-weight: bold">Lớp Phát triển:</p>
                <ProgressBar 
                :value="phattrienPhantram" 
                style="cursor: pointer"
                @click="showModalPhattrien"
                  >{{ phattrienDat }} / {{ phattrienTong }}
                </ProgressBar>
                <a-modal
                  v-model:visible="visibleNentang"
                  title=""
                  @ok="handleOkNentang"
                  style="font-weight: bold"
                >
                  LỚP NỀN TẢNG HOÀN THÀNH
                 <ul v-for="(lop, index) in nentangHoanthanh" :key="index">
                  <li v-if="nentangHoanthanh.length > 0">{{ lop }}</li>                                    
                 </ul>
                 LỚP NỀN TẢNG CHƯA HOÀN THÀNH
                 
                 <ul v-for="(lop, index) in nentangChuahoanthanh" :key="index">
                  <li v-if="nentangChuahoanthanh.length > 0">{{ lop }}</li>                  
                 </ul>
                </a-modal>

                <a-modal
                  v-model:visible="visiblePhattrien"
                  title=""
                  @ok="handleOkPhattrien"
                  style="font-weight: bold"
                >
                  LỚP PHÁT TRIỂN HOÀN THÀNH
                 <ul v-for="(lop, index) in phattrienHoanthanh" :key="index">
                  <li v-if="phattrienHoanthanh.length > 0">{{ lop }}</li>                                    
                 </ul>
                 LỚP PHÁT TRIỂN CHƯA HOÀN THÀNH
                 
                 <ul v-for="(lop, index) in phattrienChuahoanthanh" :key="index">
                  <li v-if="phattrienChuahoanthanh.length > 0">{{ lop }}</li>                  
                 </ul>
                </a-modal>
              </div>
            </div>
          </div>

          <div class="col-md-7 bg-white ms-md-5">
            <div class="row p-2" style="border-bottom: 1px solid #bbbbbb">
              <div class="col-sm-3">
                <span class="mb-0">Mã nhân viên</span>
              </div>
              <div class="col-sm-9 text-secondary">{{ user.useCode }}</div>
            </div>

            <div class="row p-2" style="border-bottom: 1px solid #bbbbbb">
              <div class="col-sm-3">
                <span class="mb-0">Tên nhân viên</span>
              </div>
              <div class="col-sm-9 text-secondary">{{ user.userName }}</div>
            </div>

            <div class="row p-2" style="border-bottom: 1px solid #bbbbbb">
              <div class="col-sm-3">
                <span class="mb-0">Email</span>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ user.userEmail }}
              </div>
            </div>

            <div class="row p-2" style="border-bottom: 1px solid #bbbbbb">
              <div class="col-sm-3">
                <span class="mb-0">Đơn vị</span>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ user.congtyName }}
              </div>
            </div>

            <div class="row p-2" style="border-bottom: 1px solid #bbbbbb">
              <div class="col-sm-3">
                <span class="mb-0">Khối</span>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ user.khoiName }}
              </div>
            </div>

            <div class="row p-2" style="border-bottom: 1px solid #bbbbbb">
              <div class="col-sm-3">
                <span class="mb-0">Ban</span>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ user.banName }}
              </div>
            </div>

            <div class="row p-2" style="border-bottom: 1px solid #bbbbbb">
              <div class="col-sm-3">
                <span class="mb-0">Phòng</span>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ user.phongName }}
              </div>
            </div>

            <div class="row p-2" style="border-bottom: 1px solid #bbbbbb">
              <div class="col-sm-3">
                <span class="mb-0">Chức vụ</span>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ user.chucvuName }}
              </div>
            </div>

            <div class="row p-2">
              <div class="col-sm-12">
                <a-button type="primary" @click="showModal"
                  >Đổi mật khẩu</a-button
                >
                <a-modal
                  width="800px"
                  v-model:visible="visible"
                  title="Đổi mật khẩu"
                  :confirm-loading="confirmLoading"
                  @ok="handleOk"
                >
                  <p>
                    <a-form
                      ref="formRef"
                      name="custom-validation"
                      :model="formState"
                      :rules="rules"
                      v-bind="layout"
                      @finish="handleFinish"
                      @validate="handleValidate"
                      @finishFailed="handleFinishFailed"
                    >
                      <a-form-item
                        has-feedback
                        label="Mật khẩu cũ"
                        name="oldpass"
                      >
                        <a-input
                          v-model:value="formState.oldpass"
                          type="password"
                          autocomplete="off"
                        />
                      </a-form-item>
                      <a-form-item
                        has-feedback
                        label="Mật khẩu mới"
                        name="pass"
                      >
                        <a-input
                          v-model:value="formState.pass"
                          type="password"
                          autocomplete="off"
                        />
                      </a-form-item>
                      <a-form-item
                        has-feedback
                        label="Nhập lại mật khẩu"
                        name="checkPass"
                      >
                        <a-input
                          v-model:value="formState.checkPass"
                          type="password"
                          autocomplete="off"
                        />
                      </a-form-item>

                      <!--   <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" html-type="submit"
                          >Submit</a-button
                        >
                        <a-button style="margin-left: 10px" @click="resetForm"
                          >Reset</a-button
                        >
                      </a-form-item> -->
                    </a-form>
                  </p>
                </a-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, onMounted } from "vue";
import { useUser } from "../store/use-user";
import { message } from "ant-design-vue";
import ProgressBar from "primevue/progressbar";
export default defineComponent({
  components: {
    ProgressBar,
  },
  setup() {
    onMounted(() => {
      loadProfile();
      loadNentang();
    });

    const nentangDat = ref(0);
    const nentangTong = ref(0);
    const nentangPhantram = ref(0);

    const phattrienDat = ref(0);
    const phattrienTong = ref(0);
    const phattrienPhantram = ref(0);
    const capdo = ref("I - Tân Sinh");

    const store = useUser();
    const { useID, userEmail, screptionID } = store;
    const user = ref([]);

    const modalText = ref("Content of the modal");
    const visible = ref(false);
    const confirmLoading = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/UserInfo/UserUpdatePass",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          oldpass: formState.oldpass,
          newpass: formState.pass,
        },
      })
        .then((response) => {
          console.log(response.data);
          if (response.data == true) {
            message.success("Đổi mật khẩu thành công");
          } else {
            message.error("Đổi mật khẩu không thành công");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      modalText.value = "The modal will be closed after two seconds";
      confirmLoading.value = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
      }, 1000);
      resetForm();
    };

    const loadProfile = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/UserInfo/GetUserInfoByID",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
        },
      })
        .then((response) => {
          user.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const nentangHoanthanh = ref([]);
    const nentangChuahoanthanh = ref([]);
    const phattrienHoanthanh = ref([]);
    const phattrienChuahoanthanh = ref([]);
    const loadNentang = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/ClassInfo/Lotrinhhoc",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          Key: 2,
        },
      })
        .then((response) => {
         

          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].ketquadat == "1") {
              nentangDat.value++;
              capdo.value = "II - Học Thủ";
              nentangHoanthanh.value.push(response.data[i].tendanhmuclopcon);
            }else{
              nentangChuahoanthanh.value.push(response.data[i].tendanhmuclopcon);
            }
          }

          nentangTong.value = response.data.length;
          nentangPhantram.value = (nentangDat.value / nentangTong.value) * 100;
          loadPhattrien();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const loadPhattrien = () => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/ClassInfo/Lotrinhhoc",
        headers: {},
        data: {
          userEmail: userEmail,
          useID: useID,
          screptionID: screptionID,
          Key: 3,
        },
      })
        .then((response) => {
          console.log(response.data);
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].ketquadat == "1") {
              phattrienDat.value++;
              capdo.value = "III - Học Bá";
              phattrienHoanthanh.value.push(response.data[i].tendanhmuclopcon);
            }else {
              phattrienChuahoanthanh.value.push(response.data[i].tendanhmuclopcon);
            }
          }

          phattrienTong.value = response.data.length;
          phattrienPhantram.value =
            (phattrienDat.value / phattrienTong.value) * 100;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const formRef = ref();
    const formState = reactive({
      oldpass: "",
      pass: "",
      checkPass: "",
      age: undefined,
    });
    let checkAge = async (_rule, value) => {
      if (!value) {
        return Promise.reject("Please input the age");
      }
      if (!Number.isInteger(value)) {
        return Promise.reject("Please input digits");
      } else {
        if (value < 18) {
          return Promise.reject("Age must be greater than 18");
        } else {
          return Promise.resolve();
        }
      }
    };
    let validatePass = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Vui lòng nhập mật khẩu");
      } else if (value.length < 6) {
        return Promise.reject("Mật khẩu phải có ít nhất 6 ký tự");
      } else {
        if (formState.checkPass !== "") {
          formRef.value.validateFields("checkPass");
        }
        return Promise.resolve();
      }
    };
    let validatePass2 = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Vui lòng nhập lại mật khẩu mới");
      } else if (value !== formState.pass) {
        return Promise.reject("Mật khẩu mới không khớp");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      pass: [
        {
          required: true,
          validator: validatePass,
          trigger: "change",
        },
      ],
      checkPass: [
        {
          validator: validatePass2,
          trigger: "change",
        },
      ],
      age: [
        {
          validator: checkAge,
          trigger: "change",
        },
      ],
    };
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const handleFinish = (values) => {
      console.log(values, formState);
    };
    const handleFinishFailed = (errors) => {
      console.log(errors);
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const handleValidate = (...args) => {
      console.log(args);
    };

    const visibleNentang = ref(false);
    const showModalNentang = () => {
      visibleNentang.value = true;
    };
    const handleOkNentang = e => {
      
      visibleNentang.value = false;
    };

    const visiblePhattrien = ref(false);
    const showModalPhattrien = () => {
      visiblePhattrien.value = true;
    };
    const handleOkPhattrien = e => {
      
      visiblePhattrien.value = false;
    };

    return {
      user,
      modalText,
      visible,
      confirmLoading,
      showModal,
      handleOk,
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate,
      nentangDat,
      nentangTong,
      nentangPhantram,
      phattrienDat,
      phattrienTong,
      phattrienPhantram,
      capdo,
      visibleNentang,
      showModalNentang,
      handleOkNentang,
      nentangHoanthanh,
      nentangChuahoanthanh,
      visiblePhattrien,
      showModalPhattrien,
      handleOkPhattrien,
      phattrienHoanthanh,
      phattrienChuahoanthanh
    };
  },
});
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
