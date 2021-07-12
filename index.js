const user = {
  name: 'Kim',
  active: true,
  cart: [],
  purchases: [],
};

const compose =
  (f, g) =>
  (...args) =>
    f(g(...args));

console.log(
  purchaseItem(
    emptyCard,
    buyItem,
    applyTaxToItem,
    addItemToCard
  )(user, { name: 'laptop', price: 500 })
);

function purchaseItem(...fns) {
  return fns.reduce(compose);
}

function addItemToCard(user, item) {
  const updateCard = user.cart.concat(item);
  return Object.assign({}, user, { cart: updateCard });
}

function applyTaxToItem(user) {
  const { cart } = user;
  const taxRate = 1.3;
  const updateCard = cart.map((item) => {
    return {
      name: item.name,
      price: item.price * taxRate,
    };
  });
  return Object.assign({}, user, { cart: updateCard });
}
function buyItem(user) {
  return Object.assign({}, user, { purchases: user.cart });
}
function emptyCard(user) {
  return Object.assign({}, user, { cart: [] });
}
