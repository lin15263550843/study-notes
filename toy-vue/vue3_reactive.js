const productOrigin = { price: 100, quantity: 5 };
const reactive = (obj) => {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log("get");
      track();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log("set");
      Reflect.set(target, key, value, receiver);
      trigger(); // 要先 set 完之后再 trigger
    },
  });
};
const product = reactive(productOrigin);
let total = 0;

const effect = () => {
  total = product.price * product.quantity;
};
let activeEffect = null;
const track = () => {
  console.log("track");
  activeEffect = effect;
};
const trigger = () => {
  console.log("trigger");
  if (activeEffect) {
    activeEffect();
  }
};

effect(); // 必须先触发 track 绑定 activeEffect
console.log("toagl is " + total);
product.price = 200;
console.log("toagl is " + total);
