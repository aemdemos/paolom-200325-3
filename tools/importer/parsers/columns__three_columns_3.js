export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Validate the presence of the introContainer
  const introContainer = element.querySelector('awt-container awt-article');
  const introTextElement = document.createElement('p');
  if (introContainer) {
    introTextElement.innerHTML = introContainer.getAttribute('standfirst') || '';
  } else {
    introTextElement.textContent = 'Introduction not available';
  }

  // Extracting the cards dynamically and handling missing images or attributes
  const cards = Array.from(element.querySelectorAll('awt-ilustration-card'));
  const cardData = cards.map((card) => {
    const imageSrc = card.querySelector('img')?.src || '';
    const image = document.createElement('img');
    image.src = imageSrc;

    const title = document.createElement('h3');
    title.textContent = card.getAttribute('cardtitle') || 'Title not available';

    const description = document.createElement('p');
    description.innerHTML = card.getAttribute('carddescription') || 'Description not available';

    return [image, title, description];
  });

  // Prepare table rows and ensure header matches example structure exactly
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Create the table using extracted dynamic content
  const blockTable = createTable([
    headerRow,
    [introTextElement, ...cardData.map((card) => card)],
  ], document);

  // Replace the original element with the new table block
  element.replaceWith(blockTable);
}