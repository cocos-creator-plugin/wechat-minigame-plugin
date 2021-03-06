# 微信上传预览工具

>本插件为微信小游戏上传预览，其他平台无法使用！

## 使用

在 [商店](https://store.cocos.com/app/detail/2869) 中进入下载，在 [论坛](https://forum.cocos.org/t/topic/112840/2) 参与讨论。

进入插件安装目录执行 `npm install` 安装项目需要的依赖即可使用

## 注意事项

1. 使用本插件，需要确保本地安装了node，并且将node加入了环境变量PATH中。
2. 代码上传密钥拥有预览、上传代码的权限
3. 代码上传密钥不会明文存储在微信公众平台上，一旦遗失必须重置，请妥善保管
4. 未配置IP白名单的，将无法使用 `本插件` 进行预览和上传
5. 可选择不对IP进行限制，但务必明白风险

## 配置

>插件分全局配置和项目配置，勾选 `不使用全局配置` 后，将使用项目配置，否则使用全局配置。

### 开发者
开发者名字或昵称，因为插件上传后，开发者将显示为 `ci机器人1` 因为需要在项目备注中添加开发者名字用来标记是谁上传的。

### 开启日志

开启后，控制台会打印上传日志（日志较多，请谨慎勾选）

### 打包后自动预览

打包完成后，自动弹出预览和上传窗口，不勾选则不能上传

### appId

应用的appId

### 机器人编号

指定使用哪一个 ci 机器人，可选值：1 ~ 30

### 版本号

上传后的版本号，可在上传时填写，也可先填写

### 描述

上传描述

### 小程序代码上传密钥

代码上传必须的密钥，在小游戏后台 `开发管理 -> 开发设置 -> 小程序代码上传` 中生成密钥。下载密钥后，将密码内容直接复制到输入框中即可。
