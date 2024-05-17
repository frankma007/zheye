<template>
    <div class="d-flex justify-content-center align-items-center h100 loader-container">
        <div class="loading-content">{{ props.text }}</div>
    </div>
</template>
<script lang="ts" setup>

import { reactive, ref } from 'vue'
const props = defineProps({
  text: {
    type: String
  },
  background: {
    type: String
  }
})
</script>
<style  scoped>
.loading-container{
    background-color: rgba(255,255,255,.5);
    z-index: 100;
    position:fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
}
</style>
