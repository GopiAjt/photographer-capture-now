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
        <InputText id="experiences" v-model="experiences" aria-describedby="experiences-help" />
    </div>

    <div style="display: flex; flex-direction: column; gap: 5px;">
        <label for="aboutMe" class="form-label">About Me</label>
        <Textarea v-model="aboutMe" id="aboutMe" autoResize cols="30" />
    </div>
    <br>
    <Button label="Update" @click="updateDetails()" rounded fluid />
</template>

<script>
import AuthService from '@/services/AuthService';
export default {
    data() {
        return {
            userName: null,
            phoneNumber: null,
            serviceLocation: null,
            languages: null,
            services: null,
            experiences: null,
            aboutMe: null,
            photographer: this.$store.state.user
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
                const response = await AuthService.updateProfileInfo(photographer, this.photographer.authToken);
                console.log(response);
                
            } catch (error) {
                console.log(error);

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
