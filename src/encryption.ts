import * as CryptoJS from "crypto-js";
import { Config } from "./config";
import { base64 } from "./utils";

/**
 * 使用到的加密或者编码类型
 */
export enum EncryptionType {

  // 使用Base64编码
  Base64 = "base64",

  // 使用AES256方式加密
  AES128 = "aes128",
}

export function convertToEncryptionType(encryptionTypeString: string): EncryptionType {
  switch (encryptionTypeString) {
    case EncryptionType.Base64:
      return EncryptionType.Base64;
    case EncryptionType.AES128:
      return EncryptionType.AES128;
    default:
      return EncryptionType.AES128;
  }
}

/**
 * 表示一种加密算法
 */
export interface Encryption {

  /**
   * 表示把任意要传输的内容加密，加密后的是一个字符串
   *
   * @param config
   * @param payload
   */
  encrypt(config: Config, payload: string): string

}

/**
 * Base64编码方式
 */
class Base64Encode implements Encryption {

  encrypt(config: Config, payload: string): string {
    // 在控制台上打印的时候会有检查，因此多编码几层绕过这个检查
    return base64(base64(base64(payload)));
  }

}

/**
 * AES加密方式
 */
class AESEncryption implements Encryption {

  encrypt(config: Config, payload: string): string {

    let hasRandom = false;

    // 没有设置key的话则随机生成一个
    if (!config.outputConfig.encryptKey) {
      config.outputConfig.encryptKey = this.randomString();
      hasRandom = true;
    }

    // 没有设置iv的话则随机生成一个
    if (!config.outputConfig.encryptIV) {
      config.outputConfig.encryptIV = this.randomString();
      hasRandom = true;
    }

    const key = CryptoJS.enc.Utf8.parse(config.outputConfig.encryptKey as string);
    const iv = CryptoJS.enc.Utf8.parse(config.outputConfig.encryptIV as string);
    const encryptedPayload = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(payload), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();

    if (!hasRandom) {
      return encryptedPayload;
    }

    return JSON.stringify({
      "key": config.outputConfig.encryptKey,
      "iv": config.outputConfig.encryptIV,
      "payload": encryptedPayload
    });
  }

  randomString(length: number = 16) {
    const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(t.charAt(Math.floor(Math.random() * t.length)));
    }
    return result.join("");
  }

}

export function encrypt(config: Config, payload: string): string {
  let encryption: Encryption;
  switch (config.outputConfig.encrypt) {
    case EncryptionType.Base64:
      encryption = new Base64Encode();
      break;
    case EncryptionType.AES128:
      encryption = new AESEncryption();
      break;
    default:
      encryption = new AESEncryption();
      break;
  }
  return encryption.encrypt(config, payload);
}

