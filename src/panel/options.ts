import {globalConfig, localConfig} from "../plugin-config";
import {PACKAGE_NAME} from "../constant";

let fs = require("fs");
module.exports = Editor.Panel.extend({
    template: fs.readFileSync(Editor.url(`packages://${PACKAGE_NAME}/static/options.html`), "utf8"),

    ready() {
        const Vue = window["Vue"];
        new Vue({
            el: this.shadowRoot,
            data: {
                globalAuthName: globalConfig.authName,
                globalLogEnabled: globalConfig.logEnabled,
                autoPreviewEnabled: localConfig.autoPreviewEnabled,
                localEnable: localConfig.localEnable,
                authName: localConfig.authName,
                appId: localConfig.appId,
                robot: localConfig.robot,
                privateKey: localConfig.privateKey,
                desc: localConfig.desc,
                version: localConfig.version,
                logEnabled: localConfig.logEnabled
            },
            methods: {
                showError(message: string) {
                    Editor.Dialog.messageBox({
                        type: "error",
                        title: "失败",
                        message: message
                    });
                },
                saveAll() {
                    if (this.autoPreviewEnabled) {
                        if (!this.localEnable) {
                            if (this.globalAuthName == "") {
                                this.showError("使用全局配置的情况下，全局的'开发者'不能设置为空")
                                return;
                            }
                        } else {
                            if (this.authName == "") {
                                this.showError("不使用全局配置的情况下，项目的'开发者'不能设置为空")
                                return;
                            }
                        }
                        if (this.appId == "") {
                            this.showError("必须配置 'appId'")
                            return;
                        }
                        if (this.privateKey == "") {
                            this.showError("必须配置'小程序代码上传密钥'")
                            return;
                        }
                    }
                    globalConfig.authName = this.globalAuthName;
                    globalConfig.logEnabled = this.globalLogEnabled;
                    localConfig.autoPreviewEnabled = this.autoPreviewEnabled;
                    localConfig.localEnable = this.localEnable;
                    localConfig.authName = this.authName;
                    localConfig.appId = this.appId;
                    localConfig.robot = this.robot;
                    localConfig.privateKey = this.privateKey;
                    localConfig.desc = this.desc;
                    localConfig.version = this.version;
                    localConfig.logEnabled = this.logEnabled;
                    globalConfig.save();
                    localConfig.save();
                    Editor.Ipc.sendToMain(`${PACKAGE_NAME}:onConfigChange`, {
                        globalConfig: {
                            authName: this.globalAuthName,
                            logEnabled: this.globalLogEnabled
                        },
                        localConfig: {
                            autoPreviewEnabled: this.autoPreviewEnabled,
                            localEnable : this.localEnable,
                            authName : this.authName,
                            appId : this.appId,
                            robot : this.robot,
                            privateKey : this.privateKey,
                            desc : this.desc,
                            logEnabled : this.logEnabled,
                            version : this.version,
                        }
                    });
                }
            }
        });
    },
});
