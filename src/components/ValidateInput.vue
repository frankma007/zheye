<template>
   <div class="validate-input-container pb-3">
     <!-- v-model="inputRef.val"  自定义model 组件 双向绑定 v-model  type="text"-->
    <input
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @input="updateValue"
      @blur="validateInput"
      v-bind="$attrs"
      ref="refInput"
    >
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>

</template>
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, ref } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp{
    type:'required'|'email';
    message:string;
}
export type RulesProp = RuleProp[]
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  inheritAttrs: false,
  setup (props, context) {
    const refInput = ref<HTMLElement |null>(null)
    console.log(context.attrs)
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })

    const validateInput = () => {
      console.log(11)
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':

              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = (emailReg.test(inputRef.val))
              if (refInput.value && !passed) {
                refInput.value.focus()
              }

              break
            default :
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    const updateValue = (e:Event) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    onMounted(() => {
      const a = validateInput
      if (!a) {
        context.emit('update:modelValue', '')
      }
      emitter.emit('form-item-created', a)
    })
    return {
      inputRef,
      validateInput,
      updateValue,
      refInput
    }
  }
})
</script>
