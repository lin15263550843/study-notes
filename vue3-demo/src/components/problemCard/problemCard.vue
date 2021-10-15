<template>
    <div class="components-problem-card">
        <div class="title">
            <h3>{{ title }}</h3>
        </div>
        <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>{{ description }}</span>
                <div class="description">
                    <span>{{ dataSource }} </span>
                </div>
            </div>
            <div class="footer">
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute">执行</a-button>
                        <a-button class="clear" @click="clearResult">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result }}</span>
                    </div>
                </div>
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="verification">验证</a-button>
                        <a-button class="clear" @click="clearVResult">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ vResult }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'problemCard',
    props: {
        // 标题
        title: {
            type: String,
            default: '',
        },
        // 问题描述
        description: {
            type: String,
            default: '',
        },
        // 数据源
        dataSource: {
            type: [Array, Object, String, Number],
            default: '',
        },
        // 执行
        execute: {
            type: Function,
            default: () => '',
        },
        // 结果
        result: {
            type: [Array, Object, String, Number],
            default: '',
        },
        // 清空执行结果
        clearResult: {
            type: Function,
            default: () => '',
        },
        // 验证
        verification: {
            type: Function,
            default: () => '',
        },
        // 验证结果
        vResult: {
            type: [Array, Object, String, Number],
            default: '',
        },
        // 清空验证结果
        clearVResult: {
            type: Function,
            default: () => '',
        },
    },
});
</script>
<style scoped lang="less">
.components-problem-card {
    padding: 20px;

    .title {
        margin-bottom: 20px;

        h3 {
            // font-size: 16px;
            color: #000;
            font-weight: bold;
        }
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
