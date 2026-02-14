<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="quill-container">
      <div class="quill-content">
        <div class="mb-2">
          <QuillEditor :style="'height:300px'" ref="quillRef" :modules="modules" toolbar="full" />
        </div>
        <Button size="sm" class="mr-2" @click="onClick" variant="primary"> Submit</Button>
        <Button size="sm" @click="onBind" variant="primary"> Bind</Button>

        <div v-html="rawHtml"></div>
      </div>
    </div>
  
</template>

<script setup lang="ts">
import { Button, PageBreadcrumb } from '@hivespace/shared'
import { ref } from 'vue'

import { QuillEditor } from '@vueup/vue-quill'

import ImageUploader from 'quill-image-uploader'

type QuillEditorInstance = {
  setHTML?: (html: string) => void
  getHTML?: () => string
}

const quillRef = ref<unknown>(null)
const rawHtml = ref('')
const currentPageTitle = ref('Quill')

const modules = ref({
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: (file: File) => {
      return new Promise((resolve) => {
        const formData = new FormData()
        formData.append('image', file)

        // Example upload flow (uncomment and implement actual upload):
        // axios.post('/upload-image', formData)
        //   .then(res => resolve(res.data.url))
        //   .catch(err => reject(new Error('Upload failed')))

        // Temporary: resolve with a placeholder value (empty URL)
        resolve('')
      })
    },
  },
})

const onBind = async () => {
  ; (quillRef?.value as QuillEditorInstance)?.setHTML?.(
    '<p>Áo thun DirtyCoins Dico Mate T-Shirt - White</p><p><br></p><p>Model: 1m55 42kg mặc sản phẩm size S</p><p><br></p><p>Chi tiết sản phẩm:</p><p>• Màu: Trắng - Đen - Kem</p><p>• Size: XS - S - M - L - XL</p><p>• Chất liệu: Cotton.</p><p>• Relaxed Fit.</p><p>• Bo cổ 2 chiều.</p><p>• Hình in mặt trước và sau áo áp dụng dụng công nghệ in lụa.</p><p><br></p><p><img src="https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-mdk6gpmpapwx49" height="1167" width="875"></p><p><img src="https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-mdk6gpmpc4hd85" height="1167" width="875"></p><p><img src="https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-mdo2snjimmr0e8" height="1094" width="875"></p><p><img src="https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-mdo2snjio1bgd9" height="1094" width="875"></p><p><img src="https://down-vn.img.susercontent.com/file/vn-11134202-7ras8-m0d2fgqox0q554" height="1326" width="875"></p><p><img src="https://down-vn.img.susercontent.com/file/vn-11134202-7ras8-m0d2fhdpzbhp19" height="1326" width="875"></p>',
  )
}
const onClick = async () => {
  rawHtml.value = (quillRef?.value as QuillEditorInstance)?.getHTML?.() ?? ''
}
</script>
<style>
.quill-content {
  width: 950px;
}

.quill-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>

