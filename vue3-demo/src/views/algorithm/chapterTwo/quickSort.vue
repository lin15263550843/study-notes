<script lang="ts">
import { defineComponent } from 'vue';
import problemCardBoxMixin from '@/components/problemCard/problemCardBoxMixin';
import { exch } from '@/commons/utils';
import { executionCounter, testExecTime } from '@/commons/tools';

export default defineComponent({
    ...problemCardBoxMixin,
    setup() {
        return {
            title: '快速排序',
            description: '从小到大排序',
            // dataSource: [58, 1, 5, 32, 21, 692, 8, 2, 124],
            dataSource: [58, 1, 5, 32, 21, 76, 8, 2, 23, 9, 3, 96, 7, 6, 12, 75, 43, 45, 23, 99, 56, 78, 90],
            // dataSource: [1, 3, 6, 11, 12, 23, 32, 43, 56, 75, 178, 198, 2, 5, 9, 21, 58, 75, 76, 96, 97, 99, 312, 512],
            // dataSource: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
            aux: [] as any[],
        };
    },
    methods: {
        /**
         * 快速排序的切分
         */
        partition(a: number[], lo: number, hi: number) {
            // 取第一个元素为切分元素
            const v = a[lo];
            // 左右扫描的指针
            let i = lo,
                j = hi + 1; // 会先执行 --j 所以要先 +1 保证是从 hi 开始的
            while (j > i) {
                // 从左侧开始取第一个大于 v 的元素
                while (a[++i] < v) if (i >= hi) break;
                // 从右侧开始取第一个小于 v 的元素
                // 当 j 小到 lo 时  a[j] 也是 v, v 不可能大于本身，所以此处的 if (j <= lo) break; 可以省略
                // while (a[--j] > v) if (j <= lo) break;
                while (a[--j] > v);
                // 当 i 和 j 相遇时，说明本轮切分完毕，直接退出循环
                if (i >= j) break;
                executionCounter.counter();
                // 交换他们的位置
                exch(a, i, j);
            }
            if (lo === j) return j; // 阻止自己和自己原地交换
            exch(a, lo, j); // 将 v 切分位 放入正确的位置
            return j;
        },
        implementation(a: number[]) {
            executionCounter.start();
            const sort = (a: number[], lo: number, hi: number) => {
                if (hi <= lo) return;
                // 切分位置
                const k = this.partition(a, lo, hi);
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
         * 三向切分的快速排序
         */
        threeWaySplitQuickSort(a: number[]) {
            executionCounter.start();
            const sort = (a: number[], lo: number, hi: number) => {
                if (hi <= lo) return;
                let lt = lo,
                    i = lo + 1,
                    gt = hi;
                const v = a[lo];
                while (i <= gt) {
                    const iv = a[i];
                    if (iv < v) {
                        exch(a, lt++, i++);
                    } else if (iv > v) {
                        exch(a, i, gt--);
                    } else {
                        i++;
                    }
                    executionCounter.counter();
                }
                // 交换完成后 a[lo, ..., lt-1] < a[lt, ..., gt] < a[gt, ..., hi] 成立
                sort(a, lo, lt - 1);
                sort(a, gt + 1, hi);
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
            // this.result = this.threeWaySplitQuickSort([...this.dataSource]);
            testExecTime(this.implementation, 1000000, '快速排序');
            function sort(arr: number[]) {
                arr.sort((a, b) => a - b);
            }
            testExecTime(sort, 1000000, 'Array sort 排序');
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
