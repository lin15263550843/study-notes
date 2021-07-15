<template>
    <div class="binary-search">
        <div class="title">
            <span>选择排序</span>
        </div>
        <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>把下面数组降序排序</span>
                <div class="description">
                    <span>{{ arr }} </span>
                </div>
            </div>
            <div class="footer">
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute">执行</a-button>
                        <a-button class="clear" @click="result1 = []">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result1 }}</span>
                    </div>
                </div>
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="verification">验证</a-button>
                        <a-button class="clear" @click="result2 = []">清空</a-button>
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
import { selectSort } from './selectSort';

export default defineComponent({
    data() {
        return {
            arr: [11, 6, 9, 34, 56, 78, 246, 89, 2, 46, 98, 12, 45, 67, 9, 8, 36, 27, 842, 19],
        };
    },
    setup() {
        return { condition: ref<number>(), result1: ref<number[]>([]), result2: ref<number[]>([]), selectSort };
    },
    methods: {
        /**
         * 执行
         */
        execute() {
            this.result1 = this.selectSort(this.arr);
        },
        /**
         * 验证
         */
        verification() {
            this.result2 = [...this.arr].sort((a, b) => a - b);
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
                width: 50%;
                flex: auto;
            }

            .enter {
                margin-top: 20px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;

                .clear {
                    margin-left: 20px;
                }

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
