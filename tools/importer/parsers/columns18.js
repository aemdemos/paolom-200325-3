export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract relevant elements and content
  const article = element.querySelector('awt-article');
  const title = article?.querySelector('[standfirst]')?.textContent || '';
  const paragraph = article?.querySelector('awt-article-section div[slot="paragraph"]');
  const textContent = paragraph?.innerHTML || '';

  const imageContainer = element.querySelector('awt-image');
  const imageSrc = imageContainer?.getAttribute('src') || '';

  // Create header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Create content rows
  const contentRowText = document.createElement('div');
  contentRowText.innerHTML = `<h2>${title}</h2><div>${textContent}</div>`;

  const contentRowImage = document.createElement('img');
  if (imageSrc) {
    contentRowImage.setAttribute('src', imageSrc);
  }

  const cells = [
    headerRow,
    [contentRowText, imageSrc ? contentRowImage : document.createTextNode('')],
  ];

  // Create block table
  const block = createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}