export default function parse(element, {document}) {
  // Extract relevant content from the HTML element
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const paragraphs = element.querySelectorAll('awt-article-section div[slot="paragraph"]');
  const firstText = paragraphs[0]?.textContent.trim() || '';

  const imageElement = element.querySelector('awt-image');
  const imageSrc = imageElement?.getAttribute('src');
  const image = document.createElement('img');
  if (imageSrc) {
    image.setAttribute('src', imageSrc);
  }

  const secondText = paragraphs[1]?.textContent.trim() || '';

  // Create the table structure
  const cells = [
    headerRow,
    [firstText, image],
    [secondText]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}