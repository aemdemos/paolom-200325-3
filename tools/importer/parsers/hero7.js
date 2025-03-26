export default function parse(element, {document}) {
  // Extract block name
  const blockName = document.createElement('strong');
  blockName.textContent = 'Hero';

  // Extract the background image
  const backgroundImage = element.querySelector('img[slot="background"]');
  let imageElement = null;
  if (backgroundImage) {
    imageElement = document.createElement('img');
    imageElement.src = backgroundImage.src;
    imageElement.alt = backgroundImage.alt || '';
  }

  // Extract the headline
  const headline = element.querySelector('awt-article[standfirst]');
  let headlineElement = null;
  if (headline) {
    const headlineText = headline.getAttribute('standfirst');
    if (headlineText) {
      headlineElement = document.createElement('h1');
      headlineElement.innerHTML = headlineText;
    }
  }

  // Extract the paragraph content
  const paragraph = element.querySelector('awt-article-section div[slot="paragraph"]');
  let paragraphElement = null;
  if (paragraph) {
    paragraphElement = document.createElement('div');
    paragraphElement.innerHTML = paragraph.innerHTML;
  }

  // Create the table cells dynamically based on available content
  const contentRow = [];
  if (imageElement) contentRow.push(imageElement);
  if (headlineElement) contentRow.push(headlineElement);
  if (paragraphElement) contentRow.push(paragraphElement);

  const cells = [
    [blockName],
    contentRow.length > 0 ? contentRow : [''], // Handle edge case where no content is extracted
  ];

  // Create and replace the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}