import variables from './modules/variables.js';
import storageControl from "./modules/storageControl.js";
import goodsControl from "./modules/goodsControl.js";
import modalControl from "./modules/modalControl.js";

const {  getStorage, setStorage, removeStorage} = storageControl;
const { renderGoods, removeGood, renderId, imgView } = goodsControl;
const {
  goodsId,
  modalCheckbox,
  modalDiscount,
  total,
  modal,
  goodsTable,
  btnAdd,
  form,
} = variables;

const { totalPriceModal, formControl } = modalControl;



const init = () => {
  let goods = getStorage('goods');

  modal.classList.toggle('active');

  modalCheckbox.addEventListener('click', () =>{
    if(modalCheckbox.checked === true){
      modalDiscount.disabled = false;
    }
    else {
      modalDiscount.disabled = true;
      modalDiscount.value = '';
    }});
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
      removeGood(target.closest('.good__item').dataset.goodId, goods);
      target.closest('.good__item').remove();
    }
    if(target.closest('.table__btn_pic')){
      const url = target.closest('.good__item').getAttribute('data-pic');
    imgView(url, 600);

    }
  });

  renderGoods(goods);
}
init();
