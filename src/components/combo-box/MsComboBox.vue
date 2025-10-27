<template>
  <div>
    <div class="card flex justify-center" :class="{ field_error: errorMessage, valid: meta.valid }">
      <AutoComplete
        v-model="selected"
        dropdown
        :suggestions="items"
        @complete="search"
        optionLabel="name"
        @item-select="onSelected"
        class="auto-complete"
      />
    </div>
    <small :class="errorMessage ? 'error_message' : ''">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
import { AutoComplete } from 'primevue'
import { useField } from 'vee-validate'
import { ref } from 'vue'

const items = ref([])
const selected = ref()
const props = defineProps(['data', 'value'])
const { value, errorMessage, meta } = useField(() => props.value)

// Hàm tìm kiếm
const search = (event) => {
  const query = event.query.toLowerCase()

  // Lọc danh sách theo từ khóa
  items.value = props.data.filter((item) => item.name.toLowerCase().includes(query))
  console.log(query, items.value, value.value)
}

const onSelected = (e) => {
  console.log('onselect ', e, e.value)
  value.value = e.value.value
}
</script>

<style scoped>
.auto-complete {
  width: 100%;
  height: 33px;
}
.error_message {
  color: var(--misa-c-red);
}
.p-inputtext .field_error {
  border: 1px solid var(--misa-c-red) !important;
}
</style>
