<template>
    <br>
    <div style="display: flex; justify-content: center;">
        <img src="/CaptureNow.svg" width="50px" alt="CaptureNoww">
    </div>
    <div class="card">
        <Stepper value="1">
            <StepItem value="1">
                <Step>Personal details</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <InputText v-model="name" type="text" placeholder="Name" fluid />
                        <InputText v-model="emailId" type="email" placeholder="Email Id" fluid />
                        <InputNumber v-model="phoNo" :useGrouping="false" placeholder="Phone No" fluid />
                    </div>
                    <div class="button-group">
                        <Button label="Next" @click="activateCallback('2')" />
                    </div>
                </StepPanel>
            </StepItem>

            <StepItem value="2">
                <Step>Set Password</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <div>
                            <label for="password">Enter a new password</label>
                            <Password v-model="password" toggleMask fluid />
                        </div>
                        <div>
                            <label for="password">Re-Enter your password</label>
                            <Password v-model="confirmPassword" :feedback="false" fluid />
                        </div>
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('1')" />
                        <Button label="Next" @click="activateCallback('3')" />
                    </div>
                </StepPanel>
            </StepItem>

            <StepItem value="3">
                <Step>Service Location</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <InputText v-model="serviceLocation" type="text" placeholder="Service Location" />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('2')" />
                        <Button label="Next" @click="activateCallback('4')" />
                    </div>
                </StepPanel>
            </StepItem>

            <StepItem value="4">
                <Step>Languages</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <InputText v-model="languages" type="text" placeholder="Languages" />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('3')" />
                        <Button label="Next" @click="activateCallback('5')" />
                    </div>
                </StepPanel>
            </StepItem>

            <StepItem value="5">
                <Step>Services</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <InputText v-model="services" type="text" placeholder="Services" />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('4')" />
                        <Button label="Next" @click="activateCallback('6')" />
                    </div>
                </StepPanel>
            </StepItem>

            <StepItem value="6">
                <Step>Experience</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <InputNumber v-model="experience" inputId="experience-buttons" mode="decimal" showButtons
                            :min="0" :max="100" />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('5')" />
                        <Button label="Next" @click="activateCallback('7')" />
                    </div>
                </StepPanel>
            </StepItem>

            <StepItem value="7">
                <Step>About Me</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <Textarea v-model="aboutMe" autoResize rows="5" cols="40" fluid placeholder="About Me"
                            class="responsive-textarea" />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('6')" />
                        <Button label="Next" @click="activateCallback('8')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="8">
                <Step>Verify Otp</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <Button label="Send Otp" link />
                        <label for="otp">Enter otp sent to your Email id</label>
                        <InputOtp v-model="value" :length="6" />
                        <Button label="Verify" />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('7')" />
                    </div>
                </StepPanel>
            </StepItem>
        </Stepper>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';
export default {
    data() {
        return {
            name: null,
            emailId: null,
            phoNo: null,
            password: null,
            confirmPassword: null,
            serviceLocation: null,
            languages: null,
            services: null,
            experience: null,
            aboutMe: null
        }
    },
    methods: {
        async handleRegister() {

            // Create the PhotographerRegistrationDTO object
            const photographerRegistrationDTO = {
                name: this.name,
                email: this.emailId,
                password: this.password,
                phoneNumber: this.phoNo,
                serviceLocation: this.serviceLocation,
                languages: this.languages,
                services: this.services,
                experience: this.experience,
                aboutMe: this.aboutMe
            };

            try {
                const response = await AuthService.register(photographerRegistrationDTO);
            } catch (error) {
                console.log(error);

            }
        }
    }
}
</script>

<style scoped>
.card {
    border-radius: 8px;
    padding-left: 15rem;
    padding-right: 15rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.step-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 2px dashed #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    align-items: center;
}

.button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 50vw;
}

button {
    padding: 10px 20px;
    font-size: 14px;
}

textarea.responsive-textarea {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
}

@media (max-width: 575px) {
    .card {
        border-radius: 8px;
        padding-left: 1rem;
        padding-right: 1rem;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
}
</style>
