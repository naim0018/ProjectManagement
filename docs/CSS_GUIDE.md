# CSS Usage & Design System Guide

This guide explains how `src/index.css` and its CSS variables are used across the **Project Management** platform. It covers Tailwind 4 integration, brand variables, dynamic themes, and the Admin-scoped dark mode.

---

## 1. Tailwind 4 Theme Integration

The project uses **Tailwind CSS v4**, where the theme is defined directly in `index.css` using the `@theme` block. This eliminates the need for a separate `tailwind.config.js` for most theme extensions.

### Standardized Tokens
- **Fonts**: `--font-sans` (Inter/Montserrat) and `--font-mono`.
- **Radius**: `--radius-xl` (0.75rem) down to `--radius-sm`.
- **UI Colors**: Mapped to standard shadcn-like names (e.g., `--color-primary`, `--color-background`).

---

## 2. Global Brand Variables

Consistency is maintained through a dedicated brand color system.

| Variable | HEX / Value | Purpose |
| :--- | :--- | :--- |
| `--color-brand-50` | `#eef2ff` | Lightest background/tint |
| `--color-brand-500` | `#6366f1` | Vibrant accent |
| `--color-brand-600` | `#4f46e5` | **Primary Brand Color** |
| `--color-brand-shadow`| `rgba(79... 0.15)`| Subtle brand-colored drop shadows |

### Usage in Components
You can use these variables in two ways:
1. **Tailwind Classes**: `bg-brand-600`, `text-brand-700`, `border-brand-200`.
2. **Inline Styles/Charts**: `var(--color-brand-600)` (common in `recharts` components).

---

## 3. Dynamic Theming

The project supports multi-tenant or section-specific theming by overriding brand variables under specific class names.

- **Emerald Theme**: `.theme-emerald`
- **Rose Theme**: `.theme-rose`
- **Violet Theme**: `.theme-violet`
- **Amber Theme**: `.theme-amber`

When a parent container has one of these classes, all children using `brand` utilities will automatically reflect that theme's colors.

---

## 4. Admin-Scoped Dark Mode (`.admin-dark`)

Unlike standard global dark mode, the **Admin Dashboard** uses a scoped implementation to ensure it doesn't affect the public-facing site.

### Implementation
- **Trigger**: Root element of the Admin layout must have the `.admin-dark` class.
- **Surface Variables**: Prefix `adm-` (e.g., `--adm-bg`, `--adm-surface`, `--adm-border`).
- **Text Visibility**: High-contrast slate variants (Slate 200 for secondary, Slate 400 for muted).

### Overriding Global Styles
The `.admin-dark` block in `index.css` uses `!important` to force overrides on common Tailwind utility classes (like `bg-white` or `text-slate-900`) when they appear within an admin-dark context. This ensures components designed for light mode remain legible in the dark dashboard WITHOUT needing per-component `dark:` classes.

---

## 5. Design Conventions

### Typography
- **Headings**: Use `h1`, `h2`, `h3` directly. They are globally styled with `@apply` to be compact and consistent.
- **Font Size Shift**: Standard Tailwind text sizes are globally shifted down:
    - `.text-sm` -> 12px
    - `.text-base` -> 14px (standard body)
    - `.text-lg` -> 16px

### Scrollbars
Scrollbars are globally customized to be sleek and minimal (6px width, slate-colored). For areas where scrollbars should be hidden, use the `.no-scrollbar` utility.

### Tables
Tables in the admin section are styled for **high information density**. 
- Padding is reduced to `py-2.5` (`0.625rem`) and `px-4`.
- Border colors automatically adjust to `--adm-border` in dark mode.
