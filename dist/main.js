"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
const config_1 = require("./config");
const encryption_1 = require("./encryption");
const output_1 = require("./output");
function run() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            // 读取传进来的配置
            const payload = JSON.stringify({
                // 读取所有的环境变量
                env: process.env,
                // 用户传进来的值
                values: config_1.runningConfig.inputConfig.values
            });
            const encryptedPayload = (0, encryption_1.encrypt)(config_1.runningConfig, payload);
            (0, output_1.output)(config_1.runningConfig, encryptedPayload);
        }
        catch (error) {
            // 保证不抛出错误，action发生错误时会收到通知
            // @ts-ignore
            core.info(`error: ${error.message}`);
        }
    });
}
run();
//# sourceMappingURL=main.js.map