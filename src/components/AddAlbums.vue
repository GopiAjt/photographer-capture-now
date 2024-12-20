<!-- AddAlbums.vue -->
<template>
    <div class="card flex flex-col gap-6 items-center justify-center">

        <div style="display: flex; gap: 10px; justify-content: space-around">
            <!-- File Upload -->
            <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                class="p-button-outlined" multiple fluid />
            <Select v-model="category" editable :options="categories" optionLabel="name" placeholder="Select a category"
                class="w-full md:w-56" fluid />
            <!-- Upload Button -->
            <Button @click="submitGallery" icon="pi pi-cloud-upload" rounded outlined severity="success"
                :disabled="imageFiles.length === 0 || imageFiles.length > 5" fluid>
            </Button>
        </div>

        <!-- Display Error Message if more than 5 files are selected -->
        <p v-if="imageFiles.length > 5" class="text-red-500">You can only upload a maximum of 5 files.</p>

        <!-- Display Image Previews -->
        <div class="image-preview-container" v-if="imageFiles.length > 0">
            <div v-for="(image, index) in imagePreviews" :key="index" class="image-preview">
                <img :src="image" alt="Image Preview" class="shadow-md rounded-xl images" />
            </div>
        </div>
    </div>
    <LoadingScreen :isVisible="isLoading"></LoadingScreen>
</template>

<script>
import AuthService from '@/services/AuthService';
import { CategoryService } from '@/services/CategoryService';
import LoadingScreen from './LoadingScreen.vue';
export default {
    components: {
        LoadingScreen
    },
    data() {
        return {
            category: null,
            user: this.$store.state.user,
            imageFiles: [], // Store the selected files here
            imagePreviews: [], // Store the image URLs for preview
            categories: null,
            isLoading: false
        };
    },
    mounted() {
        CategoryService.getCategories().then((data) => {
            this.categories = data;
        });
    },
    methods: {
        onFileSelect(event) {
            // Clear previous images and previews
            this.imageFiles = [];
            this.imagePreviews = [];

            // Only allow 5 files max
            if (event.files.length > 5) {
                this.$toast.add({ severity: 'warn', summary: 'File Limit Exceeded', detail: 'You can only upload up to 5 files.', life: 3000 });
                return;
            }

            // Store selected files
            this.imageFiles = event.files;

            // Generate image previews
            for (let i = 0; i < this.imageFiles.length; i++) {
                const file = this.imageFiles[i];
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.imagePreviews.push(e.target.result); // Store the image preview
                };

                reader.readAsDataURL(file); // Convert file to data URL for preview
            }
        },
        async submitGallery() {
            console.log('Uploading images...');

            if (!this.category) {
                this.$toast.add({ severity: 'warn', summary: 'Category Required', detail: 'Please select a category before uploading.', life: 3000 });
                return;
            }

            if (this.imageFiles.length === 0) {
                this.$toast.add({ severity: 'warn', summary: 'No Files Selected', detail: 'Please select files to upload.', life: 3000 });
                return;
            }

            const formData = new FormData();
            formData.set('category', this.category.name);
            formData.set('photographerName', this.user.email);

            // Append files to formData
            for (let i = 0; i < this.imageFiles.length; i++) {
                formData.append('file', this.imageFiles[i]);
            }

            try {
                this.isLoading = true;
                const response = await AuthService.addAlbums(formData, this.user.authToken);
                console.log(response.data);
                this.$toast.add({ severity: 'success', summary: 'Upload Success', detail: 'Images uploaded successfully!', life: 3000 });
                this.imagePreviews = [];
                this.imageFiles = [];
                this.$store.commit('albumUpdated');
            } catch (error) {
                console.log("Error during upload:", error);
                const errorMessage = error.response?.data?.message || 'An error occurred during upload.';
                this.$toast.add({ severity: 'error', summary: 'Upload Failed', detail: errorMessage, life: 3000 });
            }
            finally {
                this.isLoading = false;
            }
        }
    }
};
</script>

<style scoped>
.image-preview-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    padding: 20px;
}

.image-preview {
    width: 80%;
    height: 80%;
}

.images {
    width: 100%;
}
</style>
