import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: ()=>({
    // variable: val,
  }),
  actions: {
    // functionName(){},
  }
})
