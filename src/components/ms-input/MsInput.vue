<template>
  <div class="container">
    <div class="lable">
      {{ props.label }} <span class="required" v-if="props.isRequired">*</span>
    </div>
    <div
      class="input-btn-container btn-focus"
      :class="{ field_error: errorMessage, valid: meta.valid }"
    >
      <input
        ref="inputRef"
        class="input"
        :type="props.type"
        :placeholder="props.placeholder"
        v-model="value"
      />
      <slot name="leftInput"> </slot>
    </div>
    <small class="error_message" :style="{ visibility: errorMessage ? 'visible' : 'hidden' }">
      {{ errorMessage || ' ' }}
    </small>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { onMounted, ref } from 'vue'

const props = defineProps(['placeholder', 'label', 'type', 'isRequired', 'value', 'autoFocus'])
const inputRef = ref(null)
const { value, errorMessage, meta } = useField(() => props.value)

onMounted(() => {
  if (props.autoFocus == 'true') {
    inputRef.value.focus()
  }
})
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
.input-btn-container {
  display: flex;
  align-items: center;
  border: 1px solid var(--misa-c-gray-light);
  border-radius: 6px;
  overflow: hidden;
  height: 31px;
  width: 100%;
}
.input-btn-container input {
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  padding: 8px 10px;
  font-size: 14px;
}
.required {
  color: var(--misa-c-red);
}
</style>
