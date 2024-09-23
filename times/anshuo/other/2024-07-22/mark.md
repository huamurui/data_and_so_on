# md

## 表

### 用户，角色，菜单，权限

user_info
role_info

user_role

menu_info -> 这里的 server_id 与访问哪个项目的静态资源有关
menu_role

### 配置开发相关

awe_do_catalog -> 一条 catalog 对应一个 html 的 res_id。
awe_do_library -> 一条 library 对应一个 catalog 的一条数据字段。
awe_do_group -> 详情分组，一条对应一个 catalog 的一个组
awe_do_event -> 字段事件，与 vue methods 中的链接

code_library... 这里事是真多，第一次见是枚举，之后什么都有。
scenario_xxx  流程，风险探测里可能还有好多

handler -> 通用服务时，配置并重写重写方法，可在服务执行时影响其行为。通用服务时一些简单的数据校验，筛选，格式转换可以在这里做。
executeScript -> 风险探测时的 init 与 check 类。
表格有个特别的事件 mySelectRow，这个是在表格中选中一行时触发的，这需要再前端的 vue methods 里写一个方法，可以做联动的效果。

很多方法的组合，调用，执行，也都，需要配置。也许为了方便统一管理，但...不管怎么样这一部分把原来的逻辑弄断开了，一上来调试找报错挺懵的，还没清晰的文档挺**的。

## 系统开发

### base

对于某一个页面：

尝试用一般的，不使用低代码的开发模式进行对应，来理解系统。

前端页面 => 前端的业务页面是一个个独立的 html 的模板，主要可能有 form list view 这几个大类。其中 form 和 list 是业务数据常用的模板，他们通常需要在数据库的 do_catalog 表定义页面。和后端的 osf.xml 也就是接口文档的数据对应，然后前端还在 do_library 里一条条搞展示数据相关的东西，do_catalog 里的 id + 数据字段名来确定每条数据的唯一值。基本上是配置化的，而前端的项目启动，启动的应该主要是纯静态资源和部分特别的页面，主要业务代码全都在后端项目中。

接口文档 => osf.xml 这个文件定义，浏览器中也能查看测试接口。这个接口文档和前端请求，后端 controller 里的方法都有对应，前端似乎都是直接根据这个文档去进行请求。还有一个事，其实每生成一条 do_catalog 都会自动有一串相关的增删改查，主要有 list 和 info 两种，被叫做通用服务，当然也包括这些服务的接口文档，也能在浏览器路径查看。

后端代码 => 常规的三层调用，controller -> service -> dao/bos，然后是数据库操作，拼 sql。被叫做自定义服务。还有一些事是通用服务的 handler 和流程的里程碑、风险探测开发时的一些执行类的方法。它们应该是写了然后通过配置数据库，交给框架去调用的。好处是流程相关的开发画着图就基本能一下全看到，但一开始不清楚的时候调试挺废功夫的。

连接层 => jbo.xml 和数据库表对应。还有上面的 do_catalog 表想要自动生成增删改查的服务和接口文档就要绑一下这个文件的位置。jbo ~~不是 java bean object ~~ 是 java business object... business 是公司根据业务进行的封装，应该就是它做的一堆格式和数据处理方法。
数据库表 => 自己建

当然，过程、细节里还有一堆一堆表的各种奇怪字段的含义。

### “流程”

这里应该是希望通过系统完成并记录一些“流程”相关的东西。现有的许多办公软件都有类似实现，人员入职离职，会议计划，费用报销，物品领用等等，都类似。他们一个特点也许是，...企业部门的科层制组织结构，上下级，一层层的申请审批。

不过 git flow 也是 flow。pull request，merge request bulabula...

问问神奇海螺。
下级向上级提交材料信息进行申请，
上级对下级的申请进行审批，
...这样讲 apply 和 approve 其实是分不开，的吧。

```js
const flow = {
  menu_info_url_param:'ApplyType/ApproveType=for_url_finding', // apply 只需要写ApplyType=xxx，approve 既要写ApplyType=xxx，又要写ApproveType=xxx
  code_library:{
    code_no:'ApplyType', // 'ApplyType' or 'ApproveType'
    item_no:'for_url_finding',
    item_description:'for_tab_finding',
    item_attribute:'XXXObject', // 对象类型，新建模型画图要填，也是 ApplyType...最外面那个。通常一个对应的 approve 和 apply 共用一个对象类型。应该和业务数据库表名字对应。
    attribute2:'XXXFlow', // 流程编号，新建模型画图要...会填一个，然后新建/操作流程时会填一个 flowNo。通常一个流程对应一个对象类型。
    attribute5:'XXX-button-set', // 申请时的按钮组...审批按钮组好像要到流程图里加。而且要有需要当前用户操作的数据时才会显示。
    tabs_or_phases:[ // 这里实际在 code_library 里不存在...我就是起个名字
      code_library:
        {
          code_no:'for_tab_finding',
          item_no:'1010,1020', // phase type & tab key ... phase 英文叫阶段，三角函数那里好像也有一堆 phase 。嗯，反正这里不止前端 tab 会用，所以起了个抽象的名字。 嗯...在 apply 中它基本是展示全部阶段；而在 approve 中它基本是展示当前阶段，只有 Y / N 两种值。相当于在 approve 中，只有自己负责的当前阶段的 tab 会显示，其他 tab 都会被偷偷藏起来。....今天又踩了一个，这个 key 需要和流程图里的对应，1010 是开始，1020 是过程中，1040 是拒绝，1050 是通过。。。。
          item_Name:'TabName', // 标签名 or 阶段名
          item_description:'tab_buttons', // 外面是一个大的按钮组，这里是按个写，一个个的用逗号分隔。审批按钮别在这里搞，没用。
          attribute4:'XXXList/XXXInfo', // 列表页和详情页资源id 
          attribute5:'html/xxx/xxx.view', // 静态资源
        }
    ]
  }
}
```

