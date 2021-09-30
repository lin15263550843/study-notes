const RENDER_TO_DOM = Symbol('render to dom') //私有变量

let testthis = null
/**
 * 组件都要继承自该 Component
 */
export class Component {
    constructor() {
        this.props = Object.create(null)
        this.children = []
        this._range = null
        this._vdom = null
    }

    setAttribute(name, value) {
        this.props[name] = value
    }
    appendChild(component) {
        this.children.push(component)
    }

    [RENDER_TO_DOM](range) {
        this._range = range
        this._vdom = this.vdom
        this._vdom[RENDER_TO_DOM](range)
    }

    get vdom() {
        const component = this.render()
        return component.vdom
    }
    // get vchildren() {
    //     return this.children.map(child => child.vdom)
    // }

    // get root() {
    //     let _root = null
    //     if (!_root) {
    //         _root = this.render().root
    //     }
    //     return _root
    // }

    // rerender() {
    //     const oldRange = this._range

    //     const range = document.createRange()
    //     range.setStart(oldRange.startContainer, oldRange.startOffset)
    //     range.setEnd(oldRange.startContainer, oldRange.startOffset)
    //     this[RENDER_TO_DOM](range)

    //     oldRange.setStart(range.endContainer, range.endOffset)
    //     oldRange.deleteContents()
    // }
    update() {
        const isSameNode = (oldNode, newNode) => {
            const { type: oldType, props: oldProps, content: oldContent } = oldNode
            const { type: newType, props: newProps, content: newContent } = newNode
            if (oldType !== newType) {
                return false
            }
            if (newType === '#text') {
                if (oldContent !== newContent) {
                    return false
                }
            }
            if (Object.keys(newProps).length !== Object.keys(oldProps).length) {
                return false
            }
            for (const key in newProps) {
                if (Object.hasOwnProperty.call(newProps, key)) {
                    const newValue = newProps[key]
                    const oldValue = oldProps[key]
                    if (newValue !== oldValue) {
                        return false
                    }
                }
            }
            return true
        }
        const update = (oldNode, newNode) => {
            if (!isSameNode(oldNode, newNode)) {
                newNode[RENDER_TO_DOM](oldNode._range)
                return
            }
            newNode._range = oldNode._range

            const { vchildren: newVchildren } = newNode
            const { vchildren: oldVchildren } = oldNode
            const oldVchildrenLength = oldVchildren.length

            if (!newVchildren || newVchildren.length < 1) {
                return
            }

            let tailRange = oldVchildren[oldVchildrenLength - 1]._range

            newVchildren.forEach((newVchild, i) => {
                const oldVchild = oldVchildren[i]
                if (i < oldVchildrenLength) {
                    update(oldVchild, newVchild)
                } else {
                    // newNode[RENDER_TO_DOM](oldNode._range)
                    const range = document.createRange()
                    range.setStart(tailRange.endContainer, tailRange.endOffset)
                    range.setEnd(tailRange.endContainer, tailRange.endOffset)
                    newVchild[RENDER_TO_DOM](range)
                    tailRange = range
                }
            })
        }

        const vdom = this.vdom
        update(this._vdom, vdom)
        this._vdom = vdom
    }

    setState(newState) {
        if (newState === null || typeof newState !== 'object') {
            this.state = newState
            this.update()
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
        this.update()
    }
}
/**
 * 元素节点
 */
class ElementWrapper extends Component {
    constructor(type) {
        super(type)
        this.type = type
        this._range = null
        // this.root = document.createElement(type)
    }

    // setAttribute(name, value) {
    //     if (name.match(/^on([\s\S]+)$/)) {
    //         this.root.addEventListener(
    //             RegExp.$1.replace(/^[\s\S]/, v => v.toLocaleLowerCase()),
    //             value,
    //         )
    //     } else {
    //         // this.root.setAttribute(name, value)
    //         this.root[name] = value
    //     }
    // }
    // appendChild(component) {
    //     const range = document.createRange()
    //     range.setStart(this.root, this.root.childNodes.length)
    //     range.setEnd(this.root, this.root.childNodes.length)
    //     range.deleteContents()
    //     component[RENDER_TO_DOM](range)
    // }

    get vdom() {
        // return {
        //     type: this.type,
        //     props: this.props,
        //     children: this.children.map(child => child.vdom),
        // }
        this.vchildren = this.children.map(child => child.vdom)
        return this
    }

    [RENDER_TO_DOM](range) {
        this._range = range

        // range.deleteContents()

        const root = document.createElement(this.type)
        const props = this.props
        for (const name in props) {
            if (Object.hasOwnProperty.call(props, name)) {
                const value = props[name]
                if (name.match(/^on([\s\S]+)$/)) {
                    root.addEventListener(
                        RegExp.$1.replace(/^[\s\S]/, v => v.toLocaleLowerCase()),
                        value,
                    )
                } else {
                    // props.setAttribute(name, value)
                    root[name] = value
                }
            }
        }
        if (!this.vchildren) {
            this.vchildren = this.children.map(child => child.vdom)
        }
        for (const child of this.vchildren) {
            const childRange = document.createRange()
            const l = root.childNodes.length
            childRange.setStart(root, l)
            childRange.setEnd(root, l)
            childRange.deleteContents()
            child[RENDER_TO_DOM](childRange)
        }

        replaceContent(range, root)
        // range.insertNode(root)
    }
}
/**
 * 文本节点
 */
class TextWrapper extends Component {
    constructor(content) {
        super(content)
        this.type = '#text'
        this.content = content
        this.___rtet = null
        this._range = null
    }

    [RENDER_TO_DOM](range) {
        this._range = range

        const root = document.createTextNode(this.content)
        // range.deleteContents()
        // range.insertNode(root)
        replaceContent(range, root)
    }

    get vdom() {
        // return {
        //     type: '#text',
        //     content: this.content,
        // }
        this.vchildren = this.children.map(child => child.vdom)
        return this
    }
}
/**
 * creacteElement 实现
 */
export function createElement(type, attributes, ...children) {
    let e
    if (typeof type === 'string') {
        e = new ElementWrapper(type)
    } else {
        e = new type()
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
    const range = document.createRange()
    range.setStart(parentElement, 0)
    range.setEnd(parentElement, parentElement.childNodes.length)
    range.deleteContents()
    testthis = component
    component[RENDER_TO_DOM](range)
}

function replaceContent(range, node) {
    range.insertNode(node)
    range.setStartAfter(node)
    range.deleteContents()

    range.setStartBefore(node)
    range.setEndAfter(node)
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
