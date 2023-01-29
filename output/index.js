"use strict";
const path = require("path");
const fs = require("fs");
const additionalDataProvider = (options = {}, prevAdditionalData) => {
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
    return function (content, loaderContext) {
        content = content.toString();
        const { resourcePath, rootContext } = loaderContext;
        const pathToTheme = path
            .join(path.relative(path.relative(rootContext, path.dirname(resourcePath)), cwd), themeName + ".scss")
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
        
        @use "../theme/index.scss" as ${includeAs} with (                      
            $theme: $ungic-theme-config
        );  
        ${content} 
        @include render-vars();`;
        if ("function" == typeof prevAdditionalData) {
            output += `\n ${prevAdditionalData(content, loaderContext)}`;
        }
        else if (prevAdditionalData) {
            output += `\n ${prevAdditionalData}`;
        }
        return output;
    };
};
module.exports = additionalDataProvider;
//# sourceMappingURL=index.js.map