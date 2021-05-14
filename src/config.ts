import * as jsonUtils from "./utils/json";
import * as fs from "fs";
import {TAG} from "./constant";

export class GlobalConfig {
    _configPath: string = "";
    _init: boolean = false;
    authName: string = "";
    logEnabled: boolean = true;

    initConfig(path: string) {
        if (this._init) {
            return;
        }
        this._init = true;
        this._configPath = path;
        if (fs.existsSync(path)) {
            try {
                let buffer = fs.readFileSync(path);
                let data = JSON.parse(buffer.toString());
                for (let key of Object.keys(data)) {
                    this[key] = data[key];
                }
            } catch (e) {
                if (typeof Editor != "undefined") {
                    Editor.warn(TAG, "读取配置错误", e);
                } else {
                    console.warn(TAG, "读取配置错误", e);
                }
            }
        }
        return this;
    }

    save() {
        fs.writeFileSync(this._configPath, jsonUtils.prettilyEncode(this));
    }
}

export class LocalConfig extends GlobalConfig {
    autoPreviewEnabled: boolean = false;
    appId: string = "";
    robot: number = 1;
    privateKey: string = "";
    desc: string = "";

    localEnable: boolean = false;
    version: string = "";
}

