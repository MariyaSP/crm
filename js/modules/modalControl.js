import variables from './variables.js';
import storageControl from "./storageControl.js";
import goodsControl from "./goodsControl.js";

const {  getStorage, setStorage, removeStorage} = storageControl;
const { renderGoods, removeGood, renderId } = goodsControl;
const {
  goodsId,
  total,
  form,
} = variables;



const totalPriceModal = () =>{

  total.textContent = '$ ' + form.count.value * form.price.value;
  return total.textContent;
};
const formControl = (form, id) => {
  form.count.addEventListener('blur', totalPriceModal);
  form.price.addEventListener('blur', totalPriceModal);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGood = Object.fromEntries(formData);

    newGood.id = goodsId.textContent;
    console.log(newGood);
    // addGoodData(newGood);
    setStorage('goods', newGood);
    let goods = getStorage('goods');
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

export default {
  totalPriceModal,
  formControl,
}
