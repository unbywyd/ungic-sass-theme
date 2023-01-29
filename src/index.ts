import type * as webpack from "webpack";
import { ProviderOptions } from "./types";
import * as path from "path";
import * as fs from "fs";

type AdditionalData =
  | string
  | ((
      content: string | Buffer,
      loaderContext: webpack.LoaderContext<any>
    ) => string);

const additionalDataProvider = (
  options: ProviderOptions = {},
  prevAdditionalData?: AdditionalData
): AdditionalData => {
  const { themeName, cwd, themeOptions, includeAs } = {
    themeName: "default",
    cwd: process.cwd(),
    includeAs: "*",
    themeOptions: {},
    ...options,
  };

  const configFile = path.join(cwd, `${themeName}.scss`);
  if (!fs.existsSync(configFile)) {
    throw new Error(`${configFile} ungic theme file not exist`);
  }

  return function (
    content: string | Buffer,
    loaderContext: webpack.LoaderContext<any>
  ) {
    content = content.toString();
    const { resourcePath, rootContext } = loaderContext;
    const pathToTheme = path
      .join(
        path.relative(
          path.relative(rootContext, path.dirname(resourcePath)),
          cwd
        ),
        themeName + ".scss"
      )
      .replace(/[\/\\]+/g, "/");

    let sassOptionsList = [];
    for (let key in themeOptions) {
      sassOptionsList.push(`${key}: ${themeOptions[key]}`);
    }
    let sassMap = `(${sassOptionsList.join(",")})`;

    let output = `
        @use "sass:meta";
        @use "sass:map";
        @use "${pathToTheme}" as ungic-theme-config;        
        $ungic-theme-config: meta.module-variables(ungic-theme-config);

        $ungic-theme-config: map.merge($ungic-theme-config, ${sassMap});   
        
        @use "ungic-sass-theme" as ${includeAs} with (                      
            $theme: $ungic-theme-config
        );  
        ${content} 
        @include render-vars();`;

    if ("function" == typeof prevAdditionalData) {
      output += `\n ${prevAdditionalData(content, loaderContext)}`;
    } else if (prevAdditionalData) {
      output += `\n ${prevAdditionalData}`;
    }
    return output;
  };
};

export = additionalDataProvider;
