// contentScript.js

// This function is a placeholder. You should implement the actual logic for generating or fetching a summary.
function getSummaryForCurrentPage() {
    // Logic to generate or fetch a summary based on the content of the current web page.
    return "This is a placeholder summary for the current page.";
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getSummary") {
        const summary = getSummaryForCurrentPage();
        sendResponse({ summary: summary });
    }
});
