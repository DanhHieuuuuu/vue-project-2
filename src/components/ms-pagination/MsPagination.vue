<template>
  <div class="bottomtable">
    <p>Tổng bản ghi: {{ props.total }} bản</p>
    <div class="left-pagination">
      <p>Số bản ghi/trang</p>
      <Select
        v-model="selectedPageSize"
        :options="pageSize"
        optionLabel="name"
        class="w-full md:w-56 p-select-pagination"
        append-to="body"
        @change="changePageSize"
      />
      <p>{{ start }} - {{ end }} bản ghi</p>
      <i
        class="fa-solid fa-chevron-left is-button"
        :class="{ disabled: currentPage === 1 }"
        @click="currentPage > 1 && prevPage()"
      ></i>

      <i
        class="fa-solid fa-chevron-right is-button"
        :class="{ disabled: currentPage === totalPage }"
        @click="currentPage < totalPage && nextPage()"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { Select } from 'primevue'
import { computed, ref, watch } from 'vue'

const props = defineProps(['total'])
const emit = defineEmits(['updatePage'])

const pageSize = [
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '5', value: 5 },
  { name: '10', value: 10 },
]
const selectedPageSize = ref(pageSize[0])
let currentPage = ref(1)
const totalPage = computed(() => Math.ceil(props.total / selectedPageSize.value.value))
const start = computed(() => (currentPage.value - 1) * selectedPageSize.value.value + 1)
const end = computed(() => Math.min(currentPage.value * selectedPageSize.value.value, props.total))

// Chuyển trang
const nextPage = () => {
  if (currentPage.value < totalPage.value) currentPage.value++
  emit('updatePage', {
    pageSize: selectedPageSize.value.value,
    currentPage: currentPage.value,
  })
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
  emit('updatePage', {
    pageSize: selectedPageSize.value.value,
    currentPage: currentPage.value,
  })
}
const changePageSize = (event) => {
  currentPage.value = 1
  emit('updatePage', {
    pageSize: selectedPageSize.value.value,
    currentPage: currentPage.value,
  })
}
</script>

<style>
.bottomtable {
  background-color: var(--misa-c-gray-lavender);
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 20px;
  padding-right: 20px;
}
.left-pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.p-select-pagination {
  display: flex;
  align-items: center;
  background-color: var(--misa-c-white);
  height: 36px;
  margin: 10px 0px;
  padding-right: 15px;
  border: 1px solid var(--misa-c-gray-light);
  border-radius: 2px;
}
.p-select-dropdown {
  width: auto !important;
}
.is-button {
  cursor: pointer;
}
.disabled {
  opacity: 0.4;
  pointer-events: none;
  cursor: not-allowed;
}
</style>
