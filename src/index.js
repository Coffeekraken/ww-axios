import '@babel/polyfill'
import { proxy } from 'comlinkjs'
import Worker from './worker'
const axios = proxy(new Worker())
export default axios