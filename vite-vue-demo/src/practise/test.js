/**
 * 表格排序
    系统会在tbody中随机生成一份产品信息表单，如html所示。
    请完成 sort 函数，根据参数的要求对表单所有行进行重新排序。
    1、type为id、price或者sales，分别对应第1 ~ 3列
    2、order为asc或者desc，asc表示升序，desc为降序
    3、例如 sort('price', 'asc') 表示按照price列从低到高排序
    4、所有表格内容均为数字，每一列数字均不会重复
    5、不要使用第三方插件
 */
function sort(type, order) {
    if (!type || !order) return;
    const t = {
        id: 0,
        price: 1,
        sales: 2,
    };
    const tbody = document.getElementById('jsList');
    // const copy = tbody.cloneNode(true);
    // console.log('copy', copy);
    const trs = Array.from(tbody.children);
    console.log('trs', trs);
    trs.sort((tr1, tr2) => {
        const td1 = tr1.children[t[type]];
        const td2 = tr2.children[t[type]];
        if (order === 'asc') {
            return Number(td1.innerHTML) - Number(td2.innerHTML);
        } else {
            return Number(td2.innerHTML) - Number(td1.innerHTML);
        }
    });
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild
    // Node.appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处。
    // 如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。
    // while (tbody.children.length > 0) {
    //     tbody.children[0].remove();
    // }
    trs.forEach(tr => {
        tbody.appendChild(tr);
    });
    console.log('trs sort', trs);
}
sort('id', 'desc');
