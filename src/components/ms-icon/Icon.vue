<template>
  <div :class="[props.iconClass, setColor()]"></div>
</template>

<script setup>
const props = defineProps(['iconClass', 'color'])

function setColor() {
  if (props.color === 'white') return 'whiteColor'
  else if (props.color === 'green') return 'sucess'
  else return 'warning'
}
</script>

<style scoped>
.icon-setting {
  mask-image: url('../../assets/icons/ICON.svg');
  mask-position: -25px -609px;
  mask-repeat: no-repeat;
  width: 22px;
  height: 22px;
}
.icon-avatar {
  background: url('../../assets/icons/ICON.svg');
  mask-position: -274px -634px;
  mask-repeat: no-repeat;
  width: 22px;
  height: 22px;
}
.whiteColor {
  background-color: var(--misa-c-white);
}
.warning {
  background-color: var(--misa-c-red);
}
.sucess {
  background-color: var(--misa-c-green);
}
</style>
