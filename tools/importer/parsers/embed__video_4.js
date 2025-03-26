export default function parse(element, {document}) {
  // Helper function to remove duplicates
  const removeDuplicates = (array) => {
    const seen = new Set();
    return array.filter(item => {
      const key = item.href || item.textContent.trim();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  // Extract unique button links and group them logically
  const buttonLinks = removeDuplicates([...element.querySelectorAll('awt-btn')].map(btn => {
    const link = document.createElement('a');
    link.href = btn.getAttribute('href');
    link.target = btn.getAttribute('target') || '_self';
    link.textContent = btn.textContent.trim();
    return link;
  }));

  // Create a single row for all button links
  const buttonRow = [buttonLinks];

  // Extract menu items and group logically
  const menuItems = [...element.querySelectorAll('awtcustom-header-megamenu')].map(menu => {
    const menuLabel = menu.getAttribute('menu-label');
    const menuHeader = document.createElement('strong');
    menuHeader.textContent = menuLabel.trim();

    const subMenuLinks = removeDuplicates([...menu.querySelectorAll('awtcustom-header-megamenuitem')].map(subItem => {
      const anchor = subItem.querySelector('a');
      if (anchor) {
        const link = document.createElement('a');
        link.href = anchor.getAttribute('href');
        link.target = anchor.getAttribute('target') || '_self';
        link.textContent = anchor.textContent.trim();
        return link;
      }
      return null; // Handle cases where an anchor is missing
    }).filter(Boolean)); // Filter out null values

    return [[menuHeader, ...subMenuLinks]]; // Group header and submenu links logically
  });

  // Build table structure
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  const rows = [
    headerRow, // Header row
    buttonRow, // Consolidated button links in a single row
    ...menuItems.flat() // Add menu sections as grouped rows
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(block);
}