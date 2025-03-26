export default function parse(element, {document}) {
  const blockName = document.createElement('strong');
  blockName.textContent = 'Columns';

  // Extract paragraphs from the element
  const paragraphContainer = element.querySelector('awt-article-section div[slot="paragraph"]');
  const paragraphs = paragraphContainer ? Array.from(paragraphContainer.children).map(p => p.cloneNode(true)) : [];

  // Extract the correct image from the element
  const imageElement = element.querySelector('awt-image');
  let image = null;
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.getAttribute('src');
    image.alt = imageElement.getAttribute('altimage');
  } else {
    image = document.createTextNode('Image not available'); // Handle missing image dynamically
  }

  // Create the cells for the table
  const cells = [
    [blockName],
    [paragraphs, image]
  ];

  // Generate the block table
  const newBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(newBlock);
}