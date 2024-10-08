<template>
    <div class="card flex flex-col gap-6 items-center justify-center">
        <Select v-model="category" editable :options="categories" optionLabel="name" placeholder="Select a category"
            class="w-full md:w-56" />
        <FileUpload v-model="imageFiles" name="files[]" multiple accept="image/*" customUpload
            @upload="submitGallery" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: null,
            imageFiles: null,
            categories: [
                { name: 'Wedding', value: 'wedding' },
                { name: 'Event', value: 'event' },
                { name: 'Portrait', value: 'portrait' },
            ]
        };
    },
    methods: {
        submitGallery() {
            const formData = new FormData();
            formData.set('category', this.category);
            formData.set('photographerName', data.email);

            for (let i = 0; i < imageFiles.value.length; i++) {
                formData.append('file', imageFiles.value[i]);
            }
        }
    }
};
</script>
