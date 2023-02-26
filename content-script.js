document.addEventListener("mouseup", ev => {
    let selection = window.getSelection();
    removeTooltip();
    console.log(selection.toString());
    if (selection.toString() !== "") {
        console.log("CREATE TOOLTIP")
        let range = selection.getRangeAt(0).cloneRange();
        // range.collapse(true);
        let rects = range.getClientRects();
        if (rects.length > 0) {
            createTooltip(rects[0].top, rects[0].left + (rects[0].width / 2));
        }
    }
});


document.addEventListener("mousedown", ev => {
    if (ev.button === 0) {
        let selection = window.getSelection();
        if (selection.toString() !== "") {
            selection.empty();
        }
    } else {
        removeTooltip();
    }
})

function createTooltip(top, left) {
    let tooltip = document.createElement("div");
    tooltip.setAttribute("id", "btn-search-tooltip-extension");
    tooltip.style.position = "absolute";
    tooltip.style.zIndex = "2147483647";
    tooltip.style.display = "flex";
    tooltip.style.flexDirection = "column";
    tooltip.style.justifyContent = "center";
    tooltip.style.alignContent = "center";
    document.body.appendChild(tooltip);

    let tooltipContainer = document.createElement("div");
    tooltip.appendChild(tooltipContainer);

    tooltipContainer.style.backgroundColor = "#333";
    tooltipContainer.style.cursor = "pointer";
    tooltipContainer.style.paddingLeft = "10px";
    tooltipContainer.style.paddingRight = "10px";
    tooltipContainer.style.paddingTop = "5px";
    tooltipContainer.style.paddingBottom = "5px";
    tooltipContainer.style.color = "#aaa";
    tooltipContainer.style.borderRadius = "10px";

    tooltipContainer.textContent = "Pesquisar";

    tooltipContainer.addEventListener("mousedown", () => {
        browser.runtime.sendMessage({ search: window.getSelection().toString() })
        removeTooltip();
    })

    let tooltipArrow = document.createElement("div");
    tooltip.appendChild(tooltipArrow);
    tooltipArrow.style.width = "0";
    tooltipArrow.style.height = "0";
    tooltipArrow.style.borderRight = "5px solid transparent";
    tooltipArrow.style.borderLeft = "5px solid transparent";
    tooltipArrow.style.borderTop = "5px solid #333";
    tooltipArrow.style.margin = "0 auto";

    tooltip.style.top = `${top + window.scrollY - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${left - (tooltip.offsetWidth / 2)}px`;

}

function removeTooltip() {
    let btnTooltip = document.getElementById("btn-search-tooltip-extension");
    if (btnTooltip) {
        btnTooltip.remove();
    }
}