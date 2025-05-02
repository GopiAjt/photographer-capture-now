<template>
    <div class="image-cropper">
        <input type="file" ref="fileInput" accept="image/*" @change="onFileChange" style="display: none" />

        <div v-if="imageSource" class="cropper-container">
            <cropper ref="cropper" :src="imageSource" :stencil-props="{ aspectRatio: 1 / 1 }"
                :resize-image="{ adjustStencil: false }" @change="handleChange" />

            <div class="action-buttons">
                <Button @click="cancelCrop" label="Cancel" class="cancel-button" />
                <Button @click="cropImage" label="Crop" class="crop-button" />
            </div>
        </div>

        <div v-if="croppedImage" class="preview-container">
            <img :src="croppedImage" alt="Cropped Preview" class="preview-image" />
            <div style="display: flex; gap: 20px;">
                <Button @click="editImage" label="Edit Again" class="edit-button" />
                <Button @click="uploadImage" label="Upload Image" class="upload-button" />
            </div>
        </div>

        <Button v-if="!imageSource && !croppedImage" @click="triggerFileInput" label="Edit Photo"
            class="upload-button" />
    </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { Button } from 'primevue/button'
// Import your utility functions
import { compressImage, dataURLtoBlob, convertBlobToBase64 } from '@/utils/imageUtils'
import { showLoader, hideLoader } from '@/utils/loader'

export default {
    components: { Cropper, Button },
    data() {
        return {
            imageSource: null,
            croppedImage: null,
            coordinates: null,
            userData: this.$store.state.user, // holds email and authToken
        }
    },
    created() {
        // Load user info (adjust according to your auth flow)
        // const stored = localStorage.getItem('data')
        // this.userData = stored ? JSON.parse(stored) : {}
        this.userData = this.photographer.email
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click()
        },
        onFileChange(event) {
            const file = event.target.files[0]
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.imageSource = e.target.result
                    this.croppedImage = null
                }
                reader.readAsDataURL(file)
            }
        },
        handleChange({ coordinates }) {
            this.coordinates = coordinates
        },
        async cropImage() {
            const canvas = this.$refs.cropper.getCanvas()
            if (canvas) {
                this.croppedImage = canvas.toDataURL('image/jpeg', 1.0)
                this.imageSource = null
            }
        },
        cancelCrop() {
            this.imageSource = null
            this.$refs.fileInput.value = ''
        },
        editImage() {
            this.imageSource = this.croppedImage
            this.croppedImage = null
        },
        async uploadImage() {
            try {
                showLoader()
                // Compress to 600x600 with 0.8 quality
                const compressedBase64 = await compressImage(
                    this.croppedImage,
                    600,
                    600,
                    0.8
                )
                const formData = new FormData()
                formData.append('email', this.userData.email)
                const blob = dataURLtoBlob(compressedBase64)
                formData.append('image', blob, 'profile.jpg')

                const response = await fetch(
                    window.URI + '/photographer/changePhoto',
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${this.userData.authToken}`,
                        },
                        body: formData,
                    }
                )

                if (response.ok) {
                    console.log('Image uploaded successfully')
                    const arrayBuffer = await response.arrayBuffer()
                    const imgBlob = new Blob([arrayBuffer], { type: 'image/jpeg' })
                    const imageURL = URL.createObjectURL(imgBlob)
                    // Convert to base64 for storing
                    const base64Image = await convertBlobToBase64(imageURL)
                    this.userData.profilePhoto = base64Image
                    localStorage.setItem('data', JSON.stringify(this.userData))
                    hideLoader()
                    this.$router.push({ name: 'Settings' })
                } else {
                    hideLoader()
                    console.error('Upload error:', response.status)
                    // Optionally show toast message here
                }
            } catch (error) {
                hideLoader()
                console.error('Upload exception:', error)
                // Optionally show toast message here
            }
        },
    },
}
</script>

<style scoped>
.image-cropper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.cropper-container {
    width: 100%;
    max-width: 500px;
    margin: 10px 0;
}

@media (max-width: 600px) {
    .cropper-container {
        max-width: 100%;
        padding: 0 10px;
    }
}

.preview-container {
    text-align: center;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.preview-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
}

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}

.upload-button,
.crop-button,
.cancel-button,
.edit-button {
    padding: 8px 20px;
    font-size: 14px;
}
</style>