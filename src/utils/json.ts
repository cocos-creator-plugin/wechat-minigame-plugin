function getStr(size) {
    let str = "";
    for (let i = 0; i < size; i++) {
        str += "  ";
    }
    return str;
}

export function prettilyEncode(json, identSize = 0) {
    let str = "";
    if (Array.isArray(json)) {
        str += "[";
        identSize++;
        for (let index = 0; index < json.length; index++) {
            str += "\n";
            // noinspection JSUnfilteredForInLoop
            let v = json[index];
            str += getStr(identSize);
            str += prettilyEncode(v, identSize);
            // noinspection EqualityComparisonWithCoercionJS
            if (index != (json.length - 1)) {
                str += ",";
            }
        }
        identSize--;
        if (json.length > 0) {
            str += "\n";
            str += getStr(identSize);
        }
        str += "]"

    } else if (typeof json === 'object') {
        str += "{";
        identSize++;
        let keys = Object.keys(json);
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            let value = json[key];
            if (value == undefined) continue;
            if (index != 0) {
                str += ",";
            }
            str += "\n";
            str += getStr(identSize);
            str += `"${key}": ${prettilyEncode(value, identSize)}`;
        }
        identSize--;
        if (keys.length > 0) {
            str += "\n";
            str += getStr(identSize);
        }
        str += "}"
    // } else if (typeof json === 'string') {
    //     str += `"${json}"`;
    } else {
        str += JSON.stringify(json);
    }
    return str;
}

module.exports.prettilyEncode = prettilyEncode;
