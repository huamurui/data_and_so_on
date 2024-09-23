// 求货运船的每小时最小运输速度
// Description
// 四达时代需要定期从国内向非洲运货，现在有一个需求，需要知道每次供货时在规定时间H内运输完成的最小的运输速度是多少个小时?
// 通过这个数值可以有效安排清关人员数量、机器数量，节约在货物运输时的人力与物力成本。
// 已知有N批货物，第i批的货物有goods[ i]个机顶盒、智能卡或者太阳能设备等，货物的平均运输速度为K(个小时)，且不能同时运输多个批次的货物。
// 请你设计算法得到这个指标，求出在H个小时内将货物全部的运输到货运船的最小运输速度K是多少?参数说明:
// 1<=N <= 100N<=H<=1000
// 1 <= goods[i]<= 1000
// lnput
// 使用英文逗号分隔的商品个数的字符串，空格，限制完成运输的小时数值H
// Output
// 输出最小运输速度

// Sample Input 1 
// 3,6,7,11 8

// Sample Output 1
// 4

// Sample Input 2 
// 30,11,23,4,20 5

// Sample Output 2
// 30

#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    string str;
    cin >> str;
    int H;
    cin >> H;
    vector<int> goods;
    int start = 0;
    for (int i = 0; i < str.size(); i++) {
        if (str[i] == ',') {
            goods.push_back(stoi(str.substr(start, i - start)));
            start = i + 1;
        }
    }
    goods.push_back(stoi(str.substr(start, str.size() - start)));
    int max = 0;
    for (int i = 0; i < goods.size(); i++) {
        if (goods[i] > max) {
            max = goods[i];
        }
    }
    int left = 1;
    int right = max;
    while (left < right) {
        int mid = (left + right) / 2;
        int sum = 0;
        for (int i = 0; i < goods.size(); i++) {
            sum += (goods[i] + mid - 1) / mid;
        }
        if (sum > H) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    cout << left << endl;
    return 0;
}


// 这一题是一个二分查找的题目，题目的意思是给定一个数组，数组中的每个元素代表了每批货物的数量，然后给定一个时间H，要求求出在H个小时内将货物全部的运输到货运船的最小运输速度K是多少。
// 首先我们需要找到数组中的最大值，因为最大值就是我们的上限，然后我们使用二分查找的方法，不断的缩小我们的范围，直到找到最小的运输速度K。
// 代码中我们使用了一个while循环，不断的缩小我们的范围，然后在循环中我们使用了一个for循环，计算出当前的运输速度K下，需要多少个小时才能将货物全部运输到货运船上。
// 如果当前的运输速度K下，需要的时间大于H，那么我们就将左边界向右移动，否则我们就将右边界向左移动，最后我们就可以得到最小的运输速度K。
// 这一题的时间复杂度是O(nlogm)，其中n是数组的长度，m是数组中的最大值。
// 这一题的空间复杂度是O(n)，其中n是数组的长度。
// 这一题的核心是二分查找，是一道非常经典的题目。
