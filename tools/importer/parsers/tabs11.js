export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract tab menus and their content
  const tabMenu = element.querySelector('awt-tab-menu');

  if (!tabMenu) {
    throw new Error('Tab menu not found in the element');
  }

  const tabs = tabMenu.querySelectorAll('awt-tab-item');
  const contents = tabMenu.querySelectorAll('[slot="content"]');

  if (tabs.length !== contents.length) {
    throw new Error('Mismatch in the number of tabs and corresponding content sections');
  }

  // Prepare cells array for the table
  const cells = [];

  // Add table header
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Iterate through tabs and collect their labels and contents
  tabs.forEach((tab, index) => {
    const tabLabelElement = tab.querySelector('button');
    const tabLabel = tabLabelElement ? tabLabelElement.textContent.trim() : 'Untitled Tab';

    const contentElement = contents[index];
    const cleanedContent = contentElement.cloneNode(true);

    // Remove "slot" attributes and inline styles
    cleanedContent.querySelectorAll('[slot]').forEach(el => el.removeAttribute('slot'));
    cleanedContent.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));

    // Ensure content is not null or empty
    const contentHTML = cleanedContent.innerHTML.trim();
    const finalContent = contentHTML ? cleanedContent : document.createTextNode('No content available');

    // Push tab label and cleaned content into a new row
    cells.push([
      tabLabel,
      finalContent
    ]);
  });

  // Create table with extracted data
  const blockTable = createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}