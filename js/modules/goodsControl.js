import variables from './variables.js';

const { goodsTable, crmTotalPrice, goodsId } = variables;
const renderGoods = (goods) =>{
  let totalCrm = 0;
  goodsTable.innerHTML = "";
  goods.forEach(itemGoods => {
    totalCrm += itemGoods.count * itemGoods.price;
    goodsTable.append(createRow(itemGoods));

  });
  crmTotalPrice.textContent = '$ ' + totalCrm;
}
const removeGood = (id, goods) => {
  goods.forEach((good,i) => {
    if(good.id === parseInt(id)){
      goods.splice(i, 1);
    }
  });
}

const renderId = () =>{
  const id = Math.floor(Math.random() * 100000000);
  goodsId.textContent = id;
  return id;
};

const createRow = (good) =>{
  const trGood = document.createElement('tr');
  trGood.classList.add('good__item');
  trGood.dataset.goodId = good.id;
  trGood.setAttribute('data-pic',"../img/default.jpg" );
  trGood.innerHTML = `
  <td class="table__cell" >${good.id}</td>
                <td class="table__cell table__cell_left table__cell_name">${good.title}</td>
                <td class="table__cell table__cell_left">${good.category}</td>
                <td class="table__cell">${good.units}</td>
                <td class="table__cell">${good.count}</td>
                <td class="table__cell">$${good.price}</td>
                <td class="table__cell">$${good.price * good.count}</td>
                <td class="table__cell table__cell_btn-wrapper">
                  <button class="table__btn table__btn_pic"></button>
                  <button class="table__btn table__btn_edit"></button>
                  <button class="table__btn table__btn_del"></button>
                </td>`;
  return trGood;
}

const imgView = ( url, size ) => {
  open(url, '', `width = ${size}, height = ${size}, top = ${screen.height/2 - size/2}, left = ${screen.width/2 - size/2}`);
}
export default {
  renderGoods,
  removeGood,
  renderId,
  createRow,
  imgView
};
