export default function parse(element, {document}) {
    // Import helper function createTable from WebImporter.DOMUtils
    const createTable = WebImporter.DOMUtils.createTable;

    // Create a header row with block type "Embed"
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Embed';
    const headerRow = [headerCell];

    // Extract image and URL from the input element
    const img = element.querySelector('img');
    const imgElement = img ? document.createElement('img') : null;
    if (imgElement) {
        imgElement.setAttribute('src', img.getAttribute('src'));
        imgElement.setAttribute('alt', img.getAttribute('alt'));
    }

    const link = element.querySelector('a');
    const url = link ? link.getAttribute('href') : '';

    // Handle edge case: if no image and no link are found, log a warning and stop further processing
    if (!imgElement && !url) {
        console.warn('No valid content found in the element.');
        return;
    }

    // Create the content row with image and URL
    const contentRow = [];
    if (imgElement) {
        contentRow.push(imgElement);
    }
    if (url) {
        const urlElement = document.createElement('a');
        urlElement.setAttribute('href', url);
        urlElement.textContent = url;
        contentRow.push(urlElement);
    }

    // Build the table structure
    const tableCells = [headerRow, [contentRow]];
    const table = createTable(tableCells, document);

    // Replace the original element with the table
    element.replaceWith(table);
}