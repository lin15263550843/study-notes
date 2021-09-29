/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/toy-react-3.0.0.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RENDER_TO_DOM = Symbol('render to dom'); //私有变量

var testthis = null;
/**
 * 组件都要继承自该 Component
 */

var Component = /*#__PURE__*/function () {
  function Component() {
    _classCallCheck(this, Component);

    this.props = Object.create(null);
    this.children = [];
    this._range = null;
    this._vdom = null;
  }

  _createClass(Component, [{
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this.props[name] = value;
    }
  }, {
    key: "appendChild",
    value: function appendChild(component) {
      this.children.push(component);
    }
  }, {
    key: RENDER_TO_DOM,
    value: function value(range) {
      this._range = range;
      this._vdom = this.vdom;
      console.log('this----------------------', this);

      this._vdom[RENDER_TO_DOM](range);
    }
  }, {
    key: "vdom",
    get: function get() {
      var component = this.render();
      return component.vdom;
    } // get vchildren() {
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

  }, {
    key: "update",
    value: function update() {
      var isSameNode = function isSameNode(oldNode, newNode) {
        var oldType = oldNode.type,
            oldProps = oldNode.props,
            oldContent = oldNode.content;
        var newType = newNode.type,
            newProps = newNode.props,
            newContent = newNode.content;

        if (oldType !== newType) {
          return false;
        }

        if (newType === '#text') {
          if (oldContent !== newContent) {
            return false;
          }
        }

        if (Object.keys(newProps).length !== Object.keys(oldProps).length) {
          return false;
        }

        for (var key in newProps) {
          if (Object.hasOwnProperty.call(newProps, key)) {
            var newValue = newProps[key];
            var oldValue = oldProps[key];

            if (newValue !== oldValue) {
              return false;
            }
          }
        }

        return true;
      };

      var update = function update(oldNode, newNode) {
        if (!isSameNode(oldNode, newNode)) {
          newNode[RENDER_TO_DOM](oldNode._range);
          return;
        }

        newNode._range = oldNode._range;
        var oldVchildren = oldNode.vchildren;
        var oldVchildrenLength = oldVchildren.length;
        newNode.vchildren.forEach(function (newVchild, i) {
          var oldVchild = oldVchildren[i];

          if (i < oldVchildrenLength) {
            update(oldVchild, newVchild);
          } else {
            newNode[RENDER_TO_DOM](oldNode._range);
          }
        });
      };

      var vdom = this.vdom;
      update(this._vdom, vdom);
      this._vdom = vdom;
    }
  }, {
    key: "setState",
    value: function setState(newState) {
      if (newState === null || _typeof(newState) !== 'object') {
        this.state = newState;
        this.update();
        return;
      }

      var merge = function merge(oldState, newState) {
        for (var key in newState) {
          if (Object.hasOwnProperty.call(newState, key)) {
            var oldKey = oldState[key];
            var newKey = newState[key];

            if (oldKey === null || _typeof(oldKey) !== 'object') {
              oldState[key] = newKey;
            } else {
              merge(oldState[key], newKey);
            }
          }
        }
      };

      merge(this.state, newState);
      this.update();
    }
  }]);

  return Component;
}();
/**
 * 元素节点
 */

var ElementWrapper = /*#__PURE__*/function (_Component) {
  _inherits(ElementWrapper, _Component);

  var _super = _createSuper(ElementWrapper);

  function ElementWrapper(type) {
    var _this;

    _classCallCheck(this, ElementWrapper);

    _this = _super.call(this, type);
    _this.type = type;
    _this._range = null;
    console.log('ElementWrapper this-----------------------------------', _assertThisInitialized(_this)); // this.root = document.createElement(type)

    return _this;
  } // setAttribute(name, value) {
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


  _createClass(ElementWrapper, [{
    key: "vdom",
    get: function get() {
      // return {
      //     type: this.type,
      //     props: this.props,
      //     children: this.children.map(child => child.vdom),
      // }
      this.vchildren = this.children.map(function (child) {
        return child.vdom;
      });
      return this;
    }
  }, {
    key: RENDER_TO_DOM,
    value: function value(range) {
      this._range = range; // range.deleteContents()

      var root = document.createElement(this.type);
      var props = this.props;

      for (var name in props) {
        if (Object.hasOwnProperty.call(props, name)) {
          var value = props[name];

          if (name.match(/^on([\s\S]+)$/)) {
            root.addEventListener(RegExp.$1.replace(/^[\s\S]/, function (v) {
              return v.toLocaleLowerCase();
            }), value);
          } else {
            // props.setAttribute(name, value)
            root[name] = value;
          }
        }
      }

      if (!this.vchildren) {
        this.vchildren = this.children.map(function (child) {
          return child.vdom;
        });
      }

      var _iterator = _createForOfIteratorHelper(this.vchildren),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          var _range = document.createRange();

          var l = root.childNodes.length;

          _range.setStart(root, l);

          _range.setEnd(root, l);

          _range.deleteContents();

          child[RENDER_TO_DOM](_range);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      replaceContent(range, root); // range.insertNode(root)
    }
  }]);

  return ElementWrapper;
}(Component);
/**
 * 文本节点
 */


