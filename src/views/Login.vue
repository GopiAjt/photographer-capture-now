<template>
    <div id="login-div">
        <br>
        <img src="/CaptureNow.svg" width="50px" alt="">
        <br>
        <Card style="align-items: center;">
            <template #title>Login</template>
            <template #content>
                <div class="card-body">
                    <InputText type="text" v-model="emailId" fluid />
                    <br>
                    <InputText type="text" v-model="pass" fluid />
                    <br>
                    <Button label="Login" @click="handleLogin" fluid />
                    <br>
                    <h5 style="cursor: pointer;">Forgot Password</h5>
                    <br>
                    <h5 @click="navigateTo('/register')" style="cursor: pointer;">Don't have an account create one!</h5>
                </div>
            </template>
        </Card>
    </div>
    <LoadingScreen :isVisible="isLoading"></LoadingScreen>
</template>

<script>
import LoadingScreen from '@/components/LoadingScreen.vue';
import AuthService from '@/services/AuthService';
export default {
    components: {
        LoadingScreen
    },
    data() {
        return {
            emailId: 'gopiajt23@gmail.com',
            pass: 'Trish23@',
            isLoading: false
        }
    },
    methods: {
        async handleLogin() {
            console.log(this.emailId);
            console.log(this.pass);
            this.isLoading = true;
            try {
                const response = await AuthService.handleLogin(this.emailId, this.pass);
                const token = await AuthService.getAuthToken(this.emailId, this.pass);
                console.log(response);
                console.log(token);


                const user = response.data;
                const authToken = token;

                console.log(user);

                if (response.status == 200) {
                    // Successful login (status 200)
                    // this.$toast.add({ severity: 'success', summary: 'Logged in', life: 3000 });
                    localStorage.setItem('user', JSON.stringify(user));
                    this.$store.dispatch('login', { user, authToken });
                    this.navigateTo('/');
                }

            } catch (error) {
                console.log(error);
            }
            finally{
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
.p-card {
    width: 40%;
}

.p-card-body {
    align-items: center;
}

.p-card-content {
    margin: 100%;
}
.card-body{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#login-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

@media (max-width: 575px) {
    .p-card {
        width: 80%;
    }
}
</style>