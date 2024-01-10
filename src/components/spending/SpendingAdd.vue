<template>
    <button @click="addClick()" class="spending-btn">Добавить</button>

    <div v-show="isActive" class="spending-form-wrapper">

        <div @click="addClick" class="spending-back">Отмена</div>
        <form @submit.prevent="addSpending()" class="spending-form">
            <label class="spending-label">
                <div class="spending-text">Название (<span class="spending-required">Обязательно</span>)</div>
                <input type="text" placeholder="Название" required v-model="name">
            </label>
            <label class="spending-label">
                <div class="spending-text">Описание (<span class="spending-unrequired">Не обязательно</span>)</div>
                <p class="spending-form-description">Автобус, Такси, Маршрутка</p>
                <input type="text" placeholder="Описание" v-model="description">
            </label>
            <label class="spending-label">
                <div class="spending-text">Потрачено (<span class="spending-required">Обязательно</span>)</div>
                <input type="number" placeholder="₽$€" v-model="money" required>
            </label>
            <label class="spending-label">
                <div class="spending-text">Дата (<span class="spending-required">Обязательно</span>)</div>
                <p class="spending-form-description">Обязательно в таком формате: 31.12.2006</p>
                <input type="text" v-model="store.state.today" required>
            </label>

            <button class="spending-form-btn">Добавить</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore()

const isActive = ref(false)

const body = document.querySelector("body"); 
const description = ref("")
const name = ref("") 
const money = ref('')



const addSpending = async () => {
  try {
    const newData = { 
        name:name.value,
        money:money.value,
        date:store.state.today,
        subname:description.value
    };
    console.log(newData);
    const result = await store.dispatch('setAddSpending', newData);
    console.log('Данные успешно добавлены в MockAPI:', result);
  } catch (error) {
    console.error('Ошибка при добавлении данных в MockAPI:', error);
  } 
  addClick()
};

const delayedFunction = () => {
    body.style.overflow = 'unset';
};

const addClick = () => {
    isActive.value = !isActive.value
    if (isActive.value) {
        body.style.overflow = 'hidden';
    } else {
        setTimeout(delayedFunction, 300);
    }
} 

</script>

<style lang="scss">
.spending {
    &-form-wrapper {
        width: 100%;
        height: 100%;
        background: #eae4e4;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 3;
        color: #1c1c1c;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &-label {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 30px;

        input {
            padding: 10px 15px;
            border-radius: 10px;
            border: 2px solid #1c1c1c;
            box-sizing: border-box;
        }
    }

    &-text {
        font-size: 18px;
    }

    &-unrequired {
        color: rgb(87, 250, 87);
        font-size: 14px;
    }
    &-required {
        color: red;
        font-size: 14px;
    }

    &-form-description {
        font-size: 14px;
        color: orange;
    }

    &-form-btn { 
        display: block;
        padding: 15px 30px;
        background: orange;
        border-radius: 10px;
        font-size: 18px;
        color: #fff;
        margin: 30px auto 0; 
    }

    &-back { 
        position: absolute;
        padding: 15px 30px;
        background: orange;
        border-radius: 10px;
        font-size: 18px;
        color: #fff; 
        left: 50px;
        top: 30px;
        cursor: pointer;
    }

}
</style>