export default function parse(element, {document}) {
  const cells = [];

  // Header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Content row (everything combined into a single cell)
  const contentCell = [];

  // Find background image
  const backgroundImage = element.querySelector('img[slot="background"]');
  if (backgroundImage) {
    const imgElement = document.createElement('img');
    imgElement.src = backgroundImage.src;
    imgElement.alt = backgroundImage.alt;
    contentCell.push(imgElement);
  }

  // Find heading
  const headingElement = element.querySelector('awt-article[standfirst]');
  if (headingElement) {
    const heading = document.createElement('h1');
    heading.textContent = headingElement.getAttribute('standfirst');
    contentCell.push(heading);
  }

  // Find paragraph
  const paragraphElement = element.querySelector('awt-article-section div[slot="paragraph"] p');
  if (paragraphElement) {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = paragraphElement.innerHTML;
    contentCell.push(paragraph);
  }

  // Combine entire content row into a single cell
  cells.push([contentCell]);

  // Create table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}