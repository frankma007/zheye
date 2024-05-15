<template>
  <div class="container">

    <div class="row">
      <div class="  col-4 mb-3" v-for="column in columnList" :key="column._id">
        <div class="h-100 card  shadow-sm">
          <div class="card-body text-center">
            <img :src="column.avatar && column.avatar.url" :alt="column.title"
              class="rounded-circle border border-light w-25 my-3">
            <h5 class="card-title">{{ column.title }}</h5>
            <p class="card-text text-left">{{ column.description }}</p>
            <!-- <router-link :to="{name:'column',params:{id:column.id}}" class="btn btn-outline-primary">进入专栏</router-link> -->
            <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
// interface avatarProp{
//   _id?:string;
//   url?:string;
// }
// export interface ColumnProps{
//     id:number;
//     title:string;
//     avatar? :avatarProp;
//     description:string;
// }

import { ColumnProps } from '@/store'
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    // props.list[0].id
    const columnList = computed(() => {
      return props.list.map(item => {
        if (!item.avatar) {
          // item.avatar = require('@/assets/1.webp')
          item.avatar = {
            url: require('@/assets/1.webp?x-oss-process=image/resize,l_92')
          }
        } else {
          item.avatar.url = item.avatar.url + '?x-oss-process=image/resize,l_92'
        }
        return item
      })
    })
    return {
      columnList
    }
  }
})
</script>
