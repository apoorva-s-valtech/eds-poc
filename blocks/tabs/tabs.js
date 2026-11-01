export default function decorate(block) {
  const blockId = [...document.querySelectorAll('.tabs')].indexOf(block);

  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  const tabs = [];
  const panels = [];

  const select = (index) => {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', selected);
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
  };

  [...block.children].forEach((row, i) => {
    const [label, panel] = row.children;

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'tabs-tab';
    tab.id = `tab-${blockId}-${i}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `panel-${blockId}-${i}`);
    tab.textContent = label.textContent.trim();
    tab.addEventListener('click', () => select(i));

    panel.className = 'tabs-panel';
    panel.id = `panel-${blockId}-${i}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);

    tabs.push(tab);
    panels.push(panel);
  });

  tablist.append(...tabs);
  block.replaceChildren(tablist, ...panels);
  select(0);
}
