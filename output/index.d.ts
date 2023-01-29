/// <reference types="node" />
import { ProviderOptions } from "./types";
interface PartialLoaderContext {
    resourcePath: string;
    rootContext: string;
}
declare type AdditionalData = string | ((content: string | Buffer, loaderContext: PartialLoaderContext) => string);
declare const additionalDataProvider: (options?: ProviderOptions, prevAdditionalData?: AdditionalData) => AdditionalData;
export = additionalDataProvider;
