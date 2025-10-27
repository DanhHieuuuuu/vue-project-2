<template>
  <MsModal
    :is-update="isUpdate"
    :close-modal="closeModal"
    :submit="CreateOrUpdateCandidate"
    :schema="schema"
    :value="candidate"
  >
    <template #body>
      <div class="import-file">
        <p>Kéo thả hoặc bấm vào đây để tải CV lên</p>
        <p>Chấp nhận fle .doc, .pdf, .jpg, .jepq, .png (Dung lượng bé hơn 15MB)</p>
      </div>
      <div class="import-information">
        <p class="right-body-modal">Ảnh</p>
        <div class="left-body-modal">
          <MsInput
            is-required="true"
            label="Ngày sinh"
            placeholder="Nhập họ và tên"
            auto-focus="true"
            value="candidateName"
          />
          <div class="container-row">
            <MsInput label="Ngày sinh" type="date" value="yearOfBirthday" />
            <MsSelect
              label="Giới tính"
              placeholder="Chọn giới tính"
              :option="sexOptions"
              value="gender"
            />
          </div>
          <div>
            <MsSelect
              label="Khu vực"
              placeholder="Chọn khu vực"
              :option="cityOptions"
              value="isDuplicate"
            />
          </div>
          <div class="container-row">
            <MsInput label="Số điện thoại" placeholder="Nhập số điện thoại" value="mobile" />
            <MsInput label="Emai" placeholder="Nhập email" value="email" />
          </div>
          <div>
            <MsInput label="Địa chỉ" placeholder="Nhập địa chỉ" value="proposeOfferStatus" />
          </div>
          <h3 class="title-edu">Học vấn</h3>
          <div class="container-row row-center">
            <div class="label-edu">
              <div class="square"></div>
              <p class="title">Trình độ đào tạo</p>
            </div>
            <MsInput placeholder="Nhập trình độ đào tạo" value="offerStatus">
              <template #leftInput>
                <i class="fa-solid fa-plus plus-add"></i>
                <i class="fa-solid fa-chevron-down btn-dropdown"></i>
              </template>
            </MsInput>
          </div>
          <div class="container-row row-center">
            <div class="label-edu">
              <div class="square"></div>
              <p class="title">Nơi đào tạo</p>
            </div>
            <MsInput placeholder="Nhập nơi đào tạo" value="offerStatus">
              <template #leftInput>
                <i class="fa-solid fa-plus plus-add"></i>
                <i class="fa-solid fa-chevron-down btn-dropdown"></i
              ></template>
            </MsInput>
          </div>
          <div class="btn-last-edu container-row row-center">
            <div class="label-edu">
              <div class="square"></div>
              <p class="title">Chuyên ngành</p>
            </div>
            <MsInput placeholder="Nhập chuyên ngành" value="offerStatus">
              <template #leftInput>
                <i class="fa-solid fa-plus plus-add"></i>
                <i class="fa-solid fa-chevron-down btn-dropdown"></i
              ></template>
            </MsInput>
          </div>
          <div>
            <div class="add-edu">
              <i class="fa-solid fa-plus plus-add"></i>
              <p class="title">Thêm học vấn</p>
            </div>
          </div>
          <div class="container-row">
            <MsInput label="Ngày ứng tuyển" type="date" value="applyDate" is-required="true" />
            <MsSelect
              label="Nguồn ứng tuyển"
              placeholder="Chọn nguồn ứng tuyển"
              :option="souceOptions"
              value="isDuplicate"
            />
          </div>
          <div>
            <MsSelect
              label="Nhân sự khai thác"
              placeholder="Chọn nhân sự khai thác"
              :option="souceOptions"
              value="attractivePersonnel"
            />
            <MsSelect
              label="Cộng tác viên"
              placeholder="Chọn cộng tác viên"
              :option="souceOptions"
              value="isDuplicate"
            />
          </div>
          <div class="checkbox-candidate">
            <input type="checkbox" id="scales" name="scales" />
            <p>Thêm nhanh người tham chiếu vào kho ứng viên</p>
          </div>
          <div>
            <div class="add-edu">
              <i class="fa-solid fa-plus plus-add"></i>
              <p class="title">Thêm người giới thiệu</p>
            </div>
          </div>
          <div class="btn-last-edu">
            <MsInput
              value="offerStatus"
              label="Nơi làm việc gần đây"
              placeholder="Nhập nơi làm việc gần đây"
            />
          </div>
          <div>
            <div class="add-edu">
              <i class="fa-solid fa-plus plus-add"></i>
              <p class="title">Thêm kinh nghiệm làm việc</p>
            </div>
          </div>
          <div>
            <MsInput
              value="offerStatus"
              label="Nơi làm việc gần đây"
              placeholder="Nhập nơi làm việc gần đây"
            />
          </div>
          <div>
            <MsInput
              label="Vị trí công việc"
              placeholder="Nhập vị trí công việc"
              value="jobPositionName"
            />
          </div>
          <div>
            <MsTextArea
              label="Mô tả công việc"
              placeholder="Nhập mô tả công việc"
              value="isDuplicate"
            />
          </div>
          <MsComboBox :data="cityOptions" value="attractivePersonnel" />
        </div>
      </div>
    </template>
  </MsModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import MsInput from '../../../components/ms-input/MsInput.vue'
