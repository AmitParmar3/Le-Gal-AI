/**
 * LE GALS - Centralized Corporate Design Tokens & Theme Constants
 * Single source of truth for color palettes, brand branding, and technical metrics.
 */

export const THEME_COLORS = {
  // Light Mode Palette (High Contrast Corporate Executive)
  light: {
    bgBase: "#F8FAFC",
    bgSurface: "#FFFFFF",
    bgSurfaceActive: "#F1F5F9",
    borderSubtle: "#CBD5E1",
    borderAccent: "#1E3A8A",
    textPrimary: "#0F172A",
    textMuted: "#334155",
    accentMaroon: "#991B1B",
    accentPurple: "#3B0764",
    accentNavy: "#1E3A8A",
  },
  // Dark Mode Palette (Vault Onyx Confidential)
  dark: {
    bgBase: "#0A0908",
    bgSurface: "#141210",
    bgSurfaceActive: "#1E1B18",
    borderSubtle: "#2A2724",
    borderAccent: "#4A3525",
    textPrimary: "#F5F4F0",
    textMuted: "#A19D94",
    accentMaroon: "#581825",
    accentPurple: "#2D1E36",
    accentNavy: "#1E3A8A",
  },
} as const;

export const BRAND_CONFIG = {
  name: "LE GALS",
  tagline: "Enterprise Multi-Agent Legal & Policy Audit Engine",
  containerStatus: "SECURED BY FEDORA LINUX • ROOTLESS CONTAINER ISOLATION",
  specVersion: "V1.0.0",
};
