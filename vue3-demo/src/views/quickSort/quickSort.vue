<template>
    <div class="binary-search">
        <div class="title">
            <span>快速排序 & 递归</span>
        </div>
        <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>给定一个数组，把数组相加，并返回结果</span>
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
        <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>把长为1680m，宽为640m的地，均匀分成尽可能大的方块（边长相等），方块的边长（x）是多少</span>
                <div class="description">
                    <div class="simulation-land">
                        <span class="width">1680 m</span>
                        <span class="height">640 m</span>
                    </div>
                    <DoubleRightOutlined />
                    <div class="simulation-land-result">
                        <span>x m?</span>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute2">执行</a-button>
                        <a-button class="clear" @click="result21 = undefined">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result21 }}</span>
                    </div>
                </div>
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="verification2">验证</a-button>
                        <a-button class="clear" @click="result22 = undefined">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result22 }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>把下面的数组降序排序</span>
                <div class="description">
                    <span>{{ arr }} </span>
                </div>
            </div>
            <div class="footer">
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute3">执行</a-button>
                        <a-button class="clear" @click="result31 = []">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result31 }}</span>
                    </div>
                </div>
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="verification3">验证</a-button>
                        <a-button class="clear" @click="result32 = []">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result32 }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component';
import { defineComponent, ref } from 'vue';
import { sum, recursion, descendingSort } from './quickSort';
import { DoubleRightOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    components: { DoubleRightOutlined },
    data() {
        return {
            arr: [11, 6, 9, 34, 56, 78, 246, 89, 2, 46, 98, 12, 45, 67, 9, 8, 36, 27, 842, 19],
        };
    },
    setup() {
        return {
            result1: ref<number>(),
            result2: ref<number>(),
            result21: ref<number>(),
            result22: ref<number>(),
            result31: ref<number[]>([]),
            result32: ref<number[]>([]),
            sum,
            recursion,
            descendingSort,
        };
    },
    methods: {
        /**
         * 执行
         */
        execute() {
            this.result1 = this.sum(this.arr);
        },
        /**
         * 验证
         */
        verification() {
            this.result2 = [...this.arr].reduce((total, value) => total + value, 0);
        },
        /**
         * 执行
         */
        execute2() {
            this.result21 = this.recursion(1680, 640);
        },
        /**
         * 验证
         */
        verification2() {
            this.result22 = 80;
        },
        /**
         * 执行
         */
        execute3() {
            this.result31 = this.descendingSort(this.arr);
        },
        /**
         * 验证
         */
        verification3() {
            this.result32 = [...this.arr].sort((a, b) => a - b);
        },
    },
    created() {
        // ...
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
