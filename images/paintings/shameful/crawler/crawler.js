import axios from "axios"
import fs from "fs"

// 就是...登录 QQ 空间，开发者工具的 network 找到某个 cgi_list 的请求，请求头里的 url 和 cookie 都拿过来一下。
// url 里的一些参数也是 cookie 里的，也一样会变。反正不常用，手动复制吧。

let url = ""
let cookie= ""

// 首先是把 json 数据拿下来，然后处理一下。 
let json = await axios({
    url,
    method: "get",
    headers: {  
      cookie:cookie
    } 
})

let data = JSON.parse(json.data.replace(/shine0_Callback\(|\)\;/g, '').replace(/\\/g, ''))
let goodsList = ['url','exif','batchId']
let list = data.data.photoList.map(item =>{
  let obj = {}
  goodsList.forEach(key => {
    obj[key] = item[key]
  })
  obj.name= item.exif.originalTime.replace(/:/g, '-').replace(/\ /g,'_') + '.jpg'
  return obj
})
let listInfo = data.data.topic

// 数据写入本地文件，我一开始想直接拿 qq 空间当图床...然而不行。
fs.writeFileSync('./data.json', JSON.stringify(list));

// 喵... 下载
list.forEach(async item => {
  let url = item.url
  let path = './images/'+listInfo.name
  let fileName = item.name
  try {
    await downloadFile(url, path, fileName)
  } catch(e) {
    console.log(e)
  }
})

async function downloadFile(url, path, fileName) {
  // 路径不存在可以创建，同名文件存在则不下载
  if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
  }
  if (fs.existsSync(path + '/' + fileName)){
    return
  }
  const writer = fs.createWriteStream(path + '/' + fileName);
  const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
  });
}
