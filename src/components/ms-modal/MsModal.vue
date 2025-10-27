<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="modal-title">
          {{ props.isUpdate ? 'Cập nhật ứng viên' : 'Thêm ứng viên' }}
        </h2>
        <span class="btn-close" @click="props.closeModal">&times;</span>
      </div>

      <Form
        ref="form"
        class="modal-body"
        :validation-schema="schema"
        :initial-values="value"
        @submit="props.submit"
      >
        <div class="form-data">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <MsButton
            background-color="warning"
            label="Hủy"
            @click="props.closeModal"
            type="button"
          />
          <MsButton background-color="sucess" label="Lưu" type="submit" />
          <MsButton background-color="blue" label="Reset" type="button" @click="reset" />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import { ref } from 'vue'
import MsButton from '../ms-button/MsButton.vue'

const props = defineProps(['isUpdate', 'closeModal', 'submit', 'schema', 'value'])
const form = ref(null)
const reset = () => form.value.resetForm()
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  background-color: var(--misa-c-black-20);
}

.modal-content {
  background-color: var(--misa-c-white);
  margin: 10% auto;
  margin-top: 20px;
  border-radius: 10px;
  width: 600px;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  flex-shrink: 0;
}

.modal-body {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-data {
  overflow-y: auto;
  padding: 20px;
  max-height: 500px;
}

.modal-footer {
  position: sticky;
  bottom: 0;
  background-color: var(--misa-c-gray-lavender);
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-close {
  cursor: pointer;
  font-size: 30px;
}
.btn-close:hover {
  color: var(--misa-c-black);
}
</style>
