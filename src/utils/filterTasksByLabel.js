// src/utils/filterTasksByLabel.js

/**
 * Returns tasks filtered by label/tag.
 * @param {Array} tasks - array of objects with .labels
 * @param {string} label
 * @return {Array}
 */
export function filterTasksByLabel(tasks, label) {
  if (!label) return tasks;
  return tasks.filter(task => task.labels && task.labels.includes(label));
}
