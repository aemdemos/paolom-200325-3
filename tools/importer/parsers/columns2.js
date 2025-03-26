export default function parse(element, {document}) {
  const cells = [];

  // Add header row for the block
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract text content (first column)
  const textContainer = element.querySelector('awt-article');
  const paragraphs = textContainer?.querySelectorAll('p') || [];
  const paragraphElements = Array.from(paragraphs).map(p => {
    const div = document.createElement('div');
    div.appendChild(p.cloneNode(true));
    return div;
  });

  // Extract image (second column)
  const imageElement = element.querySelector('awt-image img');
  const imageClone = imageElement ? imageElement.cloneNode(true) : document.createElement('div'); // Fallback for missing image

  // Compose the second row
  const secondRow = [
    paragraphElements.length > 0 ? paragraphElements : [document.createTextNode('No text available')],
    imageClone,
  ];
  cells.push(secondRow);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}