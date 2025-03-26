export default function parse(element, {document}) {
  // Extract the main content dynamically
  const headerText = element.querySelector('awt-article')?.getAttribute('standfirst') || '';
  const paragraphElement = element.querySelector('awt-article-section div[slot="paragraph"]');
  const paragraphContent = paragraphElement ? paragraphElement.innerHTML.trim() : '';
  const imageElement = element.querySelector('awt-image');
  const imageSrc = imageElement ? imageElement.getAttribute('src') : '';
  const imageAlt = imageElement ? imageElement.getAttribute('altimage') : '';

  // Validate dynamic data extraction
  if (!headerText && !paragraphContent && !imageSrc) {
    console.warn('Missing content in the element.');
  }

  // Create elements for table cells
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';

  const column1Content = document.createElement('div');
  column1Content.innerHTML = `<h2>${headerText}</h2><div>${paragraphContent}</div>`;

  const column2Content = document.createElement('img');
  column2Content.src = imageSrc;
  column2Content.alt = imageAlt;

  // Define table cells dynamically
  const cells = [
    [headerCell],  // Header row matches the example
    [column1Content, column2Content]  // Content row
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the generated table
  element.replaceWith(table);

  return table;
}