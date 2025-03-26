export default function parse(element, {document}) {
  // Extract relevant content from the input element
  const image = element.querySelector('img[slot="background-image"]');
  const titleSpan = element.querySelector('awt-hero-text span[slot="textTitle"]');

  // Create structured elements
  const title = document.createElement('h1');
  title.textContent = titleSpan ? titleSpan.textContent : '';

  const backgroundImage = image ? document.createElement('img') : null;
  if (backgroundImage) {
    backgroundImage.src = image.src;
    backgroundImage.alt = image.alt;
  }

  // Define the cells for the block table
  const cells = [
    [document.createElement('strong').appendChild(document.createTextNode('Hero'))],
    [backgroundImage, title]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}