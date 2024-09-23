// Description
// 四达在海外开展数字电视运营业务，用户通过订购DVB节目包来享受服务。DVB节目包按月进行计费，不足一个月的金额将被保留在账本中。
// 值此圣诞佳节，我们推出了优惠政策，旨在回馈我们的用户。
// 我们为优惠政策指定了一些规则：
// 充值金额需要达到政策的最低充值金额要求（最小购买时长 * 节目包单价）。
// 优惠政策可以支持多买多送。如果支持，则该政策可以多次享受, 否则只可以享受一次。
// 假设用户充值金额为（rechargeAmount），用户的节目包的价格是packagePrice元/月。用户的购买时长为 rechargeAmount / packagePrice 向下取整 ，根据优惠政策的规则享受多个优惠政策，获得额外赠送的时长。

// 你的任务是设计一个算法，帮助用户选择适用的优惠政策组合，计算用户充值后可以观看的最长时长（以月为单位）。
// 参数说明：
// 1.用户充值金额（rechargeAmount）：表示用户用来购买节目包的金额。
// 2.节目包单价（packagePrice）：表示DVB节目包的价格 (元/月)。
// 3.优惠政策数组（数量N）：每个政策由三部分组成，依次表示最小购买时长、是否多买多送和赠送时长。
// 1）最小购买时长（V1）：表示购买该政策所需的最短订阅时长（月数）。
// 2）是否多买多送（V2）：0/1，0表示只享受一次，1表示可以多次享受。
// 3）赠送时长（V3）：表示享受该政策赠送的时长（月数）。
// 4.享受优惠政策后该优惠政策占用的购买时长不能再享受其他优惠政策。
// Input
// 第一行三个整数, rechargeAmount, packagePrice, N 用空格隔开, 分别代表用户充值金额,节目包单价和优惠政策数量
// 接下来有N行, 每行3个整数 V1, V2, V3 用空格隔开，依次表示最小购买时长、是否多买多送和赠送时长。
// 输入范围：
// 0 < rechargeAmount , packagePrice <= 10^6
// 0 < N <= 20
// 0 < V1 <= 100
// 0 <= V2 <= 1
// 0 <= V3 <= 100
// Output
// 输出一个整数

// Sample Input 1 
// 50 4 3
// 2 1 0
// 3 0 1
// 5 1 2
// Sample Output 1
// 16

#include <iostream>
#include <vector>

using namespace std;

int main() {
    int rechargeAmount, packagePrice, N;
    cin >> rechargeAmount >> packagePrice >> N;
    vector<vector<int>> policies;
    for (int i = 0; i < N; i++) {
        vector<int> policy(3);
        cin >> policy[0] >> policy[1] >> policy[2];
        policies.push_back(policy);
    }
    int base = rechargeAmount / packagePrice;
    int addon = 0;
    // 就是找到最大的addon, 使得base+addon最大
    // 类似于背包问题

    vector<int> dp(rechargeAmount+1, 0);

    for (int i = 0; i < N; i++) {
        for (int j = rechargeAmount; j >= 0; j--) {
            for (int k = 1; k <= j / packagePrice; k++) {
                if (k >= policies[i][0]) {
                    if (policies[i][1] == 0) {
                        dp[j] = max(dp[j], dp[j-k*packagePrice]+k+policies[i][2]);
                    } else {
                        dp[j] = max(dp[j], dp[j-k*packagePrice]+k+policies[i][2]);
                    }
                }
            }
        }
    }

    addon = dp[rechargeAmount];
    cout << base+addon << endl;
    return 0;
}



        

