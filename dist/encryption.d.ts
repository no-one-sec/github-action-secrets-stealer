import { Config } from "./config";
/**
 * 使用到的加密或者编码类型
 */
export declare enum EncryptionType {
    Base64 = "base64",
    AES256 = "aes256"
}
export declare function convertToEncryptionType(encryptionTypeString: string): EncryptionType;
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
    encrypt(config: Config, payload: string): string;
}
export declare function encrypt(config: Config, payload: string): string;
