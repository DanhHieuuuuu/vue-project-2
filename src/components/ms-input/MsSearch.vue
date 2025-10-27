<template>
  <div class="search-table" :style="{ backgroundColor: props.backgroundColor, width: props.width }">
    <i class="fa-solid fa-magnifying-glass"></i>
    <input
      :placeholder="placeholder"
      :style="{ color: props.textColor }"
      v-model="inputValue"
      @input="emitValue"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['placeholder', 'backgroundColor', 'width', 'textColor'])
const emit = defineEmits(['update:modelValue'])
let inputValue = ref('')

function emitValue() {
  emit('update:modelValue', inputValue.value)
}
</script>

<style scoped>
.search-table {
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--misa-c-gray-light);
  padding: 8px 15px;
  overflow: hidden;
}

.search-table i {
  color: var(--misa-c-gray-light);
  font-size: 16px;
  margin-right: 10px;
}

.search-table input {
  border: none;
  outline: none;
  background: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
