<template>
    <div class="exercies">
        <div class="content">
            <div class="title-description">
                <span>题目：</span>
                <span>如何让 (a==1 && a==2 && a==3) 返回为 true</span>
                <!-- <div class="description"></div> -->
            </div>
            <div class="footer">
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute">显示答案1</a-button>
                        <a-button class="clear" @click="result1 = ''">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result1 }}</span>
                    </div>
                </div>
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute2">显示答案2</a-button>
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
                <span>
                    编写代码，满足以下条件： （1）Hero("37er");执行结果为 Hi! This is 37er
                    （2）Hero("37er").kill(1).recover(30);执行结果为 Hi! This is 37er Kill 1 bug Recover 30 bloods
                    （3）Hero("37er").sleep(10).kill(2)执行结果为 Hi! This is 37er //等待 10s 后 Kill 2 bugs //注意为
                    bugs （双斜线后的为提示信息， 不需要打印）
                </span>
                <!-- <div class="description"></div> -->
            </div>
            <div class="footer">
                <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute12">显示答案</a-button>
                        <a-button class="clear" @click="result12 = ''">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result12 }}</span>
                    </div>
                </div>
                <!-- <div>
                    <div class="enter">
                        <a-button type="primary" @click="execute2">显示答案2</a-button>
                        <a-button class="clear" @click="result2 = ''">清空</a-button>
                    </div>
                    <div class="result">
                        <span>结果：</span>
                        <span class="result-text">{{ result2 }}</span>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return { result1: '', result2: '', result12: '' };
    },
    methods: {
        /**
         * 显示答案
         */
        execute() {
            const o = {
                i: 1,
                toString() {
                    return o.i++;
                },
            };
            const a = o as unknown;
            this.result1 =
                `var a = {i:1, toString(){return a.i++}}; console.log(a == 1 && a == 2 && a == 3) // 输出结果为：` +
                (a == 1 && a == 2 && a == 3);
        },
        /**
         * 显示答案
         */
        execute2() {
            // const target = new Number(1);
            // const target = new Object(1);
            const target: any = {};
            const handler: any = {
                i: 1,
                get() {
                    return () => this.i++;
                },
                // toString() {
                //     return 111;
                // },
            };
            let a = new Proxy(target, handler);

            this.result2 = `// 输出结果为：` + (a == 1 && a == 2 && a == 3);
        },
        /**
         * 题目 2
         */
        execute12() {
            /**
             * 错误答案 XXX
             */
            function Hero(name: string) {
                const o: any = {};
                o.name = name;
                console.log(`Hi! This is ${o.name}`);

                o.kill = (bugNum: number) => {
                    o.bugNum = bugNum;
                    return o;
                };
                o.recover = (bloodsNum: number) => {
                    o.bloodsNum = bloodsNum;
                    console.log(`Hi! This is ${o.name} Kill ${o.bugNum} bug Recover ${o.bloodsNum} bloods`);
                    return o;
                };
                o.sleep = (duration: number) => {
                    setTimeout(() => {
                        console.log(`Hi! This is ${o.name}`);
                    }, duration * 1000);
                    return o;
                };
                return o;
            }
            // Hero('37er').kill(1).recover(30);
            Hero('37er').sleep(10).kill(2);
            this.result12 = '123';
        },
    },
});
</script>
<style scoped lang="less">
.exercies {
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
