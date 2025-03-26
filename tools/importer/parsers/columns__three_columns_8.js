export default function parse(element, {document}) {
  // Helper function to parse and transform data from a single card
  const parseCard = (card) => {
    const image = card.querySelector('img');
    const imageElement = document.createElement('img');
    imageElement.src = image.getAttribute('src');

    const titleHtml = card.getAttribute('cardtitle');
    const titleContainer = document.createElement('div');
    titleContainer.innerHTML = titleHtml;
    const title = document.createElement('h2');
    title.innerHTML = titleContainer.textContent;

    const descriptionHtml = card.getAttribute('carddescription');
    const descriptionContainer = document.createElement('div');
    descriptionContainer.innerHTML = descriptionHtml;
    const description = document.createElement('div');
    description.append(...descriptionContainer.childNodes);

    return [imageElement, title, description];
  };

  // Extract all awt-ilustration-card elements
  const cards = element.querySelectorAll('awt-ilustration-card');

  // Parse each card and create row cells
  const rows = Array.from(cards).map((card) => parseCard(card));

  // Add the header row to the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  rows.unshift(headerRow);

  // Replace original element with the generated table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}