import {globalConfig, localConfig} from "./plugin-config";
import {upload} from "./upload";
import {TAG} from "./constant";
import {IMAGE_DEST_PATH} from "./url";

async function onBuildFinished(options, callback) {
    let {actualPlatform, platform} = options;
    let currentPlatform = actualPlatform || platform;
    if (currentPlatform == "wechatgame") {
        if (localConfig.autoPreviewEnabled) {
            try {
                if (localConfig.appId == "") {
                    Editor.warn(TAG, "未配置‘appId’，跳过上传");
                    return;
                }
                if (localConfig.privateKey == "") {
                    Editor.warn(TAG, "未配置‘小程序代码上传密钥’，跳过上传");
                    return;
                }
                await upload(true, options.dest, "0.0.1", localConfig.desc, localConfig.logEnabled)
                callback();
                Editor.Panel.open("wechat-minigame-plugin.2", [IMAGE_DEST_PATH, options.dest]);
            } catch (e) {
                callback(e);
            }
        } else {
            Editor.log(TAG, "预览未开启，跳过上传");
        }
    } else {
        Editor.log(TAG, "发布平台不是‘微信小游戏’，跳过上传");
    }
}

module.exports = {
    load() {
        Editor.log("====load")
        Editor.Builder.on("build-finished", onBuildFinished);
    },
    unload() {
        Editor.log("====unload")
        Editor.Builder.removeListener("build-finished", onBuildFinished);
    },
    messages: {
        settings() {
            Editor.log("====settings")
            Editor.Panel.open("wechat-minigame-plugin");
        },
        onConfigChange(event, arg) {
            let {
                globalAuthName,
                globalLogEnabled,
                autoPreviewEnabled,
                localEnable,
                authName,
                appId,
                robot,
                privateKey,
                desc,
                logEnabled
            } = arg;
            globalConfig.authName = globalAuthName;
            globalConfig.logEnabled = globalLogEnabled;
            localConfig.autoPreviewEnabled = autoPreviewEnabled;
            localConfig.localEnable = localEnable;
            localConfig.authName = authName;
            localConfig.appId = appId;
            localConfig.robot = robot;
            localConfig.privateKey = privateKey;
            localConfig.desc = desc;
            localConfig.logEnabled = logEnabled;
        }
    }
}
