<template>
    <div class="form-container">
        <div style="display: flex; justify-content: space-between; gap: 15px;">
            <div class="form-group">
                <label for="package-name" class="form-label">Package Name</label>
                <InputText type="text" id="package-name" v-model="packageName" fluid/>
            </div>

            <div class="form-group">
                <label for="package-category" class="form-label">Package Category</label>
                <Select v-model="category" inputId="package-category" :options="categories" optionLabel="name"
                    placeholder="Select a Category" fluid/>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="event-rate" class="form-label">Event Price</label>
                <InputNumber v-model="eventPrice" inputId="event-rate" mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" fluid />
            </div>

            <div class="form-group">
                <label for="one-day-rate" class="form-label">One Day Price</label>
                <InputNumber v-model="oneDayPrice" inputId="one-day-rate" mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" fluid />
            </div>

            <div class="form-group">
                <label for="one-hour-rate" class="form-label">One Hour Price</label>
                <InputNumber v-model="oneHourPrice" inputId="one-hour-rate" mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" fluid />
            </div>

            <div class="form-group">
                <label for="video-price" class="form-label">Videography Price</label>
                <InputNumber v-model="videoPrice" inputId="video-price" mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" fluid />
            </div>

            <div class="form-group">
                <label for="package-description" class="form-label">Package Description</label>
                <Textarea v-model="packageDescription" id="package-description" autoResize />
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

export default {
    components: {
        LoadingScreen
    },
    data() {
        return {
            packageName: null,
            eventPrice: null,
            oneDayPrice: null,
            oneHourPrice: null,
            videoPrice: null,
            packageDescription: null,
            category: null,
            categories: null,
            photographer: this.$store.state.user,
            isLoading: false
        }
    },
    mounted() {
        CategoryService.getCategories().then((data) => {
            this.categories = data;
        });
    },
    methods: {
        async addPackageHandler() {
            const packageData = {
                email: this.photographer.email,
                packageName: this.packageName,
                category: this.category.name,
                eventRate: this.eventPrice,
                oneDayRate: this.oneDayPrice,
                oneHourRate: this.oneHourPrice,
                videoRate: this.videoPrice,
                description: this.packageDescription
            };

            console.log(packageData);
            
            try {
                this.isLoading = true;
                const response = await AuthService.addPackge(packageData, this.photographer.authToken);
                console.log(response.data);
                this.photographer.packages = response.data;
                this.$store.commit('setUser', this.photographer);
            } catch (error) {
                console.log(error);
                
            }finally{
                this.isLoading = false;
            }
        }
    }
}
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
