import {GlobalConfig, LocalConfig} from "./config";
import {GLOBAL_CONFIG_PATH, LOCAL_CONFIG_PATH} from "./url";
export const globalConfig = new GlobalConfig();
export const localConfig = new LocalConfig();
globalConfig.initConfig(GLOBAL_CONFIG_PATH);
localConfig.initConfig(LOCAL_CONFIG_PATH);
