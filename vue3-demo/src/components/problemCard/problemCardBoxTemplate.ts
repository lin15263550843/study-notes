export default () => {
    return `
        <div id="problem-card-box-template">
            <ProblemCard
                title="选择排序"
                description="从小到大排序"
                :dataSource="dataSource"
                :result="result"
                :execute="execute"
                :clearResult="clearResult"
                :vResult="vResult"
                :verification="verification"
                :clearVResult="clearVResult"
            />
        </div>
    `;
};
