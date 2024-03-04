# 大华视频接入

## |——准备

### |——准备ICC环境

- ICC环境一般是部署在现场客户服务器上，由区域同事安装部署
- ICC平台地址是https://平台ip:端口默认443，用户密码由区域同事提供，访问凭证可由区域同事/客户（知晓超级管理员用户/密码的人员）申请



平台部署完之后：

- 登录管理平台

- 获取密钥：使用`system`用户登录，登录后获取申请访问凭证，即获取`clientId、clienSecret`
- 进入管理平台后申请OpenAPI

![image-20230519091826207](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519091826207.png)

- 申请访问凭证

![image-20230519091845002](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519091845002.png)

- 填写凭证

![image-20230519091934319](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519091934319.png)



### |——申请openAPI用户

#### |——创建角色（已有可跳过）

![image-20230519092158257](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519092158257.png)

- 添加角色

![image-20230519092243551](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519092243551.png)

![image-20230519092253546](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519092253546.png)



#### |——创建用户

![image-20230519092318337](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519092318337.png)

![image-20230519092332425](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519092332425.png)

![image-20230519092344300](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519092344300.png)





## |——接入方式

- 使用大华播放控件（固定控件）
- 取流播放：flv流或hls流



## |——鉴权

- 文档参考：https://open-icc.dahuatech.com/#/home  对接指南——鉴权介绍
- `account_token`是通过消费用户的`clientId、clienSecret`获取的，时效为2h



## |——接入

### |——环境

- 文档参考：https://open-icc.dahuatech.com/#/home  对接指南——快速开始

- ICC Java SDK



### |——设备数据获取

- 参考文档:https://open-icc.dahuatech.com/#/home   API文档——基础资源——设备管理
- 相关设备信息可以通过平台直接获取

![image-20230519095025598](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519095025598.png)

