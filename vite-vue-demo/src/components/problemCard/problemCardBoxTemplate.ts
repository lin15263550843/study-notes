export default () => {
    return `
        <div id="problem-card-box-template">
            <ProblemCard
                :title="title"
                :description="description"
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
