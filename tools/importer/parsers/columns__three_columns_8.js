export default function parse(element, {document}) {
    const columnsData = [];

    // Extract illustration cards from the given container
    const illustrationCards = element.querySelectorAll('awt-ilustration-card');

    illustrationCards.forEach(card => {
        // Extract image dynamically
        const img = card.querySelector('img');
        const imageElement = document.createElement('img');
        imageElement.src = img?.src || ''; // Handle missing image
        imageElement.alt = img?.alt || 'Image'; // Fallback for missing alt text

        // Extract title dynamically
        const titleText = card.getAttribute('cardtitle') || 'No Title'; // Handle missing title
        const titleElement = document.createElement('h2');
        titleElement.textContent = titleText;

        // Extract description dynamically and safely
        const descriptionText = card.getAttribute('carddescription') || 'No Description'; // Handle missing description
        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = descriptionText; // Includes HTML like <sup>

        // Push column data ensuring all extracted content is accounted for
        columnsData.push([imageElement, titleElement, descriptionElement]);
    });

    // Correct header row creation
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Combine header and data rows
    const cells = [headerRow, ...columnsData];

    // Create table using WebImporter.DOMUtils.createTable()
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);

    return blockTable;
}