<template>
  <div class="tiptap-editor" v-if="editor">
    <!-- Toolbar -->
    <div class="toolbar">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        title="Bold"
      >B</button>
      
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        title="Italic"
      >I</button>
      
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        title="Bullet List"
      >• List</button>
      
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        title="Numbered List"
      >1. List</button>
    </div>

    <!-- Editable area -->
    <EditorContent :editor="editor" class="content" />
  </div>

  <!-- optional fallback while editor is initializing -->
  <div v-else class="tiptap-editor-loading">
    Loading editor…
  </div>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
  modelValue: { type: String, default: '<p></p>' }
})
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  extensions: [ StarterKit ],
  content: props.modelValue,
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  }
})

watch(() => props.modelValue, html => {
  if (editor && html !== editor.getHTML()) {
    editor.commands.setContent(html)
  }
})

onBeforeUnmount(() => {
  editor?.destroy()
})
</script>

<style scoped>
.tiptap-editor { border: 1px solid #ccc; border-radius: 4px; }
.toolbar {
  background: #f5f5f5; padding: 8px;
  display: flex; gap: 8px; border-bottom: 1px solid #ddd;
}
.toolbar button {
  border: none; background: transparent; padding: 4px 8px;
  cursor: pointer; font-weight: bold;
}
.toolbar button.is-active { background: #e0e0e0; }
.content {
  min-height: 150px; padding: 12px;
}
.tiptap-editor-loading {
  padding: 20px; text-align: center; color: #666;
}
</style>
