<template>
    <div class="toast-editor-wrapper">
      <toast-editor
        ref="editorRef"
        v-model="content"
        :initial-edit-type="'wysiwyg'"
        :preview-style="'vertical'"
        :height="'300px'"
        :toolbar-items="toolbarItems"
      />
    </div>
  </template>
  
  <script>
  import { Editor as ToastEditor } from '@toast-ui/vue-editor'
  import 'toast-ui/dist/toastui-editor.css'
  
  export default {
    name: 'ToastEditor',
    components: { 'toast-editor': ToastEditor },
    props: {
      modelValue: { type: String, default: '' }
    },
    emits: ['update:modelValue'],
    data() {
      return {
        content: this.modelValue,
        toolbarItems: [
          // first group
          ['heading', 'bold', 'italic', 'strike'],
          // second group
          ['hr', 'quote'],
          // third group
          ['ul', 'ol', 'task'],
          // fourth group
          ['table', 'link', 'image']
        ]
      }
    },
    watch: {
      content(html) {
        this.$emit('update:modelValue', html)
      },
      modelValue(val) {
        if (val !== this.content) this.content = val
      }
    }
  }
  </script>
  
  <style scoped>
  .toast-editor-wrapper {
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  </style>
  