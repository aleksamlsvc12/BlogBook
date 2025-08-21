<script setup>
import { ref } from "vue";
import axios from "axios";

let showDiv = ref(false);
let showPassword = ref(false);

let signupUsername = ref('');
let signupEmail = ref('');
let signupPassword = ref('');

const handleSignUp = async () => {
 try {
  const res = await axios.post('http://localhost:3000/signup', {
    username: signupUsername.value,
    email: signupEmail.value,
    password: signupPassword.value,
  });
  console.log(res.data);
} catch (err) {
  if (err.response) {
    // greška sa servera (status 4xx ili 5xx)
    console.error(err.response.data);
  } else {
    // mrežna greška ili server nedostupan
    console.error(err.message);
  }
}

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

      <form @submit.prevent="handleSignUp" class="flex flex-col h-[80%] justify-between">
        <div class="flex flex-col gap-5">
          <div>
            <label for="username">Username:</label>
            <input type="text" v-model="signupUsername"/>
          </div>

          <div>
            <label for="email ">Email:</label>
            <input type="text" v-model="signupEmail"/>
          </div>

          <div>
            <label for="password">Password:</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="bigger-padding-right"
                v-model="signupPassword"
                />
              <i
                class="pi absolute top-1/3 right-3 cursor-pointer"
                :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"
                @click="showPassword = !showPassword"
              ></i>
            </div>

            <p
              class="text-sm mt-2 underline cursor-pointer"
              @click="showDiv = false"
            >
              Already have an account?
            </p>
          </div>
        </div>

        <button type="submit"
          class="bg-blue-600 text-white font-bold p-4 rounded-full cursor-pointer"
        >
          Sing Up
        </button>
      </form>
    </div>

    <!-- LOG IN DIV -->
    <div
      class="w-[80%] sm:w-[25%] h-[80%] bg-white shadow-xl rounded-2xl flex flex-col justify-between p-10"
      v-else
    >
      <p class="text-3xl font-bold text-center">Log In</p>

      <form action="" class="flex flex-col h-[80%] justify-between">
        <div class="flex flex-col gap-5">
          <div>
            <label for="username">Username:</label>
            <input type="text" />
          </div>

          <div>
            <label for="password">Password:</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="bigger-padding-right"
              />
              <i
                class="pi absolute top-1/3 right-3 cursor-pointer"
                :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"
                @click="showPassword = !showPassword"
              ></i>
            </div>

            <p
              class="text-sm mt-2 underline cursor-pointer"
              @click="showDiv = true"
            >
              Don't have an account?
            </p>
          </div>
        </div>

        <button
          class="bg-blue-600 text-white font-bold p-4 rounded-full cursor-pointer"
        >
          Log In
        </button>
      </form>
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
