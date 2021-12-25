<template>
    <div class="binary-search">
        <div class="title">
            <span>二分查找</span>
        </div>
        <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>查找下面数组中的某个值</span>
                <div class="description">
                    <span>{{ arr }} </span>
                </div>
            </div>
            <div class="footer">
                <div>
                    <div class="enter">
                        <a-input type="number" placeholder="请输入要查找的数字" v-model="condition" />
                        <a-button type="primary" @click="execute">执行</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result1 }}</span>
                    </div>
                </div>
                <div>
                    <div class="enter">
                        <a-input type="number" placeholder="请输入要查找的数字" v-model="condition" />
                        <a-button type="primary" @click="verification">验证</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result2 }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component';
import { defineComponent, ref } from 'vue';
import { binarySearch } from './binarySearch';

// @Options({})
// export default class Home extends Vue {
//     private setup() {
//         return { dichotomousFind };
//     }
//     /**
//      * 执行
//      */
//     private execute() {
//         const a = [1, 4, 5, 6, 8, 9, 232, 5, 78, 2, 3, 23];
//         this.dichotomousFind(a);
//     }
// }
export default defineComponent({
    data() {
        return {
            arr: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
                54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
                80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
            ].map(value => value * value),
        };
    },
    setup() {
        return { condition: ref<number>(), result1: ref<string | number>(''), result2: ref(), binarySearch };
    },
    methods: {
        /**
         * 执行
         */
        execute() {
            this.result1 = this.binarySearch(this.arr, this.condition);
        },
        /**
         * 验证
         */
        verification() {
            this.result2 = this.arr.findIndex(value => value === Number(this.condition));
        },
    },
    created() {
        // console.log(this.arr);
    },
});
</script>
<style scoped lang="less">
.binary-search {
    padding: 20px;

    .title {
        margin-bottom: 20px;
        font-size: 14px;
        color: #555;
        // font-weight: bold;
    }

    .content {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
        padding: 20px;
        border-radius: 4px;
        border: 1px solid #f0f0f0;

        .title-description {
            font-weight: bold;

            .description {
                // width: 100%;
                margin-top: 20px;
                font-weight: 500;
                color: chocolate;
            }
        }

        .footer {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;

            & > div {
                flex: auto;
            }

            .enter {
                margin-top: 20px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;

                input {
                    width: 300px;
                    margin-right: 20px;
                }
            }

            .result {
                margin-top: 20px;

                button {
                    margin-right: 20px;
                }

                .result-text {
                    color: green;
                }
            }
        }
    }
}
</style>
