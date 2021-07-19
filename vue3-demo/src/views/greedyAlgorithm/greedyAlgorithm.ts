/**
 * 贪心算法
 */
export function greedyAlgorithm() {
    /**
     * 州列表
     */
    const statesNeeded = new Set(['mt', 'wa', 'or', 'id', 'nv', 'ut', 'ca', 'az']);
    /**
     * 广播清单
     */
    const stations: any = {
        k1: new Set(['id', 'nv', 'ut']),
        k2: new Set(['wa', 'id', 'mt']),
        k3: new Set(['or', 'nv', 'ca']),
        k4: new Set(['nv', 'ut']),
        k5: new Set(['ca', 'az']),
    };
    /**
     * 最终选择的广播台
     */
    const finalStations = new Set();
    /**
     * 直到把所有广播都覆盖了停止循环
     */
    while (statesNeeded.size > 0) {
        /**
         * 覆盖了最多的未覆盖州的广播台
         */
        let bestStation = '';
        /**
         * 包含广播台覆盖的所有未覆盖的州
         */
        let statesCovered: Set<string> = new Set();

        for (const key in stations) {
            if (Object.prototype.hasOwnProperty.call(stations, key)) {
                const station = stations[key];
                const covered = new Set([...statesNeeded].filter(value => station && station.has(value)));
                if (covered.size > statesCovered.size) {
                    bestStation = key;
                    statesCovered = covered;
                }
            }
        }
        finalStations.add(bestStation);
        statesCovered.forEach(value => {
            statesNeeded.delete(value);
        });
    }
    return [...finalStations];
}
