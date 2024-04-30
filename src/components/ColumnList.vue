<template>
  <div class="container">

    <div class="row">
        <div  class="  col-4 mb-3"  v-for="column in columnList" :key="column.id">
          <div class="h-100 card  shadow-sm">
              <div class="card-body text-center">
                <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3" >
                <h5 class="card-title">{{column.title}}</h5>
                <p class="card-text text-left">{{column.description}}</p>
                <!-- <router-link :to="{name:'column',params:{id:column.id}}" class="btn btn-outline-primary">进入专栏</router-link> -->
                <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
export interface ColumnProps{
    id:number;
    title:string;
    avatar? : string;
    description:string;
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType < ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    // props.list[0].id
    const columnList = computed(() => {
      return props.list.map(item => {
        if (!item.avatar) {
          item.avatar = require('@/assets/1.webp')
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
