<template>
    <section class="spending">
        <div class="container">
            <div class="spending-content">
                <span class="spending-subtitle">Контролируйте свои расходы</span>

                <SpendingHead />

                <SpendingResult />

                <SpendingAdd />

                <div v-if="store.state.spendingListSec.length" class="spending-wrapper">
                    <template v-for="(item, i) in store.state.spendingListSec" :key="item.id">
                        <SpendingBlock v-if="i < visibleItems" :item="item" />
                    </template>
                </div>
                <div v-else class="spending-wrapper second">
                    (-_-)
                </div> 
                <SpendingDelete />

                <button class="show-more" v-if="store.state.spendingListSec.length >= visibleItems" @click="visibleItems += 3">ЕШЕ!</button>

            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import SpendingHead from "../components/spending/SpendingHead.vue";
import SpendingResult from "../components/spending/spendingresult.vue";
import SpendingBlock from '../components/spending/SpendingBlock.vue';
import SpendingAdd from '../components/spending/SpendingAdd.vue';
import SpendingDelete from '../components/spending/SpendingDelete.vue';

const store = useStore();

const visibleItems = ref(50);



onMounted(() => {
    store.dispatch("getData")
})

</script>

<style lang="scss">
.spending {

    &-subtitle {
        font-size: 20px;
        font-weight: 500;
    }

    &-mini-wrapper {
        display: flex; 
    }

    &-delete {
        cursor: pointer;
        margin-right: 35px;
    }

    &-btn {
        display: block;
        padding: 15px 30px;
        background: orange;
        border-radius: 10px;
        font-size: 18px;
        color: #fff;
        margin-top: 30px;

        &.another {
            padding: 10px 15px;
        }
    }

    &-input {
        border: 1px solid #fff;
        padding: 10px 5px;
        border-radius: 5px;
        background: #1c1c1c;
        color: #fff;

        &:focus {
            color: orange;
        }
    }

    &-wrapper {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 30px 0;

        &.second {
            color: #dadce0;
            font-size: 200px;
            margin: 30px auto 100px;
            display: flex;
            align-items: center;
        }
    }

    &-block {
        display: flex;
        align-items: center;
        gap: 35px;
        padding: 30px 20px;
        border: 2px solid #fff;
        border-radius: 15px;
        transition: .3s;

        &.editing { 
            display: block; 
        }
    }

    &-list {
        display: flex;
        align-items: center;
        gap: 30px;
        margin: 30px 0;
    }

    &-item {
        padding: 15px 25px;
        border: 2px solid #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: max-content;
        font-size: 16px;
        cursor: pointer;

        &.active {
            border: 2px solid #fff;
            background: orange;
        }
    }

    &-result {
        font-size: 20px;
    }

    &-result-item {
        color: orange;
    }

    &-name {
        font-size: 22px;
        min-width: 300px;

        span {
            font-size: 16px;
        }
    }

    &-money {
        min-width: 200px;
        color: orange;
    }

    &-edit-wrapper {
        cursor: pointer;
        margin-left: auto;
    }

    @media screen and (max-width:925px) {
        &-name {
            min-width: 270px ;
        }

        &-money {
            min-width: 77px ;
        }
    }

    @media screen and (max-width:780px) {
        &-name {
            display: flex;
            flex-direction: column;
            min-width: 185px ;
        }

        &-mini-wrapper {
            flex-direction: column;
            gap: 5px;
        }
    }

    @media screen and (max-width:500px) {
        &-block {
            flex-direction: column;
            text-align: center;
        }

        &-edit-wrapper {
            margin-left: 0 ;
        }

        &-delete {
            margin-right: 0 ;
        }
    }

}
.show-more {
    border: 2px solid #fff;
    background: orange;
    padding: 15px 35px;
    color: #fff;
    border-radius: 10px;
    margin: 30px auto 0;
    display: flex;
    align-items: center;
}
</style>