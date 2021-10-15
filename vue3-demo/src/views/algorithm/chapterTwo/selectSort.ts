import { ref } from 'vue';
/**
 * 选择排序
 */
export function selectSort() {
    return [1, 2, 3];
}

export default {
    selectSort,
    title: '选择排序',
    description: '从小到大排序',
    // 数据源
    dataSource: [1, 5, 32, 21, 692, 8, 2, 9, 3, 96, 7, 6, 12, 75, 43, 98, 23, 99, 56, 78],
    // 结果
    result: ref<any>(''),
    vResult: ref<any>(''),
    // 执行
    execute() {
        console.log('this-------------', this);

        // this.result1 = this.greedyAlgorithm();

        this.result = 13;
    },
    // 清空执行结果
    clearResult() {
        this.result = '';
    },
    // 验证
    verification() {
        this.vResult = Math.max(...this.dataSource);
    },
    // 清空验证结果
    clearVResult() {
        this.vResult = '';
    },
};
