<template>
    <div class="chapter-two">
        <SelectSort />
        <InsertionSort />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SelectSort from './selectSort.vue';
import InsertionSort from './insertionSort.vue';

export default defineComponent({
    components: { SelectSort, InsertionSort },
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
.chapter-two {
    // background: white;
}
</style>
