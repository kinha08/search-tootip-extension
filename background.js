browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    browser.search.search({
        query: request.search,
    });
});
