import BaseAPI from '@/apis/base/BaseApi'

class CustomerAPI extends BaseAPI {
  constructor() {
    super()
    this.controler = 'Customers'
  }
}

export default new CustomerAPI()
