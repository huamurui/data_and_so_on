{/* <p>  宝宝和妈妈参加亲子游戏，在一个二维矩阵（N*N）的格子地图上，宝宝和妈妈抽签决定各自的位置，地图上每个格子有不同的糖果数量，部分格子有障碍物。 </p> <p>  游戏规则是妈妈必须在最短的时间（每个单位时间只能走一步）到达宝宝的位置，路上的所有糖果都可以拿走，不能走障碍物的格子，只能上下左右走。 </p> <div>  请问妈妈在最短到达宝宝位置的时间内最多拿到多少糖果（优先考虑最短时间到达的情况下尽可能多拿糖果）。 </div> */}

function maxCandy(N, map) {
    // write code here
    let dp = new Array(N).fill(0).map(() => new Array(N).fill(0));
    let res = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (map[i][j] === 0) {
                dp[i][j] = 0;
            } else {
                dp[i][j] = map[i][j];
                if (i > 0) {
                    dp[i][j] = Math.max(dp[i][j], dp[i - 1][j] + map[i][j]);
                }
                if (j > 0) {
                    dp[i][j] = Math.max(dp[i][j], dp[i][j - 1] + map[i][j]);
                }
            }
            res = Math.max(res, dp[i][j]);
        }
    }
    return res;
}