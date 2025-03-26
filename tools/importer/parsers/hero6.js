export default function parse(element, {document}) {
  // Helper function to create table blocks
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract the background image
  const img = element.querySelector('[slot="background-image"]');
  const image = img ? document.createElement('img') : null;
  if (image) {
    image.src = img.src || '';
    image.alt = img.alt || '';
  }

  // Extract the title
  const titleElement = element.querySelector('[slot="content"] [slot="textTitle"]');
  const title = titleElement ? document.createElement('h1') : null;
  if (title) {
    title.textContent = titleElement.textContent.trim() || '';
  }

  // Extract description (if available)
  const descriptionElement = element.querySelector('[slot="content"] [slot="textDescription"]');
  const description = descriptionElement ? document.createElement('p') : null;
  if (description) {
    description.textContent = descriptionElement.textContent.trim() || '';
  }

  // Create cells for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const contentRow = [
    image || '', // Background image (optional)
    title || '', // Title (mandatory)
    description || '' // Description (optional)
  ];

  const cells = [
    headerRow, // Block header
    contentRow // Content row with separate cells for each content
  ];

  // Create the table block
  const blockTable = createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}