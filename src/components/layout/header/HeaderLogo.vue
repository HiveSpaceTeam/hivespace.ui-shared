<template>
  <Link to="/" @click="emit('navigate', '/')" class=" lg:hidden">
    <img class="dark:hidden" :src="LogoLight" :alt="$t('common.menu')" />
    <img class="hidden dark:block" :src="LogoDark" :alt="$t('common.menu')" />
  </Link>
</template>

<script setup lang="ts">
import LogoLight from '../../../assets/logo/logo-light.svg'
import LogoDark from '../../../assets/logo/logo-dark.svg'
import Link from '../../common/Link.vue';
const emit = defineEmits<{
  navigate: [path: string]
}>()
</script>
