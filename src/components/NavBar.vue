<template>
    <div class="nav-card">
        <Toolbar id="blurred-toolbar">
            <template #start>
                <img src="/CaptureNow.svg" alt="CaptureNoww" width="40px" @click="navigateTo('/')"
                    style="cursor: pointer;">
            </template>


            <template #end>
                <span style="color: black;">|</span>
               
                <Avatar class="mr-2" size="1.5rem" style="background-color: #fff0; color: #2a1261" shape="circle">
                    
                </Avatar>
            </template>
        </Toolbar>
    </div>
</template>

<script>
export default {
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        }
    }
}
</script>

<style scoped>
#blurred-toolbar {
    background-color: rgb(255, 255, 0);
    padding: 5px;
    padding-left: 10vw;
    padding-right: 10vw;
    width: 100%;
    backdrop-filter: blur(8px);
    position: relative;
}

.nav-card {
    padding: 10px;
}

.p-button {
    width: 30px;
}

.p-iconfield {
    width: 20px;
}

@media (max-width: 575px) {
    #blurred-toolbar {
        background-color: rgb(255, 255, 0);
        padding: 5px;
        padding-left: 2vw;
        padding-right: 2vw;
        width: 100%;
        backdrop-filter: blur(5px);
    }
}
</style>
<style>
.p-toolbar-end {
    gap: 20px;
}
</style>