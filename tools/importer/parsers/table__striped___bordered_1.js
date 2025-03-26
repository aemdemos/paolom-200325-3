export default function parse(element, {document}) {
    // Step 1: Validate and extract the content dynamically
    const footerLogo = element.querySelector('.awt-footer-logo img');
    const footerLegalLinks = element.querySelectorAll('.awt-footer-legal-links a');
    const footerInquiries = element.querySelector('.awt-footer-legal-inquiries a');
    const footerCopyright = element.querySelector('.awt-footer-legal-copyright');

    const cells = [];

    // Step 2: Add header row
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Table (striped & bordered)';
    cells.push(headerRow);

    // Step 3: Handle logo dynamically
    if (footerLogo) {
        const logoRow = ['Logo', footerLogo.cloneNode(true)];
        cells.push(logoRow);
    }

    // Step 4: Handle footer legal links dynamically
    if (footerLegalLinks.length > 0) {
        const linksRow = ['Legal Links', Array.from(footerLegalLinks).map(link => {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = link.textContent;
            return anchor;
        })];
        cells.push(linksRow);
    }

    // Step 5: Handle inquiries dynamically
    if (footerInquiries) {
        const inquiriesRow = ['Inquiries', (() => {
            const anchor = document.createElement('a');
            anchor.href = footerInquiries.href;
            anchor.textContent = footerInquiries.textContent;
            return anchor;
        })()];
        cells.push(inquiriesRow);
    }

    // Step 6: Handle copyright dynamically
    if (footerCopyright) {
        const copyrightRow = ['Copyright', footerCopyright.cloneNode(true)];
        cells.push(copyrightRow);
    }

    // Step 7: Create the table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Step 8: Replace the original element with the generated table
    element.replaceWith(blockTable);
}