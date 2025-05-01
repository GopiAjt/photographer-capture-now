<template>
    <div class="form-container">
        <div style="display: flex; justify-content: space-between; gap: 15px;">
            <div class="form-group">
                <label for="package-name" class="form-label">Package Name</label>
                <InputText type="text" id="package-name" v-model="packageName" fluid />
            </div>

            <div class="form-group">
                <label for="package-category" class="form-label">Package Category</label>
                <Select v-model="category" inputId="package-category" :options="categories" optionLabel="name"
                    placeholder="Select a Category" fluid />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="event-rate" class="form-label">Event Price</label>
                <InputNumber v-model="eventPrice" inputId="event-rate" mode="currency" currency="INR"
                    currencyDisplay="code" locale="en-IN" fluid />
            </div>

            <div class="form-group">
                <label for="one-day-rate" class="form-label">One Day Price</label>
                <InputNumber v-model="oneDayPrice" inputId="one-day-rate" mode="currency" currency="INR"
                    currencyDisplay="code" locale="en-IN" fluid />
            </div>

            <div class="form-group">
                <label for="one-hour-rate" class="form-label">One Hour Price</label>
                <InputNumber v-model="oneHourPrice" inputId="one-hour-rate" mode="currency" currency="INR"
                    currencyDisplay="code" locale="en-IN" fluid />
            </div>

            <div class="form-group">
                <label for="video-price" class="form-label">Videography Price</label>
                <InputNumber v-model="videoPrice" inputId="video-price" mode="currency" currency="INR"
                    currencyDisplay="code" locale="en-IN" fluid />
            </div>

            <div class="form-group">
                <label for="package-description" class="form-label">Package Description</label>
                <Textarea v-model="packageDescription" id="package-description" autoResize />
                <TipTapEditor v-model="packageDescription" />
                <ToastEditor v-model="packageDescription" />
            </div>

            <Button label="Submit" @click="addPackageHandler" />
        </div>
    </div>
    <LoadingScreen :isVisible="isLoading"></LoadingScreen>
</template>

<script>
import LoadingScreen from './LoadingScreen.vue';
import AuthService from '@/services/AuthService';
import { CategoryService } from '@/services/CategoryService';
import TipTapEditor from '@/components/helperComponents/TipTapEditor.vue';
import ToastEditor from '@/components/helperComponents/ToastEditor.vue'

export default {
    components: {
        LoadingScreen,
        TipTapEditor,
        ToastEditor
    },
    data() {
        return {
            packageName: null,
            eventPrice: null,
            oneDayPrice: null,
            oneHourPrice: null,
            videoPrice: null,
            packageDescription: '', // changed to empty string to store HTML
            category: null,
            categories: null,
            photographer: this.$store.state.user,
            isLoading: false,
        };
    },
    mounted() {
        CategoryService.getCategories().then((data) => {
            this.categories = data;
        });
    },
    methods: {
        validateInputs() {
            if (!this.packageName) {
                this.$toast.add({ severity: 'warn', summary: 'Package Name Required', detail: 'Please enter a package name.', life: 3000 });
                return false;
            }
            if (!this.category) {
                this.$toast.add({ severity: 'warn', summary: 'Category Required', detail: 'Please select a category.', life: 3000 });
                return false;
            }
            if (!this.eventPrice) {
                this.$toast.add({ severity: 'warn', summary: 'Event Price Required', detail: 'Please enter the event price.', life: 3000 });
                return false;
            }
            if (!this.oneDayPrice) {
                this.$toast.add({ severity: 'warn', summary: 'One Day Price Required', detail: 'Please enter the one-day price.', life: 3000 });
                return false;
            }
            if (!this.oneHourPrice) {
                this.$toast.add({ severity: 'warn', summary: 'One Hour Price Required', detail: 'Please enter the one-hour price.', life: 3000 });
                return false;
            }
            if (!this.videoPrice) {
                this.$toast.add({ severity: 'warn', summary: 'Videography Price Required', detail: 'Please enter the videography price.', life: 3000 });
                return false;
            }
            if (!this.packageDescription || this.packageDescription.trim() === '<p><br></p>') {
                this.$toast.add({ severity: 'warn', summary: 'Description Required', detail: 'Please enter a package description.', life: 3000 });
                return false;
            }
            return true;
        },
        async addPackageHandler() {
            if (!this.validateInputs()) return;

            const packageData = {
                email: this.photographer.email,
                packageName: this.packageName,
                category: this.category.name,
                eventRate: this.eventPrice,
                oneDayRate: this.oneDayPrice,
                oneHourRate: this.oneHourPrice,
                videoRate: this.videoPrice,
                description: this.packageDescription,
            };

            try {
                this.isLoading = true;
                const response = await AuthService.addPackge(packageData, this.photographer.authToken);
                this.photographer.packages = response.data;
                this.$store.commit('setUser', this.photographer);
                this.$toast.add({ severity: 'success', summary: 'Package Added', detail: 'Your package was added successfully!', life: 3000 });
            } catch (error) {
                console.log("Error during package upload:", error);
                this.$toast.add({ severity: 'error', summary: 'Upload Failed', detail: 'An error occurred while uploading the package.', life: 3000 });
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>

<style scoped>
.responsive-textarea {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-row {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-label {
    font-weight: bold;
    margin-bottom: 5px;
}
</style>
