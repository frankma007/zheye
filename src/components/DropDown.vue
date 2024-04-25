<template>
    <div class="dropdown" ref="dropdownRef">
      <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
        {{title}}
      </a>
      <!-- v-if="isOpen" -->
      <ul class="dropdown-menu" :style="{display: 'block'}"  v-if="isOpen">
        <!-- <li class="dropdown-item">
          <a href="#">新建文章</a>
        </li>
        <li class="dropdown-item">
          <a href="#">编辑资料</a>
        </li> -->
        <slot></slot>
      </ul>
    </div>
    </template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const dropdownRef = ref<null | HTMLElement>(null)
    const isOpen = ref(false)
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })

    // 获取dom节点
    // dropdownRef 要与 ref定义的名字 完全一致即可拿到dom节点

    /*     const handler = (e:MouseEvent) => {
      console.log(e)
      if (dropdownRef.value) {
        console.log(dropdownRef.value)
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
    } */
    /*     onMounted(() => {
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler)
    }) */

    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
