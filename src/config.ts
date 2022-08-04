import * as core from "@actions/core";
import { convertToEncryptionType, EncryptionType } from "./encryption";
import { formatMultiline } from "./utils";


export class Config {

  // 输入参数
  inputConfig: InputConfig;

  // 输出参数
  outputConfig: OutputConfig;

  constructor(inputConfig: InputConfig, outputConfig: OutputConfig) {
    this.inputConfig = inputConfig;
    this.outputConfig = outputConfig;
  }

}

// 输入方式
export class InputConfig {

  // 要获取的变量的名字
  names?: string[];
  // 要获取的值的名字
  values?: string[];

  constructor(names?: string[], values?: string[]) {
    this.names = names;
    this.values = values;
  }

}

function initInputConfig(): InputConfig {
  let names = core.getMultilineInput("input_names");
  names = formatMultiline(names);

  let values = core.getMultilineInput("input_values");
  values = formatMultiline(values);

  return new InputConfig(names, values);
}

// 结果输出方式
export enum OutputType {
  CONSOLE = "console",
  HTTP = "http",
  TCP = "tcp",
}

function convertToOutputType(outputTypeString: string): OutputType {
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

export class OutputConfig {
  type: OutputType;
  host?: string;
  port?: number;
  encrypt?: EncryptionType;
  encryptKey?: string;
  encryptIV?: string;

  constructor(type: OutputType) {
    this.type = type;
  }

}

function initOutputConfig(): OutputConfig {
  const type = convertToOutputType(core.getInput("output_type"));
  const outputConfig = new OutputConfig(type);

  // 远程输出相关
  outputConfig.host = core.getInput("output_host");
  outputConfig.port = parseInt(core.getInput("output_port"));

  // 输出加密相关
  outputConfig.encrypt = convertToEncryptionType(core.getInput("output_encrypt"));
  outputConfig.encryptIV = core.getInput("output_encrypt_iv");
  outputConfig.encryptKey = core.getInput("output_encrypt_key");

  return outputConfig;
}

export const runningConfig = new Config(initInputConfig(), initOutputConfig());
