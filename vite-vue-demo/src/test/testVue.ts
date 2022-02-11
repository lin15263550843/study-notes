// import { reactive, effect } from '@vue/reactivity';
import { reactive, effect } from 'vue';

function testReactiveOrEffect() {
    let a1 = reactive({ value: 1 });
    let a2 = reactive({ value: 2 });
    let b1, b2;

    effect(() => {
        b1 = a1.value + 10;
        b2 = a2.value + 10;
        console.log('bn', b1, b2);
    });

    a1.value = 11;
    a2.value = 22;
    a2.value = 222;
}
testReactiveOrEffect();
