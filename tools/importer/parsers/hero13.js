export default function parse(element, {document}) {
  // Check if element exists
  if (!element) {
    console.error('Element is null or undefined.');
    return;
  }

  // Extract the background image source dynamically
  const backgroundImg = element.querySelector('img[slot="background"]');
  let backgroundImgElement = null;
  if (backgroundImg) {
    backgroundImgElement = document.createElement('img');
    backgroundImgElement.src = backgroundImg.getAttribute('src');
  }

  // Extract the title information dynamically
  const titleElement = element.querySelector('awt-article');
  let titleText = null;
  if (titleElement) {
    titleText = document.createElement('h1');
    const standfirst = titleElement.getAttribute('standfirst');
    if (standfirst) {
      titleText.innerHTML = standfirst; // Use innerHTML directly to simplify structure
    }
  }

  // Extract the paragraph text dynamically
  const paragraphs = element.querySelectorAll('div[slot="paragraph"] p');
  const paragraphElements = [];
  if (paragraphs.length > 0) {
    paragraphs.forEach((p) => {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = p.textContent.trim();
      paragraphElements.push(paragraphElement);
    });
  }

  // Create cells for the block table dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const cells = [
    headerRow, // Header row matches example exactly
  ];

  const contentRow = [];
  if (backgroundImgElement) contentRow.push(backgroundImgElement);
  if (titleText) contentRow.push(titleText);
  if (paragraphElements.length > 0) contentRow.push(...paragraphElements);

  if (contentRow.length > 0) {
    cells.push(contentRow);
  }

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}