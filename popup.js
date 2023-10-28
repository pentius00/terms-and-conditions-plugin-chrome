// popup.js

// This function is responsible for handling the received summary or error from the background script.
function handleReceivedMessage(message) {
    if (message.action === "newSummaryAvailable") {
        // Hide spinner and show summary container with new summary
        $('#loadingSpinner').hide();
        $('#summaryContainer').show();
        $('#summaryText').text(message.summary);
    } else if (message.action === "summaryError") {
        // Hide spinner and show error message
        $('#loadingSpinner').hide();
        $('#errorText').show().text(message.error); // Update error text and make it visible
    }
}

// This function requests the current summary from the background script.
function requestSummary() {
    chrome.runtime.sendMessage({ action: "getSummary" }, function (response) {
        if (response.summary) {
            // If a summary was received, display it
            $('#loadingSpinner').hide();
            $('#summaryContainer').show();
            $('#summaryText').text(response.summary);
        } else {
            // If no summary was received, display a default message or keep the spinner
            console.error("No summary available.");
        }
    });
}

// Initialize your popup window's content
function initializePopup() {
    // Initially, you might be fetching the summary, so show the loading indicator
    $('#summaryContainer').hide();
    $('#loadingSpinner').show();
    $('#errorText').hide(); // Ensure error message is hidden on startup

    // Request the current summary from the background script
    requestSummary();

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log("Popup received a message:", message);
        handleReceivedMessage(message);
    });

    // If you have other initialization code, include it here...
}

// When the popup is loaded, initialize its content
document.addEventListener('DOMContentLoaded', initializePopup);

// Additional handlers for UI elements (like buttons) can go here...

// For example, handling the refresh button:
$(document).ready(function() {
    $('#refreshButton').click(function() {
        // Here, you'd call the function to refresh the summary.
        // You might want to show the loading spinner again
        $('#summaryContainer').hide();
        $('#loadingSpinner').show();
        $('#errorText').hide();

        // And then request the new summary
        requestSummary(); // Or a separate function if refreshing requires different action
    });
});
// popup.js
$(document).ready(function() {
    // Simulate a loading delay, then display the summary.
    setTimeout(function() {
        $('#loadingSpinner').hide();
        $('#summaryContainer').show();
    }, 2000); // 2 seconds delay for demonstration

    // Refresh button click
    $('#refreshButton').click(function() {
        $('#summaryContainer').hide();
        $('#loadingSpinner').show();

        setTimeout(function() {
            $('#loadingSpinner').hide();
            $('#summaryContainer').show();
        }, 2000); // 2 seconds delay for demonstration
    });
});
