export default function parse(element, {document}) {
    // Helper function to extract tooltip text
    function extractTooltipContent(node) {
        const tooltip = node.querySelector('.awt-tooltip');
        if (!tooltip) return node.textContent;

        const mainText = tooltip.innerHTML.split('<span')[0].trim();
        const tooltipText = tooltip.querySelector('span').textContent.trim();
        return `${mainText} (${tooltipText})`;
    }

    // Create the table header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Extract content dynamically
    const paragraphs = Array.from(element.querySelectorAll('div[slot="paragraph"]'));
    const paragraphContent = paragraphs.map(paragraph => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = paragraph.innerHTML;

        // Replace tooltips with extracted text
        Array.from(tempDiv.querySelectorAll('.awt-tooltip')).forEach(tooltip => {
            const extractedText = extractTooltipContent(tooltip);
            tooltip.replaceWith(document.createTextNode(extractedText));
        });

        return tempDiv;
    });

    // Extract image information
    const image = element.querySelector('awt-image');
    const imageCell = document.createElement('div');
    if (image) {
        const imgElement = document.createElement('img');
        imgElement.src = image.getAttribute('src');
        const captionText = image.getAttribute('references');
        const caption = document.createElement('p');
        caption.textContent = captionText;

        imageCell.appendChild(imgElement);
        imageCell.appendChild(caption);
    }

    // Build the cells array for the table
    const cells = [
        headerRow, // Header row
        [paragraphContent[0], imageCell], // First row of content
        [paragraphContent[1], ''] // Second row of content
    ];

    // Create the table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new table
    element.replaceWith(block);
}