import MsSelect from '../../../components/ms-select/MsSelect.vue'
import MsTextArea from '../../../components/ms-text-area/MsTextArea.vue'
import { addToLocalStorage, getFromLocalStorage, saveToLocalStorage } from '@/helper/localstorage'
import { generateRandomId } from '@/helper/util'
import * as yup from 'yup'
import MsModal from '../../../components/ms-modal/MsModal.vue'
import { validateEmail, validatePhoneNumber } from '@/helper/validate'
import MsComboBox from '@/components/combo-box/MsComboBox.vue'

const props = defineProps(['closeModal', 'isUpdate', 'candidate'])
const schema = yup.object().shape({
  candidateName: yup.string().required('Không dược để trống.').min(6, 'Phải có ít nhất 6 ký tự.'),
  applyDate: yup.date().required('Không dược để trống.'),
  mobile: yup
    .string()
    .nullable()
    .test('is-valid-phone', 'Số điện thoại không hợp lệ', (value) => {
      if (!value) return true
      return validatePhoneNumber(value)
    }),
  email: yup
    .string()
    .nullable()
    .test('is-valid-phone', 'Email không hợp lệ', (value) => {
      if (!value) return true
      return validateEmail(value)
    }),
  gender: yup.string().nullable(),
  yearOfBirthday: yup.string().nullable(),
  isDuplicate: yup.string().nullable(),
  proposeOfferStatus: yup.string().nullable(),
  offerStatus: yup.string().nullable(),
  attractivePersonnel: yup.string().nonNullable(),
  offerStatus: yup.string().nullable(),
  jobPositionName: yup.string().nullable(),
})
let candidate = ref({
  countTask: null,
  candidateName: null,
  mobile: null,
  email: null,
  jobPositionName: null,
  recruitmentName: null,
  recruitmentRoundName: null,
  score: null,
  applyDate: null,
  attractivePersonnel: null,
  candidateStatusId: null,
  gender: null,
  candidateId: null,
  recruitmentId: null,
  avatarColor: '#00CEC9',
  offerStatus: null,
  yearOfBirthday: null,
  proposeOfferStatus: null,
  isDuplicate: null,
})
const sexOptions = [
  { value: 1, name: 'Nam' },
  { value: 0, name: 'Nữ' },
]
const cityOptions = [
  { value: 0, name: 'Hà Nội' },
  { value: 1, name: 'Hải Phòng' },
  { value: 2, name: 'Nam Định' },
  { value: 3, name: 'Quảng Ninh' },
]
const souceOptions = [
  { value: 0, name: 'Cty A' },
  { value: 1, name: 'Cty B' },
  { value: 2, name: 'Cty C' },
  { value: 3, name: 'Cty D' },
]

/**
 *
 * @param value
 */
function CreateOrUpdateCandidate(value) {
  if (props.isUpdate == true) {
    let data = getFromLocalStorage()

    const candidateIndex = data.findIndex((c) => c.candidateId == value.candidateId)
    if (candidateIndex !== -1) {
      data[candidateIndex] = value

      saveToLocalStorage(data)
      props.closeModal()
    }
  } else {
    value.candidateId = generateRandomId()
    addToLocalStorage(value)
    props.closeModal()
  }
}
watch(
  () => props.candidate,
  (newVal) => {
    if (props.candidate) {
      Object.assign(candidate.value, newVal)
      console.log(candidate.value)
    }
  },
  { immediate: true },
)
</script>
<style scoped>
.import-file {
  border: 1px dotted var(--misa-c-gray-light);
  padding: 20px;
  text-align: center;
}

.import-file p:first-child {
  color: var(--color-blue);
}

.import-file p:last-child {
  color: var(--misa-c-gray-light);
}
.import-information {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.right-body-modal {
  display: flex;
  width: 75px;
  height: 75px;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  border: 1px dotted var(--misa-c-gray-light);
}
.square {
  width: 8px;
  height: 8px;
  background-color: var(--misa-c-gray-light);
  display: inline-block;
}
.left-body-modal {
  padding: 20px 0px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
}
.title {
  font-size: 14px;
}
.title-edu {
  margin: 0px;
}
.row-center {
  align-items: center;
}
.container-row {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.label-edu {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 40%;
}
.checkbox-candidate,
.add-edu {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.add-edu {
  color: var(--misa-c-blue);
}
.btn-dropdown {
  align-items: center;
  border-left: 1px solid var(--misa-c-gray-light);
  border-radius: 0px;
  background-color: white;
  padding: 20px 5px;
}
.btn-last-edu {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--misa-c-gray-light);
}
</style>
