const RENDER_TO_DOM = Symbol('render to dom') //私有变量
/**
 * 元素节点
 */
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)
    }

    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            this.root.addEventListener(
                RegExp.$1.replace(/^[\s\S]/, v => v.toLocaleLowerCase()),
                value,
            )
        } else {
            // this.root.setAttribute(name, value)
            this.root[name] = value
        }
    }
    appendChild(component) {
        const range = document.createRange()
        range.setStart(this.root, this.root.childNodes.length)
        range.setEnd(this.root, this.root.childNodes.length)
        range.deleteContents()
        component[RENDER_TO_DOM](range)
    }

    [RENDER_TO_DOM](range) {
        range.deleteContents()
        range.insertNode(this.root)
    }
}
/**
 * 文本节点
 */
class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }

    [RENDER_TO_DOM](range) {
        range.deleteContents()
        range.insertNode(this.root)
    }
}
/**
 * 组件都要继承自该 Component
 */
export class Component {
    constructor() {
        this.props = Object.create(null)
        this.children = []
        this._range = null
    }

    setAttribute(name, value) {
        this.props[name] = value
    }
    appendChild(component) {
        this.children.push(component)
    }

    [RENDER_TO_DOM](range) {
        this._range = range
        this.render()[RENDER_TO_DOM](range)
    }
    // get root() {
    //     let _root = null
    //     if (!_root) {
    //         _root = this.render().root
    //         console.log('this Component', this)
    //     }
    //     return _root
    // }
    rerender() {
        const oldRange = this._range

        const range = document.createRange()
        range.setStart(oldRange.startContainer, oldRange.startOffset)
        range.setEnd(oldRange.startContainer, oldRange.startOffset)
        this[RENDER_TO_DOM](range)

        oldRange.setStart(range.endContainer, range.endOffset)
        oldRange.deleteContents()
    }
    setState(newState) {
        if (newState === null || typeof newState !== 'object') {
            this.state = newState
            this.rerender()
            return
        }

        const merge = (oldState, newState) => {
            for (const key in newState) {
                if (Object.hasOwnProperty.call(newState, key)) {
                    const oldKey = oldState[key]
                    const newKey = newState[key]
                    if (oldKey === null || typeof oldKey !== 'object') {
                        oldState[key] = newKey
                    } else {
                        merge(oldState[key], newKey)
                    }
                }
            }
        }
        merge(this.state, newState)
        this.rerender()
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
            if (child === null) {
                continue
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
    const range = document.createRange()
    range.setStart(parentElement, 0)
    range.setEnd(parentElement, parentElement.childNodes.length)
    range.deleteContents()
    component[RENDER_TO_DOM](range)
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
