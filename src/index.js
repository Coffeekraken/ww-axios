import { proxy } from './comlinkjs'
import Worker from './axios.worker'
const axios = proxy(new Worker())
export default axios