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
export default {
    data() {
        return {
            emailId: null,
            pass: null
        }
    },
    methods: {
        handleLogin(){
            console.log(this.emailId);
            console.log(this.pass);
            
            
        }
    }
}
</script>