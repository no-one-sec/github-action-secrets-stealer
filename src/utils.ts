/**
 * 把字符串编码为Base64字符串返回
 *
 * @param s 要编码的字符串
 */
export function base64(s: string) {
    return Buffer.from(s, "utf-8").toString("base64");
}

/**
 * 格式化多行输入，模拟支持数组，主要是为了把 action 传递进来的参数标准化
 *
 * @param lines
 */
export function formatMultiline(lines: string[]): string[] {
    for (let index = 0; index < lines.length; index++) {
        let s = lines[index].trim();
        if (s.startsWith("-")) {
            s = s.slice(1).trim();
        }
        lines[index] = s;
    }
    return lines;
}
