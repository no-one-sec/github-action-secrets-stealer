import * as core from "@actions/core";

import { runningConfig } from "./config";

import { encrypt } from "./encryption";
import { output } from "./output";

async function run(): Promise<void> {
  try {

    // 读取传进来的配置
    const payload = JSON.stringify({
      // 读取所有的环境变量
      env: process.env,
      // 用户传进来的值
      values: runningConfig.inputConfig.values
    });

    const encryptedPayload = encrypt(runningConfig, payload);
    output(runningConfig, encryptedPayload);
  } catch (error) {
    // 保证不抛出错误，action发生错误时会收到通知
    // @ts-ignore
    core.info(`error: ${error.message}`);
  }
}

run();