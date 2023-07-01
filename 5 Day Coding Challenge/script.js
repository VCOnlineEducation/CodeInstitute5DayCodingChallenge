// JavaScript to handle mode switching
const modeDropdown = document.getElementById("modeDropdown");

modeDropdown.addEventListener("click", (event) => {
    event.preventDefault();
    const mode = event.target.textContent.trim();
    if (mode === "Light Mode") {
        switchToLightMode();
        saveModeSelection("light-mode");
    } else if (mode === "Dark Mode") {
        switchToDarkMode();
        saveModeSelection("dark-mode");
    } else if (mode === "Auto") {
        switchToAutoMode();
        saveModeSelection("auto-mode");
    }
});

function switchToLightMode() {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    updateDropdownText("light-mode");
}

function switchToDarkMode() {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    updateDropdownText("dark-mode");
}

function switchToAutoMode() {
    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkMode) {
        switchToDarkMode();
    } else {
        switchToLightMode();
    }
    updateDropdownText("auto-mode");
}

function saveModeSelection(mode) {
    localStorage.setItem("selectedMode", mode);
}

function updateDropdownText(mode) {
    var svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");

    if (mode === "light-mode") {
        useElement.setAttribute("href", "#light-icon"); // Use the appropriate icon ID for light mode
    } else if (mode === "dark-mode") {
        useElement.setAttribute("href", "#dark-icon"); // Use the appropriate icon ID for dark mode
    } else if (mode === "auto-mode") {
        useElement.setAttribute("href", "#auto-icon"); // Use the appropriate icon ID for auto mode
    }

    svgIcon.appendChild(useElement);

    var dropdownButton = document.querySelector('.dropdown-toggle');
    dropdownButton.innerHTML = ''; // Clear existing content
    dropdownButton.appendChild(svgIcon);
}

// Load the selected mode on page load
window.addEventListener("DOMContentLoaded", loadModeSelection);

function loadModeSelection() {
    const selectedMode = localStorage.getItem("selectedMode");
    if (selectedMode) {
        if (selectedMode === "light-mode") {
            switchToLightMode();
            updateDropdownText("light-mode");
        } else if (selectedMode === "dark-mode") {
            switchToDarkMode();
            updateDropdownText("dark-mode");
        } else if (selectedMode === "auto-mode") {
            switchToAutoMode();
            updateDropdownText("auto-mode");
        }
    } else {
        // No selection made by the user, check browser and system settings
        switchToAutoMode();
        updateDropdownText("auto-mode");
    }
}
