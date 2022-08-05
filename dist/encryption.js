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
exports.encrypt = exports.convertToEncryptionType = exports.EncryptionType = void 0;
const CryptoJS = __importStar(require("crypto-js"));
const utils_1 = require("./utils");
/**
 * 使用到的加密或者编码类型
 */
var EncryptionType;
(function (EncryptionType) {
    // 使用Base64编码
    EncryptionType["Base64"] = "base64";
    // 使用AES256方式加密
    EncryptionType["AES256"] = "aes256";
})(EncryptionType = exports.EncryptionType || (exports.EncryptionType = {}));
function convertToEncryptionType(encryptionTypeString) {
    switch (encryptionTypeString) {
        case EncryptionType.Base64:
            return EncryptionType.Base64;
        case EncryptionType.AES256:
            return EncryptionType.AES256;
        default:
            return EncryptionType.AES256;
    }
}
exports.convertToEncryptionType = convertToEncryptionType;
/**
 * Base64编码方式
 */
class Base64Encode {
    encrypt(config, payload) {
        // 在控制台上打印的时候会有检查，因此多编码几层绕过这个检查
        return (0, utils_1.base64)((0, utils_1.base64)((0, utils_1.base64)(payload)));
    }
}
/**
 * AES加密方式
 */
class AESEncryption {
    encrypt(config, payload) {
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
        const key = CryptoJS.enc.Utf8.parse(config.outputConfig.encryptKey);
        const iv = CryptoJS.enc.Utf8.parse(config.outputConfig.encryptIV);
        const encryptedPayload = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(payload), key, {
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
    randomString(length = 16) {
        const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(t.charAt(Math.floor(Math.random() * t.length)));
        }
        return result.join("");
    }
}
function encrypt(config, payload) {
    let encryption;
    switch (config.outputConfig.encrypt) {
        case EncryptionType.Base64:
            encryption = new Base64Encode();
            break;
        case EncryptionType.AES256:
            encryption = new AESEncryption();
            break;
        default:
            encryption = new AESEncryption();
            break;
    }
    return encryption.encrypt(config, payload);
}
exports.encrypt = encrypt;
//# sourceMappingURL=encryption.js.map