import { addHours } from "date-fns";

export const mapTasksToEvents = (tasks) => {
  return tasks
    .filter((task) => task.dueDate)
    .map((task) => {
      const start = new Date(task.dueDate);

      return {
        id: task.taskId,
        title: task.title || "Untitled",
        start,
        end: addHours(start, 1),
        allDay: true,
        priority: task.priority,
        reminder: task.reminder,
        category: task.category,
        task,
      };
    });
};