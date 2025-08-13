<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "../store/use-user.js";

export default {
  setup() {
    const router = useRouter();

    onMounted(() => {
      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");
      if (!token) {
        console.error("No token returned from SSO");
        return;
      }

      // ✅ Lưu vào kho
      
      useUser().onLogin(true);
      useUser().onUserEmail(params.get("userEmail"));
      useUser().onUseID(params.get("useID"));
      useUser().onScreptionID(params.get("screptionID"));
      useUser().onUserName(params.get("userName"));

      // ✅ Xóa query string khỏi URL (ẩn token/email khỏi thanh địa chỉ)
      window.history.replaceState({}, document.title, window.location.pathname);

      // ✅ Điều hướng sang trang chính
      router.push({ name: "Home" });
    });
  },
};
</script>
