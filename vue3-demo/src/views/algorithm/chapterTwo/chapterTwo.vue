<template>
    <div class="chapter-two">
        <SelectSort />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SelectSort from './selectSort.vue';

export default defineComponent({
    components: { SelectSort },
    data() {
        return { selectSortArr: [1, 5, 32, 21, 692, 8, 2, 9, 3, 96, 7, 6, 12, 75, 43, 98, 23, 99, 56, 78] };
    },
    setup() {
        return {};
    },
    methods: {
        // /**
        //  * 执行
        //  */
        // execute2() {
        //     const { costs, parents } = this.dijkstrasAlgorithm2(this.graph2, 'start');
        //     const chain = this.getChain(parents, 'fin', '');
        //     const res = chain.split(',').reverse().join(' > ');
        //     this.result12 = `结果：${costs.fin} => 顺序：${res}`;
        // },
        // /**
        //  * 验证
        //  */
        // verification2() {
        //     this.result22 = 8;
        // },
    },
    created() {
        console.log('this-----------------', this);
    },
});
</script>
<style scoped lang="less">
.chapter-two {
}
</style>
