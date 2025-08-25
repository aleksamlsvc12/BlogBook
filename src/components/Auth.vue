<script setup>
import { ref, watch } from "vue";
import axios from "axios";

let showDiv = ref(localStorage.getItem("showDiv") === "true");
let showPassword = ref(false);

let loginUsername = ref("");
let loginPassword = ref("");

let signupUsername = ref("");
let signupEmail = ref("");
let signupPassword = ref("");

const emit = defineEmits(["login-success"]);

watch(showDiv, (newVal) => {
  localStorage.setItem("showDiv", newVal);
  if (newVal) {
    loginUsername.value = "";
    loginPassword.value = "";
  } else {
    signupUsername.value = "";
    signupPassword.value = "";
    signupEmail.value = "";
  }
});

const handleSignUp = async () => {
  try {
    await axios.post("http://localhost:3000/signup", {
      username: signupUsername.value,
      email: signupEmail.value,
      password: signupPassword.value,
    });
    alert("Signup Successful!");
    signupUsername.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
    showDiv.value = false;
  } catch (err) {
    alert(err.response ? err.response.data.error : "Connection error!");
  }
};

const handleLogIn = async () => {
  try {
    await axios.post("http://localhost:3000/login", {
      username: loginUsername.value,
      password: loginPassword.value,
    });
    alert("Login Successful!");
    emit("login-success", loginUsername.value);
    loginUsername.value = "";
    loginPassword.value = "";
  } catch (err) {
    alert(err.response ? err.response.data.error : "Connection error!");
  }
};
</script>

<template>
  <!-- SIGN UP -->
  <div
    v-if="showDiv"
    class="w-[80%] sm:w-[25%] h-[80%] bg-white shadow-xl rounded-2xl flex flex-col justify-between p-10"
  >
    <p class="text-3xl font-bold text-center">Sign Up</p>
    <form @submit.prevent="handleSignUp" class="flex flex-col h-[80%] justify-between">
      <div class="flex flex-col gap-5">
        <div>
          <label>Username:</label>
          <input type="text" v-model="signupUsername"
                 pattern="[A-Za-z0-9]{8,}"
                 title="At least 8 chars, only letters/numbers" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="signupEmail" />
        </div>
        <div>
          <label>Password:</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'"
                   class="bigger-padding-right"
                   v-model="signupPassword"
                   pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}" />
            <i class="pi absolute top-1/3 right-3 cursor-pointer"
               :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"
               @click="showPassword = !showPassword"></i>
          </div>
          <p class="text-sm mt-2 underline cursor-pointer inline-block"
             @click="showDiv = false">
            Already have an account?
          </p>
        </div>
      </div>
      <button type="submit"
              class="bg-blue-600 text-white font-bold p-4 rounded-full cursor-pointer">
        Sign Up
      </button>
    </form>
  </div>

  <!-- LOG IN -->
  <div
    v-else
    class="w-[80%] sm:w-[25%] h-[80%] bg-white shadow-xl rounded-2xl flex flex-col justify-between p-10"
  >
    <p class="text-3xl font-bold text-center">Log In</p>
    <form @submit.prevent="handleLogIn" class="flex flex-col h-[80%] justify-between">
      <div class="flex flex-col gap-5">
        <div>
          <label>Username:</label>
          <input type="text" v-model="loginUsername" />
        </div>
        <div>
          <label>Password:</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'"
                   class="bigger-padding-right"
                   v-model="loginPassword" />
            <i class="pi absolute top-1/3 right-3 cursor-pointer"
               :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"
               @click="showPassword = !showPassword"></i>
          </div>
          <p class="text-sm mt-2 underline cursor-pointer inline-block"
             @click="showDiv = true">
            Don't have an account?
          </p>
        </div>
      </div>
      <button type="submit"
              class="bg-blue-600 text-white font-bold p-4 rounded-full cursor-pointer">
        Log In
      </button>
    </form>
  </div>
</template>
