// src/constants/labels.js

import colors from './colors';

/**
 * Returns badge color for any label.
 * Used in LabelBadge component.
 */

export const LABEL_COLORS = {
  Critical: { bgColor: colors.accent, textColor: '#fff' },
  High: { bgColor: colors.high, textColor: '#fff' },
  Medium: { bgColor: colors.medium, textColor: '#fff' },
  Low: { bgColor: colors.low, textColor: '#222' },
  Disclosure: { bgColor: colors.secondary, textColor: '#fff' },
  Solved: { bgColor: colors.solved, textColor: '#fff' },
  Draft: { bgColor: colors.draft, textColor: '#222' },
};

export function getLabelColor(label, type, customColor = null) {
  if (customColor) return { bgColor: customColor, textColor: '#fff' };
  return LABEL_COLORS[label] || { bgColor: colors.border, textColor: '#203970' };
}
