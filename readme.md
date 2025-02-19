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

### **📌 Advanced Pre-Rendering for Ungic SASS Theme Module**

The **Ungic SASS Theme Module** now includes **a pre-rendering feature**, allowing developers to **generate and store color variables upfront** instead of dynamically computing them at runtime.  

This is particularly useful when creating **design systems, UI libraries, or multiple theme configurations**, ensuring **all colors are available in a single generated file**.  

---

## **🎨 Why Use Pre-Rendering?**
By default, colors are **only generated when used** inside a component or global scope. This **keeps the final CSS optimized** but might **not be ideal** for libraries, where you want a predefined set of color variables.  

**Pre-rendering allows you to:**  
✅ **Generate all color variations upfront** – no need for per-component computation.  
✅ **Store variables in a single file** – avoid duplication across components.  
✅ **Create multiple themes with different configurations** – simply switch files.  
✅ **Reduce runtime overhead** – variables are already calculated.  
✅ **Ensure consistency** – all components reference the same colors.  

---

## **⚙️ How Pre-Rendering Works**
Pre-rendering creates a **fixed color scale** with a specified **step size** (`$step-number`), generating colors **in the range of -1 to 1**.  

🔹 Instead of defining colors dynamically in each component, pre-rendering allows storing **all possible color variations upfront** in CSS variables.  

🔹 However, **this method has limitations** (see **Pros & Cons** section below).  

---

## **📜 Pre-Rendering Mixin**
```scss
@mixin preprender-vars($selector: "body", $step-number: 0.05, $with-media: true) {
  $colors: getColors(); // Get all theme colors
  $color-names: map.keys($colors); // Extract color names
  $colors: list.append($color-names, "gray"); // Include grayscale

  @include store.resetAll(); // Reset variable store

  // Loop through all colors
  @each $color-name in $colors {
    $step: -1; // Start from -1

    @while $step <= 1 {
      $generated-color: color($color-name, $step); // Generate color variation
      $step: $step + $step-number; // Increment step
    }
  }

  @include render-vars($selector, $with-media); // Apply rendering
}
```

---

## **📌 How to Use It**
Instead of manually defining color variables inside each component, use **preprender-vars()** to generate a **theme-wide set of colors**:  
```scss
@include preprender-vars();
```
This will:
- Precompute **all shades of every theme color**.
- Store them in **CSS variables**.
- Make them accessible globally **without recalculating** in components.

---

## **🔹 Pre-Rendering vs. On-Demand Rendering**
| Feature               | Pre-Rendering (`preprender-vars()`)  | Dynamic Rendering (`color() inside component`) |
|----------------------|------------------------------------|-----------------------------------|
| **Performance**      | 🟢 **Optimized** (generated once) | 🔴 **Recomputed in each component** |
| **Flexibility**      | 🔴 **Limited color adjustments**  | 🟢 **Full color customization** |
| **File Size**        | 🔴 **Larger (all variations stored)** | 🟢 **Smaller (only needed colors)** |
| **Best for...**      | 📦 **Libraries, UI frameworks**   | 🎨 **Individual UI components** |

---

## **✅ Pros & ❌ Cons of Pre-Rendering**
### **✅ Advantages**
✔ **One-time computation** – No need to recalculate colors in each component.  
✔ **No duplication** – Colors are stored **once** in a dedicated file.  
✔ **Better for design systems** – Ensures **color consistency** across projects.  
✔ **Multiple themes support** – Create different theme files and load them dynamically.  

### **❌ Limitations**
⚠ **Limited flexibility** – Only generates **a fixed color scale** (step size is developer-defined).  
⚠ **Cannot generate any color dynamically** – Only **predefined variations** are available.  
⚠ **No access to advanced color parameters** – The **lightness and brightness controls** available in `color()` are **not** supported in pre-render.  
⚠ **Might increase CSS size** – Generates **all possible variations**, even if some are unused.  

---

## **🎯 When Should You Use Pre-Rendering?**
### **Use Pre-Rendering When:**
✔ You are **building a UI library** where colors should be predefined.  
✔ You need **multiple themes** as separate files (`theme-first.css`, `theme-secondary.css`).  
✔ You want **all color variations stored upfront** instead of computing them dynamically.  

### **Avoid Pre-Rendering When:**
❌ You need **dynamic, real-time color generation** (e.g., custom gradients, on-the-fly calculations).  
❌ You want **maximum flexibility** for theme colors inside components.  
❌ You prefer **lighter CSS output**, as pre-rendering generates **all** variations.  

---

## **🎨 Example: Multi-Theme Pre-Rendering**
You can create **separate theme files** using `preprender-vars()`:
### **📌 First Theme (`theme-first.scss`)**
```scss
@use "base-theme" with ($theme: first-theme-config);
@include preprender-vars();
```
### **📌 Secondary Theme (`theme-secondary.scss`)**
```scss
@use "base-theme" with ($theme: secondary-theme-config);
@include preprender-vars();
```
Now, **switch themes by loading different files** in your app! 🎨  

---

## **🚀 Summary**
✨ **Pre-Rendering is a powerful feature** that allows generating a **fixed set of colors** in a single file.  

📌 **Great for:** Libraries, UI systems, and multi-theme setups.  
📌 **Not ideal for:** Cases where you need highly dynamic color adjustments.  

💡 **Use it when you need theme-wide consistency and precomputed colors!** 🚀

## **📜 Conclusion**
✨ **Ungic SASS Theme** makes theme management effortless and powerful.  
🎨 With automatic **color adjustments, inversion, and smart CSS variables**, you can **focus on styling, not maintaining color logic**.  

💡 **Ready to build better themes? Start using Ungic SASS Theme today!** 🚀