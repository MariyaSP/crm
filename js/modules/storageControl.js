
const getStorage = (key) => {
  let goods = [];
  if (localStorage.getItem(key) !== null) {
    goods = JSON.parse(localStorage[key]);

  }
  else {
    goods = [];
  }
  return  goods;
};

const setStorage = (key, item) => {
  let goodsList = getStorage(key);
  goodsList.push(item);
  localStorage[key] = JSON.stringify(goodsList);
};

const removeStorage = (phone) => {
  let goodsList = getStorage('goods');
  // goodsList.forEach((goodsItem, i) => {
  //   if(goodsItem.)
  // })
};

export default {
  getStorage,
  setStorage,
  removeStorage,
};
