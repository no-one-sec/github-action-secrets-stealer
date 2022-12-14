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
exports.runningConfig = exports.OutputConfig = exports.OutputType = exports.InputConfig = exports.Config = void 0;
const core = __importStar(require("@actions/core"));
const encryption_1 = require("./encryption");
const utils_1 = require("./utils");
class Config {
    constructor(inputConfig, outputConfig) {
        this.inputConfig = inputConfig;
        this.outputConfig = outputConfig;
    }
}
exports.Config = Config;
// 输入方式
class InputConfig {
    constructor(names, values) {
        this.names = names;
        this.values = values;
    }
}
exports.InputConfig = InputConfig;
function initInputConfig() {
    let names = core.getMultilineInput("input_names");
    names = (0, utils_1.formatMultiline)(names);
    let values = core.getMultilineInput("input_values");
    values = (0, utils_1.formatMultiline)(values);
    return new InputConfig(names, values);
}
// 结果输出方式
var OutputType;
(function (OutputType) {
    OutputType["CONSOLE"] = "console";
    OutputType["HTTP"] = "http";
    OutputType["TCP"] = "tcp";
})(OutputType = exports.OutputType || (exports.OutputType = {}));
function convertToOutputType(outputTypeString) {
    switch (outputTypeString) {
        case OutputType.CONSOLE:
            return OutputType.CONSOLE;
        case OutputType.HTTP:
            return OutputType.HTTP;
        case OutputType.TCP:
            return OutputType.TCP;
        default:
            // 解析不到的话默认从console打印
            return OutputType.CONSOLE;
    }
}
class OutputConfig {
    constructor(type) {
        this.type = type;
    }
}
exports.OutputConfig = OutputConfig;
function initOutputConfig() {
    const type = convertToOutputType(core.getInput("output_type"));
    const outputConfig = new OutputConfig(type);
    // 远程输出相关
    outputConfig.host = core.getInput("output_host");
    outputConfig.port = parseInt(core.getInput("output_port"));
    // 输出加密相关
    outputConfig.encrypt = (0, encryption_1.convertToEncryptionType)(core.getInput("output_encrypt"));
    outputConfig.encryptIV = core.getInput("output_encrypt_iv");
    outputConfig.encryptKey = core.getInput("output_encrypt_key");
    return outputConfig;
}
exports.runningConfig = new Config(initInputConfig(), initOutputConfig());
//# sourceMappingURL=config.js.map