let types = ['heart', 'atom', 'grass', 'paw'];
let wrapper = document.getElementById('wrapper');

function interactiveTable(w, h, types, wrapper, itemClassPrefix = 'item', itemSize = '35px') {
  wrapper.style.width = `calc(${itemSize} * ${w})`;
  wrapper.style.gridTemplateColumns = `repeat(${w}, ${itemSize})`;
  wrapper.innerHTML = [...Array(w * h)].reduce((result, i) => {
    let type = types[Math.round(Math.random() * (types.length - 1))];
    return result + `<div class="item item-${type}" data-type="${type}"></div>`;
  }, '');

  let clearActive = () => [].forEach.call(wrapper.childNodes, (el) => el.classList.remove('active'));

  let makeActiveByType = (type, index) => {
    let currentCell = wrapper.childNodes[index];
    if (currentCell.dataset.type !== type || currentCell.classList.contains('active')) return;

    currentCell.classList.add('active');

    if ((index + 1 + 1) % w !== 1 && (index + 1 < (w * h))) makeActiveByType(type, index + 1); 
    if ((index + 1 - 1) % w && (index - 1 >= 0)) makeActiveByType(type, index - 1); 
    if ((index - w) >= 0) makeActiveByType(type, index - w); 
    if ((index + w) < (w * h)) makeActiveByType(type, index + w); 
  };

  wrapper.addEventListener('mouseover', (e) => {
    clearActive();

    let cellIndex = Array.prototype.indexOf.call(wrapper.childNodes, e.target);
    makeActiveByType(e.target.dataset.type, cellIndex);
  });
  wrapper.addEventListener('mouseout', clearActive);
}

interactiveTable(8, 8, types, wrapper);
