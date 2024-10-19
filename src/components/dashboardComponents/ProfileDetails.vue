<template>
    <div style="display: flex; flex-direction: column; gap: 5px;">
        <label for="Name">Name</label>
        <InputText id="Name" v-model="userName" aria-describedby="userName-help" />
    </div>

    <div style="display: flex; flex-direction: column; gap: 5px;">
        <label for="phoneNumber">Phone number</label>
        <InputText id="phoneNumber" v-model="phoneNumber" aria-describedby="phoneNumber-help" />
    </div>

    <div style="display: flex; flex-direction: column; gap: 5px;">
        <label for="serviceLocation">Service Location</label>
        <InputText id="serviceLocation" v-model="serviceLocation" aria-describedby="serviceLocation-help" />
    </div>

    <div style="display: flex; flex-direction: column; gap: 5px;">
        <label for="languages">Languages Known</label>
        <InputText id="languages" v-model="languages" aria-describedby="languages-help" />
    </div>

    <div style="display: flex; flex-direction: column; gap: 5px;">
        <label for="services">Services</label>
        <InputText id="services" v-model="services" aria-describedby="services-help" />
    </div>

    <div style="display: flex; flex-direction: column; gap: 5px;">
        <label for="experiences">Experiences</label>
        <InputNumber v-model="experiences" id="experiences" mode="decimal" showButtons :min="0" :max="100" fluid />
    </div>

    <div style="display: flex; flex-direction: column; gap: 5px;">
        <label for="aboutMe" class="form-label">About Me</label>
        <Textarea v-model="aboutMe" id="aboutMe" autoResize cols="30" />
    </div>
    <br>
    <Button label="Update" @click="updateDetails()" rounded fluid />

    <LoadingScreen :isVisible="isLoading"></LoadingScreen>
</template>

<script>
import AuthService from '@/services/AuthService';
import LoadingScreen from '../LoadingScreen.vue';
export default {
    components: {
        LoadingScreen
    },
    data() {
        return {
            userName: null,
            phoneNumber: null,
            serviceLocation: null,
            languages: null,
            services: null,
            experiences: null,
            aboutMe: null,
            photographer: this.$store.state.user,
            isLoading: false
        }
    },
    methods: {

        async updateDetails() {
            const photographer = {
                name: this.userName,
                email: this.photographer.email,
                phoneNumber: this.phoneNumber,
                serviceLocation: this.serviceLocation,
                languages: this.languages,
                services: this.services,
                experience: this.experiences,
                aboutMe: this.aboutMe,
            };

            console.log(photographer);

            try {
                this.isLoading = true;
                const response = await AuthService.updateProfileInfo(photographer, this.photographer.authToken);
                console.log(response);
                this.$toast.add({ severity: 'success', summary: 'Details updated successfully!', life: 3000 });

                this.photographer.name = this.userName;
                this.photographer.phoneNumber = this.phoneNumber;
                this.photographer.serviceLocation = this.serviceLocation;
                this.photographer.languages = this.languages;
                this.photographer.services = this.services;
                this.photographer.experience = this.experiences;
                this.photographer.aboutMe = this.aboutMe;

                this.$store.commit('setUser', this.photographer);
            } catch (error) {
                console.log(error);
                this.$toast.add({ severity: 'error', summary: 'Failed to update details', life: 3000 });
            } finally {
                this.isLoading = false
            }
        }
    },
    mounted() {
        console.log(this.photographer);
        this.userName = this.photographer.name;
        this.phoneNumber = this.photographer.phoneNumber;
        this.serviceLocation = this.photographer.serviceLocation;
        this.languages = this.photographer.languages;
        this.services = this.photographer.services;
        this.experiences = this.photographer.experience;
        this.aboutMe = this.photographer.aboutMe;
    }
}
</script>
