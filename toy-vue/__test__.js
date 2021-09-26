import { reactive, effect } from './toy-vue.js'

let dummy, dummy2, dummyStr
const counter = reactive({ num: 10 })
const counter2 = reactive({ str: 'str' })
console.log('dummy---1----', dummy, dummy2)
effect(() => (dummy = counter.num))
effect(() => (dummy2 = counter.num))
effect(() => (dummyStr = counter2.str))
console.log('dummy---2----', dummy, dummy2, dummyStr)
counter.num = 100
counter2.str = '哈哈哈'
console.log('dummy---3----', dummy, dummy2, dummyStr)
counter.num = 1000
counter2.str = '嘿嘿嘿'
console.log('dummy---4----', dummy, dummy2, dummyStr)
