<template>
    <div class="example">
        <div class="boxs-1">
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
                    超出两行文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示超出文本修剪，省略号显示
                </p>
                <p class="p5">
                    <span>超出文本修剪，省略号显示超出文本修剪，</span>
                    <span class="d-flex">省略号显示超出文本修剪，省略号显示超出文本修剪，</span>
                    <span>省略号显示超出文本修剪，省略号显示超出文本修剪，</span>
                </p>
                <div class="container">
                    <div class="item">Floated</div>
                    <p>Text following the float.</p>
                </div>
            </div>
            <div class="box-1">
                <div class="item-1">
                    <span>哈哈哈</span>
                    <span>哈哈哈哈哈</span>
                    <span>哈哈哈哈哈哈哈哈</span>
                    <span>设置为 inline-block （块级行元素）后效果，多出的显示滚动条</span>
                </div>
                <div>
                    <div class="item-2 item-2-2 item-2-1">css 权重</div>
                </div>
                <div class="item-3">position: sticky 布局</div>
                <div class="item-4">
                    <div class="childen">margin: auto 水平居中</div>
                </div>
            </div>
        </div>
        <div class="boxs-2">
            <div class="item-1">
                <div></div>
            </div>
            <div class="item-2">
                <div>display 所有值</div>
            </div>
            <div class="item-3">
                <div class="childen">
                    <div class="inner" />
                </div>
            </div>
            <div class="item-4">
                <div class="grid">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                </div>
            </div>
            <div class="item-5">
                <div class="margin-overlapping">
                    <div>1</div>
                    <div class="bfc">
                        <div>2</div>
                    </div>
                </div>
            </div>
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
            <div class="item-3">
                <img id="imghym" src="@/assets/images/hym.jpg" alt="" />
            </div>
            <div class="item-4">
                <img src="@/assets/images/hg.jpg" alt="" />
                <div class="reflection"></div>
                <div class="reflection-mask"></div>
            </div>
            <div class="item-6">
                <div class="wrapper" />
            </div>
            <div class="item-5">
                <div class="cube">
                    <div class="comm up" />
                    <div class="comm dowm" />
                    <div class="comm left" />
                    <div class="comm right" />
                    <div class="comm front" />
                    <div class="comm back" />
                </div>
            </div>
            <div class="item-7">
                <div class="cube">
                    <div class="comm up" />
                    <div class="comm dowm" />
                    <div class="comm left" />
                    <div class="comm right" />
                    <div class="comm front" />
                    <div class="comm back" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import './lexical/unicode';

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
                height: 100px;
                margin: 20px;
                background: #999;
                line-height: 20px;
                padding: 20px;
                overflow: scroll;
                overflow: auto;

                & > span {
                    display: inline-block;
                }
            }

            .item-2 {
                width: 200px;
                height: 100px;
                margin: 20px;
                background: tan;
                line-height: 100px;
                text-align: center;
            }

            // https://www.cnblogs.com/cnblogs-jcy/p/8574177.html
            .item-2-2.item-2-1 {
                background: darkcyan;
            }

            .item-2-2 {
                background: salmon;
            }
            // div {
            //     margin: 0;
            // }

            // div[class='item-2'] {
            //     margin: 0;
            // }

            .item-3 {
                width: 200px;
                height: 150px;
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
                bottom: 20px;
                left: 20px;
                line-height: 100px;
                text-align: center;
            }
            .item-4 {
                position: relative;
                top: -390px;
                left: 250px;
                width: 200px;
                height: 150px;
                padding: 0.1px;
                margin: 0.1px;
                background: coral;
                display: inline-block;
                line-height: 50px;
                color: black;

                .childen {
                    display: block;
                    width: 150px;
                    height: 50px;
                    background: cyan;
                    margin: 50px auto;
                    // margin: 50px auto;
                }
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
                text-overflow: clip;
                text-overflow: ellipsis;
            }

            .p4 {
                width: 500px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            .p5 {
                .d-flex {
                    // display: inline flex;
                    display: flow-root;
                }
            }

            .container {
                // display: flow-root;
                // display: inline-block;
                display: block;

                .item {
                    margin: 10px;
                    float: left;
                }
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
            background: burlywood;
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

            & > div {
                position: absolute;
                line-height: 50px;
                text-align: center;
                width: 150px;
                height: 50px;
                margin: 25px;
                background: dodgerblue;

                display: flex;
                display: block;
                display: none;
                display: inline;
                display: inline-block;
                display: inline-flex;
                display: inline-table;
                display: inline-grid;
                display: flow-root;
                display: contents;
                display: table;
                display: table-caption;
                display: table-cell;
                display: table-column;
                display: table-column-group;
                display: table-footer-group;
                display: table-header-group;
                display: table-row;
                display: table-row-group;
                display: grid;
                display: revert;
                display: list-item;
                display: ruby;
                display: subgrid;
                // 据说一共有 32 种
            }
        }

        .item-3 {
            width: 200px;
            height: 100px;
            position: relative;
            display: inline-block;
            background: darkseagreen;
            transform: translate(60px, -20px);

            .childen {
                width: 60px;
                height: 60px;
                background: burlywood;
                position: absolute;
                top: 0;
                left: 0;
                margin: 20px;
                padding: 20px;
                box-sizing: border-box;

                .inner {
                    width: 20px;
                    height: 20px;
                    margin: 20px;
                    // padding: 20px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: coral;
                }
            }
        }

        .item-4 {
            width: 200px;
            height: 100px;
            position: relative;
            display: inline-block;
            // background: dodgerblue;
            transform: translate(100px, -20px);

            .grid {
                width: 100px;
                height: 100px;
                position: absolute;
                top: 0;
                left: 0;
                line-height: 30px;
                text-align: center;

                display: grid;

                // grid-template-columns: 30px 30px 30px;
                // grid-template-rows: 30px 30px 30px;
                // grid-template-columns: 30% 30% 30%;
                // grid-template-rows: 30% 30% 30%;
                grid-template-rows: repeat(3, 30%);
                grid-template-columns: repeat(3, 30%);
                // grid-template-columns: repeat(3, auto-fill);
                // grid-template-rows: repeat(3, auto-fill);

                // grid-row-gap: 5%;
                // grid-column-gap: 5%;
                grid-gap: 5%;

                & > div {
                    background: darkorange;
                }
            }
        }
        .item-5 {
            width: 200px;
            height: 100px;
            position: relative;
            display: inline-block;
            // background: dodgerblue;
            transform: translate(100px, -20px);

            .margin-overlapping {
                height: 100px;

                & > div:first-child {
                    height: 30px;
                    margin-bottom: 20px;
                    background: wheat;
                    line-height: 30px;
                    text-align: center;
                }

                .bfc {
                    // 可以形成 BFC
                    // position: absolute;
                    // position: fixed;
                    // display: inline-block;
                    // float: left;
                    // overflow: hidden;
                    // overflow: scroll;
                    overflow: auto;
                    // overflow: visible; // overflow 除了 visible 其他都可以

                    & > div {
                        height: 30px;
                        margin-top: 20px;
                        background: wheat;
                        line-height: 30px;
                        text-align: center;
                    }
                }
            }
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

        .item-3 {
            margin-left: 20px;

            & > img {
                width: 100px;
                // height: 100px;
                // -webkit-box-reflect: below 1px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(0, 0, 0, 0.9)));
                -webkit-box-reflect: below 1px
                    linear-gradient(to bottom, transparent, transparent 50%, rgba(0, 0, 0, 0.8));
                // linear-gradient(linear, left top, left bottom, from(transparent), to(rgba(0, 0, 0, 0.9)));
            }
            // background: element(imghym);
        }

        .item-4 {
            margin-left: 20px;
            position: relative;

            & > img {
                width: 100px;
                // height: 50px;
            }

            .reflection {
                width: 100px;
                height: 50px;
                // background: url(../../assets/images/hg.jpg);
                // background: url('~@/assets/images/hg.jpg');
                background-image: url(../../assets/images/hg.jpg);
                background-size: 100px 50px;
                background-origin: bottom center;
                transform: scaleY(-1);
                opacity: 0.5;
                // filter: alpha(opacity= '50');
            }

            .reflection-mask {
                width: 100px;
                height: 50px;
                position: absolute;
                bottom: 0;
                left: 0;
                // background: url(../../assets/images/hg.jpg);
                // background: url('~@/assets/images/hg.jpg');
                // background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1));
                background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1));
            }
        }

        .item-5 {
            margin-left: 40px;
            position: relative;

            @keyframes cubespin {
                from {
                    transform: rotateY(360deg) rotateZ(360deg) rotateX(360deg);
                }
                to {
                    transform: rotateY(0deg) rotateZ(0deg) rotateX(0deg);
                }
            }

            .cube {
                position: relative;
                width: 100px;
                height: 100px;
                background: rgba(0, 0, 0, 0.2);
                transform-style: preserve-3d;
                transform-origin: center;
                // transform: translateZ(100px);
                transform: rotateY(10deg) rotateZ(10deg) rotateX(10deg);
                // animation: cubespin 1s 1s infinite linear;
                animation-name: cubespin;
                animation-duration: 3s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                // animation-direction: normal;
                // animation-delay: 0;
                // animation-play-state: running

                .comm {
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                .up {
                    background: rgba(0, 255, 255, 0.6);
                    transform: rotateX(90deg) translateZ(50px);
                }

                .dowm {
                    background: rgba(0, 255, 255, 0.6);
                    transform: rotateX(90deg) translateZ(-50px);
                }

                .front {
                    background: rgba(255, 255, 0, 0.6);
                    transform: translateZ(50px);
                }

                .back {
                    background: rgba(255, 255, 0, 0.6);
                    transform: translateZ(-50px);
                }

                .left {
                    background: rgba(255, 0, 0, 0.6);
                    transform: rotateY(90deg) translateZ(-50px);
                }

                .right {
                    background: rgba(255, 0, 0, 0.6);
                    transform: rotateY(90deg) translateZ(50px);
                }
            }
        }

        .item-7 {
            margin-left: 60px;
            position: relative;

            @keyframes cubespin {
                from {
                    transform: rotateY(360deg) rotateZ(360deg) rotateX(360deg);
                }
                to {
                    transform: rotateY(0deg) rotateZ(0deg) rotateX(0deg);
                }
            }

            .cube {
                position: relative;
                width: 100px;
                height: 100px;
                background: rgba(0, 0, 0, 0.1);
                perspective: 250;
                -webkit-perspective: 250; /* Safari 和 Chrome */
                perspective-origin: center center;
                -webkit-perspective-origin: center; /* Safari 和 Chrome */
                // transform-style: flat;
                transform-style: preserve-3d;
                transform-origin: center;
                // transform: translateZ(100px);
                // transform: rotateY(10deg) rotateZ(10deg) rotateX(10deg) translateZ(-500px);
                // animation: cubespin 1s 1s infinite linear;
                animation-name: cubespin;
                animation-duration: 3s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                // animation-direction: normal;
                // animation-delay: 0;
                // animation-play-state: running
                // animation-play-state: paused;

                .comm {
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                .up {
                    background: rgba(0, 255, 255, 0.6);
                    transform: rotateX(90deg) translateZ(25px);
                }

                .dowm {
                    background: rgba(0, 255, 255, 0.6);
                    transform: rotateX(90deg) translateZ(-25px);
                }

                .front {
                    background: rgba(255, 255, 0, 0.6);
                    transform: translateZ(25px);
                }

                .back {
                    background: rgba(255, 255, 0, 0.6);
                    transform: translateZ(-25px);
                }

                .left {
                    background: rgba(255, 0, 0, 0.6);
                    transform: rotateY(90deg) translateZ(-25px);
                }

                .right {
                    background: rgba(255, 0, 0, 0.6);
                    transform: rotateY(90deg) translateZ(25px);
                }
            }
        }

        .item-6 {
            width: 200px;
            height: 100px;
            margin-left: 20px;
            position: relative;

            .wrapper {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 0;
                border-top: 100px solid transparent;
                border-left: 100px solid transparent;
                border-right: 100px solid transparent;
                border-bottom: 100px solid yellowgreen;
            }
            position: relative;
        }
    }
}
</style>
