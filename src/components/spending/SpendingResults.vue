<template>
  <div class="spending-result">В итоги потрачено: <span class="spending-result-item"> {{ totalQuality() }} СОМ</span></div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const totalQuality = () => {
    return store.state.spendingListSec.reduce((sun, moon) => sun + moon.money, 0);
}
</script>