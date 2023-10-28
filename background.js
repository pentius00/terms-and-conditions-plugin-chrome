// Chrome Extension: background.js

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": "summarize",
        "title": "Summarize",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "summarize") {
        const selectedText = info.selectionText;

        if (selectedText) {
            fetch('http://localhost:3000/get-openai-response', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ prompt: selectedText })
            })
            .then(response => response.json())
            .then(data => {
                // Communicate with popup or store data
                chrome.runtime.sendMessage({action: "newSummaryAvailable", summary: data.ai_response});
            })
            .catch(error => {
                // Handle error
                chrome.runtime.sendMessage({action: "summaryError", error: error.toString()});
            });
        }
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Handle messages from your content scripts
    // Placeholder for future functionality
});
