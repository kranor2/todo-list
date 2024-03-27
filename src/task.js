function createAction(title, description, priority, dueDate) {
    let completed = false;

    return {
        title,
        description,
        priority,
        dueDate,
        completed,
    };
}

export { createAction };