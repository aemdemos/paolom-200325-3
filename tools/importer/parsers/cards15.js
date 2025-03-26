export default function parse(element, {document}) {
  // Extract all cards within the awt-container
  const cards = element.querySelectorAll('awt-image-card');

  // Initialize an array for table cells
  const cells = [];

  // Add the header row to denote the block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];
  cells.push(headerRow);

  cards.forEach((card) => {
    // Extract image
    const img = card.querySelector('img');
    const imageElement = document.createElement('img');
    imageElement.src = img ? img.src : '';
    imageElement.alt = img ? img.alt : '';

    // Extract title
    const title = card.querySelector('span[slot="cardTitle"]');
    const titleElement = document.createElement('strong');
    titleElement.textContent = title ? title.textContent : '';

    // Extract description
    const description = card.querySelector('div[slot="cardDescription"]');
    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = description ? description.innerHTML : '';

    // Extract CTA button
    const ctaButton = card.querySelector('awt-btn');
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaButton ? ctaButton.getAttribute('href') : '#'; // Ensure href is extracted properly
    ctaLink.textContent = ctaButton ? ctaButton.textContent.trim() : '';

    // Combine title, description, and CTA into a single cell
    const textContentCell = [];
    if (titleElement.textContent) textContentCell.push(titleElement);
    if (descriptionElement.innerHTML) textContentCell.push(descriptionElement);
    if (ctaLink.textContent) textContentCell.push(ctaLink);

    // Add a row for the card
    cells.push([imageElement, textContentCell]);
  });

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}