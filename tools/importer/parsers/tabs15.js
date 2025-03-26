export default function parse(element, {document}) {
  // Step 1: Create the header row dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];

  // Step 2: Initialize rows with the header row
  const rows = [headerRow];

  // Step 3: Select all tab items and corresponding content slots
  const tabItems = element.querySelectorAll('awt-tab-item');
  const contents = element.querySelectorAll('[slot="content"]');

  // Step 4: Loop through each tab item and content
  tabItems.forEach((item, index) => {
    // Extract the tab label dynamically
    const tabLabel = item.querySelector('.awt-tab__btn')?.textContent?.trim();
    if (!tabLabel) {
      console.warn(`Tab label missing for index ${index}`);
      return;
    }

    // Extract the corresponding content dynamically
    const tabContent = contents[index];
    if (!tabContent) {
      console.warn(`Tab content missing for index ${index}`);
      return;
    }

    // Clone the content to ensure safe manipulation
    const contentClone = document.createElement('div');
    Array.from(tabContent.childNodes).forEach((child) => contentClone.appendChild(child.cloneNode(true)));

    // Push the extracted data to rows
    rows.push([tabLabel, contentClone]);
  });

  // Step 5: Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Step 6: Replace the original element with the new block table
  element.replaceWith(blockTable);
}