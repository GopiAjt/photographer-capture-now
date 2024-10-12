<template>
    <div class="form-container">
        <div style="display: flex; justify-content: space-between; gap: 15px;">
            <div class="form-group">
                <label for="package-name" class="form-label">Package Name</label>
                <InputText type="text" id="package-name" v-model="packageName" />
            </div>

            <div class="form-group">
                <label for="package-category" class="form-label">Package Category</label>
                <Select v-model="category" inputId="package-category" :options="categories" optionLabel="name"
                    placeholder="Select a Category" />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="event-rate" class="form-label">Event Price</label>
                <InputNumber v-model="eventPrice" inputId="event-rate" locale="en-IN" :minFractionDigits="2" />
            </div>

            <div class="form-group">
                <label for="one-day-rate" class="form-label">One Day Price</label>
                <InputNumber v-model="oneDayPrice" inputId="one-day-rate" locale="en-IN" :minFractionDigits="2" />
            </div>

            <div class="form-group">
                <label for="one-hour-rate" class="form-label">One Hour Price</label>
                <InputNumber v-model="oneHourPrice" inputId="one-hour-rate" locale="en-IN" :minFractionDigits="2" />
            </div>

            <div class="form-group">
                <label for="video-price" class="form-label">Videography Price</label>
                <InputNumber v-model="videoPrice" inputId="video-price" locale="en-IN" :minFractionDigits="2" />
            </div>

            <div class="form-group">
                <label for="package-description" class="form-label">Package Description</label>
                <Textarea v-model="packageDescription" id="package-description" autoResize />
            </div>

            <Button label="Submit" @click="addPackageHandler" />
        </div>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';
export default {
    data() {
        return {
            packageName: null,
            eventPrice: null,
            oneDayPrice: null,
            oneHourPrice: null,
            videoPrice: null,
            packageDescription: null,
            category: null,
            categories: [
                { name: 'New York', code: 'NY' },
                { name: 'Rome', code: 'RM' },
                { name: 'London', code: 'LDN' },
                { name: 'Istanbul', code: 'IST' },
                { name: 'Paris', code: 'PRS' }
            ],
            photographer: this.$store.state.user
        }
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
                const response = await AuthService.addPackge(packageData, this.photographer.authToken);
                console.log(response.data);
                
            } catch (error) {
                console.log(error);
                
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
