<script setup>
const props = defineProps({
  blog: Object,
});
</script>

<template>
  <div
    class="w-full bg-blue-300 p-6 rounded-xl flex flex-col justify-between shadow-lg mb-10"
  >
    <div>
      <p class="font-bold text-2xl text-white">{{ blog.blog_title }}</p>
      <p class="mt-1 mb-2 italic text-blue-600">by {{ blog.blog_author }} | {{ blog.created_at }}</p>
    </div>

    <p class="h-[60%] text-white">
      {{ blog.blog_content }}
    </p>
  </div>
</template>
