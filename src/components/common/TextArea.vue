<template>
  <div
    :class="[
      'flex',
      !label ? 'flex-col gap-2' : '',
      labelPosition === 'left' ? 'items-start gap-4' : '',
      labelPosition === 'right' ? 'items-start gap-4 flex-row-reverse' : '',
      labelPosition === 'top' ? 'flex-col gap-2' : '',
      labelPosition === 'bottom' ? 'flex-col-reverse gap-2' : '',
    ]"
  >
    <label
      v-if="label"
      :for="id"
      :class="[
        'text-sm font-medium text-gray-700 dark:text-gray-400',
        required ? 'required-label' : '',
        labelPosition === 'left' ? 'pt-2.5 min-w-0 whitespace-nowrap' : '',
      ]"
    >
      {{ label }}
    </label>
    <div class="flex-1">
      <textarea
        :id="id"
        :value="modelValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :required="required"
        :class="computedClass"
        v-bind="$attrs"
      ></textarea>
      <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    labelPosition?: 'left' | 'right' | 'top' | 'bottom'
    placeholder?: string
    rows?: number
    disabled?: boolean
    required?: boolean
    error?: string
    id?: string
    textareaClass?: string
  }>(),
  {
    modelValue: '',
    label: '',
    labelPosition: 'top',
    placeholder: '',
    rows: 4,
    disabled: false,
    required: false,
    error: '',
    id: '',
    textareaClass: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement | null
  if (target) emit('update:modelValue', target.value)
}

const onFocus = (e: FocusEvent) => {
  emit('focus', e)
}

const onBlur = (e: FocusEvent) => {
  emit('blur', e)
}

const baseClass =
  'w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30'

const errorClass = 'border-red-500 focus:border-red-500 focus:ring-red-500/10'

const disabledClass =
  'disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15'

const normalClass =
  'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800'

const computedClass = computed(() => {
  const classes = [baseClass]

  if (props.error) {
    classes.push(errorClass)
  } else {
    classes.push(normalClass)
  }

  if (props.disabled) {
    classes.push(disabledClass)
  }

  if (props.textareaClass) {
    classes.push(props.textareaClass)
  }

  return classes.join(' ').trim()
})
</script>

<style scoped>
.required-label::after {
  content: ' *';
  color: #ef4444;
}
</style>
