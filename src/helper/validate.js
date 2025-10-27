/**
 * Kiểm tra regex số điện thoại
 * @param {string} phoneNumber - số điện thoại cần check
 * @return {bool} - nếu sai thì trả về false
 * Created By Danh Hiếu - 13/10/2025
 */
export function validatePhoneNumber(phoneNumber = '') {
  const phoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/
  if (phoneNumber === '' || !phoneRegex.test(phoneNumber)) {
    return false
  }
  return true
}

/**
 * Kiểm tra regex email
 * @param {string} email - email check
 * @return {bool} - nếu sai thì trả về false
 * Created By Danh Hiếu - 13/10/2025
 */
export function validateEmail(email = '') {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email === '' || !emailRegex.test(email)) {
    return false
  }
  return true
}
