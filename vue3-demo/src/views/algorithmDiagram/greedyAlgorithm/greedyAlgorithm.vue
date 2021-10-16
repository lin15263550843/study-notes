<template>
    <div class="dijkstras-algorithm">
        <div class="title">
            <span>狄克斯特拉算法</span>
        </div>
        <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>算法图解-121页-集合覆盖问题，js 代码实现</span>
                <!-- <div class="description">
                    <span>{{ graph1 }} </span>
                </div> -->
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
                        <a-button class="clear" @click="result2 = ''">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result2 }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>根据下面的图实现迪克斯特拉算法</span>
                <div class="description">
                    <span>{{ graph2 }} </span>
                </div>
            </div>
            <div class="footer">
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute2">执行</a-button>
                        <a-button class="clear" @click="result12 = []">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result12 }}</span>
                    </div>
                </div>
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="verification2">验证</a-button>
                        <a-button class="clear" @click="result22 = ''">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result22 }}</span>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component';
import { defineComponent, ref } from 'vue';
import { greedyAlgorithm } from './greedyAlgorithm';

export default defineComponent({
    data() {
        return {};
    },
    setup() {
        return {
            result1: ref<any>(''),
            result2: ref<any>(''),
            greedyAlgorithm,
        };
    },
    methods: {
        /**
         * 执行
         */
        execute() {
            this.result1 = this.greedyAlgorithm();
        },
        /**
         * 验证
         */
        verification() {
            this.result2 = ['k1', 'k2', 'k3', 'k5'];
        },
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
        // console.log(this.arr);
    },
});
</script>
<style scoped lang="less">
.dijkstras-algorithm {
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
        margin-bottom: 20px;
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
