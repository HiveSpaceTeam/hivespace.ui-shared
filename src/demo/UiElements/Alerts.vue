<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Success Alert">
        <Alert
          variant="success"
          title="Success Message"
          message="Be cautious when performing this action."
          :showLink="true"
          linkHref="/demo"
          linkText="Learn more"
        />
        <Alert
          variant="success"
          title="Success Message"
          message="Be cautious when performing this action."
          :showLink="false"
        />
      </ComponentCard>
      <ComponentCard title="Warning Alert">
        <Alert
          variant="warning"
          title="Warning  Message"
          message="Be cautious when performing this action."
          :showLink="true"
          linkHref="/demo"
          linkText="Learn more"
        />
        <Alert
          variant="warning"
          title="Warning Message Message"
          message="Be cautious when performing this action."
          :showLink="false"
        />
      </ComponentCard>
      <ComponentCard title="Error Alert">
        <Alert
          variant="error"
          title="Error  Message"
          message="Be cautious when performing this action."
          :showLink="true"
          linkHref="/demo"
          linkText="Learn more"
        />
        <Alert
          variant="error"
          title="Error Message Message"
          message="Be cautious when performing this action."
          :showLink="false"
        />
      </ComponentCard>
      <ComponentCard title="Info Alert">
        <Alert
          variant="info"
          title="Info  Message"
          message="Be cautious when performing this action."
          :showLink="true"
          linkHref="/demo"
          linkText="Learn more"
        />
        <Alert
          variant="info"
          title="Info Message Message"
          message="Be cautious when performing this action."
          :showLink="false"
        />
      </ComponentCard>
    </div>
  
</template>

<script setup>
import { ref } from 'vue'

import { PageBreadcrumb, ComponentCard, Alert } from '@hivespace/shared'
const currentPageTitle = ref('Alerts')
</script>

<style></style>

