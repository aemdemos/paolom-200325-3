export default function parse(element, {document}) {
  // Helper function to extract text content and structure
  const extractContent = (container) => {
    const sections = [];
    container.querySelectorAll('[slot="tab"]').forEach((tabItem) => {
      const tabTitle = tabItem.querySelector('button').textContent.trim();

      const tabContentId = tabItem.getAttribute('contentid');
      const contentSlot = container.querySelector(`#${tabContentId}`);

      if (contentSlot) {
        const paragraphs = [];
        contentSlot.querySelectorAll('awt-article').forEach((article) => {
          const standfirst = article.getAttribute('standfirst').trim();
          const sectionContent = document.createElement('div');

          const header = document.createElement('h3');
          header.textContent = standfirst;
          sectionContent.appendChild(header);

          article.querySelectorAll('div[slot="paragraph"]').forEach((paragraph) => {
            const paragraphContent = document.createElement('div');
            paragraphContent.innerHTML = paragraph.innerHTML;
            sectionContent.appendChild(paragraphContent);
          });

          paragraphs.push(sectionContent);
        });

        sections.push([tabTitle, paragraphs]);
      }
    });

    return sections;
  };

  // Extract content dynamically from the element
  const content = extractContent(element);

  // Create the table header dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];

  // Create the table cells dynamically
  const cells = [headerRow];
  content.forEach(([title, paragraphs]) => {
    cells.push([title, paragraphs]);
  });

  // Create the block table using DOMUtils
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}