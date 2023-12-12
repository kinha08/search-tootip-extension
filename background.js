if (typeof browser !== "undefined") {
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        browser.search.search({
            query: request.search,
        });
    });
}

if (typeof chrome !== "undefined") {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        browser.search.search({
            query: request.search,
        });
    });
}
