<script lang="ts">
import { defineComponent } from 'vue';
import problemCardBoxMixin from '@/components/problemCard/problemCardBoxMixin';
import { sink, exch } from '@/commons/utils';
import { testExecTime } from '@/commons/tools';

export default defineComponent({
    ...problemCardBoxMixin,
    setup() {
        return {
            title: '堆排序',
            description: '从小到大排序',
            dataSource: [58, 1, 5, 32, 21, 692, 8, 2, 692, 9, 3, 96, 7, 6, 12, 75, 43, 98, 23, 99, 56, 78],
            // dataSource: [1, 2, 3, 5, 6, 7, 8, 9, 12, 21, 23, 32, 43, 56, 58, 75, 78, 96, 98, 99, 692, 692],
        };
    },
    methods: {
        implementation(a: number[]) {
            let N = a.length;
            for (let k = (N / 2) >>> 0; k > 0; k--) {
                sink(a, k, N);
            }
            while (N > 1) {
                exch(a, 0, --N);
                sink(a, 1, N);
            }
            return a;
        },
        /**
         * 执行
         */
        execute() {
            this.result = this.implementation([...this.dataSource]);
            testExecTime(this.implementation, 1000000, '堆排序');
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
