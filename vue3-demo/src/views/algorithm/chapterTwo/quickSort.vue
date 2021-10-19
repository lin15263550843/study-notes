<script lang="ts">
import { defineComponent } from 'vue';
import problemCardBoxMixin from '@/components/problemCard/problemCardBoxMixin';
import { exch, executionCounter } from '@/commons/utils';

export default defineComponent({
    ...problemCardBoxMixin,
    setup() {
        return {
            title: '快速排序',
            description: '从小到大排序',
            // dataSource: [58, 1, 5, 32, 21, 692, 8, 2, 124],
            // dataSource: [58, 1, 5, 32, 21, 76, 8, 2, 23, 9, 3, 96, 7, 6, 12, 75, 43, 45, 23, 99, 56, 78, 90],
            dataSource: [1, 3, 6, 11, 12, 23, 32, 43, 56, 75, 178, 198, 2, 5, 9, 21, 58, 75, 76, 96, 97, 99, 312, 512],
            // dataSource: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            aux: [] as any[],
        };
    },
    methods: {
        /**
         * 快速排序的切分
         */
        partition(a: number[], lo: number, hi: number) {
            const v = a[lo]; // 取第一个元素为切分元素
            console.log('v-------------------------------------', v);
            let i = lo,
                j = hi;
            // for (; j <= i; i++) {
            //     for (; j >= i; j--) {
            //         if (condition) {

            //         }
            //     }
            // }
            while (j > i) {
                while (a[++i] < v) {
                    if (i >= hi) break;
                }
                while (a[j] > v) {
                    j--;
                    if (j <= lo) break;
                }
                if (i >= j) break;
                console.log('i, a[i]------------------------', i, a[i]);
                console.log('j, a[j]------------------------', j, a[j]);
                console.log('-------------------------------', JSON.stringify(a));

                executionCounter.counter();
                exch(a, i, j);
            }
            console.log('i， j============------------', i, j, a[j]);
            if (lo === j) return j;
            exch(a, lo, j);
            console.log('jjj a------------------------', JSON.stringify(a));
            return j;
        },
        implementation(a: number[]) {
            executionCounter.start();
            const sort = (a: number[], lo: number, hi: number) => {
                if (hi <= lo) return;
                // 切分位置
                const k = this.partition(a, lo, hi);
                console.log('k--------------------------------------------------------------', k);
                // 将左版部分 a[lo, ..., k-1] 排序
                sort(a, lo, k - 1);
                // 将右半部分 a[k+1, ..., hi] 排序
                sort(a, k + 1, hi);
            };
            sort(a, 0, a.length - 1);
            executionCounter.end('快速排序遍历次数');
            return a;
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
    onMounted() {
        console.log('this------------', this);
    },
    mounted() {
        console.log('this》》》》》》》》》》》》》》》》》》》》》', this);
    },
});
</script>
