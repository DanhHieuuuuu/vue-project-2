<template>
  <div class="container">
    <div class="label">{{ props.label }}</div>
    <div>
      <select
        class="select btn-focus"
        :aria-placeholder="props.placeholder"
        :class="{ field_error: errorMessage, valid: meta.valid }"
        v-model="value"
      >
        <option disabled>{{ props.placeholder }}</option>
        <option v-for="item in props.option" :value="item.value">
          {{ item.name }}
        </option>
      </select>
    </div>
    <small :class="errorMessage ? 'error_message' : ''">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'

const props = defineProps(['label', 'placeholder', 'option', 'value'])
const { value, errorMessage, meta } = useField(() => props.value)
</script>

<style scoped>
@import '../../assets/style/button.css';
@import '../../assets/style/valid.css';
.container {
  width: 100%;
}
.lable {
  width: 100%;
}
.input {
  width: 100%;
}
.select {
  height: 30px;
  border: 1px solid var(--misa-c-gray-light);
  border-radius: 3px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
