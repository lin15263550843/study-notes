<template>
    <div class="example">
        <div class="boxs-1">
            <div class="box-1">
                <div class="item-1"></div>
                <div>
                    <div class="item-2"></div>
                </div>
                <div class="item-3"></div>
            </div>
            <div class="box-2">
                <div class="text">
                    <span>首字放大效果（span标签）必学父元素设置，span标签直接设置无效</span>
                </div>
                <p class="p1">首字放大效果（p标签）</p>
                <p class="p2">
                    首行放大效果
                    <br />
                    第二行
                    <br />
                    第三行
                </p>
                <p class="p3">
                    超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示
                </p>
                <p class="p4">
                    超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示
                </p>
            </div>
        </div>
        <div class="boxs-2">
            <div class="item-1">
                <div></div>
            </div>
            <div class="item-2"></div>
            <div class="item-3"></div>
        </div>
        <div class="boxs-3">
            <div class="item-1">
                <div class="inner"></div>
                <div class="text">
                    <span>1</span>
                </div>
            </div>
            <div class="item-2">
                <span>1</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {};
    },
});
</script>
<style scoped lang="less">
.example {
    position: relative;

    .boxs-1 {
        display: flex;
        flex-flow: row nowrap;

        .box-1 {
            flex: auto;
            height: 400px;
            overflow: auto;
            background: lightgrey;

            .item-1 {
                width: 200px;
                height: 100px;
                margin: 20px;
                background: #999;
            }

            .item-2 {
                width: 200px;
                height: 100px;
                margin: 20px;
                background: tan;
            }

            // div {
            //     margin: 0;
            // }

            // div[class='item-2'] {
            //     margin: 0;
            // }

            .item-3 {
                width: 200px;
                height: 100px;
                // margin: 20px;
                background: lightslategrey;
                position: fixed;
                position: absolute;
                position: relative;
                position: static;
                position: inherit;
                position: initial;
                position: unset;
                position: sticky;
                bottom: 50px;
                left: 20px;
            }
        }

        .box-2 {
            flex: auto;
            padding: 20px;
            background: moccasin;

            .text {
                font-size: 14px;
            }

            .text::first-letter {
                color: blue;
                font-size: 20px;
            }

            .p1::first-letter {
                color: blue;
                font-size: 20px;
            }

            .p2::first-line {
                color: blue;
                font-size: 20px;
            }

            .text {
                cursor: pointer;
                // transition: all 500ms linear 0;
                transition-property: all;
                transition-duration: 500ms;
                transition-timing-function: linear;
                transition-delay: 0;
            }

            .text:hover {
                margin-left: 100px;
            }

            @keyframes p1animation {
                0% {
                    margin-left: 0;
                }

                50% {
                    margin-left: 100px;
                }

                100% {
                    margin-left: 300px;
                }
            }

            .p1 {
                // animation: p1animation 1s infinite linear;
                animation-name: p1animation;
                animation-duration: 2s;
                animation-timing-function: ease-out;
                animation-delay: 0;
                animation-iteration-count: infinite;
                animation-direction: alternate;
                // animation-fill-mode: forwards;
                // animation-play-state: running;
            }

            .p3 {
                width: 500px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .p4 {
                width: 500px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
        }
    }

    .boxs-2 {
        .item-1 {
            display: inline-block;
            width: 200px;
            height: 100px;
            margin: 20px;
            padding: 20px;
            // border: 20px solid #387ef5;
            background: goldenrod;
            border: 20px;
            border: 20px solid transparent;

            & > div {
                width: 100%;
                height: 100%;
                background: darkturquoise;
            }
        }

        .item-2 {
            display: inline-block;
            width: 200px;
            height: 100px;
            position: relative;
            top: -20px;
            left: 20px;
            background: cadetblue;
        }

        .item-3 {
            display: inline-block;
            width: 200px;
            height: 100px;
            background: darkseagreen;
        }
    }

    .boxs-3 {
        padding: 20px;
        display: flex;

        .item-1 {
            position: relative;
            width: 100px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            background: green;
            border-radius: 100%;
            background: linear-gradient(to top, #387ef5, #dfdb06);
            transform-style: preserve-3d;
            // transform: translateZ(1000px) translate(50px, 50px);

            @keyframes spinframes {
                to {
                    // transform: rotateZ(0deg);
                    transform: rotateY(0deg);
                }

                from {
                    // transform: rotateZ(-360deg);
                    transform: rotateY(-360deg);
                }
            }

            animation: spinframes 2s infinite linear;

            // animation-play-state: paused;
            transform: rotateY(30deg);

            .text {
                position: relative;
                z-index: 2;
                color: white;
                font-size: 50px;
                font-weight: bold;
                transform: translateZ(5px);
                text-shadow: 2px 2px 2px red;
            }

            .inner {
                width: 100px;
                height: 100px;
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: 1;
                transform: translate(-50%, -50%);

                border-radius: 100%;
                background: linear-gradient(to top, #dfdb06, #387ef5);

                transform-origin: cent;
                transform: translate(-50%, -50%) translateZ(5px);
            }
        }

        .item-2 {
            cursor: pointer;
            margin-left: 20px;
            width: 100px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            background: green;
            border-radius: 100%;
            background: linear-gradient(to top, #387ef5, #dfdb06);

            span {
                color: white;
                font-size: 50px;
                font-weight: bold;
            }

            transition: all 1s;
        }

        .item-2:hover {
            transform: rotateZ(360deg);
        }
    }
}
</style>
