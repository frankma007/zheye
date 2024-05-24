<template>
  <teleport to="#back">
    <div class="d-flex justify-content-center align-items-center h100 loading-container"
    :style="{backgroundColor:background ||''}"
    >
        <div class="loading-content">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">{{ text ||'loading' }}</span>
          </div>
          <p v-if="text" class="text-primary small"> {{ text }}</p>
        </div>
    </div>
  </teleport>
</template>
<script lang="ts" setup>

import { reactive, ref, onUnmounted } from 'vue'
const props = defineProps({
  text: {
    type: String
  },
  background: {
    type: String
  }
})
const node = document.createElement('div')
node.id = 'back'
document.body.appendChild(node)
onUnmounted(() => {
  document.body.removeChild(node)
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
    /* text-align: center; */
}
.loading-content{
  text-align: center;
}
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
</style>
