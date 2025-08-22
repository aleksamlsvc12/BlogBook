<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

let showDiv = ref(localStorage.getItem("showDiv") === "true" ? true : false);
let showPassword = ref(false);

let loginUsername = ref("");
let loginPassword = ref("");

let signupUsername = ref("");
let signupEmail = ref("");
let signupPassword = ref("");

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

//DELETES PREVIOUS DATA IN INPUT FIELDS
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
    const res = await axios.post("http://localhost:3000/signup", {
      username: signupUsername.value,
      email: signupEmail.value,
      password: signupPassword.value,
    });
    console.log(res.data);
    alert("Signup Succesfull!");

    signupUsername.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
    showDiv.value = false;
  } catch (err) {
    if (err.response) {
      console.error(err.response.data);
      alert(err.response.data.error);
    } else {
      console.error(err.message);
      alert("Connection error!");
    }
  }
};

const handleLogIn = async () => {
  try {
    const res = await axios.post("http://localhost:3000/login", {
      username: loginUsername.value,
      password: loginPassword.value,
    });
    console.log(res.data);
    alert("Login Succesfull!");

    isLoggedIn.value = true;

    username.value = loginUsername.value;
    loginUsername.value = "";
    loginPassword.value = "";
  } catch (err) {
    if (err.response) {
      console.error(err.response.data);
      alert(err.response.data.error);
    } else {
      console.error(err.message);
      alert("Connection error!");
    }
  }
};

const handleLogOut = () => {
  isLoggedIn.value = false;
  localStorage.removeItem("isLoggedIn");
};
</script>

<template>
  <div class="h-full bg-gray-200 flex justify-center items-center">
    <!-- SIGN UP DIV -->
    <div
      class="w-[80%] sm:w-[25%] h-[80%] bg-white shadow-xl rounded-2xl flex flex-col justify-between p-10"
      v-if="showDiv"
    >
      <p class="text-3xl font-bold text-center">Sing Up</p>

      <form
        @submit.prevent="handleSignUp"
        class="flex flex-col h-[80%] justify-between"
      >
        <div class="flex flex-col gap-5">
          <div>
            <label for="username">Username:</label>
            <input
              type="text"
              v-model="signupUsername"
              pattern="[A-Za-z0-9]{8,}"
              title="Username must be at least 8 characters long and contain only letters and numbers!"
            />
          </div>

          <div>
            <label for="email ">Email:</label>
            <input
              type="email"
              v-model="signupEmail"
              title="Enter a valid email address"
            />
          </div>

          <div>
            <label for="password">Password:</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="bigger-padding-right"
                v-model="signupPassword"
                pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                title="Password must be at least 8 characters long, include letters, numbers, and at least one special character!"
              />
              <i
                class="pi absolute top-1/3 right-3 cursor-pointer"
                :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"
                @click="showPassword = !showPassword"
              ></i>
            </div>

            <p
              class="text-sm mt-2 underline cursor-pointer inline-block"
              @click="showDiv = false"
            >
              Already have an account?
            </p>
          </div>
        </div>

        <button
          type="submit"
          class="bg-blue-600 text-white font-bold p-4 rounded-full cursor-pointer"
        >
          Sing Up
        </button>
      </form>
    </div>

    <!-- LOG IN DIV -->
    <div
      class="w-[80%] sm:w-[25%] h-[80%] bg-white shadow-xl rounded-2xl flex flex-col justify-between p-10"
      v-else-if="!showDiv && !isLoggedIn"
    >
      <p class="text-3xl font-bold text-center">Log In</p>

      <form
        @submit.prevent="handleLogIn"
        action=""
        class="flex flex-col h-[80%] justify-between"
      >
        <div class="flex flex-col gap-5">
          <div>
            <label for="username">Username:</label>
            <input type="text" v-model="loginUsername" />
          </div>

          <div>
            <label for="password">Password:</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="bigger-padding-right"
                v-model="loginPassword"
              />
              <i
                class="pi absolute top-1/3 right-3 cursor-pointer"
                :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"
                @click="showPassword = !showPassword"
              ></i>
            </div>

            <p
              class="text-sm mt-2 underline cursor-pointer inline-block"
              @click="showDiv = true"
            >
              Don't have an account?
            </p>
          </div>
        </div>

        <button
          type="submit"
          class="bg-blue-600 text-white font-bold p-4 rounded-full cursor-pointer"
        >
          Log In
        </button>
      </form>
    </div>

    <!-- CONTENT DIV -->
    <div v-else class="w-[90%] sm:w-[95%] h-[90%] flex flex-col">
      <div class="flex items-center justify-between bg-white rounded-2xl p-4">
        <p class="text-3xl font-bold">Welcome {{ username }}</p>

        <button
          @click="handleLogOut"
          class="bg-blue-600 text-white font-bold cursor-pointer text-sm p-2 pl-6 pr-6 rounded-full"
        >
          Logout
        </button>
      </div>

      <div class="w-full bg-white rounded-2xl mt-8 h-full"></div>
    </div>
  </div>
</template>

<style>
input {
  border: 1px solid gray;
  padding: 10px 15px 10px 15px;
  border-radius: 10px;
  display: block;
  width: 100%;
  margin-top: 6px;
}

.bigger-padding-right {
  padding-right: 35px;
}
</style>
