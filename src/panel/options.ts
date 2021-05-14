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
                saveAll() {
                    globalConfig.authName = this.globalAuthName;
                    globalConfig.logEnabled = this.globalLogEnabled;
                    localConfig.autoPreviewEnabled = this.autoPreviewEnabled;
                    localConfig.localEnable = this.localEnable;
                    localConfig.authName = this.authName;
                    localConfig.appId = this.appId;
                    localConfig.robot = this.robot;
                    localConfig.privateKey = this.privateKey;
                    localConfig.desc = this.desc;
                    localConfig.logEnabled = this.logEnabled;
                    globalConfig.save();
                    localConfig.save();
                }
            }
        });
    },
});
