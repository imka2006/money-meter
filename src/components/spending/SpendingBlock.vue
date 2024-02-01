<template>
    <div :class="isEdit ? 'spending-block' : 'spending-block editing'">
        <h4 v-if="isEdit" class="spending-name">{{ item.name[0].toUpperCase() + item.name.substring(1) }}
            <template v-if="item.subname && isEdit">
                <span>({{ item.subname[0].toUpperCase() + item.subname.substring(1) }})</span></template>
        </h4>
        <template v-else>
            <input type="text" placeholder="Название" class="spending-input" v-model="inputName">
            <input type="text" placeholder="Описание" class="spending-input" v-model="inputSubname">
        </template>
        <div class="spending-mini-wrapper">
            <div v-if="isEdit" class="spending-money">{{ item.money }} СОМ</div>
            <input v-else type="number" placeholder="деньги(СОМ)" class="spending-input" v-model="inputMoney">
            <div v-if="isEdit" class="spending-date">{{ item.date }}</div>
            <input v-else type="text" placeholder="Дата" class="spending-input" v-model="inputDate">
        </div>
        <div class="spending-edit-wrapper" @click="isEdit = !isEdit">
            <Edit v-if="isEdit" class="spending-edit" />
            <button @click="getEditItems(item)" v-else class="spending-btn another" style="margin: 0;">Готово</button>
        </div>

        <img v-if="isEdit" @click="giveItem(item)" class="spending-delete" data-v-2495b3ee=""
            srcset="https://img.icons8.com/?size=30&amp;id=67884&amp;format=png 1x, https://img.icons8.com/?size=60&amp;id=67884&amp;format=png 2x"
            width="30" height="30" alt="Delete icon"
            style="filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(246deg) brightness(105%) contrast(101%);">
        <button v-else @click="isEdit = !isEdit;" class="spending-btn another" style="margin: 0;">Отмена</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import Edit from "../../assets/icons/spending/Edit.vue";

const { item } = defineProps(['item'])

const store = useStore()

const isEdit = ref(true);
const itemId = ref(item.id);
const inputName = ref(item.name);
const inputSubname = ref(item.subname);
const inputMoney = ref(item.money);
const inputDate = ref(item.date);

const giveItem = (item) => {
    store.commit("setGiveItem", item)
    spendingClick()
}

const getEditItems = () => {
    const idItem = item.id
    let newData = {
        id: itemId.value,
        name: inputName.value,
        subname: inputSubname.value,
        money: inputMoney.value,
        date: inputDate.value,
    }

    store.dispatch("updeteItem", { idItem, newData })
}


</script>

<style lang="scss">
.spending { 

   


}
</style>