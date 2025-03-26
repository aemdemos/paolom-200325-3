export default function parse(element, {document}) {
  // Helper function to extract footer sections dynamically
  const extractFooterSections = (container) => {
    const sections = Array.from(container.querySelectorAll('awt-footer-section'));
    return sections.map((section) => {
      const title = section.getAttribute('footertitle') || '';
      const links = Array.from(section.querySelectorAll('a')).map((link) => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent;
        return anchor;
      });
      return { title, links };
    });
  };

  // Dynamically extract data from the input element
  const content = extractFooterSections(element);

  // Create the header row, ensuring it matches the example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Generate rows for the extracted sections
  const rows = content.map((section) => {
    const titleElement = document.createElement('strong');
    titleElement.textContent = section.title;

    const columnContent = [
      titleElement,
      document.createElement('br'),
      ...section.links,
    ];

    return [columnContent];
  });

  // Combine header and content rows into the table structure
  const cells = [headerRow, ...rows];

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}