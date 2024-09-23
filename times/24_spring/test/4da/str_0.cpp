// 给定一个字符串s 长度为n, 字符串由小写字母组成, 存在一个整数k代表要删除的字符数量，
// 需要提供一个算法用来判断：在s中删除k个任意字符,对s中剩余字符任意方式重新排序后，判断是否是可以组成一个回文字符串？

// Input
// 输入为：n空格k空格s
// 其中，长度为n，删除字符数为k(0 ≤ k < n ≤10^2)，字符串s由小写字母组成


// Output
// 剩余字符串如果可以组成回文则输出YES，否则输出NO

// Sample Input 1 
// 6 2 zwaafa
// Sample Output 1
// NO

// Sample Input 2 
// 5 3 debdb
// Sample Output 2
// YES


#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int n, k;
    string s;
    cin >> n >> k >> s;
    vector<int> count(26, 0);
    for (int i = 0; i < n; i++) {
        count[s[i] - 'a']++;
    }
    int odd = 0;
    for (int i = 0; i < 26; i++) {
        if (count[i] % 2 == 1) {
            odd++;
        }
    }
    if (odd > k + 1) {
        cout << "NO" << endl;
    } else {
        cout << "YES" << endl;
    }
    return 0;
}
