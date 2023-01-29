/// <reference types="node" />
import type * as webpack from "webpack";
import { ProviderOptions } from "./types";
declare type AdditionalData = string | ((content: string | Buffer, loaderContext: webpack.LoaderContext<any>) => string);
declare const additionalDataProvider: (options?: ProviderOptions, prevAdditionalData?: AdditionalData) => AdditionalData;
export = additionalDataProvider;
