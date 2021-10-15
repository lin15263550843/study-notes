<!-- 选择排序 -->
<template>
    <div>
        <ProblemCard
            title="选择排序"
            description="从小到大排序"
            :dataSource="dataSource"
            :result="result"
            :execute="execute"
            :clearResult="clearResult"
            :vResult="vResult"
            :verification="verification"
            :clearVResult="clearVResult"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import commonProblemCard from '@/components/problemCard/problemCard';
import ProblemCard from '@/components/problemCard/problemCard.vue';

export default defineComponent({
    components: { ProblemCard },
    data() {
        const { result, vResult, clearResult, clearVResult } = commonProblemCard();
        return {
            result,
            vResult,
            clearResult,
            clearVResult,
        };
    },
    setup() {
        return {
            dataSource: [1, 5, 32, 21, 692, 8, 2, 9, 3, 96, 7, 6, 12, 75, 43, 98, 23, 99, 56, 78],
        };
    },
    methods: {
        selectSort() {
            return [12321313, 3232323];
        },
        /**
         * 执行
         */
        execute() {
            this.result = this.selectSort();
        },
        /**
         * 验证
         */
        verification() {
            this.vResult = Math.max(...this.dataSource);
        },
    },
    created() {
        console.log('this------>>>', this);
    },
});
</script>
<!--
<style scoped lang="less">
// .select-sort {
// }
</style>
-->
