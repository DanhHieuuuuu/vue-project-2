const keyDefault = 'candidates'

/**
 * Lưu dữ liệu vào local storage
 * @param {key} key - key của local storage
 * @param {list object} data - Data cần lưu vào
 * Created By Danh Hiếu - 13/10/2025
 */
export function saveToLocalStorage(data, key = keyDefault) {
  try {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(key, jsonData)
    console.log(`Đã lưu dữ liệu vào localStorage với key = ${key}`)
  } catch (error) {
    console.error('Lỗi khi lưu vào localStorage:', error)
  }
}

/**
 * Lấy dữ liệu từ local storage
 * @param {key} key - key của local storage muốn lấy
 * Created By Danh Hiếu - 13/10/2025
 */
export function getFromLocalStorage(key = keyDefault) {
  try {
    const jsonData = localStorage.getItem(key)
    return jsonData ? JSON.parse(jsonData) : null
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ localStorage:', error)
    return null
  }
}

/**
 * Xóa dữ liệu trong localstorage
 * @param {key} key - key của local storage
 * @param {list object} data - Những đối tượng cần xóa
 * Created By Danh Hiếu - 13/10/2025
 */
export function removeCandidatesFromLocalStorage(data, key = keyDefault) {
  try {
    let existingData = getFromLocalStorage(key)
    if (existingData == null) {
      return
    }

    data.forEach((element) => {
      existingData = existingData.filter((item) => item.candidateId != element)
    })

    saveToLocalStorage(existingData, key)
    console.log(`Đã cập nhật dữ liệu localstorage với key = ${key}`)
  } catch (error) {
    console.error('Lỗi khi lưu vào localStorage:', error)
  }
}

/**
 * Lưu dữ liệu vào local storage
 * @param {key} key - key của local storage
 * @param {list object} data - Data mới cần thêm vào
 * Created By Danh Hiếu - 13/10/2025
 */
export function addToLocalStorage(newData, key = keyDefault) {
  try {
    let existingData = getFromLocalStorage(key)

    existingData.unshift(newData)

    localStorage.setItem(key, JSON.stringify(existingData))

    console.log(`Đã thêm dữ liệu vào localStorage key = ${key}`)
  } catch (error) {
    console.error('Lỗi khi lưu vào localStorage:', error)
  }
}
