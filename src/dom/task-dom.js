import { format } from "date-fns";

import { saveProjectList } from "../backend/projectlist";
import { getProgressPercentage, prependTask, removeTask } from "../backend/project";

import urgentIcon from "../assets/urgent-icon.svg";
import highIcon from "../assets/high-icon.svg";
import lowMedIcon from "../assets/star-icon.svg";
import dropupIcon from "../assets/dropup-icon.svg";
import dropdownIcon from "../assets/dropdown-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import saveIcon from "../assets/save-icon.svg";
import trashIcon from "../assets/trash-icon.svg";

function createTaskItem(task, project, index) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    taskItem.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "completed";
    checkbox.classList.add("checkbox");
    taskItem.appendChild(checkbox);

    if (task.completed) {
        checkbox.checked = true;
        taskItem.classList.add("completed");
    }

    checkbox.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        task.completed = checkbox.checked;
        saveProjectlist();

        const progressMeter = document.querySelector(".progress-meter");
        progressMeter.style.width = `${getProgressPercentage(progress)}%`;
    });

    const taskTitle = document.createElement("p");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.title;
    taskItem.appendChild(taskTitle);

    const priorityMarker = document.createElement("img");
    priorityMarker.classList.add("priority");
    priorityMarker.src = task.priority === "urgent" ? urgentIcon : task.priority === "high" ? highIcon : lowMedIcon;
    priorityMarker.classList.add(`marker-${task.priority}`);
    taskItem.appendChild(priorityMarker);

    const dropdownBtn = document.createElement("button");
    dropdownBtn.classList.add("expand-btn");

    const dropdownBtnIcon = document.createElement("img");
    dropdownBtnIcon.src = dropdownIcon;
    dropdownBtnIcon.alt = "Expand";
    dropdownBtn.appendChild(dropdownBtnIcon);
    taskItem.appendChild(dropdownBtn);

    dropdownBtn.addEventListener("click", () => {
        toggleTaskDisplayMode(taskItem, task, project, index);
    });

    return taskItem;
}

function toggleTaskDisplayMode(element, task, project, index) {
    const taskList = document.querySelector(".task-list");

    if (element.classList.contains("task-item")) {
        taskList.replaceChild(createTaskCard(task, project, index), element);
    } else if (element.classList.contains("task-card")) {
        taskList.replaceChild(createTaskItem(task, project, index), element);
    }
}

