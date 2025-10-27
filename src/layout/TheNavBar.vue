<template>
  <div class="leftbody" :class="{ collapsed: isCollapsed }">
    <div>
      <RouterLink
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.router"
        custom
        v-slot="{ navigate, isActive }"
      >
        <div
          :class="{
            'btn-navbar': !isActive,
            'btn-focus': isActive,
            'btn-top': index === 0,
            'btn-collapsed': isCollapsed,
          }"
          @click="navigate"
        >
          <Icon icon-class="icon-setting" color="white" />
          <p v-if="!isCollapsed">{{ item.label }}</p>
        </div>
      </RouterLink>
    </div>

    <div class="btn-close" :class="{ 'btn-collapsed': isCollapsed }" @click="toggleCollapse">
      <i class="fa-solid" :class="isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'"></i>
      <p v-if="!isCollapsed">Thu gọn</p>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Icon from '@/components/ms-icon/Icon.vue'
import { ref } from 'vue'

const menuItems = [
  {
    icon: 'icon-setting',
    label: 'Tin tuyển dụng',
    router: '/abou2',
  },
  { icon: 'icon-setting', label: 'Ứng viên', router: '/' },
  { icon: 'icon-setting', label: 'Lịch', router: '/abou2' },
  {
    icon: 'icon-setting',
    label: 'Kho tiềm năng',
    router: '/abou2',
  },
  {
    icon: 'icon-setting',
    label: 'Chiến dịch tuyển dụng',
    router: '/abou2',
  },
  {
    icon: 'icon-setting',
    label: 'Công việc',
    router: '/abou2',
  },
  {
    icon: 'icon-setting',
    label: 'aiMarketing',
    router: '/abou2',
  },
  {
    icon: 'icon-setting',
    label: 'Trao đổi với ứng viên',
    router: '/abou3',
  },
  { icon: 'icon-setting', label: 'Báo cáo', router: '/abou2' },
  {
    icon: 'icon-setting',
    label: 'Thiết lập',
    router: '/about1',
  },
  { icon: 'icon-setting', label: 'about', router: '/about' },
]
const isCollapsed = ref(true)
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.leftbody {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: var(--misa-c-black-soft);
  height: 100%;
  min-width: 250px;
  color: var(--misa-c-white);
  overflow: hidden;
  transition: all 0.3s ease;
}

.collapsed {
  width: 60px;
  padding-left: 5px;
  padding-right: 5px;
  min-width: 50px;
}
.btn-collapsed {
  justify-content: center;
  padding: 0 !important;
}
.btn-navbar,
.btn-focus {
  flex-direction: row;
  gap: 10px;
  border-radius: 5px;
  text-decoration: none;
  color: inherit;
  border: 1px solid transparent;
}
.btn-top {
  margin-top: 20px;
}
.btn-close {
  gap: 20px;
  border-radius: 3px;
  border: 1px solid var(--misa-c-white);
  background-color: transparent;
  transition: background-color 0.3s ease;
}
.btn-close:hover {
  background-color: var(--misa-c-blue);
  border-color: var(--misa-c-white-20);
}
.btn-navbar:hover {
  border: 1px solid var(--misa-c-white);
  background-color: var(--misa-c-white-20);
}
.btn-focus {
  background-color: var(--misa-c-blue);
}
.btn-close,
.btn-focus,
.btn-navbar {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 5px;
  margin-bottom: 10px;
}

p {
  transition:
    opacity 0.3s ease,
    width 0.3s ease;
}
</style>
