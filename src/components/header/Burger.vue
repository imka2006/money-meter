<template>
    <div class="burger">
        <div @click="burgerClick()" :class="isActive ? 'burger-menu active' : 'burger-menu'">
            <span class="burger-line first"></span>
            <span class="burger-line second"></span>
            <span class="burger-line third"></span>
        </div>
        <div :class="isActive ? 'burger-wrapper active' : 'burger-wrapper'">
            <ul @click="isActive = !isActive" class="burger-list">
                <li class="burger-item"><router-link to="/spending">Траты</router-link></li>
                <li class="burger-item"><router-link to="/earned">Заработанные</router-link></li>
                <li class="burger-item"><router-link to="/rating">Участники</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const isActive = ref(false)

const body = document.querySelector("body");
const delayedFunction = () => {
    body.style.overflow = 'unset';
};

const burgerClick = () => {
    isActive.value = !isActive.value
    if (isActive.value) {
        body.style.overflow = 'hidden';
    } else {
        setTimeout(delayedFunction, 300);
    }
}

</script>

<style lang="scss">
.burger {
    max-width: 30px;
    display: none;

    &-menu {
        cursor: pointer;
        flex-direction: column;
        display: flex;
        align-items: end;
        gap: 5px;
        z-index: 2;
        position: relative;

        &.active {
            width: 30px;
            height: 25px;

            .burger-line.first {
                position: absolute;
                width: 30px;
                transform: rotate(45deg);
                top: 12px;
            }

            .burger-line.second {
                position: absolute;
                left: 50%;
                transform: translate(500px, -50%);
                transition: .2s;
                top: 12px;
                width: 0;
            }

            .burger-line.third {
                position: absolute;
                width: 30px;
                transform: rotate(-45deg);
                top: 12px;
            }
        }
    }

    &-line {
        height: 2px;
        background: orange;
        transition: .3s;
        border-radius: 2px;

        &.first {
            width: 27px;
        }

        &.second {
            width: 30px;
        }

        &.third {
            width: 22px;
        }
    }

    &-wrapper {
        height: 0;
        width: 100%;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        transition: .3s;
        background: #eae4e4;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        &.active {
            height: 100vh;
        }
    }

    &-list {
        display: flex;
        flex-direction: column;
        gap: 25px;
        align-items: center;
        padding: 0;
    }

    &-item {
        font-size: 22px;
        position: relative;
        width: min-content;
        transition: .3s;
        color: #1c1c1c;

        &::after {
            content: "";
            position: absolute;
            top: -3px;
            left: 0;
            width: 0%;
            height: 2px;
            background: orange;
            transition: .3s;
        }

        &::before {
            content: "";
            position: absolute;
            bottom: -3px;
            right: 0;
            width: 0%;
            height: 2px;
            background: orange;
            transition: .3s;
        }

        &:hover {
            color: orange;

            &::after,
            &::before {
                width: 100%;
            }
        }
    }

    @media screen and (max-width:655px) {
        display: block;
    }

}
</style>