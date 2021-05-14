import {globalConfig, localConfig} from "./plugin-config";
import {upload} from "./upload";
import {PACKAGE_NAME, TAG} from "./constant";
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
                Editor.Panel.open(`${PACKAGE_NAME}.2`, [IMAGE_DEST_PATH, options.dest]);
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
            Editor.Panel.open(PACKAGE_NAME);
        },
        onConfigChange(event, arg) {
            let {
                globalConfig: global, localConfig: local
            } = arg;
            if (global != null) {
                for (let key of Object.keys(global)) {
                    globalConfig[key] = global[key];
                }
            }
            if (local != null) {
                for (let key of Object.keys(local)) {
                    localConfig[key] = local[key];
                }
            }
        }
    }
}
