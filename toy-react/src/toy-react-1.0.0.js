/**
 * 元素节点
 */
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
    appendChild(component) {
        this.root.appendChild(component.root)
    }
}
/**
 * 文本节点
 */
class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
}
/**
 * 组件都要继承自该 Component
 */
export class Component {
    constructor() {
        this.props = Object.create(null)
        this.children = []
    }
    setAttribute(name, value) {
        this.props[name] = value
    }
    appendChild(component) {
        this.children.push(component)
    }
    get root() {
        let _root = null
        if (!_root) {
            _root = this.render().root
            console.log('this Component', this)
        }
        return _root
    }
}
/**
 * creacteElement 实现
 */
export function createElement(type, attributes, ...children) {
    let e,
        notNode = document.createTextNode('')
    if (typeof type === 'string') {
        e = new ElementWrapper(type)
    } else if (typeof type === 'function') {
        e = new type()
    } else {
        // 非字符串，非自定义组件，暂时直接返回个空文本节点，以后再处理
        return notNode
    }
    if (attributes !== null) {
        for (const attrName in attributes) {
            if (Object.hasOwnProperty.call(attributes, attrName)) {
                e.setAttribute(attrName, attributes[attrName])
            }
        }
    }
    const inserChildren = children => {
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child)
            }
            // if (Object.prototype.toString.call(child).slice(8, -1) === 'Array') {
            if (typeof child === 'object' && child instanceof Array) {
                inserChildren(child)
            } else {
                e.appendChild(child)
            }
        }
    }
    inserChildren(children)
    return e
}
/**
 * 渲染函数
 */
export function render(component, parentElement) {
    console.log('component--->>>', component)
    parentElement.appendChild(component.root)
}

// /**
//  * creacteElement 实现
//  */
//  export function createElement(type, attributes, ...children) {
//     let e,
//         notNode = document.createTextNode('')
//     if (typeof type === 'string') {
//         e = document.createElement(type)
//     } else if (typeof type === 'function') {
//         e = new type()
//         if (e.render) {
//             e = e.render()
//             e.innerHTML = ''
//         } else {
//             return notNode
//         }
//     } else {
//         // 非字符串，非自定义组件，暂时直接返回个空文本节点，以后再处理
//         return notNode
//     }
//     if (attributes !== null) {
//         for (const attrName in attributes) {
//             if (Object.hasOwnProperty.call(attributes, attrName)) {
//                 e.setAttribute(attrName, attributes[attrName])
//             }
//         }
//     }
//     for (const child of children) {
//         if (typeof child === 'string') {
//             child = document.createTextNode(child)
//         }
//         e.appendChild(child)
//     }
//     return e
// }
