<template>
  <button :class="setBackGround()" @click="handleClick" :type="props.type">
    <Icon :icon-class="props.iconClass" v-if="props.iconClass" />
    <p class="label">{{ props.label }}</p>
  </button>
</template>

<script setup>
import Icon from '@/components/ms-icon/Icon.vue'

const props = defineProps(['backgroundColor', 'iconClass', 'label', 'type'])
const emit = defineEmits(['click'])

function setBackGround() {
  if (props.backgroundColor == 'warning') return 'red'
  else if (props.backgroundColor == 'sucess') return 'green'
  else return 'blue'
}

function handleClick() {
  emit('click')
}
</script>

<style scoped>
button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  padding: 0px 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.label {
  color: var(--misa-c-white);
}
.blue {
  background-color: var(--misa-c-blue);
}
.red {
  background-color: var(--misa-c-red);
}
.green {
  background-color: var(--misa-c-green);
}
button:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
  box-shadow: 0 4px 10px var(--misa-c-black-20);
}
</style>