![image-20230519095036520](https://qvqzhm.oss-cn-guangzhou.aliyuncs.com/img/image-20230519095036520.png)



### |——取流预览接入

- API：/evo-apigw/admin/API/video/stream/realtime   POST

| 参数名     | 必选 | 类型   | 说明                                    |
| ---------- | ---- | ------ | --------------------------------------- |
| **data**   | true | string | Json串                                  |
| channelId  | true | string | 视频通道编码                            |
| streamType | true | string | 码流类型：1=主码流, 2=辅码流，3=辅码流2 |
| type       | true | string | hls,hlss,flv,flvs,rtmp                  |



### |——取流回放（flv不支持）

- API：/evo-apigw/admin/API/video/stream/record  POST

| 参数名         | 必选 | 类型   | 说明                                                         |
| -------------- | ---- | ------ | ------------------------------------------------------------ |
| **data**       | true | Object | Json对象                                                     |
| - channelId    | true | string | 视频通道编码，第一个$后数字代表[通道类型](https://open-icc.dahuatech.com/iccdoc/enterprisebase/5.0.12/wiki/common/enum_list.html#单元类型)，必须是1 |
| - streamType   | true | string | 码流类型：1=主码流, 2=辅码流，3=辅码流2                      |
| - type         | true | string | 支持hls/hlss/rtmp格式， flv录像类型不支持                    |
| - recordType   | true | string | 录像类型：1 表示普通录像                                     |
| - beginTime    | true | string | 开始时间,格式:yyyy-MM-dd HH:mm:ss                            |
| - endTime      | true | string | 结束时间,格式:yyyy-MM-dd HH:mm:ss                            |
| - recordSource | true | string | 录像来源：2：设备 device,3：中心 center                      |



### |——控件接入

#### |——所需参数

- 设备通道编号：channelId
- account_token
- 控件接入的方式与海康相似

效果：

[//]: # (![image-20230515153957806]&#40;C:\Users\13925\AppData\Roaming\Typora\typora-user-images\image-20230515153957806.png&#41;)



## |——另

- 大华平台能够添加海康设备
- 大华视频PC端没有提供`iframe`嵌入的接入方式
- 大华设备添加后需要在自己的平台中接入的话，需要拿着ICC平台注册好的设备信息再到自己的平台中录入好对应的信息（同海康）



## |——总结

1. 目前我们没有自己的ICC平台账号以及域名，需要联系相关人员部署。
2. 部署好自己的平台后，平台的使用方式与云眸相似。
3. 体验网址：https://124.160.33.135:4077/#/home    账号：TEST 密码：Admin123
4. 平台相关问题文档：https://open-icc.dahuatech.com/faq/icc/index.html#/icc/00/platform





## |——接入流程（开发）

### |——鉴权

- 获取公钥：/evo-apigw/evo-oauth/1.0.0/oauth/public-key GET

- 认证：/evo-apigw/evo-oauth/1.0.0/oauth/extend/token POST

  - 参数：

  | 参数名         | 必选 | 类型          | 说明                                                         |
  | -------------- | ---- | ------------- | ------------------------------------------------------------ |
  | grant_type     | 是   | string(0,128) | 授权类型，固定值：password                                   |
  | username       | 是   | string(0,50)  | 用户名                                                       |
  | password       | 是   | string(0,255) | 平台密码，需RSA加密密码传输,RSA公钥[获取公钥](https://open-icc.dahuatech.com/iccdoc/enterprisebase/5.0.12/wiki/evo-oauth/userPass.html#获取公钥)接口，加密参考：[RSA加密demo](https://open-icc.dahuatech.com/download/others/RSA密码加密.zip) |
  | client_id      | 是   | string(0,128) | 凭证id，自定义，建议数字、字母                               |
  | client_secret  | 是   | string(0,128) | 凭证密钥，**访问凭证client_id与client_secret必须一致**，详见[申请访问凭证](https://open-icc.dahuatech.com/iccdoc/enterprisebase/5.0.12/wiki/common/summary.html#申请访问凭证)获取 |
  | public_key     | 是   | string(0,512) | 公钥，由鉴权中心下发                                         |
  | code           | 否   | string(0,8)   | 动态验证码                                                   |
  | verifyCodeFlag | 否   | int(1)        | 是否启用动态验证码功能 0：关闭 1：开启 默认0；5.0.9+支持；若想开启动态验证码功能，在保证[系统配置->账号安全设置->登录验证码]开关开启的前提下，接口参数需传1，否则开启不生效 |

- 刷新认证：/evo-apigw/evo-oauth/1.0.0/oauth/extend/refresh/token POST

  - | 参数名        | 必选 | 类型           | 说明                                                         |
    | ------------- | ---- | -------------- | ------------------------------------------------------------ |
    | grant_type    | true | string(0,128)  | 认证类型，固定值：refresh_token                              |
    | client_id     | true | string(0,128)  | 客户端id，自定义，支持数字、字母，即[认证](https://open-icc.dahuatech.com/iccdoc/enterprisebase/5.0.12/wiki/evo-oauth/userPass.html#认证)接口中的client_id与client_secret |
    | client_secret | true | string(0,128)  | 客户端secret，，详见[申请访问凭证](https://open-icc.dahuatech.com/iccdoc/enterprisebase/5.0.12/wiki/common/summary.html#申请访问凭证)获取 |
    | refresh_token | true | string(0,2048) | refresh_token                                                |

  - **返回参数**

    

    | 名称            | 类型    | 说明                               | 版本号                                                       |
    | --------------- | ------- | ---------------------------------- | ------------------------------------------------------------ |
    | success         | boolean | 接口返回是否成功                   |                                                              |
    | code            | string  | 错误码：0为无错误，非0为具体错误码 |                                                              |
    | errMsg          | string  | 错误消息                           |                                                              |
    | data            | object  | 返回数据对象                       |                                                              |
    | + id            | string  | 被修改的用户id                     |                                                              |
    | + access_token  | string  | 鉴权token                          | 请求业务接口时设置请求头字段Authorization=**token_type** + 空格 + **access_token** |
    | + refresh_token | string  | 刷新token                          | 刷新token，有效期1天;一般需要结合[刷新认证信息接](https://open-icc.dahuatech.com/iccdoc/enterprisebase/5.0.12/wiki/evo-oauth/userPass.html#刷新认证信息)口获取access_token,避免再次输入密码获取 |
    | + token_type    | string  | 令牌类型，固定bearer               |                                                              |
    | + expires_in    | long    | access_token有效期,单位是秒        |                                                              |
    | + scope         | string  | 作用域，固定‘*’                    |                                                              |
    | + userId        | string  | 用户id                             |                                                              |



### |——获取设备详情

- /evo-apigw/evo-brm/1.0.0/device/{deviceCode} GET（设备编码ICC平台获取）
- 获取设备通道信息：/evo-apigw/evo-brm/1.2.0/device/subsystem/page POST
