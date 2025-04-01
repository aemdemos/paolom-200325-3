import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  // Add accordion functionality to footer links
  document.querySelectorAll('footer .footer > div > .links > div > ul > li').forEach((li) => {
    const subMenu = li.querySelector('ul');
    if (subMenu) {
      // Make the main item clickable
      li.style.cursor = 'pointer';
      
      // Add click handler
      li.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Toggle visibility of list items instead of the ul
        const listItems = subMenu.querySelectorAll('li');
        const isHidden = listItems[0].style.display === 'none';
        listItems.forEach(item => {
          item.style.display = isHidden ? 'block' : 'none';
        });
      });

      // Prevent clicks on submenu items from toggling the menu
      subMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });
}
