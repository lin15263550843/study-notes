<template>
    <div class="my-virtual-select" @click.stop="toggleMenu">
        <div class="select-input-box" :title="selectedLabel">
            <input
                class="input"
                :class="{ 'is-disabled': disabled }"
                ref="input"
                type="text"
                v-model="queryLabel"
                :readonly="!filterable"
                :disabled="selectDisabled"
                :placeholder="selectedLabel || placeholder"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="debouncedOnInputChange"
            />
            <div class="suffix-arrow" :class="{ 'suffix-arrow-focus': visible }" />
            <div class="suffix-clear" v-if="queryLabel && clearable" @click.stop="clear">
                <div class="circle" />
            </div>
        </div>
        <div class="select-dropdown-box" v-if="visible" @click.stop="() => {}">
            <div class="top-arrow" />
            <div class="list-container" ref="list-container-ref" :style="{ maxHeight: `${visibleNumber * itemHeight + 12}px` }" @scroll="onScrollChange">
                <div class="real-height-box" v-show="allNum > 0" :style="{ height: `${allNum * itemHeight}px` }">
                    <div class="list" :style="{ transform: transformOffset }">
                        <div
                            class="item"
                            v-for="(item, index) in filterDataList.slice(startIndex, endIndex + visibleNumber)"
                            :class="{ 'is-selected': value === item[valueKey] }"
                            :style="{
                                height: itemHeight + 'px',
                                lineHeight: itemHeight + 'px',
                            }"
                            :title="item[labelKey]"
                            :key="item[itemKey] || index"
                            @click="selectItemClick(item, index)"
                        >
                            <slot name="item" v-if="$slots.item" :item="item" :itemHeight="itemHeight"></slot>
                            <span v-else>{{ item[labelKey] }}</span>
                        </div>
                    </div>
                </div>
                <template v-if="emptyText && allNum === 0">
                    <slot name="empty" v-if="$slots.empty"></slot>
                    <p class="empty-text" v-else>
                        {{ emptyText }}
                    </p>
                </template>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
import { debounce } from './utils/debounce.js';

