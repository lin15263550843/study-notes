import { getTemplate } from './utils.js'

const effectStack = []
let activeEffect = undefined
const targetMap = new Map()

export class ToyVue {
    constructor(config) {
        console.log('config', config)
        const { el, data, methods } = config || {}
        this.template = getTemplate(el)
        this.data = reactive(data)
        // for (const method in methods) {
        //     if (Object.hasOwnProperty.call(methods, method)) {
        //         const fn = methods[method]
        //         if (typeof fn === 'function') {
        //             this[method] = () => {
        //                 // fn.apply(this.data)
        //                 // fn.apply(this.data)
        //             }
        //         }
        //     }
        // }
        this.methods = methods
        window.vue = this
        this.traversal(this.template)
    }

    /**
     * 处理模板
     * @param {Node} node 节点
     */
    traversal(node) {
        const { childNodes, nodeType, textContent } = node || {}
        // 替换 dom 中的变量（标识符）
        if (nodeType === Node.TEXT_NODE) {
            if (textContent.trim().match(/^{{([\s\S]+)}}$/)) {
                const property = RegExp.$1.trim()
                const keys = property.split('.')
                // if (keys.length === 1) {
                //     effect(() => {
                //         node.textContent = this.data[keys[0]]
                //     })
                // }
                let l = 0
                function getDataValue(result) {
                    if (l === keys.length - 1) {
                        return result[keys[l]]
                    }
                    return getDataValue(result[keys[l++]])
                }
                effect(() => {
                    const value = getDataValue(this.data)
                    node.textContent = value
                    l = 0
                })
            }
        }
        // 根据标识符执行相应的逻辑
        if (nodeType === Node.ELEMENT_NODE) {
            handlerCustomAttributes.call(this, node)
        }
        // 递归子节点
        if (childNodes && childNodes.length) {
            for (const child of childNodes) {
                this.traversal(child)
            }
        }
    }
}
/**
 * 代理 get 方法
 */
function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    // 存在才会收集依赖，防止重复收集
    if (activeEffect) {
        dep.add(activeEffect)
    }
    // 递归监听深层对象
    if (typeof res === 'object') {
        return reactive(res)
    }
    return res
}
/**
 * 代理 set 方法
 */
function set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver)
    // console.log(`set ${key} res--->>>`, res)
    // for (const effect of effectStack) {
    //     effect()
    // }
    const depsMap = targetMap.get(target)
    if (depsMap) {
        const dep = depsMap.get(key)
        if (dep) {
            const effects = dep.values()
            for (const effect of effects) {
                effect()
            }
        }
    }
    return res
}

/**
 * 响应式核心实现
 * 使用 Proxy 实现监听对象
 * @param {object} target 目标对象
 * @returns 代理对象
 */
export function reactive(target) {
    if (typeof target !== 'object') {
        // 非 object 不能被 proxy 代理，暂时直接返回（vue3 中使用的 ref 去处理的）
        return target
    }
    return new Proxy(target, { get, set })
}

/**
 * 使用 effect 进行依赖收集，进行有副作用的操作
 */
export function effect(fn) {
    // effectStack.push(fn)
    activeEffect = fn
    fn()
    // 执行完后得清空，不然会重复被收集
    activeEffect = null
}
// const strategies = {
//     'v-model': function (params) {},
// }
/**
 * 处理模板中不同的自定义属性
 * @param {Node} node 节点
 */
export function handlerCustomAttributes(node) {
    const { attributes } = node || {}
    // console.log('node------>>>', node)
    if (!attributes || attributes.length < 1) return
    for (const attribute of attributes) {
        const { name, value } = attribute
        if (name === 'v-model') {
            // v-model 实现双向数据绑定逻辑处理逻辑
            // effect(() => {
            //     node.value = ·this.data[value]
            // })
            // node.addEventListener('input', e => {
            //     console.log('input value------>>>', e.target.value)
            //     this.data[value] = e.target.value
            // })
            // 支持多层对象
            const keys = value.split('.')
            let l = 0
            function getDataValue(result) {
                if (l === keys.length - 1) {
                    return result[keys[l]]
                }
                return getDataValue(result[keys[l++]])
            }
            effect(() => {
                const value = getDataValue(this.data)
                node.value = value
                l = 0
            })
            node.addEventListener('input', e => {
                let k = 0
                const setObj = obj => {
                    if (k === keys.length - 1) {
                        console.log('input value------>>>', e.target.value)
                        obj[keys[k]] = e.target.value
                        return
                    }
                    return setObj(obj[keys[k++]])
                }
                setObj(this.data)
            })
        } else if (name.match(/^v-bind:([\s\S]+)/)) {
            // v-bind 实现动态数据绑定
            const attrName = RegExp.$1
            effect(() => {
                node.setAttribute(attrName, this.data[value])
            })
        } else if (name.match(/^v-on:([\s\S]+)/)) {
            // v-on 实现事件绑定
            const eventName = RegExp.$1
            // node.addEventListener(eventName, this[value])
            node.addEventListener(eventName, this.methods[value].bind(this.data))
        } else {
        }
    }
}
