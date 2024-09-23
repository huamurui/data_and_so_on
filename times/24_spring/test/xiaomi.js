// console.log('testt.js');

// const line1 = read_line()
// const [n,field_id] = line1.split(' ').map(i=>Number(i))
// const line2 = read_line()
// const people_field = line2.split(' ').map(i=>Number(i))

const ming_field_id = 0
const people_field = [2,0,0,1]

/* 
小明参加选举，他有一个队伍，队伍号为 ming_field_id。
参加选举的所有人的队伍号，存在 people_field 数组中。

小明的队伍中所有人都会给他投票，
然而，小明打算再游说另一个队伍的人，让他们也投给他，假定一定能游说成功，即该队伍的所有人也都会投给他。
输出小明最终能得到的最多票数。

ps: ming_field_id 可能把 people_field 占满，也可能没有在 people_field 中出现。

*/

const people_field_without_mings = people_field.filter((i)=>i!==ming_field_id)

const base_mark = people_field.length - people_field_without_mings.length
if(people_field.length === base_mark) {
  console.log(base_mark)
  return
}

const count_map = {}
for(let i = 0;i<people_field_without_mings.length;i++){
    if(!count_map[people_field_without_mings[i]]) count_map[people_field_without_mings[i]] = 0
    count_map[people_field_without_mings[i]]++
}

const most = Array.from(Object.values(count_map)).sort((a,b)=>b-a)[0] || 0

console.log(base_mark+most)



const ms = ['Z','G','B','A']
const str = 'ZQWEGRTBYAAI'

// 1. ms 为偏爱字符数组。str 是要被替换的字符串，样板。
// 2. 替换规则是，str 中非 ms 中存在的字符会被替换，替换为在 str 中相邻的最近出现的一个偏爱字符。相同距离的左边优先，所有替换同步、一次完成。

const str_arr = str.split('')

const new_str = str_arr.map((i,index)=>{
    if(ms.includes(i)) return i
    let left = index - 1
    let right = index + 1
    while(left>=0 || right<str_arr.length){
        if(left>=0 && ms.includes(str_arr[left])) return str_arr[left]
        if(right<str_arr.length && ms.includes(str_arr[right])) return str_arr[right]
        left--
        right++
    }
    return i
}).join('')

console.log(new_str)