"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMultiline = exports.base64 = void 0;
/**
 * 把字符串编码为Base64字符串返回
 *
 * @param s 要编码的字符串
 */
function base64(s) {
    return Buffer.from(s, "utf-8").toString("base64");
}
exports.base64 = base64;
/**
 * 格式化多行输入，模拟支持数组，主要是为了把 action 传递进来的参数标准化
 *
 * @param lines
 */
function formatMultiline(lines) {
    for (let index = 0; index < lines.length; index++) {
        let s = lines[index].trim();
        if (s.startsWith("-")) {
            s = s.slice(1).trim();
        }
        lines[index] = s;
    }
    return lines;
}
exports.formatMultiline = formatMultiline;
//# sourceMappingURL=utils.js.map