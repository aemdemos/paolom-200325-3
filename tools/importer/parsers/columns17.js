export default function parse(element, {document}) {
  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract content dynamically from the element
  const paragraphs = Array.from(element.querySelectorAll('p')).map((p) => p.cloneNode(true));
  const imageElement = document.createElement('img');
  const image = element.querySelector('awt-image img') || element.querySelector('img');
  if (image && image.src) {
    imageElement.src = image.src;
    imageElement.alt = image.alt || '';
  }

  // Structure the cells for the table
  const cells = [
    headerRow, // First row: Header
    [ // Second row: Two columns with text and image
      paragraphs[0] || '',
      imageElement
    ],
    [ // Third row: Remaining paragraphs and a preview text
      paragraphs.slice(1).map((p) => p.cloneNode(true)),
      'Preview'
    ],
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}