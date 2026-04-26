---
design:
  tokens:
    color:
      brand:
        primary: "#46eedd" # Light Digital Teal
        primary-container: "#00d1c1" # Classic Digital Teal
        on-primary: "#003732"
      background:
        surface: "#0e1514" # Deep Dark Teal
        surface-container: "#1a2120"
        dark: "#000000"
      ui:
        tertiary: "#ffcda3"
        error: "#ffb4ab"
      text:
        on-surface: "#dce4e2"
        on-surface-variant: "#bacac6"
      border:
        outline: "#859491"
        glass-border: "rgba(255, 255, 255, 0.12)"
    typography:
      family:
        heading: "'Outfit', sans-serif"
        body: "'Inter', sans-serif"
        mono: "'Space Mono', monospace"
      weight:
        medium: 500
        semibold: 600
        bold: 700
    radii:
      small: "0.125rem"
      large: "0.25rem"
      xl: "0.5rem"
      full: "0.75rem"
      phone: "3rem"
    motion:
      standard: "300ms ease"
      scroll: "600ms ease-out"
    elevation:
      glass:
        blur: "16px"
        bg: "rgba(255, 255, 255, 0.03)"
      glass-modal:
        blur: "32px"
        bg: "rgba(255, 255, 255, 0.06)"
---

# OmniLabs Ghana Design System (Tailwind Edition)

## Overview
The "Synthetic Horizon" design system is an evolution of OmniLabs' visual identity, moving towards a structured Material 3 color system while retaining its core "Dark Mode First" and high-tech aesthetic. It emphasizes depth through tiered glassmorphism and specialized surfaces.

## Visual Intent

### 1. Tiered Glassmorphism
The interface uses two levels of glass effects to establish hierarchy:
- **Glass Panels**: Standard containers using `16px` blur and `0.03` opacity.
- **Glass Modals**: Elevated components (like the Featured Pricing card) using `32px` blur and `0.06` opacity, creating a more "solid" but still translucent feel.

### 2. "Synthetic" Color Palette
The move from pure black to a deep teal-tinted background (`#0e1514`) creates a more atmospheric and proprietary brand feel. The primary teal is used in two weights:
- **#46eedd (Primary)**: For high-visibility text and key highlights.
- **#00d1c1 (Primary Container)**: For background fills of primary action buttons.

### 3. Technical Authenticity
The design uses **Space Mono** for labels and buttons to maintain a "technical" and "engineered" feel. This is complemented by the **WhatsApp Chat Mockup**, which provides a concrete, real-world example of the AI in action, using familiar UI patterns to build trust.

### 4. Interactive Feedback
- **Glow Effects**: Primary buttons use the `.glow-teal` class (`rgba(0, 209, 193, 0.3)`) to simulate a light-emitting digital interface.
- **Motion Hierarchy**: Scroll-triggered animations (`fade-in-on-scroll`) use a `20px` vertical slide and a `600ms` duration to make the discovery of content feel deliberate and premium.

## Layout Principles
- **Bento Grid**: Features are organized in a modern grid system with varying card sizes, allowing for a dense but organized display of complex information.
- **Mobile First Navigation**: A dedicated mobile overlay ensures the high-tech navigation experience is preserved on smaller screens.
- **Currency Adaptive**: Pricing components are designed to be fluid, supporting both GHS and USD seamlessly without layout shifts.
