<template>
  <div v-if="labelPosition === 'left'" :class="['flex items-center gap-4']">
    <label
      v-if="label"
      :for="id"
      :class="[
        'text-sm font-medium text-gray-700 dark:text-gray-400 min-w-0 whitespace-nowrap',
        required ? 'required-label' : '',
      ]"
    >
      {{ label }}
    </label>
    <div class="flex-1">
      <div class="relative">
        <slot name="prepend" />

        <input
          :id="id"
          :type="type"
          :placeholder="placeholder"
          :value="modelValue"
          :disabled="disabled"
          :required="required"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          :class="computedClass"
          v-bind="attrs"
        />

        <slot name="append" />
      </div>

      <!-- Error message display -->
      <p v-if="error" class="form-error-text mt-1 text-sm text-red-600 dark:text-red-400">
        {{ error }}
      </p>
    </div>
  </div>

  <div v-else>
    <label
      v-if="label"
      :for="id"
      :class="[
        'mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400',
        required ? 'required-label' : '',
      ]"
    >
      {{ label }}
    </label>
    <div class="relative">
      <slot name="prepend" />

      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        :class="computedClass"
        v-bind="attrs"
      />

      <slot name="append" />
    </div>

    <!-- Error message display -->
    <p v-if="error" class="form-error-text mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAttrs } from 'vue'

const attrs = useAttrs()

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    labelPosition?: 'left' | 'top'
    id?: string
    type?: string
    placeholder?: string
    disabled?: boolean
    inputClass?: string
    required?: boolean
    error?: string
  }>(),
  {
    modelValue: '',
    label: '',
    labelPosition: 'top',
    id: undefined,
    type: 'text',
    placeholder: '',
    disabled: false,
    inputClass: '',
    required: false,
    error: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement | null
  if (target) emit('update:modelValue', target.value)
}

const onFocus = (e: FocusEvent) => {
  emit('focus', e)
}

const onBlur = (e: FocusEvent) => {
  emit('blur', e)
}

const baseClass =
  'dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800'

const errorClass = 'border-red-500 focus:border-red-500 focus:ring-red-500/10'

const computedClass = computed(() => {
  const classes = [baseClass]

  if (props.error) {
    classes.push(errorClass)
  }

  if (props.inputClass) {
    classes.push(props.inputClass)
  }

  return classes.join(' ').trim()
})
</script>
