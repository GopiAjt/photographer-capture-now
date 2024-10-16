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
</template>

<script>
export default {
    data() {
        return {
            userName: null,
            phoneNumber: null,
            serviceLocation: null,
            languages: null,
            services: null,
            experiences: null,
            aboutMe: null
        }
    }
}
</script>
