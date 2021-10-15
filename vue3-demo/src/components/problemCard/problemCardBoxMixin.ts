import { h } from 'vue';
import commonProblemCard from './problemCard';
import ProblemCard from './problemCard.vue';
// import problemCardBoxTemplate from './problemCardBoxTemplate';

export default {
    // template: problemCardBoxTemplate(),
    components: { ProblemCard },
    data() {
        const { result, vResult, clearResult, clearVResult } = commonProblemCard();
        return {
            result,
            vResult,
            clearResult,
            clearVResult,
        };
    },
    render() {
        const _this: any = this;
        const vdom: any = h(
            'div',
            null,
            h(ProblemCard, {
                title: '选择排序',
                description: '从小到大排序',
                dataSource: _this.dataSource,
                result: _this.result,
                execute: _this.execute,
                clearResult: _this.clearResult,
                vResult: _this.vResult,
                verification: _this.verification,
                clearVResult: _this.clearVResult,
            }),
        );
        return vdom;
    },
};
