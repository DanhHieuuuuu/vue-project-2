<template>
  <div class="rightbody">
    <div class="headerrightbody">
      <h2>Ứng viên</h2>
      <div class="btn-add" @click="openModal">
        <i class="fa-solid fa-plus"></i>
        <p>Thêm ứng viên</p>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>
    <CUCandidate
      v-if="isModal"
      :close-modal="closeModal"
      :is-update="isUpdate"
      :candidate="candidate"
    />
    <div>
      <div class="inputsearchtable">
        <p></p>
        <div class="box-search">
          <MsSearch
            v-model="searchText"
            placeholder="Tìm kiểm trong danh sách"
            background-color="white"
          />
          <img
            class="iconfilltable"
            src="../../components/icons/fill.svg"
            alt="Search icon"
            width="24"
            height="24"
          />
          <img
            class="iconfilltable"
            src="../../components/icons/Out.svg"
            alt="Search icon"
            width="24"
            height="24"
          />
          <img
            class="iconfilltable"
            src="../../components/icons/Chart2.svg"
            alt="Search icon"
            width="24"
            height="24"
          />
          <img
            class="iconfilltable"
            src="../../components/icons/Setting2.svg"
            alt="Search icon"
            width="24"
            height="24"
          />
        </div>
      </div>
    </div>
    <MsTable :headers="headers" :data="candidates">
      <template #candidateName="{ data }">
        <div class="name-cell">
          <div class="avatar-circle" :style="{ backgroundColor: data.avatarColor }">
            {{ initials(data.candidateName) }}
          </div>
          <span class="full-name">{{ data.candidateName }}</span>
        </div>
      </template>
      <template #score="{ data }">
        <div class="star-rating">
          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= data.score }"
            >&#9733;</span
          >
        </div></template
      >
      <template #fixright="{ data }">
        <div class="actionTable">
          <div class="updateBtn" @click="openUpdateModal(data)">
            <i class="fa-solid fa-pen"></i>
          </div>
          <div class="deleteBtn" @click="removeCandidate(data.candidateId)">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </template>
    </MsTable>
  </div>
</template>

<script setup>
import { getFromLocalStorage, removeCandidatesFromLocalStorage } from '@/helper/localstorage'
import MsSearch from '@/components/ms-input/MsSearch.vue'
import CUCandidate from '@/views/candidate/modal/CUCandidate.vue'
import MsTable from '@/components/ms-table/MsTable.vue'
import { onMounted, ref, watch } from 'vue'
import CustomerAPI from '@/apis/components/customers/CustomerAPI'

const searchText = ref()
const isModal = ref(false)
const isUpdate = ref(false)
let candidate = ref()
const headers = [
  { name: 'Họ và tên', key: 'candidateName', type: 'custom' },
  { name: 'Số điện thoại', key: 'mobile', type: 'string' },
  { name: 'Email', key: 'email', type: 'string' },
  { name: 'Chiến dịch tuyển dụng', key: 'recruitmentName', type: 'string' },
  { name: 'Vị trí tuyển dụng', key: 'jobPositionName', type: 'string' },
  { name: 'Tin tuyển dụng', key: 'recruitmentRoundName', type: 'string' },
  { name: 'Vòng tuyển dụng', key: 'round', type: 'string' },
  { name: 'Đánh giá', key: 'score', type: 'custom' },
  { name: 'Ngày tương ứng', key: 'applyDate', type: 'date' },
  { name: 'Hành động', key: 'fixright', type: 'custom' },
]
let candidates = ref('')
let timeoutId = null
onMounted(() => {
  candidates.value = getFromLocalStorage()
  console.log(candidates.value)
})
watch(
  () => isModal.value,
  (newVal) => {
    candidates.value = getFromLocalStorage()
  },
)
watch(
  () => searchText.value,
  (newVal) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      const data = getFromLocalStorage()
      candidates.value = data.filter((c) =>
        c.candidateName.toLowerCase().includes(newVal.toLowerCase()),
      )
      console.log('Search done:', candidates.value)
    }, 500)
  },
)
function initials(name) {
  return name
    .split(' ')
    .slice(-2) // lấy 2 từ cuối (vd: Bùi Mỹ Uyên → Mỹ Uyên)
    .map((word) => word[0].toUpperCase())
    .join('')
}
function openModal() {
  candidate.value = ''
  isModal.value = true
  isUpdate.value = false
}
function closeModal() {
  isModal.value = false
}
function openUpdateModal(data) {
  candidate.value = data
  isModal.value = true
  isUpdate.value = true
}
function removeCandidate(id) {
  removeCandidatesFromLocalStorage([id])
  candidates.value = getFromLocalStorage()
}
</script>

<style scoped>
.rightbody {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
}
.headerrightbody {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.inputsearchtable {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding-bottom: 10px;
  gap: 10px;
  padding-top: 10px;
  padding-right: 20px;
}
.box-search {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.btn-add {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--misa-c-blue);
  color: var(--misa-c-white);
  padding: 2px 10px;
  border-radius: 10px;
  gap: 10px;
  height: 35px;
  cursor: pointer;
}
.btn-add p {
  display: inline;
  margin: 0;
}
.search-box {
  align-items: center;
  background-color: var(--misa-c-gray-light);
  border-radius: 10px;
  padding: 8px 15px;
}

.search-box i {
  color: var(--misa-c-gray-light);
  font-size: 16px;
  margin-right: 10px;
}
.actionTable {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.updateBtn,
.deleteBtn {
  cursor: pointer;
  padding: 5px;
  border-radius: 100%;
  color: white;
}
.updateBtn {
  background-color: var(--misa-c-yellow);
}
.deleteBtn {
  background-color: var(--misa-c-red);
}
.search-box input {
  border: none;
  outline: none;
  background: transparent;
  /* font-size: 14px; */
}
.name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}
.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--misa-c-white);
  font-weight: bold;
  font-size: 13px;
}
.full-name {
  color: var(--misa-c-black-soft);
  font-weight: 500;
}
.star-rating {
  display: inline-flex;
}

.star {
  color: var(--misa-c-gray-light);
  font-size: 20px;
}

.star.filled {
  color: var(--misa-c-yellow);
}
</style>
