// import { createElement } from './my-react'
import { createElement, render, Component } from './toy-react'

// 组件
class MyComponent extends Component {
    render() {
        console.log('this.children', this.children)
        return (
            <div class="my-component">
                <span>my component</span>
                <span>{this.children}</span>
            </div>
        )
    }
}

// jsx
const jsx = (
    <div id="root" class="cla">
        <div>hello</div>
        <MyComponent class="MyComponent">
            <div>word1</div>
            <div>word2</div>
            <div>word3</div>
        </MyComponent>
    </div>
)
console.log('jsx--->>>', jsx)

// document.body.appendChild(jsx)
render(jsx, document.body)
