<template>
    <ul class="spending-list">
        <li @click="getItem(item), isActive = i" v-for="(item, i) in store.state.tabsList" :key="i"
            :class="isActive == i ? 'spending-item active' : 'spending-item'">{{ item }}</li>
    </ul>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useStore } from "vuex"

const store = useStore()

const isActive = ref(0)

const getItem = (item) => {  
    store.commit("sortTime", item.length ? item : "За все время" ) 
}

onMounted(() => {
    store.commit("sortTime", "За все время" )
})
</script>

<style></style>