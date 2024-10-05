<template>
    <div style="display: flex; justify-content: center;">
        <img src="/CaptureNow.svg" width="50px" alt="CaptureNoww">
    </div>
    <div class="card">
        <Stepper value="1">
            <StepItem value="1">
                <Step>Personal details</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <InputText v-model="name" type="text" placeholder="Name" />
                        <InputText v-model="emailId" type="email" placeholder="Email Id" />
                        <InputText v-model="phoNo" type="text" placeholder="Phone No" />
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
                        <Password v-model="password" toggleMask fluid />
                        <Password v-model="confirmPassword" :feedback="false" fluid />
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
                        <InputText v-model="experience" type="text" placeholder="Experience" />
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
                        <InputOtp v-model="value" :length="6"/>
                        <Button label="Verify"/>
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
    }
}
</script>

<style scoped>
.card {
    border-radius: 8px;
    padding: 50px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.step-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 2px dashed #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    width: 50vw;
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
</style>
