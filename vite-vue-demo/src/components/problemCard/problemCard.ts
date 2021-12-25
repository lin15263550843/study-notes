import { ref } from 'vue';

export default function () {
    const result = ref<any>('');
    const vResult = ref<any>('');
    return {
        /**
         * 执行结果
         */
        result,
        // 验证结果
        vResult,
        // 清空执行结果
        clearResult() {
            result.value = '';
        },
        // 清空验证结果
        clearVResult() {
            vResult.value = '';
        },
    };
}
// selectSort,
// title: '选择排序',
// description: '从小到大排序',
// // 数据源
// dataSource: [1, 5, 32, 21, 692, 8, 2, 9, 3, 96, 7, 6, 12, 75, 43, 98, 23, 99, 56, 78],
// 执行
// execute() {
//     console.log('this-------------', this);
//     result.value = 13;
// },
// 验证
// verification() {
//     vResult.value = Math.max(...this.dataSource);
// },
