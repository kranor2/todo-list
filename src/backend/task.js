function createTask(title, description, priority, dueDate) {
    let completed = false;

    return {
        title,
        description,
        priority,
        dueDate,
        completed,
    };
}

export { createTask };