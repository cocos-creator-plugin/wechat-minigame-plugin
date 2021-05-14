/**
 *
 * 本文件只是为了不让js里报警告，不是实际api的描述文件。且main process 的api与renderer process的api有较大差异，因此不能完全按本文件的描述来写代码
 *
 */

// declare function require(str : string):any;
declare namespace Editor {
    let versions: {
        [key: string]: string
    }
    interface Extension {
        load();

        unload();

        message: { [key: string]: Function }
    }
    export function require(str : string);
    export function log(...str : any[]);
    export function error(...str : any[]);
    export function fatal(...str : any[]);
    export function failed(...str : any[]);
    export function info(...str : any[]);
    export function success(...str : any[]);
    export function trace(...str : any[]);
    export function warn(...str : any[]);
    export function url(url : string) : string;
    export var projectPath : string;
    namespace Project {
        export var path : string;
    }
    namespace projectInfo {
        export var path : string;
    }
    namespace Ipc {
        export function sendToMain(message:string, ...args);
    }
    namespace Builder {
        export function on(eventName:string, e : Function)
        export function removeListener(eventName:string, e : Function)
    }
    namespace Panel {
        export function extend(obj : any)
        export function open(obj : string, args?: any[])
        export function close(obj : string)
    }
    namespace Profile {
        export function load(path : string, e : Function | any)
    }
    namespace assetdb {
        export function getRelativePath(path : string):string
        export function isSubAssetByUuid(uuid: string): boolean;
        function urlToUuid(url: string): string;
    }
    namespace Dialog {
        export function openFile(obj : OpenFileOptions);
        export function saveFile(obj: OpenSaveOptions);
        type OpenFileProperties = "openFile" | "openDirectory" | "multiSelections" | "showHiddenFiles" | "createDirectory" | "promptToCreate" | "noResolveAliases" | "treatPackageAsDirectory"
        interface OpenFileOptions{
            title ?: string;
            defaultPath?:string;
            filters?: Array<FileFilter>;
            properties?:OpenFileProperties[]
        }
        interface FileFilter {
            name: string;
            extensions: string[];
        }
        type OpenSaveProperties = "showHiddenFiles" | "createDirectory" | "treatPackageAsDirectory" | "showOverwriteConfirmation" | "dontAddToRecent";
        interface OpenSaveOptions {
            title ?: string;
            defaultPath?:string;
            buttonLabel?: string;
            filters?: Array<FileFilter>;
            /**
             *  macOS -显示在对话框上的消息。
             */
            message?: string;
            /**
             * macOS - 文件名输入框对应的自定义标签名。
             */
            nameFieldLabel?: string;
            /**
             * macOS - Show the tags input box, defaults to true.
             */
            showsTagField?: boolean;
            properties?: OpenSaveProperties[];
            /**
             * macOS mas - 在打包提交到Mac App Store时创建 security scoped bookmarks 当该选项被启用且文件尚不存在时，那么在选定的路径下将创建一个空文件。
             */
            securityScopedBookmarks?:boolean
        }
        export function messageBox(obj : MessageBoxOptions)

        interface MessageBoxOptions {
            type?: string;
            buttons?: Array<string>;
            defaultId?: number;
            title ?: string;
            message ?: string;
            detail ?: string;
            icon ?: any;
            cancelId ?: number;
            noLink ?: boolean;
        }
    }
}
