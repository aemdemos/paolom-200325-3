export default function parse(element, {document}) {
    const createTable = (data) => {
        const table = document.createElement('table');

        let maxColumns = 0;
        data.forEach((row, index) => {
            const tr = document.createElement('tr');

            maxColumns = Math.max(maxColumns, row.length);
            row.forEach((cell) => {
                const t = document.createElement(index === 0 ? 'th' : 'td');
                if (typeof cell === 'string') {
                    t.innerHTML = cell;
                } else if (Array.isArray(cell)) {
                    t.append(...cell);
                } else {
                    t.append(cell);
                }
                tr.appendChild(t);
            });
            table.appendChild(tr);
        });

        return table;
    };

    // Extract relevant data from the input element
    const columns = [];

    const columnContainers = element.querySelectorAll('awt-container[container-size="282"]');
    columnContainers.forEach((columnContainer, index) => {
        const image = columnContainer.querySelector('awt-image');
        const paragraph = columnContainer.querySelector('awt-article-section div[slot="paragraph"]');

        const imgElement = document.createElement('img');
        imgElement.src = image ? image.getAttribute('src') : '';

        const heading = document.createElement('h2');
        heading.textContent = `Column ${index + 1}`;

        columns.push([imgElement, heading, paragraph]);
    });

    // Create table header dynamically
    const headerRow = document.createElement('strong');
    headerRow.textContent = 'Columns';

    // Create table data structure
    const cells = [
        [headerRow],
        ...columns.map((col) => col)
    ];

    // Create block
    const block = createTable(cells);

    // Replace the original element with the new block table
    element.replaceWith(block);
}