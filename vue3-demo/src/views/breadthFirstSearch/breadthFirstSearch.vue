<template>
    <div class="breadth-first-search">
        <div class="title">
            <span>广度优先搜索</span>
        </div>
        <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>给定一个图，寻找 AA 到 XX 是否存在关系</span>
                <div class="description">
                    <span>{{ graph }} </span>
                </div>
            </div>
            <div class="footer">
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute">执行</a-button>
                        <a-button class="clear" @click="result1 = ''">清空</a-button>
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
        <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>给定一个图，寻找 AA 到 XX 的最短路径</span>
                <div class="description">
                    <span>{{ graph }} </span>
                </div>
            </div>
            <div class="footer">
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute2">执行</a-button>
                        <a-button class="clear" @click="result21 = ''">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result21 }}</span>
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
        </div>
    </div>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component';
import { defineComponent, ref } from 'vue';
import { breadthFirstSearch1, breadthFirstSearch2 } from './breadthFirstSearch';

export default defineComponent({
    // components: {},
    data() {
        return {
            graph: {
                AA: ['AB', 'AC', 'AD'],
                AB: ['BE', 'BF', 'AA'],
                BE: [],
                BF: [],
                AC: ['CD'],
                AD: ['CD', 'XXX'],
                CD: [],
                XX: [],
            },
        };
    },
    setup() {
        return {
            result1: ref(''),
            result2: ref(''),
            result21: ref(),
            result22: ref(),
            breadthFirstSearch1,
            breadthFirstSearch2,
        };
    },
    methods: {
        /**
         * 执行
         */
        execute() {
            this.result1 = this.breadthFirstSearch1(this.graph, 'XX') ? '存在' : '不存在';
        },
        /**
         * 验证
         */
        verification() {
            this.result2 = '存在';
        },
        /**
         * 执行
         */
        execute2() {
            this.result21 = this.breadthFirstSearch2(this.graph, 'XX');
        },
        /**
         * 验证
         */
        verification2() {
            this.result22 = 2;
        },
        // /**
        //  * 执行
        //  */
        // execute3() {
        //     this.result31 = this.descendingSort(this.arr);
        // },
        // /**
        //  * 验证
        //  */
        // verification3() {
        //     this.result32 = [...this.arr].sort((a, b) => a - b);
        // },
    },
    created() {
        // ...
    },
});
</script>
<style scoped lang="less">
.breadth-first-search {
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
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;

                .simulation-land {
                    flex: none;
                    width: 168px;
                    height: 64px;
                    border: 1px solid #777;
                    position: relative;
                    background: blanchedalmond;

                    .width {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    .height {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }

                .simulation-land-result {
                    position: relative;
                    flex: none;
                    width: 168px;
                    height: 64px;
                    // margin-left: 250px;
                    border: 1px solid #777;
                    position: relative;
                    background: blanchedalmond;
                    background-size: 8px 8px;
                    background-image: linear-gradient(to right, transparent 7px, #777 1px),
                        linear-gradient(to top, #777 1px, transparent 0);

                    .width {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    .height {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                    }

                    & > span {
                        position: absolute;
                        top: -2px;
                        right: -28px;
                        font-size: 10px;
                        line-height: 10px;
                    }
                }
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
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
