export default function parse(element, {document}) {
    // Check if the element exists
    if (!element) {
        console.warn('No element provided to parse.');
        return;
    }

    // Extract content from the footer section dynamically
    const logo = element.querySelector('.awt-footer-logo img');
    const legalLinks = element.querySelector('.awt-footer-legal-links');
    const inquiries = element.querySelector('.awt-footer-legal-inquiries');
    const copyright = element.querySelector('.awt-footer-legal-copyright');

    // Validate extracted elements
    const logoContent = logo ? logo.cloneNode(true) : document.createTextNode('');
    const legalLinksContent = legalLinks ? legalLinks.cloneNode(true) : document.createTextNode('');
    const inquiriesContent = inquiries ? inquiries.cloneNode(true) : document.createTextNode('');
    const copyrightContent = copyright ? copyright.cloneNode(true) : document.createTextNode('');

    // Construct the header row (using exact header format from example)
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Footer Content';
    const headerRow = [headerCell];

    // Construct the rows with extracted content
    const rows = [
        headerRow,
        [logoContent, ''],
        [legalLinksContent, ''],
        [inquiriesContent, ''],
        [copyrightContent, ''],
    ];

    // Create the table using WebImporter.DOMUtils.createTable()
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new structured block
    element.replaceWith(blockTable);
}