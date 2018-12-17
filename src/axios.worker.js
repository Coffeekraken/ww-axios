import '@babel/polyfill'
import { expose, proxyValue } from './comlinkjs'
import axios from 'axios'
import isNode from 'detect-node'

if (!isNode) {
    const a = function() {
        axios.apply(this, arguments).then((response) => {
            return JSON.parse(JSON.stringify(response))
        }).catch((err) => {
            return JSON.parse(JSON.stringify(err))
        })
    }

    // map each methods available on axios
    const methods = ['request', 'get', 'delete', 'head', 'options', 'post', 'put', 'patch']
    methods.forEach((method) => {
        a[method] = async function() {
            return axios[method].apply(this, arguments).then((response) => {
                return JSON.parse(JSON.stringify(response))
            }).catch((err) => {
                return JSON.parse(JSON.stringify(err))
            })
        }
    })

    // map "defaults"
    a.defaults = axios.defaults

    // create method
    a.create = function() {
        let instance = axios.create.apply(this, arguments)
        const methods = ['request', 'get', 'delete', 'head', 'options', 'post', 'put', 'patch', 'getUri']
        const returnApi = {}
        methods.forEach((method) => {
            returnApi[method] = async function() {
                return instance[method].apply(this, arguments).then((response) => {
                    return JSON.parse(JSON.stringify(response))
                }).catch((err) => {
                    return JSON.parse(JSON.stringify(err))
                })
            }.bind(instance)
        })

        // map "defaults"
        returnApi.defaults = instance.defaults

        return proxyValue(returnApi)
    }

    expose(a, self)
}