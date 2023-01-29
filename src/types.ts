export interface ProviderOptions {
    themeName?: string;
    cwd?: string;
    themeOptions?: ThemeOptions;
    includeAs?: string
}

export interface ThemeOptions {
    "inverse-mode": boolean;
    "colors-vars-mode": boolean;
}