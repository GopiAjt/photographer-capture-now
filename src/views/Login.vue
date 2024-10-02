<template>
    <div id="login-div">
        <img src="/CaptureNow.svg" width="50px" alt="">
        <br>
        <Card style="align-items: center;">
            <template #title>Login</template>
            <template #content>
                <InputText type="text" v-model="emailId" fluid />
                <br>
                <InputText type="text" v-model="pass" fluid/>
                <br>
                <Button label="Login" @click="handleLogin" fluid/>
            </template>
        </Card>
    </div>
    <h5 @click="navigateTo('/register')" style="cursor: pointer;">Don't have an account create one!</h5>
</template>

<script>

import AuthService from '@/services/AuthService';
export default {
    data() {
        return {
            emailId: 'gopiajt23@gmail.com',
            pass: 'Trish23@'
        }
    },
    methods: {
        async handleLogin() {
            console.log(this.emailId);
            console.log(this.pass);

            try {
                const response = await AuthService.handleLogin(this.emailId, this.pass);
                const token = await AuthService.getAuthToken(this.emailId, this.pass);
                console.log(response);
                console.log(token);


                const user = response.data;
                const authToken = token.data;

                if (response.status == 200) {
                    // Successful login (status 200)
                    // this.$toast.add({ severity: 'success', summary: 'Logged in', life: 3000 });
                    localStorage.setItem('user', JSON.stringify(user));
                    this.$store.dispatch('login', { user, authToken });
                }

            } catch (error) {
                console.log(error);

            }
        },
        navigateTo(route) {
            this.$router.push(route);
        }
    }
}
</script>

<style scoped>
.p-card{
    width: 100%;
}
.p-card-body{
    align-items: center;
}
.p-card-content{
    margin: 100%;
}
#login-div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>