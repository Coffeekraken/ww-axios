import { detect } from 'detect-browser'
import { proxy } from 'comlinkjs'
import Worker from './axios.worker'

const browser = detect()
let axios = {}
if (browser) {
    axios = proxy(new Worker())
}
export default axios