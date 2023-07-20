function test() {
  /**
   * 58 面试题
   * 扁平化数据转成树形结构
   */
  let areaArr = [
    { pid: 10000, id: 11000, name: "浙江省" },
    { id: 10000, name: "中国" },
    { pid: 11000, id: 11100, name: "杭州市" },
    { pid: 11100, id: 11101, name: "西湖区" },
    { pid: 11100, id: 11102, name: "萧山区" },
    { pid: 11000, id: 11200, name: "金华市" },
    { pid: 11200, id: 11201, name: "京东区" },
    { pid: 11200, id: 11202, name: "婺城区" },
    { pid: 10000, id: 12000, name: "湖南省" },
    { pid: 12000, id: 12100, name: "长沙市" },
    { pid: 12100, id: 12101, name: "长沙市区1" },
    { pid: 12100, id: 12102, name: "长沙市区2" },
    { pid: 12000, id: 12200, name: "岳阳市" },
    { pid: 12200, id: 12201, name: "岳阳市区1" },
    { pid: 12200, id: 12202, name: "岳阳市区2" },
  ];
  function fn(arr) {
    if (!Array.isArray(arr)) {
      throw Error(`the ${arr} is not a array`);
    }
    const tree = [];
    const map = new Map();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      const cur = arr[i];
      const { pid, id } = cur;
      const children = map.get(id);
      if (children) {
        cur.children = children;
      } else {
        cur.children = [];
        map.set(id, cur.children);
      }

      if (!pid) {
        tree.push(cur);
      } else {
        const children = map.get(pid);
        if (children) {
          children.push(cur);
        } else {
          map.set(pid, [cur]);
        }
      }
      console.log(tree, map);
      return;
    }
    return tree;
  }
  console.log(fn(areaArr));
}
test();