export default {
    name: 'VirtualSelect',
    componentName: 'VirtualSelect',
    props: {
        // id: String,
        name: String, // input 的 name 属性
        disabled: Boolean, // 是否禁用
        clearable: Boolean, // 是否清除
        noDataText: String, // 数据为空文案
        filterMethod: Function, // 自定义搜索方法
        /**
         *  绑定值，必y要的
         */
        value: {
            required: true,
        },
        /**
         * 可见条数
         */
        visibleNumber: {
            type: Number,
            default: 10, // 默认 10 条
        },
        /**
         * item 高度
         */
        itemHeight: {
            type: Number,
            default: 34, // 默认 34px
        },
        /**
         * item label key
         */
        labelKey: {
            type: String,
            default: 'label',
        },
        /**
         * item value key
         */
        valueKey: {
            type: String,
            default: 'value',
        },
        /**
         * item key 唯一标识
         */
        itemKey: {
            type: String,
            default: 'id',
        },
        /**
         * 占位符
         */
        placeholder: {
            type: String,
            default: '请选择',
            required: false,
        },
        /**
         * 支持搜索
         */
        filterable: {
            type: Boolean,
            default: true,
        },
        /**
         * 数据项列表
         */
        dataList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            visible: false, // 显示下拉框
            filterDataList: [], // 筛选后的数据列表
            startIndex: 0, // 可见区域起始索引
            selectedLabel: '', // 选中项的 label
            queryLabel: '', // 搜索的 label
        };
    },
    computed: {
        /**
         * 总条数
         */
        allNum() {
            return this.filterDataList.length;
        },
        /**
         * 可见区域结束索引
         */
        endIndex() {
            return this.startIndex + this.visibleNumber;
        },
        /**
         * 一半选项的数量
         */
        halfItemNumber() {
            return Math.ceil(this.visibleNumber / 2);
        },
        /**
         * 当前选中项的索引
         */
        currentIndex() {
            const currentIndex = this.filterDataList.findIndex(item => item[this.valueKey] === this.value);
            return currentIndex > -1 ? currentIndex : 0;
        },
        /**
         * 可视区域容器的偏移量
         */
        transformOffset() {
            return `translateY(${this.startIndex * this.itemHeight}px)`;
        },
        /**
         * 无数据显示文案
         */
        emptyText() {
            // 以后扩展异步加载列表，显示 loading 啥的可能会增加逻辑
            return this.noDataText || '暂无数据';
        },
        /**
         * 是否禁用
         */
        selectDisabled() {
            // return this.disabled || (this.elForm || {}).disabled;
            return this.disabled;
        },
    },
    watch: {
        value() {
            this.setSelected();
            this.setStartIndex();
        },
        visible(val) {
            if (val) {
                this.queryLabel = '';
                this.initFilterDataList();
                this.setStartIndex();
                setTimeout(() => {
                    // 确保能拿到 dom，且更新 scrollTop 之前需要先更新 startIndex
                    this.setScrollTop();
                }, 1);
            } else {
                if (this.$refs['input']) {
                    this.$refs['input'].blur();
                }
                if (this.queryLabel !== this.selectedLabel) {
                    this.queryLabel = this.selectedLabel;
                }
            }
            this.$emit('visible-change', val);
        },
        dataList() {
            this.initFilterDataList();
        },
    },
    methods: {
        /**
         * 获取焦点
         */
        handleFocus(event) {
            if (!this.visible) {
                this.visible = true;
                this.$emit('focus', event);
            }
        },
        /**
         * 失去焦点
         */
        handleBlur(event) {
            setTimeout(() => {
                // this.visible = false;
                this.$emit('blur', event);
            }, 100);
        },
        /**
         * 初始化 filterDataList
         */
        initFilterDataList() {
            this.filterDataList = this.dataList;
        },
        /**
         * 根据 value 值的变化设置选中项
         */
        setSelected() {
            const curItem = this.filterDataList[this.currentIndex];
            if (curItem) {
                this.selectedLabel = curItem[this.labelKey];
                this.queryLabel = this.selectedLabel;
            }
        },
        /**
         * 获取第一个渲染 item 的索引，即 startIndex
         */
        getStartIndex(scrollTop) {
            if (scrollTop < this.halfItemNumber * this.itemHeight) {
                return 0; // 从顶部初始位置往下滑动如果没有超过一半，则 startIndex 为 0，防止往上快速滑动时出现空白
            }
            return (scrollTop / this.itemHeight - this.halfItemNumber) >>> 0;
        },
        /**
         * 设置 startIndex
         */
        setStartIndex() {
            const startIndex = this.currentIndex - this.halfItemNumber;
            this.startIndex = startIndex < 0 ? 0 : startIndex;
        },
        /**
         * 设置 scrollTop
         */
        setScrollTop() {
            const listContainerRef = this.$refs['list-container-ref'];
            if (listContainerRef) {
                const scrollTop = ((this.startIndex + this.halfItemNumber) * this.itemHeight) >>> 0;
                listContainerRef.scrollTop = scrollTop > this.halfItemNumber * this.itemHeight ? scrollTop : 0;
            }
        },
        /**
         * 监听滚动事件
         */
        onScrollChange(e) {
            const scrollTop = e.target.scrollTop;
            this.startIndex = this.getStartIndex(scrollTop);
        },
        /**
         * 按条件过滤数组
         */
        handleDataList() {
            if (!this.queryLabel) {
                this.initFilterDataList();
                return;
            }
            if (typeof this.filterMethod === 'function') {
                const result = this.filterMethod(this.queryLabel);
                if (Array.isArray(result)) {
                    this.filterDataList = result; // 如果 filterMethod 返回了个数组就使用该数组
                }
            } else {
                this.filterDataList = this.dataList.filter(item => String(item[this.labelKey]).includes(this.queryLabel));
            }
        },
        /**
         * 搜索输入
         */
        onInputChange() {
            this.handleDataList();
        },
        /**
         * 点击选框聚焦到 input 框
         */
        toggleMenu() {
            if (!this.selectDisabled && !this.visible) {
                this.$refs && this.$refs['input'] && this.$refs['input'].focus();
            }
        },
        /**
         * 选择项点击事件
         */
        selectItemClick(item, index) {
            this.selectedLabel = item[this.labelKey];
            this.$emit('input', item[this.valueKey]); // 先更新 value 值再触发 change 事件
            this.$emit('change', item[this.valueKey], item, index);
            this.visible = false;
        },
        /**
         * 清空
         */
        clear() {
            this.selectedLabel = '';
            this.startIndex = 0;
            this.queryLabel = '';
            this.$emit('input', '');
        },
        /**
         * 弹框关闭事件
         */
        close() {
            this.visible = false;
        },
    },

    created() {
        /**
         * 防抖
         */
        this.debouncedOnInputChange = debounce(() => {
            this.onInputChange();
        }, 300);

        this.initFilterDataList();
        this.setSelected();

        document.addEventListener('click', this.close);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close);
    },
};
</script>
<style lang="scss" scoped>
.my-virtual-select {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    font-size: 13px;
    color: #555;

    ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
        background: #dadada;
        border-radius: 6px;
    }
    ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: none;
        border-radius: 6px;
        background: transparent;
    }

    .select-input-box {
        position: relative;
        background-color: white;

        .input {
            flex: 1;
            width: 100%;
            padding: 0 32px 0 15px;
            height: 32px;
            line-height: 32px;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            outline: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;

            &::placeholder {
                color: #c0c4cc;
            }

            &:focus {
                border-color: #409eff;
            }
        }

        .is-disabled {
            background-color: #f5f7fa;
            border-color: #e4e7ed;
            color: #c0c4cc;
            cursor: not-allowed;
        }

        // .suffix-common {
        //     flex: none;
        //     width: 32px;
        //     height: 100%;
        //     position: absolute;
        //     top: 0;
        //     right: 0;
        //     display: flex;
        //     flex-flow: row nowrap;
        //     justify-content: center;
        //     align-items: center;
        //     cursor: pointer;
        // }

        .suffix-arrow {
            // @extend .suffix-common;
            flex: none;
            width: 32px;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &::after {
                content: '';
                width: 8px;
                height: 8px;
                position: relative;
                top: -2px;
                border-right: 1px solid #c0c4cc;
                border-bottom: 1px solid #c0c4cc;
                background: white;
                transform: rotate(45deg);
                transition: all 300ms;
            }
        }
        .suffix-arrow-focus {
            &::after {
                top: 2px;
                transform: rotate(-135deg);
            }
        }

        .suffix-clear {
            // @extend .suffix-common;
            flex: none;
            width: 32px;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            display: none;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;

            .circle {
                position: relative;
                width: 13px;
                height: 13px;
                border: 1px solid #c0c4cc;
                border-radius: 100%;
                background: white;

                &::before {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 5px;
                    width: 1px;
                    height: 8px;
                    background-color: #c0c4cc;
                    transform: rotate(-45deg);
                }

                &::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 5px;
                    width: 1px;
                    height: 8px;
                    background-color: #c0c4cc;
                    transform: rotate(45deg);
                }
            }
        }

        &:hover .suffix-clear {
            display: flex;
        }
    }

    .select-dropdown-box {
        z-index: 999999;
        position: absolute;
        // bottom: -44px;
        top: auto;
        left: 0;
        // right: 0;
        min-width: 100%;
        margin-top: 12px;
        background-color: white;
        border-radius: 4px;
        border: 1px solid #e4e7ed;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        font-size: 14px;
        color: #333;

        .top-arrow {
            position: absolute;
            top: -12px;
            left: 16px;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-bottom-color: #e4e7ed;

            &::after {
                content: '';
                width: 0;
                height: 0;
                position: absolute;
                top: -5px;
                left: -6px;
                border: 6px solid transparent;
                border-bottom-color: white;
            }
        }

        .list-container {
            padding: 6px 0;
            overflow: auto;

            .real-height-box {
                .list {
                    .item {
                        padding: 0 20px;
                        position: relative;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 800px;

                        cursor: pointer;
                        &:hover {
                            background-color: #f5f7fa;
                        }
                    }

                    .is-selected {
                        font-weight: bold;
                        color: #409eff;
                    }
                }
            }

            .empty-text {
                margin: 0;
                padding: 4px 0;
                text-align: center;
                line-height: 16px;
                color: #999;
            }
        }
    }
}
</style>