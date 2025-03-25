import dayjs from "dayjs";

export const getDueDateColor = (due_date: number): "info" | "error" | "warning" | "primary" => {
    if (!due_date) return "info"; // Если даты нет, цвет черный по умолчанию
    const today = dayjs(); // Текущая дата
    const dueDate = dayjs(due_date); // Дата исполнения задачи
    const difference = dueDate.diff(today, "day"); // Разница в днях
    if (difference < 0) return "error"; // Просроченная дата
    if (difference === 0) return "warning"; // Сегодняшняя дата
    if (difference === 1) return "primary"; // Завтра
    return "info"; // Остальные дни
};