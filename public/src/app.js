import axios from '../../src/index'

axios.get('https://randomuser.me/api/').then((response) => {
    console.log('response', response)
})

// axios.defaults.baseURL = 'https://randomuser.me/api/';
// axios.defaults.headers.common['Authorization'] = 'COCO';

// const instance = axios.create({
//     headers: {'X-Custom-Header': 'foobar'}
// }).then((a) => {
//     a.get().then((response) => {
//         console.log(response)
//     })
// })

// console.dir(instance);

// setTimeout(() => {
//     
// }, 1000)

// axios.get('https://randomuser.me/api/').then((response) => {
//     console.log('response', response)
// })

// console.log(axios)