import isNode from 'detect-node'
import { proxy } from './comlinkjs'
import Worker from './axios.worker'

let axios = {}
if (!isNode) {
    axios = proxy(new Worker())
}
export default axios