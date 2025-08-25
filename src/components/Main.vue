<script setup>
import { ref, onMounted, watch } from "vue";
import Auth from "./Auth.vue";
import Content from "./Content.vue";

let isLoggedIn = ref(false);
let username = ref("");

onMounted(() => {
  const storedLogin = localStorage.getItem("isLoggedIn");
  const storedUsername = localStorage.getItem("username");

  if (storedLogin === "true" && storedUsername) {
    isLoggedIn.value = true;
    username.value = storedUsername;
  }
});

watch(isLoggedIn, (newVal) => {
  localStorage.setItem("isLoggedIn", newVal);
});

watch(username, (newVal) => {
  localStorage.setItem("username", newVal);
});

const handleLoginSuccess = (user) => {
  isLoggedIn.value = true;
  username.value = user;
};

const handleLogout = () => {
  isLoggedIn.value = false;
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
};
</script>

<template>
  <div class="h-full bg-gray-200 flex justify-center items-center">
    <Auth v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <Content v-else :username="username" @logout="handleLogout" />
  </div>
</template>

<style>
input {
  border: 1px solid gray;
  padding: 10px 15px;
  border-radius: 10px;
  display: block;
  width: 100%;
  margin-top: 6px;
}
.bigger-padding-right {
  padding-right: 35px;
}
</style>
