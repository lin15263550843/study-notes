<script lang="ts">
import { defineComponent } from 'vue';
import problemCardBoxMixin from '@/components/problemCard/problemCardBoxMixin';
import { exch } from '@/commons/utils';
import { executionCounter } from '@/commons/tools';

export default defineComponent({
    ...problemCardBoxMixin,
    setup() {
        return {
            title: '选择排序',
            description: '从小到大排序',
            dataSource: [58, 1, 5, 32, 21, 692, 8, 2, 692, 9, 3, 96, 7, 6, 12, 75, 43, 98, 23, 99, 56, 78],
            // dataSource: [1, 2, 3, 5, 6, 7, 8, 9, 12, 21, 23, 32, 43, 56, 58, 75, 78, 96, 98, 99, 692, 692],
        };
    },
    methods: {
        // 选择排序
        selectSort(list: number[]) {
            executionCounter.start();
            const l = list.length;
            for (let i = 0; i < l; i++) {
                let min = i;
                for (let j = i; j < l; j++) {
                    // 找到 i 之后的最小元素
                    if (list[j] < list[min]) min = j;
                }
                // 交换 i 与 min 位置的元素
                exch(list, i, min);
                executionCounter.counter();
            }
            executionCounter.end('选择排序的交换次数');
            return list;
        },
        /**
         * 执行
         */
        execute() {
            this.result = this.selectSort([...this.dataSource]);
        },
        /**
         * 验证
         */
        verification() {
            executionCounter.start();
            this.vResult = [...this.dataSource].sort((a, b) => {
                const flag = a - b;
                if (flag) {
                    executionCounter.counter();
                }
                return flag;
            });
            executionCounter.end('Array  sort 方法的交换次数');
            // this.vResult = [...this.dataSource].sort((a, b) => a - b);
        },
    },
});
</script>
