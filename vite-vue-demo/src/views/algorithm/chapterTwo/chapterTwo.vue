<template>
    <div class="chapter-two">
        <SelectSort />
        <InsertionSort />
        <HillSort />
        <BubbleSort />
        <MergeSort />
        <QuickSort />
        <HeapSort />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SelectSort from './selectSort.vue';
import InsertionSort from './insertionSort.vue';
import HillSort from './hillSort.vue';
import BubbleSort from './bubbleSort.vue';
import MergeSort from './mergeSort.vue';
import QuickSort from './quickSort.vue';
import HeapSort from './heapSort.vue';

export default defineComponent({
    components: { SelectSort, InsertionSort, HillSort, BubbleSort, MergeSort, QuickSort, HeapSort },
    // data() {
    //     return {};
    // },
    // setup() {
    //     return {};
    // },
    // methods: {},
    // created() {},
});
</script>
<style scoped lang="less">
// .chapter-two {
// background: white;
// }
</style>
