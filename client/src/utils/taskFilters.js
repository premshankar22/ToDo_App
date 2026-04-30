// utils/taskFilters.js

export function applyFilters(tasks = [], filters = {}) {
  if (!tasks.length) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);

  let result = tasks.filter((task) => {

    /* ---------- STATUS ---------- */

    if (filters.status && filters.status !== "all") {
      if (task?.status !== filters.status) return false;
    }

    /* ---------- CATEGORY ---------- */

    if (filters.category) {
      if (task?.category !== filters.category) return false;
    }

    /* ---------- DUE DATE ---------- */

    if (filters.dueDate) {

      if (!task?.dueDate) return false;

      const due = new Date(task.dueDate);
      due.setHours(0, 0, 0, 0);

      switch (filters.dueDate) {

        case "today":
          if (due.getTime() !== today.getTime()) return false;
          break;

        case "week":
          if (due < today || due > weekEnd) return false;
          break;

        case "overdue":
          if (due >= today) return false;
          break;

        default:
          break;
      }
    }

    return true;
  });

  return sortTasks(result, filters);
}


/* ===================================================== */
/* ===================== SORT ENGINE ==================== */
/* ===================================================== */

function sortTasks(tasks, filters) {

  if (!tasks.length) return [];

  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1
  };

  return [...tasks].sort((a, b) => {

    /* ---------- PRIORITY SORT ---------- */

    if (filters.sortPriority) {

      const pA = priorityOrder[a?.priority] || 0;
      const pB = priorityOrder[b?.priority] || 0;

      if (pA !== pB) return pB - pA;
    }

    /* ---------- TIME SORT ---------- */

    if (filters.sortTime) {

      const tA = new Date(a?.createdAt || 0).getTime();
      const tB = new Date(b?.createdAt || 0).getTime();

      if (tA !== tB) {
        return filters.sortTime === "newest"
          ? tB - tA
          : tA - tB;
      }
    }

    /* ---------- ALPHABET SORT ---------- */

    if (filters.sortAlpha) {

      const titleA = (a?.title || "").toLowerCase();
      const titleB = (b?.title || "").toLowerCase();

      const compare = titleA.localeCompare(titleB);

      if (compare !== 0) {
        return filters.sortAlpha === "az"
          ? compare
          : -compare;
      }
    }

    return 0;
  });
}