<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>name: {{ name }} - {{ nameLowerCase }} - {{ nameUpperCase }}</p>
    <p>age: {{ age }}</p>
    <button @click="changeName">改变名字</button>
    <button @click="changeAge">改变年龄</button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUser } from "../store/storeA";
const store = useUser();

let { name, age, nameLowerCase, nameUpperCase } = storeToRefs(store);

const changeName = () => {
  name.value += "1";
};

const changeAge = () => {
  store.updateNum(10);
};
</script>
