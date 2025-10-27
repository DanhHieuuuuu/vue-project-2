<template>
  <div class="container">
    <div class="lable">
      {{ props.label }}<span class="required" v-if="props.isRequired">*</span>
    </div>
    <textarea
      class="btn-focus"
      :type="props.type"
      :placeholder="props.placeholder"
      :class="{ field_error: errorMessage, valid: meta.valid }"
      v-model="value"
    />
    <small :class="errorMessage ? 'error_message' : ''">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'

const props = defineProps(['placeholder', 'label', 'isRequired', 'value'])
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
textarea {
  width: 100%;
}
textarea {
  height: 150px;
  border: 1px solid var(--misa-c-gray-light);
  border-radius: 3px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.required {
  color: var(--misa-c-red);
}
</style>
