export default function parse(element, {document}) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Extract the tabs and corresponding content sections
    const tabItems = Array.from(element.querySelectorAll('awt-tab-item button.awt-tab__btn'));
    const contentSections = Array.from(element.querySelectorAll('[slot="content"]'));

    // Header row: Defines the block type (Columns)
    const headerCell = document.createElement('strong');
    headerCell.textContent = "Columns";
    const headerRow = [headerCell];

    // Process each column (tab + content)
    const columns = tabItems.map((tabItem, index) => {
        const title = tabItem?.textContent?.trim() || "";
        const contentSection = contentSections[index];

        // Extract image
        const imageEl = contentSection?.querySelector('awt-image');
        const imageSrc = imageEl?.getAttribute('src');
        const image = document.createElement('img');
        if (imageSrc) {
            image.src = imageSrc;
        }

        // Extract description or paragraph text
        const cardTitleEl = contentSection?.querySelector('awt-ilustration-card[cardtitle]');
        const cardTitle = cardTitleEl?.getAttribute('cardtitle') || "";

        const paragraphEl = contentSection?.querySelector('awt-article-section div[slot="paragraph"]');
        const paragraph = paragraphEl?.textContent?.trim() || cardTitle;

        // Construct elements for the column
        const titleElement = document.createElement('h2');
        titleElement.textContent = title; // Fixed the issue with empty <h2>

        const paragraphElement = document.createElement('p');
        paragraphElement.innerHTML = paragraph;

        return [image, titleElement, paragraphElement];
    });

    // Assemble the table
    const rows = [
        headerRow, // Block type row
        columns
    ];

    const blockTable = createTable(rows, document);

    // Replace the original element with the structured block table
    element.replaceWith(blockTable);
}