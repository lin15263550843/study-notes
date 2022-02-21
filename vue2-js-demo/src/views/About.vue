<template>
    <transition>
        <keep-alive>
            <div class="about">
                <h1>This is an about page</h1>
                <h2>输入框输入的值：{{ msg }}</h2>
                <input type="text" v-model="msg" />
                <h2>输入框输入的值：{{ obj.obj2.message }}</h2>
                <input type="text" v-model="obj.obj2.message" />
            </div>
        </keep-alive>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
            obj: {
                obj2: {
                    message: '',
                },
            },
        };
    },
    created() {
        // console.log('this', this);
    },
    mounted() {
        console.log('this', this);
    },
};
</script>