var TextWrapper = /*#__PURE__*/function (_Component2) {
  _inherits(TextWrapper, _Component2);

  var _super2 = _createSuper(TextWrapper);

  function TextWrapper(content) {
    var _this2;

    _classCallCheck(this, TextWrapper);

    _this2 = _super2.call(this, content);
    _this2.type = '#text';
    _this2.content = content;
    _this2.___rtet = null;
    _this2._range = null;
    return _this2;
  }

  _createClass(TextWrapper, [{
    key: RENDER_TO_DOM,
    value: function value(range) {
      this._range = range;
      var root = document.createTextNode(this.content); // range.deleteContents()
      // range.insertNode(root)

      replaceContent(range, root);
    }
  }, {
    key: "vdom",
    get: function get() {
      // return {
      //     type: '#text',
      //     content: this.content,
      // }
      this.vchildren = this.children.map(function (child) {
        return child.vdom;
      });
      return this;
    }
  }]);

  return TextWrapper;
}(Component);
/**
 * creacteElement 实现
 */


function createElement(type, attributes) {
  var e;

  if (typeof type === 'string') {
    e = new ElementWrapper(type);
  } else {
    e = new type();
  }

  if (attributes !== null) {
    for (var attrName in attributes) {
      if (Object.hasOwnProperty.call(attributes, attrName)) {
        e.setAttribute(attrName, attributes[attrName]);
      }
    }
  }

  var inserChildren = function inserChildren(children) {
    var _iterator2 = _createForOfIteratorHelper(children),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var child = _step2.value;

        if (typeof child === 'string') {
          child = new TextWrapper(child);
        }

        if (child === null) {
          continue;
        } // if (Object.prototype.toString.call(child).slice(8, -1) === 'Array') {


        if (_typeof(child) === 'object' && child instanceof Array) {
          inserChildren(child);
        } else {
          e.appendChild(child);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  };

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  inserChildren(children);
  return e;
}
/**
 * 渲染函数
 */

function render(component, parentElement) {
  var range = document.createRange();
  range.setStart(parentElement, 0);
  range.setEnd(parentElement, parentElement.childNodes.length);
  range.deleteContents();
  testthis = component;
  component[RENDER_TO_DOM](range);
}

function replaceContent(range, node) {
  range.insertNode(node);
  range.setStartAfter(node);
  range.deleteContents();
  range.setStartBefore(node);
  range.setEndAfter(node);
} // /**
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
;// CONCATENATED MODULE: ./src/main.js
function main_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { main_typeof = function _typeof(obj) { return typeof obj; }; } else { main_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return main_typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || main_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function main_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return main_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return main_arrayLikeToArray(o, minLen); }

function main_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function main_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function main_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function main_createClass(Constructor, protoProps, staticProps) { if (protoProps) main_defineProperties(Constructor.prototype, protoProps); if (staticProps) main_defineProperties(Constructor, staticProps); return Constructor; }

function main_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) main_setPrototypeOf(subClass, superClass); }

function main_setPrototypeOf(o, p) { main_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return main_setPrototypeOf(o, p); }

function main_createSuper(Derived) { var hasNativeReflectConstruct = main_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = main_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = main_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return main_possibleConstructorReturn(this, result); }; }

