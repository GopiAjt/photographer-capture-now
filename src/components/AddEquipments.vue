<template>
    <div class="card flex flex-col gap-6 items-center justify-center">
        <FileUpload v-model="imageFiles" name="files[]" multiple accept="image/*" customUpload
            @upload="submitGallery" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageFiles: null,
            user: this.$store.state.user,
        };
    },
    methods: {
        submitGallery() {
            console.log('upploading');

            const formData = new FormData();
            formData.set('photographerName', this.user.authToken);

            for (let i = 0; i < this.imageFiles.length; i++) {
                formData.append('file', this.imageFiles[i]);
            }
        }
    }
};
</script>
