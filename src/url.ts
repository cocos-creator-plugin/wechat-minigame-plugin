import {PACKAGE_NAME} from "./constant";

export const LOCAL_CONFIG_PATH = Editor.url(`profile://project/${PACKAGE_NAME}.json`);
export const GLOBAL_CONFIG_PATH = Editor.url(`profile://global/${PACKAGE_NAME}.json`);
export const IMAGE_DEST_PATH = `packages://${PACKAGE_NAME}/destination.png`
