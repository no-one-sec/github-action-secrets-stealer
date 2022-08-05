"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = void 0;
const core = __importStar(require("@actions/core"));
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