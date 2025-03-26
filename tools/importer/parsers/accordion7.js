export default function parse(element, {document}) {
  // Helper function to extract and sanitize text content
  const extractText = (el) => el?.textContent?.trim() || '';

  const rows = [];

  // Add block header row
  const blockHeader = document.createElement('strong');
  blockHeader.textContent = 'Accordion';
  rows.push([blockHeader]);

  // Process each awt-tab-item and associated div content
  const tabs = element.querySelectorAll('awt-tab-item');
  const contents = element.querySelectorAll('div[slot="content"]');

  tabs.forEach((tab, index) => {
    const title = tab.querySelector('button');
    const content = contents[index];

    if (title && content) {
      // Extract title dynamically
      const titleText = extractText(title);

      // Clone and clean up content for safety
      const contentClone = content.cloneNode(true);
      contentClone.querySelectorAll('awt-divider').forEach((divider) => divider.remove());

      // Add title and content row
      rows.push([titleText, contentClone]);
    } else {
      // Handle missing title or content edge case
      rows.push([title ? extractText(title) : 'No Title Available', 'No Content Available']);
    }
  });

  // Create the table block dynamically
  const tableBlock = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table block
  element.replaceWith(tableBlock);
}