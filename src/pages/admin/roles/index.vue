<template>Đây là trang Roles</template>
<script>
import { useMenu } from '../../../store/use-user';
export default {
  setup() {
    useMenu().onSelectedKeys(["admin-roles"]);    
  },
};
</script>
