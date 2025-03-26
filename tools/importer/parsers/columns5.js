export default function parse(element, {document}) {
    // Fix header row to match the example exactly
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Create rows for content
    const contentRows = [];

    // Extract paragraphs if present
    const paragraphContainer = element.querySelector('awt-article-section div[slot=paragraph]');
    if (paragraphContainer) {
        const paragraphs = [...paragraphContainer.querySelectorAll('p')].map(p => {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = p.innerHTML; // Extract HTML content dynamically
            return paragraph;
        });
        paragraphs.forEach(paragraph => contentRows.push([paragraph]));
    }

    // Extract image if present
    const imageElement = element.querySelector('awt-image');
    if (imageElement) {
        const img = document.createElement('img');
        img.src = imageElement.getAttribute('src');
        img.alt = imageElement.getAttribute('altimage') || '';
        const imageRow = [img];
        contentRows.push(imageRow);
    }

    // Combine header row and content rows
    const cells = [headerRow, ...contentRows];

    // Create table block
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the newly structured block
    element.replaceWith(table);
}