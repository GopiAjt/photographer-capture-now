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
                        <InputText v-model="phoNo" placeholder="Phone No" fluid />
                    </div>
                    <div class="button-group">
                        <Button label="Next" @click="handleNextStep(1, activateCallback, '2')" />
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
                        <Button label="Next" @click="handleNextStep(2, activateCallback, '3')" />
                    </div>
                </StepPanel>
            </StepItem>

            <StepItem value="3">
                <Step>Service Location</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <InputText v-model="serviceLocation" type="text" placeholder="Service Location" fluid />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('2')" />
                        <Button label="Next" @click="handleNextStep(3, activateCallback, '4')" />
                    </div>
                </StepPanel>
            </StepItem>

            <StepItem value="4">
                <Step>Languages</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <InputText v-model="languages" type="text" placeholder="Languages" fluid />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('3')" />
                        <Button label="Next" @click="handleNextStep(4, activateCallback, '5')" />
                    </div>
                </StepPanel>
            </StepItem>

            <StepItem value="5">
                <Step>Services</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <InputText v-model="services" type="text" placeholder="Services" fluid />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('4')" />
                        <Button label="Next" @click="handleNextStep(5, activateCallback, '6')" />
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
                        <Button label="Next" @click="handleNextStep(6, activateCallback, '7')" />
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
                        <Button label="Next" @click="handleNextStep(7, activateCallback, '8')" />
                    </div>
                </StepPanel>
            </StepItem>

            <StepItem value="8">
                <Step>Verify Otp</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <Button label="Send Otp" link @click="handleRegister()" />
                        <label for="otp">Enter otp sent to your Email id</label>
                        <InputOtp v-model="otp" :length="6" />
                        <Button label="Verify" @click="verifyAndLogin()" />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('7')" />
                    </div>
                </StepPanel>
            </StepItem>
        </Stepper>
        <br>
        <h4 @click="navigateTo('/login')" style="cursor: pointer;">Allready have an Account!</h4>
        <br>
    </div>
    <Toast position="bottom-center" />
    <LoadingScreen :isVisible="isLoading"></LoadingScreen>
</template>


<script>
import AuthService from '@/services/AuthService';
import LoadingScreen from '@/components/LoadingScreen.vue';
export default {
    components: {
        LoadingScreen
    },
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
            aboutMe: null,
            otp: null,
            isLoading: false,
            errors: {}  // Add this to store validation errors
        }
    },
    methods: {
        // Handle next step with validation
        handleNextStep(currentStep, activateCallback, nextStep) {
            const isValid = this.handleNext(currentStep);
            if (isValid) {
                activateCallback(nextStep);  // Proceed to next step only if valid
            }
        },
        // Validation methods for each step
        validateStep1() {
            this.errors = {};
            if (!this.name) {
                this.errors.name = 'Name is required';
            }
            if (!this.emailId || !this.isValidEmail(this.emailId)) {
                this.errors.emailId = 'Valid email is required';
            }
            if (!this.phoNo || !/^\d{10}$/.test(this.phoNo)) {
                this.errors.phoNo = 'Valid 10-digit phone number is required';
            }
            return Object.keys(this.errors).length === 0;  // Proceed only if no errors
        },
        validateStep2() {
            this.errors = {};
            if (!this.password) {
                this.errors.password = 'Password is required';
            }
            if (this.password !== this.confirmPassword) {
                this.errors.confirmPassword = 'Passwords do not match';
            }
            return Object.keys(this.errors).length === 0;
        },
        validateStep3() {
            this.errors = {};
            if (!this.serviceLocation) {
                this.errors.serviceLocation = 'Service Location is required';
            }
            return Object.keys(this.errors).length === 0;
        },
        validateStep4() {
            this.errors = {};
            if (!this.languages) {
                this.errors.languages = 'Languages are required';
            }
            return Object.keys(this.errors).length === 0;
        },
        validateStep5() {
            this.errors = {};
            if (!this.services) {
                this.errors.services = 'Services are required';
            }
            return Object.keys(this.errors).length === 0;
        },
        validateStep6() {
            this.errors = {};
            if (this.experience === null) {
                this.errors.experience = 'Experience is required';
            }
            return Object.keys(this.errors).length === 0;
        },
        validateStep7() {
            this.errors = {};
            if (!this.aboutMe) {
                this.errors.aboutMe = 'About Me section is required';
            }
            return Object.keys(this.errors).length === 0;
        },

        // Helper method to check for valid email format
        isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        },

        // Handle next step with validation
        handleNext(step) {
            let isValid = false;
            switch (step) {
                case 1:
                    isValid = this.validateStep1();
                    break;
                case 2:
                    isValid = this.validateStep2();
                    break;
                case 3:
                    isValid = this.validateStep3();
                    break;
                case 4:
                    isValid = this.validateStep4();
                    break;
                case 5:
                    isValid = this.validateStep5();
                    break;
                case 6:
                    isValid = this.validateStep6();
                    break;
                case 7:
                    isValid = this.validateStep7();
                    break;
            }
            if (isValid) {
                // this.$toast.add({ severity: 'success', summary: 'Step ' + step + ' is valid', life: 3000 });
                return true;
            } else {
                for (const error in this.errors) {
                    this.$toast.add({ severity: 'error', summary: this.errors[error], life: 3000 });
                }
                return false;
            }
        },

        async handleRegister() {
            if (this.handleNext(1) && this.handleNext(2) && this.handleNext(3) && this.handleNext(4) && this.handleNext(5) && this.handleNext(6) && this.handleNext(7)) {
                // If all validations pass, proceed with registration
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
                    this.isLoading = true;
                    console.log(photographerRegistrationDTO);
                    const response = await AuthService.register(photographerRegistrationDTO);
                    console.log(response);
                    if (response.status === 201) {
                        this.$toast.add({ severity: 'success', summary: 'Otp has been sent to Mail', life: 3000 });
                    }
                } catch (error) {
                    console.log(error);
                    const status = error.response.status;
                    if (status === 409) {
                        this.$toast.add({ severity: 'error', summary: 'This Account already exists', life: 3000 });
                    }
                } finally {
                    this.isLoading = false;
                }
            }
        },
        async verifyAndLogin() {
            try {
                this.isLoading = true;
                const response = await AuthService.validateOtp(this.emailId, this.otp);
                console.log(response);
                if (response.status === 202) {
                    const token = await AuthService.getAuthToken(this.emailId, this.password);
                    const response = await AuthService.handleLogin(this.emailId, this.password);
                    const user = response.data;
                    const authToken = token;
                    if (response.status === 200) {
                        localStorage.setItem('user', JSON.stringify(user));
                        this.$store.dispatch('login', { user, authToken });
                        this.navigateTo('/');
                    }
                }
            } catch (error) {
                console.log(error);
                if (error.response.status === 400) {
                    this.navigateTo('/login');
                }
            } finally {
                this.isLoading = false;
            }
        },
        navigateTo(route) {
            this.$router.push(route);
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
    display: flex;
    flex-direction: column;
    align-items: center;
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

.p-inputotp {
    width: 100%;
    justify-content: center;
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
