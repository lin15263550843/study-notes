<script lang="ts">
import { defineComponent } from 'vue';
import problemCardBoxMixin from '@/components/problemCard/problemCardBoxMixin';
import { exch, executionCounter } from '@/commons/utils';

export default defineComponent({
    ...problemCardBoxMixin,
    setup() {
        return {
            title: '冒泡排序',
            description: '从小到大排序',
            dataSource: [58, 1, 5, 32, 21, 692, 8, 2, 692, 9, 3, 96, 7, 6, 12, 75, 43, 98, 23, 99, 56, 78],
            // dataSource: [1, 2, 3, 5, 6, 7, 8, 9, 12, 21, 23, 32, 43, 56, 58, 75, 78, 96, 98, 99, 692, 692],
        };
    },
    methods: {
        implementation(list: number[]) {
            executionCounter.start();
            const l = list.length - 1;
            for (let i = 0; i < l; i++) {
                for (let j = 0; j < l - i; j++) {
                    if (list[j] > list[j + 1]) {
                        exch(list, j, j + 1);
                        executionCounter.counter();
                    }
                }
            }
            executionCounter.end('冒泡排序交换次数');
            return list;
        },
        /**
         * 执行
         */
        execute() {
            this.result = this.implementation([...this.dataSource]);
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
