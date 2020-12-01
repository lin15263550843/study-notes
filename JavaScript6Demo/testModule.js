import { testModuleFun, testModuleVal } from './testModuleChildren.js'
export { testModuleVal, testModuleFun }
// 这里的行为跟导出变量是不一致的，这里导出的是值，导出的就是普通变量 a 的值，以后 a 的变化与导出的值就无关了，修改变量 a，不会使得其他模块中引入的 default 值发生改变。
export default { testModuleVal, testModuleFun }
