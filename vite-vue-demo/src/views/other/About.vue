<template>
    <div class="about">
        <div class="debounce-demo">
            <div>防抖</div>
            <a-button @click="cancel">取消</a-button>
            <a-input placeholder="请输入" @input="oninput" />
            <div>{{ inputValue }}</div>
        </div>
        <div class="throttle-demo">
            <div>节流</div>
            <a-button @click="cancel2">取消</a-button>
            <a-input placeholder="请输入" @input="oninput2" />
            <div>{{ inputValue2 }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { debounce } from '@/commons/debounce';
import { throttle } from '@/commons/throttle';

export default defineComponent({
    // setup() {
    //     const inputValue = ref('');
    //     // const obj = reactive({});
    //     function inputCachage(this: any, event: any) {
    //         const value = event?.target?.value ?? '';

    //         inputValue.value = value;

    //         console.log('event.target.value ----->>>', value);
    //         console.log('inputCachage this ------>>>', this);
    //     }

    //     const oninput = debounce(inputCachage, 1000, { leading: true, trailing: true });

    //     console.log('setup this ------------------->>>', this);
    //     return { inputValue, oninput };
    // },
    data() {
        return {
            inputValue: '空空如也',
            oninput: () => {},
            inputValue2: '空空如也',
            oninput2: () => {},
        };
    },
    methods: {
        inputCachage(this: any, event: any) {
            const value = event?.target?.value ?? '';

            this.inputValue = value;

            console.log('event.target.value ----->>>', value);
            // console.log('inputCachage this ------>>>', this);

            return value;
        },
        inputCachage2(this: any, event: any) {
            const value = event?.target?.value ?? '';

            this.inputValue2 = value;

            console.log('event.target.value ----->>>', value);
            // console.log('inputCachage this ------>>>', this);

            return value;
        },
        cancel() {
            (this.oninput as any).cancel();
        },
        cancel2() {
            (this.oninput2 as any).cancel();
        },
    },
    created() {
        function resultCallback(res: any) {
            console.log('函数返回值 ------>>>', res);
        }
        this.oninput = debounce(this.inputCachage, 2000, { immediate: true, resultCallback });
        this.oninput2 = throttle(this.inputCachage2, 2000, { leading: true, trailing: true });
    },
});
</script>

<style lang="less" scoped>
.about {
    padding: 24px;
    font-size: 12px;

    .debounce-demo,
    .throttle-demo {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 24px;
        line-height: 32px;
        font-size: 14px;

        & > input {
            width: 300px;
            margin: 0 20px;
        }
        & > div:first-child {
            margin-right: 20px;
        }
    }
}
</style>
