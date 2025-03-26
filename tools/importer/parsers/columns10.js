export default function parse(element, {document}) {
  // Extract content from the original element
  const title = element.querySelector('awt-article[standfirst]');
  const paragraphs = element.querySelectorAll('awt-article-section div[slot="paragraph"] p');
  const image = element.querySelector('awt-image');

  // Initialize cells array for block table
  const cells = [];

  // Add Header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Prepare content for the first column (text blocks)
  const textColumn = [];
  if (title && title.getAttribute('standfirst')) {
    const titleElement = document.createElement('h2');
    titleElement.textContent = title.getAttribute('standfirst').trim();
    textColumn.push(titleElement);
  }

  paragraphs.forEach(paragraph => {
    const clonedParagraph = paragraph.cloneNode(true);

    // Process tooltips
    clonedParagraph.querySelectorAll('.awt-tooltip').forEach(tooltip => {
      const explanation = tooltip.querySelector('span:last-child');
      const triggerText = tooltip.textContent.split(explanation ? explanation.textContent : '')[0].trim();
      const spanElement = document.createElement('span');

      spanElement.textContent = `${triggerText} (${explanation ? explanation.textContent : ''})`; // Full context integration
      tooltip.replaceWith(spanElement);
    });

    // Remove superscripts
    clonedParagraph.querySelectorAll('sup').forEach(supElement => supElement.remove());

    textColumn.push(clonedParagraph);
  });

  // Prepare content for the second column (image)
  const imageColumn = [];
  if (image && image.getAttribute('src')) {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', image.getAttribute('src'));
    imgElement.setAttribute('alt', image.getAttribute('altimage') || 'Image');
    imageColumn.push(imgElement);
  }

  // Add content row to the table
  cells.push([textColumn, imageColumn]);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}