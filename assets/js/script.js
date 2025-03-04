// Wait until the DOM is fully loaded before executing any JavaScript code
document.addEventListener("DOMContentLoaded", () => {
    // Get references to the necessary elements in the DOM
    const taskInput = document.getElementById("taskInput"); // Input field for new tasks
    const addTaskButton = document.getElementById("addTaskButton"); // Button to add tasks
    const taskList = document.getElementById("taskList"); // Container where tasks will be displayed

    // Allow adding a task by pressing "Enter" in the input field
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents accidental form submission if inside a form
            addTaskButton.click(); // Triggers the same action as clicking the "Add Task" button
        }
    });
    
    /**
     * Adds a new task to the task list when the "Add Task" button is clicked.
     * Ensures that the task is not empty before adding it.
     */
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim(); // Get and trim input value
        if (taskText === "") return; // Do nothing if the input is empty

        // Create a new list item for the task
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox">
                <span class="task-text">${taskText}</span>
            </div>
            <div class="task-buttons">
                <button class="edit-btn">Edit</button>
                <button class="remove-btn">Remove</button>
            </div>
        `;


        taskList.appendChild(taskItem); // Add the task item to the task list
        taskInput.value = ""; // Clear input field after adding the task
    });

    /**
     * Handles user interactions with the task list.
     * Uses event delegation to manage dynamically added tasks.
     */
    taskList.addEventListener("click", (event) => {
        const target = event.target; // Identify the clicked element
        const taskItem = target.closest("li"); // Find the closest task item (li)

        if (target.classList.contains("remove-btn")) {
            // Remove the task when the "Remove" button is clicked
            taskItem.remove();
        } else if (target.classList.contains("edit-btn")) {
            // Edit the task when the "Edit" button is clicked
            const newText = prompt("Edit task:", taskItem.querySelector(".task-text").textContent);
            if (newText !== null) { // Ensure the user didn't cancel
                taskItem.querySelector(".task-text").textContent = newText; // Update task text
            }
        } else if (target.classList.contains("task-checkbox")) {
            // Toggle the completed class when the checkbox is clicked
            taskItem.querySelector(".task-text").classList.toggle("completed");
        }
    });
});