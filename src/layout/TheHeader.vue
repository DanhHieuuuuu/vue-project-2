<template>
  <!-- Header -->
  <div class="header">
    <div class="leftheader">
      <img src="./icons/Menu.svg" alt="Search icon" width="20" height="20" />
      <img src="./icons/SearchUser.svg" alt="Search icon" width="24" height="24" />
      <p>Tuyển dụng</p>
      <MsSearch placeholder="Tìm kiểm tin tuyển dụng ứng viên" background-color=" " />
    </div>
    <div class="rightheader">
      <Icon icon-class="icon-avatar" color="red" />
      <img src="./icons/Light.svg" alt="Search icon" width="24" height="24" />
      <img src="./icons/Vector2.svg" alt="Search icon" width="24" height="24" />
      <img src="./icons/Help.svg" alt="Search icon" width="24" height="24" />
      <img src="./icons/Notification.svg" alt="Search icon" width="24" height="24" />
      <img src="./icons/Message.svg" alt="Search icon" width="24" height="24" />
      <img src="./icons/Shopping2.svg" alt="Search icon" width="24" height="24" />
      <i class="fa-solid fa-bullhorn"></i>
      <div class="btn-website">
        <img src="./icons/Word.svg" alt="Search icon" width="24" height="24" />
        <p>Website tuyển dụng</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/ms-icon/Icon.vue'
import MsSearch from '../components/ms-input/MsSearch.vue'
</script>

<style scoped>
.header {
  display: flex;
  /* position: fixed;
    width: 100%; */
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  height: 52px;
}
.rightheader,
.leftheader {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
.rightheader {
  flex-direction: row-reverse;
}
.btn-website {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
</style>
