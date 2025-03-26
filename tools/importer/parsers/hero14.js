export default function parse(element, {document}) {
  const cells = [];

  // First row: Header row containing the block name
  const blockHeader = document.createElement('strong');
  blockHeader.textContent = 'Hero';
  cells.push([blockHeader]);

  // Second row: Content row
  const content = [];

  // Extract background image
  const backgroundImageElement = element.querySelector('img[slot="background"]');
  if (backgroundImageElement) {
    const backgroundImg = document.createElement('img');
    backgroundImg.src = backgroundImageElement.src;
    backgroundImg.alt = backgroundImageElement.alt || '';
    content.push(backgroundImg);
  }

  // Extract headline
  const headlineElement = element.querySelector('awt-article[standfirst]');
  if (headlineElement) {
    const headline = document.createElement('h1');
    headline.textContent = headlineElement.getAttribute('standfirst');
    content.push(headline);
  }

  // Extract paragraphs
  const paragraphElements = element.querySelectorAll('awt-article-section div[slot="paragraph"] p');
  paragraphElements.forEach((p) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = p.textContent;
    content.push(paragraph);
  });

  cells.push([content]);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}