import {preview as miniPreview, Project, upload as miniUpload} from "miniprogram-ci"
import {GlobalConfig, LocalConfig} from "./config";

let index = 2;
const preview = process.argv[index++] === "true";
const PROJECT_PATH = process.argv[index++];
const qrcodeOutputDest = process.argv[index++];
const LOCAL_CONFIG_PATH = process.argv[index++];
const GLOBAL_CONFIG_PATH = process.argv[index++];

const globalConfig = new GlobalConfig();
const localConfig = new LocalConfig();
globalConfig.initConfig(GLOBAL_CONFIG_PATH);
localConfig.initConfig(LOCAL_CONFIG_PATH);

const version = localConfig.version;
const logEnabled = localConfig.localEnable ? localConfig.logEnabled : globalConfig.logEnabled;

const authName = localConfig.localEnable ? localConfig.authName : globalConfig.authName;
let desc: string;
if (localConfig.desc) {
    desc = `【${authName}】${localConfig.desc}`;
} else {
    let date = new Date();
    desc = `${authName} ${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}时${date.getMinutes()}分上传。`;
}
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
            robot: localConfig.robot,
            qrcodeFormat: 'image',
            qrcodeOutputDest: qrcodeOutputDest,
            onProgressUpdate: logEnabled ? undefined : () => {}
        });
    } else {
        await miniUpload({
            project,
            version: version,
            desc: desc,
            robot: localConfig.robot,
            onProgressUpdate: logEnabled ? undefined : () => {}
        })
    }
    console.log("success")
    // console.log(previewResult)
})()