function main_possibleConstructorReturn(self, call) { if (call && (main_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return main_assertThisInitialized(self); }

function main_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function main_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function main_getPrototypeOf(o) { main_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return main_getPrototypeOf(o); }

// import { createElement } from './my-react'


var Square = /*#__PURE__*/function (_Component) {
  main_inherits(Square, _Component);

  var _super = main_createSuper(Square);

  function Square(props) {
    main_classCallCheck(this, Square);

    return _super.call(this, props);
  }

  main_createClass(Square, [{
    key: "render",
    value: function render() {
      return createElement("button", {
        className: "square",
        onClick: this.props.onClick
      }, this.props.value);
    }
  }]);

  return Square;
}(Component);

var Board = /*#__PURE__*/function (_Component2) {
  main_inherits(Board, _Component2);

  var _super2 = main_createSuper(Board);

  function Board() {
    main_classCallCheck(this, Board);

    return _super2.apply(this, arguments);
  }

  main_createClass(Board, [{
    key: "renderSquare",
    value: function renderSquare(i) {
      var _this = this;

      return createElement(Square, {
        value: this.props.squares[i],
        onClick: function onClick() {
          return _this.props.onClick(i);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "board-----------22222---------board"
      }, createElement("div", {
        className: "board-row"
      }, this.renderSquare(0), this.renderSquare(1), this.renderSquare(2)), createElement("div", {
        className: "board-row"
      }, this.renderSquare(3), this.renderSquare(4), this.renderSquare(5)), createElement("div", {
        className: "board-row"
      }, this.renderSquare(6), this.renderSquare(7), this.renderSquare(8)));
    }
  }]);

  return Board;
}(Component);

var Game = /*#__PURE__*/function (_Component3) {
  main_inherits(Game, _Component3);

  var _super3 = main_createSuper(Game);

  function Game(props) {
    var _this2;

    main_classCallCheck(this, Game);

    _this2 = _super3.call(this, props);
    _this2.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
    return _this2;
  }

  main_createClass(Game, [{
    key: "handleClick",
    value: function handleClick(i) {
      var history = this.state.history.slice(0, this.state.stepNumber + 1);
      var current = history[history.length - 1];
      var squares = current.squares.slice();

      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  }, {
    key: "jumpTo",
    value: function jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var history = this.state.history;
      var current = history[this.state.stepNumber];
      var winner = calculateWinner(current.squares);
      var moves = history.map(function (step, move) {
        var desc = move ? 'Go to move #' + move : 'Go to game start';
        return createElement("li", {
          key: move
        }, createElement("button", {
          onClick: function onClick() {
            return _this3.jumpTo(move);
          }
        }, desc));
      });
      var status;

      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return createElement("div", {
        className: "game"
      }, createElement("div", {
        className: "game-board",
        test: "game--------------------game"
      }, createElement(Board, {
        className: "board--------------------board",
        squares: current.squares,
        onClick: function onClick(i) {
          return _this3.handleClick(i);
        }
      })), createElement("div", {
        className: "game-info"
      }, createElement("div", null, status), createElement("ol", null, moves)));
    }
  }]);

  return Game;
}(Component); // ========================================


render(createElement(Game, null), document.getElementById('root')); // const game = <Game />
// console.log('game', game)

function calculateWinner(squares) {
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  for (var i = 0; i < lines.length; i++) {
    var _lines$i = _slicedToArray(lines[i], 3),
        a = _lines$i[0],
        b = _lines$i[1],
        c = _lines$i[2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
/****************************************我是一条分割线***********************************************/
// 组件
// class MyComponent extends Component {
//     constructor() {
//         super()
//         this.state = {
//             a: 1,
//             b: '哈哈哈',
//         }
//     }
//     render() {
//         console.log('MyComponent---this', this)
//         return (
//             <div class="my-component">
//                 <div>my component</div>
//                 <button
//                     onClick={() => {
//                         // this.state.a++
//                         // this.rerender()
//                         this.setState({ a: this.state.a + 1 })
//                     }}
//                 >
//                     add a
//                 </button>
//                 <div>a={this.state.a.toString()}</div>
//                 <div>a={this.state.b.toString()}</div>
//                 <div>{this.children}</div>
//             </div>
//         )
//     }
// }
// // jsx
// const jsx = (
//     <div class="cla">
//         <div>hello</div>
//         <MyComponent class="MyComponent">
//             <div>word1</div>
//             <div>word2</div>
//             <div>word3</div>
//         </MyComponent>
//     </div>
// )
// console.log('jsx--->>>', jsx)
// document.body.appendChild(jsx)
// render(jsx, document.querySelector('#root2'))
/******/ })()
;