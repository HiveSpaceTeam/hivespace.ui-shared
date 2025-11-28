<template>
  <router-link to="/demo" class="lg:hidden">
    <img class="dark:hidden" :src="LogoLight" :alt="$t('common.menu')" />
    <img class="hidden dark:block" :src="LogoDark" :alt="$t('common.menu')" />
  </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LogoLight from '@/assets/logo/logo-light.svg'
import LogoDark from '@/assets/logo/logo-dark.svg'
</script>
