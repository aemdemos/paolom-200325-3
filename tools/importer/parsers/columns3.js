export default function parse(element, {document}) {
    // Extract the image
    const imageElement = element.querySelector('awt-image');
    const imgSrc = imageElement ? imageElement.getAttribute('src') : '';
    const imgAlt = imageElement ? imageElement.getAttribute('altimage') : '';

    const img = document.createElement('img');
    img.setAttribute('src', imgSrc);
    img.setAttribute('alt', imgAlt);

    // Extract the text content
    const articleElement = element.querySelector('awt-article');
    const standfirstHtml = articleElement ? articleElement.getAttribute('standfirst') : '';

    const textWrapper = document.createElement('div');
    textWrapper.innerHTML = standfirstHtml;

    // Create the header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Create the content rows
    const cells = [
        headerRow, // Header row
        [img, textWrapper], // Content row
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element
    element.replaceWith(table);
}