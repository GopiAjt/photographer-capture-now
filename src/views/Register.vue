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
                <Step>Verify Otp</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="step-content">
                        <Button label="Send Otp" link @click="handleRegister()" />
                        <label for="otp">Enter otp sent to your Email id</label>
                        <InputOtp v-model="otp" :length="6" />
                        <Button label="Verify" @click="verifyAndLogin()" />
                    </div>
                    <div class="button-group">
                        <Button label="Back" severity="secondary" @click="activateCallback('2')" />
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
            if (this.handleNext(1) && this.handleNext(2) ) {
                // If all validations pass, proceed with registration
                const photographerRegistrationDTO = {
                    name: this.name,
                    email: this.emailId,
                    password: this.password,
                    phoneNumber: this.phoNo,
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
                        this.$toast.add({ severity: 'error', summary: 'This Account already exists', details: 'please login to this account', life: 3000 });
                    }
                } finally {
                    this.isLoading = false;
                }
            }
        },
        async verifyAndLogin() {
            if(this.otp == null){
                this.$toast.add({ severity: 'error', summary: 'Please enter a valid otp', life: 3000 });
                return
            }
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
