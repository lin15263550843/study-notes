<template>
    <div class="chapter-two">
        <SelectSort />
        <InsertionSort />
        <HillSort />
        <BubbleSort />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SelectSort from './selectSort.vue';
import InsertionSort from './insertionSort.vue';
import HillSort from './hillSort.vue';
import BubbleSort from './bubbleSort.vue';

export default defineComponent({
    components: { SelectSort, InsertionSort, HillSort, BubbleSort },
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
