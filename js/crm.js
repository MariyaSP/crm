'use strict';
let goods= [
  {
    "id": 253842678,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "price": 27000,
    "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    "category": "mobile-phone",
    "discont": false,
    "count": 3,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 296378448,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {
      "small": "img/cheetancar-m.jpg",
      "big": "img/cheetancar-b.jpg"
    }
  },
  {
    "id": 215796548,
    "title": "ТВ приставка MECOOL KI",
    "price": 12400,
    "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    "category": "tv-box",
    "discont": 15,
    "count": 4,
    "units": "шт",
    "images": {
      "small": "img/tvboxmecool-m.jpg",
      "big": "img/tvboxmecool-b.jpg"
    }
  },
  {
    "id": 246258248,
    "title": "Витая пара PROConnect 01-0043-3-25",
    "price": 22,
    "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
    "category": "cables",
    "discont": false,
    "count": 420,
    "units": "v",
    "images": {
      "small": "img/lan_proconnect43-3-25.jpg",
      "big": "img/lan_proconnect43-3-25-b.jpg"
    }
  }
];

let trGoods = [];

const modalTitle = document.querySelector('.modal__title');
const buttonId = document.querySelector('.vendor-code__btn');
const goodsId = document.querySelector('.vendor-code__id');
const modalClose = document.querySelector('.modal__close');
const modalOverlay = document.querySelector('.overlay__modal');
const modalCheckbox = document.querySelector('.modal__checkbox');
const modalDiscount = document.querySelector('.modal__input_discount');
const total = document.querySelector('.modal__total-price');
const modal = document.querySelector('.overlay');
const goodsTable = document.querySelector('.table__body');
const btnAdd = document.querySelector('.panel__add-goods');
const form = document.querySelector('.modal__form');
const crmTotalPrice = document.querySelector('.crm__total-price');
modal.classList.toggle('active');
modalCheckbox.addEventListener('click', () =>{
  if(modalCheckbox.checked === true){
    modalDiscount.disabled = false;
  }
  else {
    modalDiscount.disabled = true;
    modalDiscount.value = '';
  }

});
const renderId = () =>{
  const id = Math.floor(Math.random() * 100000000);
  goodsId.textContent = id;
  return id;
};

const addGoodData = good => {
  goods.push(good);
  console.log(good);
};
const createRow = (good) =>{
  const trGood = document.createElement('tr');
  trGood.classList.add('good__item');
  trGood.dataset.goodId = good.id;
  trGood.innerHTML = `
  <td class="table__cell ">${good.id}</td>
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
  console.log(trGood);
  return trGood;
}

const renderGoods = (goods) =>{
  let totalCrm = 0;
  goodsTable.innerHTML = "";
  goods.forEach(itemGoods => {
    totalCrm += itemGoods.count * itemGoods.price;
    goodsTable.append(createRow(itemGoods));
  });
  crmTotalPrice.textContent = '$ ' + totalCrm;
}
const removeGood = (id) => {
  goods.forEach((good,i) => {
    if(good.id === parseInt(id)){
      goods.splice(i, 1);
  }
  });

}
btnAdd.addEventListener('click', () => {
  modal.classList.toggle('active');
  modal.classList.toggle('modal__display');
  totalPriceModal();
  formControl(form, renderId());
});

// modalClose.addEventListener('click', () => {
//   modal.classList.remove('active');
//   modal.classList.remove('modal__display');
// });
// блокировка всплытия событий
// modalOverlay .addEventListener('click', e => {
//   e.stopPropagation();
// })

const formControl = (form, id) => {
form.count.addEventListener('blur', totalPriceModal);
form.price.addEventListener('blur', totalPriceModal);
form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newGood = Object.fromEntries(formData);
  newGood.id = goodsId.textContent;
  addGoodData(newGood);
  renderGoods(goods);
  form.reset();
  totalPriceModal();
  renderId();


});
  // const formControl = (form, list, closeModal) => {
  //   form.addEventListener('submit', e => {
  //     e.preventDefault();
  //     const formData = new FormData(e.target);
  //     const newContact = Object.fromEntries(formData);
  //     addContactPage(newContact, list);
  //     addContactData(newContact);
  //     form.reset(); // очистка формы после отправки
  //     closeModal();
};
modal.addEventListener('click', (e) => {
  const target = e.target;
  if(target === modal || target.closest('.modal__close')) {
    modal.classList.toggle('active');
    modal.classList.toggle('modal__display');
  }
});
goodsTable.addEventListener('click', (e) => {
  const target = e.target;
  if(target.closest('.table__btn_del')){
    removeGood(target.closest('.good__item').dataset.goodId);
    target.closest('.good__item').remove();
  }
});
const totalPriceModal = () =>{

 total.textContent = '$ ' + form.count.value * form.price.value;
return total.textContent;
};
renderGoods(goods);

