<script setup>
const props = defineProps({
  blog: Object,
});
</script>

<template>
  <div
    class="w-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 p-6 rounded-2xl shadow-xl mb-8"
  >
    <div class="mb-4">
      <p class="font-extrabold text-2xl text-white tracking-wide">
        {{ blog.blog_title }}
      </p>
      <p class="mt-1 text-sm italic text-gray-200">
        by {{ blog.blog_author }} | {{ blog.created_at.slice(0,10) }}
      </p>
    </div>

    <p class="text-white">
      {{ blog.blog_content }}
    </p>
  </div>
</template>
