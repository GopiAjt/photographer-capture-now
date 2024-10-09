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
            user: this.$store.state.user,
            categories: [
                { name: 'Wedding', value: 'wedding' },
                { name: 'Event', value: 'event' },
                { name: 'Portrait', value: 'portrait' },
            ]
        };
    },
    methods: {
        submitGallery() {
            console.log('upploading');
            
            const formData = new FormData();
            formData.set('category', this.category);
            formData.set('photographerName', this.user.authToken);

            for (let i = 0; i < this.imageFiles.length; i++) {
                formData.append('file', this.imageFiles[i]);
            }
        }
    }
};
</script>
