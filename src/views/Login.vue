<template>
    <Card>
        <template #title>Login</template>
        <template #content>
            <InputText type="text" v-model="emailId" />
            <br>
            <InputText type="text" v-model="pass" />
            <br>
            <Button label="Login" @click="handleLogin"/>
        </template>
    </Card>
</template>

<script>

import AuthService from '@/services/AuthService';
export default {
    data() {
        return {
            emailId: null,
            pass: null
        }
    },
    methods: {
        async handleLogin(){
            console.log(this.emailId);
            console.log(this.pass);

            try {
                const response = await AuthService.handleLogin(this.emailId, this.pass);
                const token = await AuthService.getAuthToken(this.emailId, this.pass);
                console.log(response);
                console.log(token);
                
                
            } catch (error) {
                console.log(error);
                
            }
        }
    }
}
</script>