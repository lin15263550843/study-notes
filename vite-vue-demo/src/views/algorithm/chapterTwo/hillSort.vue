<script lang="ts">
import { defineComponent } from 'vue';
import problemCardBoxMixin from '@/components/problemCard/problemCardBoxMixin';
import { exch } from '@/commons/utils';
import { executionCounter } from '@/commons/tools';

export default defineComponent({
    ...problemCardBoxMixin,
    setup() {
        return {
            title: '希尔排序',
            description: '从小到大排序',
            dataSource: [58, 1, 5, 32, 21, 692, 8, 2, 692, 9, 3, 96, 7, 6, 12, 75, 43, 98, 23, 99, 56, 78],
            // dataSource: [1, 2, 3, 5, 6, 7, 8, 9, 12, 21, 23, 32, 43, 56, 58, 75, 78, 96, 98, 99, 692, 692],
        };
    },
    methods: {
        // 希尔排序
        insertionSort(list: number[]) {
            executionCounter.start();
            const l = list.length;
            let h = 1;
            // 使用序列 1/2(3º-1), 从 N/3 开始递减至 1
            while (h < l / 3) {
                h = 3 * h + 1; // 1, 4, 13, 40, 121, ...
            }
            while (h >= 1) {
                for (let i = h; i < l; i++) {
                    for (let j = i; list[j] < list[j - h] && j > 0; j -= h) {
                        exch(list, j, j - h);
                        executionCounter.counter();
                    }
                }
                h = Math.round(h / 3);
            }
            executionCounter.end('希尔排序交换次数');
            return list;
        },
        /**
         * 执行
         */
        execute() {
            this.result = this.insertionSort([...this.dataSource]);
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
