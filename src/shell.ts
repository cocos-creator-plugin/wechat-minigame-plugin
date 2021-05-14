import {preview as miniPreview, Project, upload as miniUpload} from "miniprogram-ci"
import {GlobalConfig, LocalConfig} from "./config";

let index = 2;
const preview = process.argv[index++] === "true";
const PROJECT_PATH = process.argv[index++];
const qrcodeOutputDest = process.argv[index++];
const LOCAL_CONFIG_PATH = process.argv[index++];
const GLOBAL_CONFIG_PATH = process.argv[index++];
const version = process.argv[index++];
const desc = process.argv[index++];
const logEnabled = process.argv[index++] === "true";

const globalConfig = new GlobalConfig();
const localConfig = new LocalConfig();
globalConfig.initConfig(GLOBAL_CONFIG_PATH);
localConfig.initConfig(LOCAL_CONFIG_PATH);

(async () => {
    const project = new Project({
        appid: localConfig.appId,
        type: 'miniGame',
        projectPath: PROJECT_PATH,
        privateKey: localConfig.privateKey,
        ignores: ['node_modules/**/*'],
    });
    if (preview) {
        await miniPreview({
            project,
            version: version,
            desc: localConfig.desc,
            qrcodeFormat: 'image',
            qrcodeOutputDest: qrcodeOutputDest,
            onProgressUpdate: logEnabled ? undefined : () => {}
        });
    } else {
        await miniUpload({
            project,
            version: version,
            desc: desc,
            onProgressUpdate: logEnabled ? undefined : () => {}
        })
    }
    console.log("success")
    // console.log(previewResult)
})()
