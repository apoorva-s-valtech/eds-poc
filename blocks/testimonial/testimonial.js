export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [photoCell, textCell] = row.children;
    const [quote, author] = textCell.querySelectorAll('p');

    const blockquote = document.createElement('blockquote');
    if (quote) blockquote.append(quote);

    const cite = document.createElement('cite');
    if (author) cite.append(...author.childNodes);

    row.className = 'testimonial-item';
    photoCell.className = 'testimonial-photo';
    textCell.className = 'testimonial-text';
    textCell.replaceChildren(blockquote, cite);
  });
}
