import { defineStore } from "pinia";

export const useUser = defineStore("userId", {
  state: () => ({
    isUser: false,
    userEmail: null,
    useID: null,
    screptionID: null
  }),
  actions: {
    onLogin(data) {
      this.isUser = data;
    },
    onUserEmail(data) {
      this.userEmail = data;
    },
    onUseID(data) {
      this.useID = data;
    },
    onScreptionID(data) {
      this.screptionID = data;
    },
  },
  persist: true,
});
