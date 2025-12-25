// Step 1: Simulate User Behavior
// - Add event listeners for button clicks and form submissions.
// - Use JavaScript to dynamically update the DOM based on user actions.

// Step 2: DOM Manipulation Functions
// - Implement functions to add, update, and remove DOM elements.
// - Ensure all elements are dynamically created with appropriate attributes and content.

// Step 3: Error Handling
// - Display error messages in the DOM for invalid inputs or missing elements.
// - Create reusable functions to handle common error cases.

// Step 4: Reusable Utilities
// - Create modular utility functions, such as createElement(tag, attributes).
// - Ensure all functions follow DRY principles for maintainability.



function createElementWithAttributes(tag, attributes = {}) {
    const el = document.createElement(tag);
    Object.keys(attributes).forEach((key) => el.setAttribute(key, attributes[key]));
    return el;
}

function displayError(message) {
    const errorBox = document.getElementById("error-message");
    if (!errorBox) return;
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
}

function clearError() {
    const errorBox = document.getElementById("error-message");
    if (!errorBox) return;
    errorBox.textContent = "";
    errorBox.classList.add("hidden");
}


function addElementToDOM(containerId, text) {
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`Missing #${containerId}`);

    const p = document.createElement("p");
    p.textContent = text;
    container.appendChild(p);
    return p;
}

function removeElementFromDOM(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.remove();
}

function simulateClick(containerId, message) {
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`Missing #${containerId}`);

    // Your test checks "contains", so either textContent or a <p> is fine.
    container.textContent = message;
}

function handleFormSubmit(formId, containerId) {
    const form = document.getElementById(formId);
    const container = document.getElementById(containerId);

    if (!form) throw new Error(`Missing #${formId}`);
    if (!container) throw new Error(`Missing #${containerId}`);

    // Get the first text input in the form (matches your HTML)
    const input = form.querySelector('input[type="text"]') || form.querySelector("input");
    if (!input) throw new Error("Missing input field in form");

    const value = input.value.trim();

    if (value === "") {
        displayError("Input cannot be empty");
        return false;
    }

    clearError();
    addElementToDOM(containerId, value);
    form.reset();
    return true;
}


function initDOMLab() {
    const clickBtn = document.getElementById("simulate-click");
    const form = document.getElementById("user-form");
    const dynamic = document.getElementById("dynamic-content");

    if (!clickBtn || !form || !dynamic) return;

    // Click behavior 
    let clickCount = 0;
    clickBtn.addEventListener("click", () => {
        clickCount += 1;
        clearError();
        dynamic.textContent = `Button clicked ${clickCount} time${clickCount === 1 ? "" : "s"}`;
    });

    // Form submit behavior 
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        handleFormSubmit("user-form", "dynamic-content");
    });
}

// Auto-run in the browser
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", initDOMLab);
}

// Export for Jest
if (typeof module !== "undefined") {
    module.exports = {
        addElementToDOM,
        removeElementFromDOM,
        simulateClick,
        handleFormSubmit,
        initDOMLab,
        createElementWithAttributes,
        displayError,
        clearError,
    };
}
