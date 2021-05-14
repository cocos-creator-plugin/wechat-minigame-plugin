import {spawn} from "child_process";
import {GLOBAL_CONFIG_PATH, IMAGE_DEST_PATH, LOCAL_CONFIG_PATH} from "./url";
import {TAG} from "./constant";


export function upload(preview: boolean, path: string, version: string, desc: string, logEnabled: boolean) {
    const targetPath = Editor.url(IMAGE_DEST_PATH)
    const url = Editor.url("packages://wechat-minigame-plugin/dist/shell.js")
    return new Promise<void>((resolve, reject) => {
        Editor.log(TAG, "开始上传")
        const handle = spawn('node', [url, preview.toString(), path, targetPath, LOCAL_CONFIG_PATH, GLOBAL_CONFIG_PATH, version, desc, logEnabled.toString()]);

        handle.stdout.on('data', (data) => {
            Editor.log(TAG, data.toString());
        });

        handle.stderr.on('data', (data) => {
            Editor.error(data.toString());
        });

        handle.on('error', (code) => {
            reject(new Error(`child process error with information: ${code}`));
            Editor.log(TAG, "error")
        });

        handle.on('close', (code) => {
            resolve()
            Editor.log(TAG, "结束上传")
        });
    });
}
