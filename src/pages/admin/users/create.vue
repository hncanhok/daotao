<template>
  <form @submit.prevent="onSubmitForm()">
    <a-card title="Tạo mới tài khoản">
      <div class="row">
        <div class="col-12 col-sm-4">
          <div class="row">
            <div class="col-12 d-flex justify-content-center">
              <a-avatar shape="square" :size="200">
                <template #icon>
                  <img
                    src="../../../assets/Hinh-anh-avatar-cute-TikTok-nam.jpg"
                    alt="Avatar"
                  />
                </template>
              </a-avatar>
            </div>
            <div class="col-12 d-flex justify-content-center mt-3">
              <a-button type="primary">
                <i class="fa-solid fa-plus me-2"></i>
                Chọn ảnh
              </a-button>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-8">
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <span class="text-danger me-1">*</span>
              <span>Tình trạng:</span>
            </div>
            <div class="col-12 col-sm-5">
              <a-select
                show-search
                placeholder="Tình trạng"
                style="width: 100%"
                :options="options"
                :filter-option="filterOption"
                allow-clear
                v-model:value="status_id"
                class="select-danger"
              ></a-select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <span class="text-danger me-1">*</span>
              <span>Tên tài khoản:</span>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                placeholder="Tên tài khoản"
                allow-clear
                v-model:value="username"
                class="select-danger"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <span class="text-danger me-1">*</span>
              <span>Họ và tên:</span>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                v-model:value="value1"
                placeholder="Họ và tên"
                allow-clear
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <span class="text-danger me-1">*</span>
              <span>Email:</span>
            </div>
            <div class="col-12 col-sm-5">
              <a-input v-model:value="value1" placeholder="Email" allow-clear />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <span class="text-danger me-1">*</span>
              <span>Phòng ban:</span>
            </div>
            <div class="col-12 col-sm-5">
              <a-select
                show-search
                placeholder="Phòng ban"
                style="width: 100%"
                :options="[]"
                :filter-option="[]"
              ></a-select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <span class="text-danger me-1">*</span>
              <span>Mật khẩu:</span>
            </div>
            <div class="col-12 col-sm-5">
              <a-input-password
                v-model:value="value1"
                placeholder="Mật khẩu"
                allow-clear
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <span class="text-danger me-1">*</span>
              <span>Xác nhận mật khẩu:</span>
            </div>
            <div class="col-12 col-sm-5">
              <a-input-password
                v-model:value="value1"
                placeholder="Xác nhận mật khẩu"
                allow-clear
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-sm-flex justify-content-sm-end d-grid mx-auto">
          <a-button class="me-sm-2 mb-3 mb-sm-0 mt-3 mt-sm-0">
            <router-link :to="{ name: 'admin-users' }"
              ><span>Hủy</span></router-link
            >
          </a-button>
          <a-button type="primary" html-type="submit">
            <span>Lưu</span>
          </a-button>
        </div>
      </div>
    </a-card>
  </form>
</template>

<script>
import { useMenu } from "../../../store/use-user";
import { reactive, toRefs } from "vue";
export default {
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const user = reactive({
      username: "canhhn",
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      department_id: [],
      status_id: [],
    });
    const options = reactive([
      {
        value: "1",
        label: "Hoạt động",
      },
      {
        value: "2",
        label: "Tạm khóa",
      },
    ]);
    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const onSubmitForm = () => {
      console.log(user.status_id);
    };

    return {
      options,
      filterOption,
      onSubmitForm,
      ...toRefs(user),
    };
  },
};
</script>

<style>
.select-danger {
  border-color: red;
}
</style>