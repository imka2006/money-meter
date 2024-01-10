<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script setup>
import Header from "./components/header/Header.vue";
import Footer from "./components/Footer.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore()

onMounted(() => {
  const today = new Date();
 
  const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
  
  store.commit("setToday", formattedDate)
})

</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: #1c1c1c;
  color: #fff; 
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

li {
  list-style: none;
}

input {
  border: none;
  outline: none;
}

button {
  border: none;
  outline: none;
  cursor: pointer;
}

.container {
  max-width: 1250px;
  padding: 0 15px;
  margin: 0 auto;
}

.title {
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-weight: 500;
}

input[type="number"] {
  -moz-appearance: textfield;  
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
 
input[type="number"] {
  -webkit-appearance: textfield;
}

</style>