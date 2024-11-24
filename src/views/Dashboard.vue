<template>
    <header>
        <NavBar></NavBar>
    </header>
    <div style="display: flex; align-items: center; padding: 3%; flex-direction: column; gap: 1rem;">
        <img :src="userData.profilePhoto ? `data:image/jpeg;base64,${userData.profilePhoto}` : '/default_profile.png'" alt="" width="150px">
        <h2>{{ userData.name }}</h2>
    </div>
    <div class="card-panel">
        <Tabs v-model:value="activeTab">
            <TabList>
                <Tab value="Bookings"><i class="pi pi-book" style="font-size: 1rem"></i>
                    <p style="font-weight: bold; font-size: smaller;">Bookings</p>
                </Tab>
                <Tab value="profileDetails"><i class="pi pi-user" style="font-size: 1rem"></i>
                    <p style="font-weight: bold; font-size: smaller;">Profile</p>
                </Tab>
                <Tab value="Password"><i class="pi pi-cog" style="font-size: 1rem"></i>
                    <p style="font-weight: bold; font-size: smaller;">Password</p>
                </Tab>
                <Tab value="kyc"><i class="pi pi-cog" style="font-size: 1rem"></i>
                    <p style="font-weight: bold; font-size: smaller;">KYC</p>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="Bookings">
                    <Bookings></Bookings>
                </TabPanel>
                <TabPanel value="profileDetails">
                    <ProfileDetails></ProfileDetails>
                </TabPanel>
                <TabPanel value="Password">
                    <Password></Password>
                </TabPanel>
                <TabPanel value="kyc">
                    <Kyc></Kyc>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
    <Toast position="bottom-center" />
</template>

<script setup>
import Bookings from '@/components/dashboardComponents/Bookings.vue';
import NavBar from '@/components/NavBar.vue';
import ProfileDetails from '@/components/dashboardComponents/ProfileDetails.vue';
import Password from '@/components/dashboardComponents/Password.vue';
import Kyc from '@/components/dashboardComponents/Kyc.vue';
import { ref } from 'vue';
const activeTab = ref('Bookings'); // Set the default active tab

</script>
<script>
export default {
    components: {
        NavBar,
        Bookings,
        Kyc
    },
    data() {
        return {
            userData: this.$store.state.user,

        }
    },
    mounted() {
        this.userData = this.$store.state.user;
        console.log(this.userData);
    }
}

</script>

<style scoped>
.p-tab {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: small;
}

.card-panel {
    padding: 0% 15%;
}

@media (max-width: 575px) {
    .p-tab {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-direction: column;
    }

    .card-panel {
        padding: 0% 2%;
    }
}
</style>