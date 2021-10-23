<script lang="ts">
import { defineComponent } from 'vue';
import problemCardBoxMixin from '@/components/problemCard/problemCardBoxMixin';
import { exch, executionCounter } from '@/commons/utils';

export default defineComponent({
    ...problemCardBoxMixin,
    setup() {
        return {
            title: '插入排序',
            description: '从小到大排序',
            dataSource: [58, 1, 5, 32, 21, 692, 8, 2, 692, 9, 3, 96, 7, 6, 12, 75, 43, 98, 23, 99, 56, 78],
            // dataSource: [1, 2, 3, 5, 6, 7, 8, 9, 12, 21, 23, 32, 43, 56, 58, 75, 78, 96, 98, 99, 692, 692],
        };
    },
    methods: {
        // 插入排序
        insertionSort(list: number[]) {
            executionCounter.start();
            const l = list.length;
            for (let i = 1; i < l; i++) {
                for (let j = i; list[j] < list[j - 1] && j > 0; j--) {
                    exch(list, j, j - 1);
                    executionCounter.counter();
                }
            }
            executionCounter.end('插入排序交换次数');
            return list;
        },
        // 更好的插入排序，减少数据交换
        betterInsertionSort(list: number[]) {
            executionCounter.start();
            const l = list.length;
            for (let i = 1; i < l; i++) {
                let j = i - 1;
                const v = list[i];
                while (j >= 0) {
                    if (list[j] > v) {
                        list[j + 1] = list[j];
                    } else {
                        break;
                    }
                    j--;
                    executionCounter.counter();
                }
                list[j + 1] = v;
            }
            executionCounter.end('插入排序交换次数');
            return list;
        },
        /**
         * 执行
         */
        execute() {
            this.result = this.betterInsertionSort([...this.dataSource]);
        },
        /**
         * 验证
         */
        verification() {
            this.vResult = [...this.dataSource].sort((a, b) => a - b);
        },
    },
});
</script>
