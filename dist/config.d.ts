import { EncryptionType } from "./encryption";
export declare class Config {
    inputConfig: InputConfig;
    outputConfig: OutputConfig;
    constructor(inputConfig: InputConfig, outputConfig: OutputConfig);
}
export declare class InputConfig {
    names?: string[];
    values?: string[];
    constructor(names?: string[], values?: string[]);
}
export declare enum OutputType {
    CONSOLE = "console",
    HTTP = "http",
    TCP = "tcp"
}
export declare class OutputConfig {
    type: OutputType;
    host?: string;
    port?: number;
    encrypt?: EncryptionType;
    encryptKey?: string;
    encryptIV?: string;
    constructor(type: OutputType);
}
export declare const runningConfig: Config;
