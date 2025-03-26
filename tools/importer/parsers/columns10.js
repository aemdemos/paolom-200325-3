export default function parse(element, {document}) {
  // Create the block header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract the content from the input element
  const containers = element.querySelectorAll('awt-container');

  // Prepare the cells for the table
  const contentRows = [];

  containers.forEach((container) => {
    const cells = [];

    // Process text content
    const article = container.querySelector('awt-article');
    if (article) {
      const standfirstDiv = document.createElement('div');
      standfirstDiv.innerHTML = article.querySelector('div')?.innerHTML || '';
      cells.push(standfirstDiv);
    }

    // Process image content
    const image = container.querySelector('awt-image');
    if (image) {
      const imgElement = document.createElement('img');
      imgElement.src = image.getAttribute('src');
      cells.push(imgElement);
    }

    if (cells.length > 0) {
      contentRows.push(cells);
    }
  });

  // Create the rows for the table
  const rows = [headerRow, ...contentRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}