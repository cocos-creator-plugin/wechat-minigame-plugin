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
                version: "1.0.1",
                desc: '',
                imgSrc: targetPath
            },
            methods: {
                async upload() {
                    await upload(false, buildPath, this.version, this.desc || localConfig.desc, localConfig.logEnabled);
                    Editor.log(TAG, "上传成功");
                }
            }
        });
    },
});
