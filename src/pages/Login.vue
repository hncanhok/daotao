<template>
  <div class="loginForm">
    <div class="container-fluid ms-0 ms-sm-5">
      <div class="row">
        <div
          class="col-12 col-md-6 col-lg-3 bg-white rounded vertical-center ms-0 ms-sm-5"
          style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
        >
          <div class="row pt-5">
            <div class="col text-center">
              <img
                src="../assets/logo/logo.png"
                alt="logo alphanam"
                width="120"
                height="auto"
              />
            </div>
          </div>
          <div class="row p-5">
            <div class="col text-center">
              <img
                src="../assets/logo/Logo-E-Learning-03.png"
                alt="logo alphanam"
                width="250"
                height="auto"
              />
            </div>
          </div>
          <div class="row mb-5">
            <div class="col text-center">
              <span style="color: #a10707; font-weight: bold; font-size: 28px"
                >ĐĂ<span class="underline">NG NH</span>ẬP</span
              >
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-flex justify-content-center">
              <a-form
                style="width: 70%"
                :model="formState"
                name="basic"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
              >
                <a-form-item
                  class="mb-3"
                  name="username"
                  :rules="[{ required: true, message: 'Vui lòng nhập Email!' }]"
                >
                  <a-input
                    v-model:value="formState.username"
                    placeholder="Email"
                  >
                    <template #prefix>
                      <UserOutlined
                        class="site-form-item-icon"
                        style="color: #a10707"
                      />
                    </template>
                  </a-input>
                </a-form-item>

                <a-form-item
                  class="mb-0"
                  name="password"
                  :rules="[
                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  ]"
                >
                  <a-input-password
                    v-model:value="formState.password"
                    placeholder="Mật khẩu"
                  >
                    <template #prefix>
                      <LockOutlined
                        class="site-form-item-icon"
                        style="color: #a10707"
                      />
                    </template>
                  </a-input-password>
                  <div>
                    <span v-if="error" style="color: #ff4d4f">
                      {{ error }}</span
                    >
                  </div>
                </a-form-item>
                <a-form-item class="text-end">
                  <span
                    style="color: #a10707; font-size: 16px; font-style: italic"
                    >Quên mật khẩu?</span
                  >
                </a-form-item>
                <a-form-item class="text-center">
                  <a-button
                    size="large"
                    shape="round"
                    style="
                      background-color: #a10707;
                      padding: 2px 30px 5px 30px;
                    "
                    html-type="submit"
                    ><span style="color: white; opacity: 0.9; font-size: 18px"
                      >Đăng nhập</span
                    ></a-button
                  >
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 26, offset: 0 }">              
              <a-button
                class="ms-login-btn"
                @click="dangnhapoffice365"
              >
                <img
                  src="https://img.icons8.com/color/48/000000/microsoft.png"
                  alt="Microsoft"
                />
                Đăng nhập với Microsoft 365
              </a-button>
            </a-form-item>
              </a-form>
            </div>
          </div>
          <div class="row p-5">
            <div class="col-12 text-center">
              <p
                style="
                  font-weight: bold;
                  font-style: italic;
                  font-size: 16px;
                  line-height: 1.6;
                "
              >
                Phòng Chất lượng Đào tạo<br />
                xin chân thành cảm ơn mọi người đã tin tưởng<br />
                và sử dụng Website E-Learning<br />
                trong công tác đào tạo của Tập đoàn Alphanam
              </p>
            </div>
          </div>
          <div class="row pb-4">
            <div class="col-12 text-center">
              <span style="color: #9d9d9d; font-size: 13px"
                >E-Learning by Ban CNTT Alphanam Group</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useUser } from "../store/use-user.js";
import { useRouter } from "vue-router";
import { webBaseURL } from "../config.js";

export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const error = ref(null);  
    const router = useRouter();
    const formState = reactive({
      username: "",
      password: "",
    });
    const onFinish = (values) => {
      axios({
        method: "post",
        url: "https://daotao.alphanam.com:7150/api/DaoTaoAuthenticate/Login",
        data: {
          UserEmail: values.username,
          Password: values.password,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            // console.log(response.data);
            useUser().onLogin(true);
            useUser().onUserEmail(response.data.userEmail);
            useUser().onUseID(response.data.useID);
            useUser().onScreptionID(response.data.screptionID);
            useUser().onUserName(response.data.username);
            router.push({ name: "Home" });
          } else {
            error.value = "Email hoặc mật khẩu chưa đúng!";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const dangnhapoffice365 = () => {      
      window.location.href = `${webBaseURL}/auth/azure`;
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
      error,
      dangnhapoffice365,
    };
  },
};
</script>

<style scoped>
.loginForm {
  background-image: url("../assets/images/background.jpg");
  height: 100vh;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
.underline {
  border-bottom: 3px solid #646464;
  padding-bottom: 8px;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.ms-login-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #ffffff;;
  color: #000;;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0px 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  margin-top: 3rem;
}
.ms-login-btn:hover {
  background-color: #f3f3f3;
  /* transform: scale(1.02); */
}

.ms-login-btn img {
  width: 24px;
  height: 24px;
}
</style>
