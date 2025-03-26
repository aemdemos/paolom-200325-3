export default function parse(element, {document}) {
  const rows = [];

  // Add header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Retrieve all image cards
  const imageCards = element.querySelectorAll('awt-image-card');

  imageCards.forEach((card) => {
    const image = card.querySelector('img');
    const textBlock = card.querySelector('awt-text-description-card');

    // Extract title
    const titleSpan = textBlock.querySelector('span[slot="cardTitle"]');
    const title = document.createElement('h4');
    title.textContent = titleSpan ? titleSpan.textContent.trim() : '';

    // Extract description
    const descriptionDiv = textBlock.querySelector('div[slot="cardDescription"]');
    const description = document.createElement('p');
    description.innerHTML = descriptionDiv ? descriptionDiv.innerHTML.trim() : '';

    // Extract call-to-action
    const ctaButton = textBlock.querySelector('awt-btn');
    const ctaLink = document.createElement('a');
    if (ctaButton) {
      ctaLink.href = ctaButton.getAttribute('href');
      ctaLink.textContent = ctaButton.textContent.trim();
    }

    // Add row for this card
    rows.push([
      image,
      [title, description, ctaLink],
    ]);
  });

  // Create the table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}