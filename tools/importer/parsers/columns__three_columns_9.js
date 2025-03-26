export default function parse(element, {document}) {
  // Helper function to extract text content, preserving line breaks
  const extractContentWithLineBreaks = (htmlElement) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlElement.innerHTML;
    return tempDiv.textContent.trim();
  };

  // Extract tab items and their respective content from the awt-tab-menu element
  const tabItems = Array.from(element.querySelectorAll('awt-tab-item button')); // Tab headers
  const tabContents = Array.from(element.querySelectorAll('[slot="content"]')); // Tab content sections

  const tableRows = [];

  // First row (header row)
  const headerCell = document.createElement('strong');
  headerCell.textContent = "Columns";
  tableRows.push([headerCell]);

  // Second row (tab headers)
  const headersRow = tabItems.map((tab) => {
    const headerDiv = document.createElement('div');
    const headerH2 = document.createElement('h2');
    headerH2.textContent = tab.textContent;
    headerDiv.appendChild(headerH2);
    return headerDiv;
  });
  tableRows.push(headersRow);

  // Third row (tab content)
  const contentRow = tabContents.map((content) => {
    const contentDiv = document.createElement('div');

    // Extract relevant content: images and paragraphs
    const images = Array.from(content.querySelectorAll('awt-image')).map((img) => {
      const imageElement = document.createElement('img');
      imageElement.src = img.getAttribute('src');
      imageElement.alt = img.getAttribute('altimage') || '';
      return imageElement;
    });

    const paragraphs = Array.from(content.querySelectorAll('[slot="paragraph"]')).map((paragraph) => {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = extractContentWithLineBreaks(paragraph);
      return paragraphElement;
    });

    contentDiv.append(...images, ...paragraphs);
    return contentDiv;
  });
  tableRows.push(contentRow);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}