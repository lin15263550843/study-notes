export let testModuleVal = 0
// export let testModuleVal = { a: 111 }
export function testModuleFun() {
    testModuleVal += 5
    console.log('testModuleVal========', testModuleVal)
}
