export default function parse(element, {document}) {
  // Initialize table cells
  const cells = [];

  // First row: Block header (Columns)
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';
  cells.push(headerRow);

  // Extract main content for the first column
  const mainContainer = element.querySelector('awt-container[container-size="388"]');
  let mainHeading = '', mainParagraph = '';
  if (mainContainer) {
    const article = mainContainer.querySelector('awt-article');
    if (article) {
      const headingElement = document.createElement('h2');
      headingElement.textContent = article.getAttribute('standfirst') || '';

      const paragraphElement = document.createElement('p');
      const paragraphSlot = article.querySelector('awt-article-section div[slot="paragraph"]');
      paragraphElement.innerHTML = paragraphSlot ? paragraphSlot.innerHTML : '';

      mainHeading = headingElement;
      mainParagraph = paragraphElement;
    }
  }

  // Prepare rows for the other columns
  const columnContainers = element.querySelectorAll('awt-container[container-size="282"]');
  const columnData = [];
  columnContainers.forEach((column) => {
    const imgContainer = column.querySelector('awt-image');
    const imageElement = document.createElement('img');
    if (imgContainer) {
      imageElement.src = imgContainer.getAttribute('src') || '';
    }

    const paragraphSlot = column.querySelector('awt-article-section div[slot="paragraph"]');
    const paragraphElement = document.createElement('p');
    paragraphElement.innerHTML = paragraphSlot ? paragraphSlot.innerHTML : '';

    columnData.push([imageElement, paragraphElement]);
  });

  // Combine all columns into rows
  const columnsRow = [
    [mainHeading, mainParagraph],
    ...columnData
  ];

  cells.push(columnsRow);

  // Create the block table
  const structuredBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block
  element.replaceWith(structuredBlock);
}