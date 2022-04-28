# Ungic SASS Theme module

This module was created in order to manage the colors and styles of SASS projects.

## Features

* Store colors in a separate [theme config]() file
* Methods for quickly manipulating theme colors.
* Own technique for creating shades, tints of given theme colors which has a flexible configuration
* Maintaining a balance between light and dark theme color (text color and background color)
* Flexible customization of the theme color palette
* Simultaneous support for light and dark theme (Inverse theme). Correct theme inversion is performed automatically when switching the [inverse-mode]() theme configuration parameter.
* It is possible to generate projects with different configuration themes (with different colors) without changing styles!
* Greyscale functionality that automatically calculates gray color based on background and text colors of current theme, and provides methods for dealing with grayscale from darkest to lightest relative to main theme colors (background and text)!
* It works with css colors and css vars! Just choose your preferred method!
* Integrate into any SASS framework that supports **dart sass** build

**Everything you need to work with colors in your sass projects is here!**


## Demo

[See this link for the generated result]()

IMG

## Get Started

Add [ungic-sass-theme]() npm package to your project

```
npm install ungic-sass-theme
```

And use it in your sass files, but first you need to configure this module!

1. Create your first theme configuration file:

You can see an example of [theme configuration file here]()

```scss
// myproject/themes/default.scss 

$colors: (
    primary: #07f857,
    secondary: #3d3931,
    success: #cce678,
    danger: #e6787d,
    info: #4bafee,
    warning: #eee84b,
    system: (#C6530C, #ef8646),
    text-color: (#192d20, #fff9ea),
    background-color: (#fff9ea, #192d20)
);

$config: (
    brightness: (
        offset-brighten: 0,          // List type possible
        offset-dim: 0,               // List type possible
        saturation-brighten: (0, 0),  // List type possible
        saturation-dim: (0, 0)        // List type possible
    ),
    relative-light-limit : true,
    gray: (
        saturation: 5%,   // List type possible
        hue: blue       // List type possible
    )
);

$palettes: (
    primary: (
        lighten: #e8f2c7,
        darken: #4c5d15
    ),
    secondary: (
        lighten: #f5f3e6,
        darken: #2a2925
    )
); 


// Inverse mode
$inverse-mode: false;

// Colors mode
$colors-vars-mode: true;
```

2. Configure the **ungic-sass-theme** module and pass it the configuration we created


```scss
// myproject/theme.scss

@use "sass:meta";

@use "./themes/default" as theme-config; // Get your theme configuration

@use "ungic-sass-theme" with (
    $theme: meta.module-variables(theme-config) // and pass it to ungic-sass-theme module
);

@forward "ungic-sass-theme";
```


3. Use this module!

```scss
@use "./theme" as theme; // or as *

body {
    background-color: theme.color(background-color); // or theme.bgc()
    color: theme.color(); // or theme.color(text-color)
}

.btn {
    color: theme.primary();
    border: 2px solid theme.color(primary); // the same as theme.primary();
    &:hover {
        /*
        * Create a tint 20% lighter or darker relative to the primary colors (text and background colors) and also, relative to the current theme (light or dark), 
        * the light theme will have a lightening, 
        * the dark theme will darken!
        */
        color: theme.primary(.2);

        /*
        * There are also tools that help you set values relative to the theme type.
        * subs(valueForLightTheme, valueForDarkTheme), see documentation for details
        * subs(NUMBER); - inverts the number for the opposite theme type
        */
        border-color: theme.primary(theme.subs(2));
    }
}
```

### Theme inversion

To generate a theme inversion, just switch the **inverse-mode** theme configuration parameter (sass var)

```scss
// myproject/themes/default.scss 

...

$inverse-mode: true;
```

and rebuild your project.

Would you like to add both versions to your project? [See below]()

### Multiple themes

Only one theme and one theme type (light or dark) can be built per project build, but wait, don't go, as always there is a way!

To get started, to generate another theme, just pass another configuration file to the ungic-sass-theme module

```scss
// myproject/theme.scss

@use "sass:meta";

@use "./themes/my-other-theme" as theme-config; // Your other theme
@use "ungic-sass-theme" with (
    $theme: meta.module-variables(theme-config)
);

@forward "ungic-sass-theme";
```

And now about how to add **multiple themes** and **inversion** to your project!

First of all, you need to understand that we cannot generate colors for everything at once in one build, only if you want to use my [ungic]() framework .. which imitates this behavior...

Therefore, we can generate styles by extracting colors from common css styles and prefixing the selector with the name of our theme or theme type. For this I have created the [postcss-theme-colors-extractor]() plugin

### postcss-theme-colors-extractor

This is a postcss plugin that extracts colors into separate css rules and adds the desired prefix to the selector, and can extracts such rules into separate .css files 

