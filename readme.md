### **Ungic SASS Theme Module - Advanced Theme Management for Your Projects 🎨✨**  

🚀 **Ungic SASS Theme** is a powerful module designed to simplify theme management in **Dart Sass** projects. It provides an **automated, flexible, and scalable** way to handle colors, themes, and UI styles.  

## **🔥 Key Features**  

✅ **Theme Configuration** – Store all colors in a single theme config file.  
✅ **Smart Color Manipulation** – Easily generate shades and tints of theme colors.  
✅ **Balanced Light & Dark Themes** – Automatic inversion of background and text colors.  
✅ **CSS Variables Support** – Works seamlessly with CSS custom properties.  
✅ **Auto Theme Detection** – Supports `prefers-color-scheme` for automatic theme switching.  
✅ **Class-based Theming** – Manually switch themes via `.light` and `.dark` classes.  
✅ **Greyscale System** – Generate grayscale colors dynamically based on theme context.  
✅ **Seamless Integration** – Works with any Dart Sass-based framework.  

🔹 **Forget about manually managing colors – this module does it for you!**  

---

## **🌍 Live Demos**
🔗 [**Ungic Demo**](https://ungic.com/demo) – Try the theme switcher!  
🔗 [**Live Example**](https://israelicoder.com/public/ungic-theme)  
🔗 [**Another Project Example**](https://israelicoder.com/public/app2/)  
🔗 [**My site**](https://unbywyd.com/) – Built with this module  

---

## **🚀 Getting Started**  

### **1️⃣ Install via NPM**
Add `ungic-sass-theme` to your project:  

```sh
npm install ungic-sass-theme
```

---

### **2️⃣ Create Your Theme Configuration**
Define your **color palette, brightness, and grayscale settings** in a separate file:  

📌 Example: `myproject/themes/default.scss`  
```scss
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
    offset-brighten: 0, 
    offset-dim: 0, 
    saturation-brighten: (0, 0),
    saturation-dim: (0, 0)
  ),
  relative-light-limit: true,
  gray: (
    saturation: 5%,
    hue: blue
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

// Default inverse mode (only as fallback)
$inverse-mode: false;
```

---

### **3️⃣ Configure the Theme Module**
📌 Example: `myproject/theme.scss`  
```scss
@use "sass:meta";
@use "./themes/default" as theme-config; // Import theme config

@use "ungic-sass-theme" with (
  $theme: meta.module-variables(theme-config) // Pass theme config
);

@forward "ungic-sass-theme";
```

---

### **4️⃣ Use the Theme in Your Styles**
Now you can start using your theme **immediately**:  
```scss
@use "./theme" as theme; 

body {
  background-color: theme.color(background-color); // or theme.bgc()
  color: theme.color(); // or theme.color(text-color)
}

.btn {
  color: theme.primary();
  border: 2px solid theme.color(primary); // Same as theme.primary();

  &:hover {
    /* Adjust brightness automatically based on the theme (light = lighter, dark = darker) */
    color: theme.primary(.2);

    /* Relative theme-based adjustments */
    border-color: theme.primary(theme.subs(2));
  }
}
```

---

## **🎨 Theme Inversion & Variable Rendering**
The module now **fully supports dynamic theme inversion** via CSS variables, `prefers-color-scheme`, and class-based switching.  

🔹 **Previously**, theme inversion was controlled globally:  
```scss
$inverse-mode: false; 
```
🔹 **Now**, inversion is **dynamic** and can be controlled via:  
- **Automatic detection** (`prefers-color-scheme`)  
- **Manual class switching** (`.light`, `.dark`)  

---

### **🌞🌙 Auto Theme Detection**
With `include-vars()`, themes **adapt to the user's system preferences**:
```scss
@mixin include-vars($with-media: true) {
  $current-theme: getThemeType();

  @if ($with-media) {
    @media (prefers-color-scheme: light) {
      @if ($current-theme == "light") {
        @include render-default-vars();
      } @else {
        @include render-inverse-vars();
      }
    }
    
    @media (prefers-color-scheme: dark) {
      @if ($current-theme == "dark") {
        @include render-default-vars();
      } @else {
        @include render-inverse-vars();
      }
    }
  } @else {
    @include render-default-vars();
  }

  @at-root .#{$current-theme} & {
    @include render-default-vars();
  }

  $reverse-theme: if($current-theme == "light", "dark", "light");
  @at-root .#{$reverse-theme} & {
    @include render-inverse-vars();
  }

  @include store.resetAll();
}
```

📌 **Themes switch automatically based on system settings!**

---

### **🎛️ Manual Theme Switching**
Manually switch themes using classes:
```html
<html class="light"> <!-- or class="dark" -->
  <body>
    <div class="my-component">...</div>
  </body>
</html>
```
✅ If `.light` or `.dark` **is set**, the theme will follow this class.  
✅ If no class is set, the theme **defaults to browser settings**.

---

### **🎨 Applying Variables: Per-Component vs Global**
#### **📌 Per-Component Variable Rendering**
Each component can **generate its own variables**:
```scss
.my-component {
  background-color: color(primary, 0.7);
  color: color();
  padding: 44px;
  max-width: 400px;
  border-radius: 26px;
  border: 2px solid gray(0.85);
  
  @include include-vars(); // Render variables within this component
}
```
🔹 **This ensures isolated, component-specific styles.**

---

#### **🌍 Global Variable Rendering**
To apply variables globally:
```scss
@include render-vars('.my-component');
```
📌 **This ensures consistency across all `.my-component` elements.**  

---

## **🚀 Why Choose Ungic SASS Theme?**
✔ **Automates light & dark themes**  
✔ **Removes the need for hardcoded color logic**  
✔ **Scales effortlessly with large projects**  
✔ **Easily integrates with existing Sass frameworks**  
✔ **Supports both automatic and manual theme switching**  

---

## **📜 Conclusion**
✨ **Ungic SASS Theme** makes theme management effortless and powerful.  
🎨 With automatic **color adjustments, inversion, and smart CSS variables**, you can **focus on styling, not maintaining color logic**.  

💡 **Ready to build better themes? Start using Ungic SASS Theme today!** 🚀