<!-- 选择排序 -->
<script lang="ts">
import { defineComponent } from 'vue';
import problemCardBoxMixin from '@/components/problemCard/problemCardBoxMixin';

export default defineComponent({
    ...problemCardBoxMixin,
    setup() {
        return {
            dataSource: [58, 1, 5, 32, 21, 692, 8, 2, 692, 9, 3, 96, 7, 6, 12, 75, 43, 98, 23, 99, 56, 78],
            // dataSource: [1, 2, 3, 5, 6, 7, 8, 9, 12, 21, 23, 32, 43, 56, 58, 75, 78, 96, 98, 99, 692],
        };
    },
    methods: {
        // 选择排序
        selectSort(list: number[]) {
            const l = list.length;
            // let sum = 0;
            for (let i = 0; i < l; i++) {
                for (let j = i; j < l; j++) {
                    if (list[i] > list[j]) {
                        const v = list[i];
                        list[i] = list[j];
                        list[j] = v;
                        // console.log('selectSort sum: ', sum++);
                    }
                }
            }
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
            // let sum = 0;
            // this.vResult = [...this.dataSource].sort((a, b) => {
            //     const flag = a - b;
            //     if (flag) {
            //         console.log('Array sort sum: ', sum++);
            //     }
            //     // console.log('Array sort sum: ', sum++);
            //     return flag;
            // });
            this.vResult = [...this.dataSource].sort((a, b) => a - b);
        },
    },
    created() {
        // console.log('this------>>>', this);
    },
});
</script>
<!--
<style scoped lang="less">
// .select-sort {
// }
</style>
-->
