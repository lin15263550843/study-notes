##### VirtualSelect 组件设计

虚拟下拉滚动组件 支持 10 万 + 数据不卡顿

virtual select [component]

    select input 框  [box]
        用来显示选中项及搜索等

        公开的可配置的
            属性
                name                input 的 name 属性
                class               样式
                value/v-model       当前选中项
                placeholder         占位符
                disabled            是否禁用
                filterable          支持搜索
                clearable           是否可清空
            方法
                filterMethod       自定义搜索方法
                change              选中值发生变化时触发
                clear	            可清空的单选模式下用户点击清空按钮时触发
                blur            	当 input 失去焦点时触发	(event: Event)
                focus	            当 input 获得焦点时触发	(event: Event)
        私有的内部的
            属性
                visible             是否显示下拉框
            方法
                handleFocus         聚焦事件
                handleBlur          失去焦点


    下拉列表容器    [box]
        虚拟滚动容器    [container]
            公开的可配置的
                属性
                    class           样式
                    noDataText      无数据文案      支持 slot="empty"
                    dataList        列表数据
                    visibleNumber   可见条数
                    // height       容器高度 = 可见条数 * item 高度

            私有的内部的
                属性
                    startIndex      可见区域起始索引
                    selectedLabel   选中项的 label
                    queryLabel      搜索的 label 
                    filterDataList  筛选后的数据列表
                计算属性
                    endIndex     可见区域结束索引     endIndex = startIndex + visibleNumber
                    allNum          总条数
                    halfItemNumber  一半选项的数量
                    currentIndex    当前选中项的索引
                    transformOffset 可见区域容器的偏移 transform
                    emptyText       noDataText || 暂无数据
                    selectDisabled  disabled

                方法
                    initFilterDataList  初始化 filterDataList
                    setSelected     根据 value 值的变化设置选中项
                    getStartIndex   获取第一个需要渲染 item 的索引，即 startIndex
                    setStartIndex   设置 startIndex
                    setScrollTop    设置 scrollTop
                    onScrollChange  监听滚动事件
                    handleDataList  按条件过滤数组
                    onInputChange   搜索输入
                    toggleMenu      点击选框聚焦到 input 框
                    selectItemClick 选择项点击事件
                    clear          清空
                    debouncedOnInputChange  防抖

            实际高度的容器    [real height box]
                起支支撑作用，和正常渲染所有 item 元素后的高度一样高  itemHeight * allNum
            
                可见区域容器    [box]
                    实际渲染元素，用来存放真实的可视的 item 集合

                    数据项    [item]
                        公开的可配置的
                            属性
                                class               样式
                                itemHeight          item 高度
                                itemKey             item key 值
                                valueKey            item value 值
                                labelKey            item label 值
                                // disabled         是否禁用是否禁用该选项
                            方法
                                click               选项点击事件
                                item                支持自定义 slot="item"
                        私有的内部的
                            属性
                                key                 唯一标识
                                value               选项值
                                label               选项显示值
                            方法
                                click               选项点击事件
