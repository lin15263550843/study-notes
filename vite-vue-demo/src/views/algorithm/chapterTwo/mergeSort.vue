<script lang="ts">
import { defineComponent } from 'vue';
import problemCardBoxMixin from '@/components/problemCard/problemCardBoxMixin';
import { executionCounter } from '@/commons/tools';

export default defineComponent({
    ...problemCardBoxMixin,
    setup() {
        return {
            title: '归并排序',
            description: '从小到大排序',
            // dataSource: [58, 1, 5, 32, 21, 692, 8, 2, 124],
            dataSource: [58, 1, 5, 32, 21, 76, 8, 2, 23, 9, 3, 96, 7, 6, 12, 75, 43, 45, 23, 99, 56, 78, 90],
            // dataSource: [1, 3, 6, 11, 12, 23, 32, 43, 56, 75, 178, 198, 2, 5, 9, 21, 58, 75, 76, 96, 97, 99, 312, 512],
            // dataSource: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            aux: [] as any[],
        };
    },
    methods: {
        /**
         * 原地归并抽象方法
         */
        merge(a: any[], lo: number, mid: number, hi: number) {
            let i = lo,
                j = mid + 1;
            for (let x = lo; x <= hi; x++) {
                // executionCounter.counter();
                this.aux[x] = a[x];
            }
            for (let k = lo; k <= hi; k++) {
                if (i > mid) {
                    // 左半边数组用尽了，取右边半数组
                    a[k] = this.aux[j++];
                } else if (j > hi) {
                    // 右半边数组用尽了，取左半边数组
                    a[k] = this.aux[i++];
                } else if (this.aux[j] < this.aux[i]) {
                    // 右半边的当前元素小于左半边的当前元素，取右边半边的元素
                    a[k] = this.aux[j++];
                } else {
                    // 右半边的当前元素大于等于左半边的当前元素，取左半边的元素
                    a[k] = this.aux[i++];
                }
                executionCounter.counter();
            }
            return a;
        },
        /**
         * 自顶向下归并排序
         */
        topDownMergeSort(a: number[]) {
            executionCounter.start();
            const l = a.length;
            const sort = (a: number[], lo: number, hi: number) => {
                if (hi <= lo) return;
                const mid = (lo + (hi - lo) / 2) >>> 0;
                // 减少 sort 的无效调用
                if (hi > lo + 1) {
                    sort(a, lo, mid);
                    sort(a, mid + 1, hi);
                }
                // 如果 a[mid] <= a[mid + 1] 我们就认为数组已经有序了
                if (a[mid] <= a[mid + 1]) return;
                this.merge(a, lo, mid, hi);
            };
            // this.merge(a, 0, Math.round(l / 2) - 1, l - 1);
            sort(a, 0, l - 1);
            executionCounter.end('自顶向下归并排序遍历次数');
            return a;
        },
        /**
         * 自底向上归并排序
         */
        bottomUpMergeSort(a: number[]) {
            executionCounter.start();
            const n = a.length;
            // size = 1，两两归并，然后size 翻倍（把每个元素想象成一个大小为 1 的数组）
            // size = 2，四四归并，然后 size 再翻倍（将两个大小为 2 的数组归并成一个有 4 个元素的数组）
            // 以此类推，每次 size 都会翻倍...
            // 最后一次 size 的大小不能超过数组长度
            // 外层循环表示要循环多少次，最后才能是最顶层两个数组的归并
            for (let size = 1; size < n; size *= 2) {
                // n - size 表示
                for (let lo = 0; lo < n - size; lo = lo + size * 2) {
                    const hi = lo + size * 2 - 1;
                    const mid = lo + size - 1;
                    // 如果 a[mid] <= a[mid + 1] 我们就认为数组已经有序了
                    // if (hi >= n - 1) hi = n - 1;
                    if (a[mid] <= a[mid + 1]) continue;
                    // hi 不能超过 数组的大小
                    this.merge(a, lo, mid, Math.min(hi, n - 1));
                }
            }
            executionCounter.end('自底向上归并排序遍历次数');
            return a;
        },
        implementation(a: number[]) {
            // return this.topDownMergeSort(a);
            return this.bottomUpMergeSort(a);
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
