import {localConfig} from "../plugin-config";
import {upload} from "../upload";
import {PACKAGE_NAME, TAG} from "../constant";

let fs = require("fs");

module.exports = Editor.Panel.extend({
    template: fs.readFileSync(Editor.url(`packages://${PACKAGE_NAME}/static/preview.html`), "utf8"),

    run(args: string[]) {
        const [targetPath, buildPath] = args;
        const Vue = window["Vue"];
        new Vue({
            el: this.shadowRoot,
            data: {
                version: localConfig.version,
                desc: localConfig.desc,
                imgSrc: targetPath
            },
            methods: {
                async upload() {
                    if (this.version == "") {
                        Editor.Dialog.messageBox({
                            type: "error",
                            title: "失败",
                            message: "版本号不能为空"
                        });
                        return;
                    }
                    localConfig.version = this.version;
                    localConfig.desc = this.desc;
                    localConfig.save();
                    Editor.Ipc.sendToMain(`${PACKAGE_NAME}:onConfigChange`, {
                        localConfig: {
                            version : this.version,
                            desc : this.desc,
                        }
                    })

                    await upload(false, buildPath);
                    Editor.log(TAG, "上传成功");
                }
            }
        });
    },
});
