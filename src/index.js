const types = ['heart', 'atom', 'grass', 'paw'];
const wrapper = document.getElementById('wrapper');

function interactiveTable ({
  width,
  height,
  types,
  wrapper, 
  itemClassPrefix = 'item',
  itemSize ='35px',
}) {
  wrapper.style.width = `calc(${itemSize} * ${width})`;
  wrapper.style.gridTemplateColumns = `repeat(${width}, ${itemSize})`;
  wrapper.innerHTML = [...Array(width * height)].reduce((result, i) => {
    const type = types[Math.round(Math.random() * (types.length - 1))];
    return result + `<div class="item item-${type}" data-type="${type}"></div>`;
  }, '');

  const clearActive = () => [].forEach.call(wrapper.childNodes, (el) => el.classList.remove('active'));

  const makeActiveByType = (type, index) => {
    const currentCell = wrapper.childNodes[index];
    if (currentCell.dataset.type !== type || currentCell.classList.contains('active')) return;

    currentCell.classList.add('active');

    if ((index + 1 + 1) % width !== 1 && (index + 1 < (width * height))) makeActiveByType(type, index + 1); 
    if ((index + 1 - 1) % width && (index - 1 >= 0)) makeActiveByType(type, index - 1); 
    if ((index - width) >= 0) makeActiveByType(type, index - width); 
    if ((index + width) < (width * height)) makeActiveByType(type, index + width); 
  };

  wrapper.addEventListener('mouseover', (e) => {
    clearActive();

    const cellIndex = Array.prototype.indexOf.call(wrapper.childNodes, e.target);
    makeActiveByType(e.target.dataset.type, cellIndex);
  });
  wrapper.addEventListener('mouseout', clearActive);
}

interactiveTable({
  width: 8, 
  height: 8, 
  types, 
  wrapper,
});
