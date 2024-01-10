<template>
    <div v-show="store.state.deleteActive" class="spending-delete-wrapper">
        <ul class="spending-delete-block">
            <li class="spending-delete-item">вы уверены что хотите удалить:  <span class="spending-delete-orange">{{ store.state.deleteActive.name }}</span> <template v-if="store.state.deleteActive.subname">(<span class="spending-delete-orange">{{ store.state.deleteActive.subname }}</span>)</template> </li>
            <li class="spending-delete-item">на который потратили:  <span class="spending-delete-orange">{{ store.state.deleteActive.money }} СОМ</span></li>
            <li class="spending-delete-item">дата добовления:  <span class="spending-delete-orange">{{ store.state.deleteActive.date }} </span></li>
            <li class="spending-delete-item another">
                <button class="spending-delete-btn first" @click="unsetDeleteActive()" >отмена</button>
                <button class="spending-delete-btn second" @click="deleteItem(store.state.deleteActive.id); unsetDeleteActive()">удалить</button>
            </li>
        </ul>
    </div>
</template>

<script setup> 
import { useStore } from "vuex"

const store = useStore();

const deleteItem = (id) => {
    store.dispatch("setDeleteItem", id)
}

const unsetDeleteActive = () => {
 store.commit("setUnsetDeleteActive")
}

// const delayedFunction = () => {
//     body.style.overflow = 'unset';
// };

// const burgerClick = () => {
//     isActive.value = !isActive.value
//     if (isActive.value) {
//         body.style.overflow = 'hidden';
//     } else {
//         setTimeout(delayedFunction, 300);
//     }
// }
</script>

<style lang="scss">
.spending-delete {
    &-wrapper {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(101, 91, 91, 0.7);
        font-size: 18px;
    }

    &-block { 
        background: #1c1c1c;
        border: 2px solid #fff;
        padding: 50px 30px; 
        display: flex;
        flex-direction: column;
        gap: 15px;
        border-radius: 15px;
    }
    &-orange {
        color: orange;
    }

    &-item {
        display: flex;
        align-items: center;
        gap: 10px;

        &.another {
            gap: 20px;
            margin: 30px auto 0;
        }
    }

    &-btn {
        padding: 15px 30px;
        border-radius: 10px;
        border: 2px solid #fff;
        font-size: 18px;

        &.first {
            background: orange;
            color: #fff;
        }

        &.second {
            background: rgb(177, 2, 2);
            color: #fff;
        }
    }   
 
}
</style>