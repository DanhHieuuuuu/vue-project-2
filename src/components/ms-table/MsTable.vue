<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" @change="toggleAll" :checked="isAllSelected" />
          </th>
          <th
            v-for="(col, index) in props.headers"
            :key="col.key"
            :class="{
              'sticky-right': col.key === 'fixright',
            }"
          >
            {{ col.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in props.data"
          :key="index"
          class="row-table"
          :class="{ selected: selectedRows.includes(index) }"
          @click="toggleRow(row, $event)"
        >
          <td>
            <input type="checkbox" v-model="selectedRows" :value="row" @click.stop />
          </td>

          <td
            v-for="(col, i) in props.headers"
            :key="i"
            :class="{ 'sticky-right': col.key === 'fixright' }"
          >
            <p v-if="col.type === 'date'">{{ formatDate(row[col.key]) }}</p>
            <p v-if="col.type === 'string'">{{ row[col.key] }}</p>
            <slot :name="col.key" :data="row" v-if="col.type === 'custom'"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <MsPagination :total="candidates.length" @update-page="handlePageChange" />
</template>

<script setup>
import { formatDate } from '@/helper/formatDate'
import { computed, ref } from 'vue'
import MsPagination from '../ms-pagination/MsPagination.vue'
import { candidates } from '@/helper/candidateData'

const props = defineProps(['headers', 'data'])
const selectedRows = ref([])
const isAllSelected = computed(() => {
  return props.data?.length > 0 && selectedRows.value.length === props.data.length
})

/**
 * Chọn hoặc hủy hàng
 * @param {object} row - Data của hàng đó
 * @return
 * Created By Danh Hiếu - 22/10/2025
 */
const toggleRow = (row, event) => {
  const index = selectedRows.value.indexOf(row)
  if (index > -1) {
    selectedRows.value.splice(index, 1)
  } else {
    selectedRows.value.push(row)
  }
}

/**
 * Chọn hoặc hủy tất cả hàng hàng
 * @return
 * Created By Danh Hiếu - 22/10/2025
 */
const toggleAll = () => {
  if (isAllSelected.value) {
    selectedRows.value = []
  } else {
    selectedRows.value = [...props.data]
  }
}
/**
 * Lấy page size và curent page ở component con
 * @param {number} pageSize - page size
 * @param {number} currentPage - page hiện tại
 * @returns
 * Created By Danh Hiếu - 22/10/2025
 */
const handlePageChange = ({ pageSize, currentPage }) => {
  console.log('Cha nhận được:', pageSize, currentPage)
  // Gọi API hoặc cập nhật dữ liệu theo pageSize & currentPage ở đây
}
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  border-top: 2px solid var(--misa-c-gray-light);
  background-color: var(--misa-c-white);
  box-shadow: 0 1px 3px var(--misa-c-shadow-light);
  height: 500px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: var(--misa-c-black-soft);
}

thead {
  background-color: var(--misa-c-gray-lavender);
  color: var(--misa-c-black-soft);
  font-weight: 600;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--misa-c-gray-light);
  box-shadow: 0 2px 6px var(--misa-c-black-20);
}

thead th {
  padding: 12px 16px;
  white-space: nowrap;
}

thead th:first-child,
.row-table td:first-child {
  text-align: center;
  width: 40px;
}
.row-table {
  border-bottom: 1px solid var(--misa-c-gray-light);
  transition: background-color 0.2s ease;
}

.row-table:hover {
  background-color: var(--misa-c-gray-lighter);
}
.row-table:hover td:first-child {
  background-color: var(--misa-c-gray-lighter) !important;
}
.row-table td {
  padding: 12px 16px;
  white-space: nowrap;
}

.row-table p {
  margin: 0;
}

input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.sticky-right {
  position: sticky;
  right: 0;
  background-color: var(--misa-c-white);
  box-shadow: -2px 0 4px var(--misa-c-shadow-light);
  z-index: 5;
}
thead th:first-child,
thead th:last-child {
  background-color: var(--misa-c-gray-lavender) !important;
}

thead th:first-child,
.row-table td:first-child {
  text-align: center;
  width: 48px;
  min-width: 48px;
  position: sticky;
  left: 0;
  background-color: var(--misa-c-white);
  z-index: 1;
  box-shadow: 2px 0 4px var(--misa-c-shadow-light);
}
</style>