上面那个主要是前端页面展示相关的配置。其实这里算是配置那个和流程相关的 tab 页的，很多具体的逻辑还要自己写，可能...保证一些统一性吧...
<!-- 真是服了...全塞到 code_library 里，名字乱七八糟。 -->

你应该也能看到他想干什么，一堆tab页，几个状态，然后是相应状态的信息的查询展示，以及对信息状态的改变。

后端也需要多记录一些东西，我的猜想的是要记录一整个流程的全部节点的全部可能有用信息，就是修改不是覆盖，不是直接改原来的，而是新建。

嗯，一整个流程是一个 wf_instance，而其中的一个节点时被记录下的状态切片， 是 wf_work_item.

不过一个流程都要搞一个 xx_apply 的表，...。

算是种开发规范吧。
如果只是搞出这套页面，不用那两个表也是可以的...或者不用这个框架也是可以的。
嗯...

另一方面的画流程图，它决定了一个流程会从哪里发起，发给谁看 bulabula，怎么算结束 bulabula，流转过程，到达离开时绑定事件....  
但这里这个框架做的更多的可能也是...感觉更多是为了统一记录方式。

#### osf

然后这里插一下 osf，我的理解是这就是个接口文档，http请求的。
全部 post 然后弃用原本状态码这是基操了，里面的部分，请求报文 body 传参，
有

```json
{
  "sysHead":{},
  "appHead":{},
  "body":{}
}
```

这样几个，osf 文档，还有前端请求代码里可以自己修改的，通常只有 body 的 body 里的那部分可以，sysHead 似乎是根据登录用户的信息和页面路径一类的自动生成， appHead 是一些内置的通用业务功能。嗯，也很合理，重新发明一遍 http。

相应报文一样的字段，返回的业务上有用的前端能访问的数据也只在body里。

通过 osf.xml 文件才能定义服务，访问接口，这说是为了安全问题，不意外返回额外的数据。但...其实它拦的并不完全，自定义服务如果不写 osf 直接请求好像也是能请求到的。
接触了银行这种对数据安全有效性要求挺高的东西...好像能理解浏览器为什么要做什么防止跨域类似的事了，毕竟浏览器用户不只是网上冲浪的普通网民的普通数据丢了也没太所谓那种，一些敏感重要的信息，各种企业的系统也挺多用浏览器的。

#### 风险探测

爬聊天记录发现代码写错服务了...作业上的提示信息有问题..
不过也没费太多功夫吧，idea 重构功能还挺强的，java 也是。复制文件夹复制文件就能然后重启一下就好了。
想跨项目访问服务还踩了踩 pom.xml 相互导入项目的坑。另一个就是...这一堆项目的“域名”似乎是公用的，虽然访问时，前端菜单路由上最后那个 app-id 限制了静态资源取自哪个项目下的文件夹，主要是 html 和 jbo osf 这三块，但是你在不同的项目里是可以写出相同的，相互重复的路径的... 这个项目的 java 的包的表现我还没搞清楚，com.xxxCompany.xxxProject.xxxPackage.xxxClass 这样的路径，在不同项目下写相同路径，有时候会报错，有时候好像也能根据服务自动访问...

又，看了遍开发规范的那个文档，嗯，很求稳很保守...而且看了感觉他们是不是有更全的文档但是没给...很多奇奇怪怪的写法，如果是为了规范、安全一类的...就好像也有点合理。

嗯，服务间调用不能导 pom.xml ，他们也搞了一个叫 common client 的东西模拟发请求到别的服务

呃啊...熬到1点...艹哦...

### 具体代码，方法

```js

// 前端的，全局方法

getItemValue(0,getRow(), "name") // 获取第一个数据的 name 字段的值
setItemValue(0,0, "name", "value") // 设置第一个数据的 name 字段的值
setItemRequired(0,0, "name", true) // 设置第一个数据的 name 字段为必填
setItemReadOnly(0,0, "name", true) // 设置第一个数据的 name 字段为必填

showItem(0, "name") // 显示第一个数据的 name 字段
hideItem(0,"name")

// IE 浏览器，不写 ES6 ~ 

AsControl.CallService('url',(data)=>{return newData},()=>reloadPage())
AsControl.as_save()
AsControl.as_saveTmp()
AsControl.as_delete()

```

```html
<!-- 模板，种类 -->
<a3-list list-prop="listProp" /> 
<a3-form form-prop />
<a3-view tab-prop or tree-prop /> tab tree 
```

```java
BizObject bo;
bo.setAttribute("name", value);

bos().saveObject();
bos().deleteObject();

BpmService.initFlow();
// sql 不直接用字符串拼接变量，而是=:name 之后 DataElement.valueOf

```

### “业务”

就基于前面的 流程、模板、方法，来创建一个“业务”。
业务的发布审核本身，也是一个业务，或者说流程。

。。。  

## “架构”

- kode stack 应用架构
  - awe_xxx 的 awe 是 Amarsoft Web Engine/Environment
  - are 是 Amarsoft Runtime Environment
  - osf 是 Open Service Framework
  - RRS 是 ...
- kode mate 开发软件
  - vscode idea 插件
  - 低代码、可视化开发
  - 测试集成 ci/cd devops
- kube mate 应用部署管理
  - 微服务，容器，应用监控...

业务，开发方式选择，架构...

信贷。
