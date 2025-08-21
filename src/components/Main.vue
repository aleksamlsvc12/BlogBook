<template>
  <div class="h-full bg-gray-200 flex justify-center items-center">
    <div
      class="w-[80%] sm:w-[25%] h-[80%] bg-white shadow-xl rounded-2xl flex flex-col justify-between p-10"
    >
      <p class="text-3xl font-bold text-center">Sing Up</p>

      <form action="" class="flex flex-col h-[80%] justify-between">
        <div class="flex flex-col gap-5">
          <div>
            <label for="username">Username:</label>
            <input type="text" />
          </div>

          <div>
            <label for="email">Email:</label>
            <input type="text" />
          </div>

          <div>
            <label for="password">Password:</label>
            <input type="password" />
            <p class="text-sm mt-2 underline cursor-pointer">Already have an account?</p>
          </div>
          
          
        </div>

        <button class="bg-blue-600 text-white font-bold p-4 rounded-full cursor-pointer">
          Sing Up
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
</style>
