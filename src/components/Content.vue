<script setup>
const props = defineProps({
  username: String,
});

const emit = defineEmits(["logout"]);

import { ref, onMounted } from "vue";
import axios from "axios";
import Blog from "./Blog.vue";

const blogs = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/blogs");
    blogs.value = res.data;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div class="w-[90%] sm:w-[95%] h-[90%] flex flex-col">
    <div class="flex items-center justify-between bg-white rounded-2xl p-4">
      <p class="text-3xl font-bold text-blue-600">
        <span class="text-black">Welcome</span> {{ username }}
      </p>
      <button
        @click="emit('logout')"
        class="bg-blue-600 text-white font-bold cursor-pointer text-sm p-2 pl-6 pr-6 rounded-full"
      >
        Logout
      </button>
    </div>
    <div class="w-full bg-white rounded-2xl mt-8 h-full p-4 overflow-y-auto">
      <Blog v-for="blog in blogs" :key="blog.id" :blog="blog" />
    </div>
  </div>
</template>
