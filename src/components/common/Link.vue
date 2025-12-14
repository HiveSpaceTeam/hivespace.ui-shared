<template>
  <component :is="tag" :href="to" :class="linkClass" @click="handleClick">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  to: string
  external?: boolean
  class?: string | object | Array<string | object>
}

const props = withDefaults(defineProps<Props>(), {
  external: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const tag = computed(() => props.external ? 'a' : 'a')

const linkClass = computed(() => props.class)

const handleClick = (event: MouseEvent) => {
  if (!props.external) {
    event.preventDefault()
    emit('click', event)
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  opacity: 0.8;
}
</style>