function createTaskCard(task, project, index, newCard = false) {
    const taskCard = document.createElement("li");
    taskCard.classList.add("task-card");
    taskCard.style.background = `linear-gradient(135deg, ${project.color}40, #00000000)`;

    const taskStatus = document.createElement("div");
    taskStatus.classList.add("task-status");
    taskCard.appendChild(taskStatus);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "completed";
    checkbox.classList.add("checkbox");
    taskStatus.appendChild(checkbox);

    if (task.completed) {
        checkbox.checked = true;
        taskCard.classList.add("completed");
    }

    checkbox.addEventListener("click", () => {
        taskCard.classList.toggle("completed");
        task.completed = checkbox.checked;
        saveProjectlist();

        const progressMeter = document.querySelector(".progress-meter");
        progressMeter.style.width = `${getProgressPercentage(project)}%`;
    });

    const priorityMarker = document.createElement("img");
    priorityMarker.classList.add("priority");
    priorityMarker.src = task.priority === "urgent" ? urgentIcon : task.priority === "high" ? highIcon : lowMedIcon;
    priorityMarker.classList.add(`marker-${task.priority}`);
    taskStatus.appendChild(priorityMarker);

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

    const taskTitleValue = document.createElement("p");
    taskTitleValue.classList.add("task-title");
    taskTitleValue.textContent = task.title;
    taskDetails.appendChild(taskTitleValue);

    const taskDescription = document.createElement("div");
    taskDescription.classList.add("task-description", "task-detail");

    const taskDescriptionValue = document.createElement("p");
    taskDescriptionValue.classList.add("task-description-value");
    taskDescriptionValue.textContent = task.description;
    taskDescription.appendChild(taskDescriptionValue);

    taskDetails.appendChild(taskDescription);

    const taskDueDate = document.createElement("div");
    taskDueDate.classList.add("task-due-date", "task-detail");

    const dueDateLabel = document.createElement("label");
    dueDateLabel.classList.add("task-due-date-label");
    dueDateLabel.textContent = "Due Date: ";
    dueDateLabel.for = "due-date";
    taskDueDate.appendChild(dueDateLabel);

    const dueDateValue = document.createElement("p");
    dueDateValue.classList.add("task-due-date-value");
    dueDateValue.textContent = format(task.dueDate, "dd-MM-yyyy");
    taskDueDate.appendChild(dueDateValue);

    taskDetails.appendChild(taskDueDate);

    const taskPriority = document.createElement("div");
    taskPriority.classList.add("task-priority", "task-detail");

    const priorityLabel = document.createElement("label");
    priorityLabel.classList.add("task-priority-label");
    priorityLabel.for = "priority";
    taskPriority.appendChild(priorityLabel);

    const priorityValue = document.createElement("p");
    priorityValue.classList.add("task-priority-label");
    const priorityValueString = task.priority;
    priorityValue.textContent = priorityValueString.replace(
        priorityValueString[0],
        priorityValueString[0].toUpperCase()
    );
    taskPriority.appendChild(priorityValue);

    taskDetails.appendChild(taskPriority);

    taskCard.appendChild(taskDetails);

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const closeCardBtn = document.createElement("button");
    closeCardBtn.classList.add("close-card-btn");
    const closeCardIcon = document.createElement("img");
    closeCardIcon.src = dropupIcon;
    closeCardIcon.alt = "Close";
    closeCardBtn.appendChild(closeCardIcon);
    taskActions.appendChild(closeCardBtn);

    closeCardBtn.addEventListener("click", () => {
        toggleTaskDisplayMode(taskCard, task, project, index)
    });

    const editCardBtn = document.createElement("button");
    editCardBtn.classList.add("edit-card-btn");
    const editCardIcon = document.createElement("img");
    editCardIcon.src = editIcon;
    editCardIcon.alt = "Edit";
    editCardBtn.appendChild(editCardIcon);
    taskActions.appendChild(editCardBtn);

    const editCard = (newCard) => {
        const taskTitleInput = document.createElement("input");
        taskTitleInput.classList.add("task-title-input", "task-detail");
        taskTitleInput.placeholder = "Task";
        taskTitleInput.value = task.title;
        taskDetails.replaceChild(taskTitleInput, taskTitleValue);

        const taskDescInput = document.createElement("input");
        taskDescInput.classList.add("task-desc-input");
        taskDescInput.placeholder = "Description";
        taskDescInput.value = task.description;
        taskDescription.replaceChild(taskDescInput, taskDescriptionValue);

        const taskDueDateInput = document.createElement("input");
        taskDueDateInput.classList.add("task-due-date-input");
        taskDueDateInput.type = "date";
        taskDueDateInput.value = format(task.dueDate, "yyyy-MM-dd");
        taskDueDate.replaceChild(taskDueDateInput, dueDateValue);

        const taskPrioritySelect = document.createElement("select");
        taskPrioritySelect.classList.add("task-due-date-input");
        taskPrioritySelect.name = "priority";
        taskPriority.replaceChild(taskPrioritySelect, priorityValue);

        const lowPriorityOption = document.createElement("option");
        lowPriorityOption.value = "low";
        lowPriorityOption.text = "Low";
        taskPrioritySelect.appendChild(lowPriorityOption);

        const medPriorityOption = document.createElement("option");
        medPriorityOption.value = "medium";
        medPriorityOption.text = "Medium";
        taskPrioritySelect.appendChild(medPriorityOption);

        const highPriorityOption = document.createElement("option");
        highPriorityOption.value = "high";
        highPriorityOption.text = "High";
        taskPrioritySelect.appendChild(highPriorityOption);
        
        const urgPriorityOption = document.createElement("option");
        urgPriorityOption.value = "urgent";
        urgPriorityOption.text = "Urgent";
        taskPrioritySelect.appendChild(urgPriorityOption);

        switch (task.priority) {
            case "low":
                lowPriorityOption.selected = true;
                break;
            case "medium":
                medPriorityOption.selected = true;
                break;
            case "high":
                highPriorityOption.selected = true;
                break;
            case "urgent":
                urgPriorityOption.selected = true;
                break;    
        }

        const savecardBtn = document.createElement("button");
        savecardBtn.classList.add("save-card-btn");
        const saveCardIcon = document.createElement("img");
        saveCardIcon.src = saveIcon;
        saveCardIcon.alt = "Save";
        saveCardBrn.appendChild(saveCardIcon);
        taskActions.appendChild(saveCardBtn);

        saveCardBtn.addEventListener("click", () => {
            if (taskTitleInput.value.trim() === "") {
                alert("Please enter a name for the task");
                return;
            }

            task.title = taskTitleInput.value;
            task.description = taskDescInput.value;
            taskDueDate = taskDueDateInput.value ? taskDueDateInput.value : task.dueDate;
            task.priority = taskPrioritySelect.value;
            if (newCard) prependTask(task, project);
            saveProjectlist();

            closeCardBtn.style.display = "";

            const taskList = document.querySelector(".task-list");
            taskList.replaceChild(newCard ? createTaskItem(task, project, index) : createTaskCard(task, project, index), taskCard);
        });

        taskActions.replaceChild(saveCardBtn, editCardBtn);
        closeCardBtn.style.display = "none";
    };

    editCardBtn.addEventListener("click", () => {
        editCard(false);
    });

    const removeCardBtn = document.createElement("button");
    removeCardBtn.classList.add("remove-card-btn");
    const removeCardIcon = document.createElement("img");
    removeCardIcon.src = trashIcon;
    removeCardIcon.alt = "Remove";
    removeCardBtn.appendChild(removeCardIcon);
    taskActions.appendChild(removeCardBtn);

    removeCardBtn.addEventListener("click", () => {
        const taskList = document.querySelector(".task-list");
        taskList.removeChild(taskCard);
        removeTask(index, project);
        saveProjectlist();
    });

    taskCard.appendChild(taskActions);

    if (newCard) {
        const taskList = document.querySelector(".task-list");
        taskList.insertBefore(taskCard, taskList.firstChild);
        editCard(true);
    }

    return taskCard;

}

export { createTaskItem, createTaskCard };