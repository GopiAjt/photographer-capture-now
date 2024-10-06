<template>
    <NavBar ></NavBar>
    <div class="card-container" v-if="photographer">
        <Card style="width: 100%; overflow: hidden">
            <template #header class="profile-img">
                <img :src="photographer.profilePhoto ? `data:image/jpeg;base64,${photographer.profilePhoto}` : '/default_profile.png'"
                    class="card-img-top" alt="Photographer Image" />
            </template>
            <template #title>
                <div class="p-info">
                    <i class="pi pi-user" style="font-size: 1rem"></i>
                    <h3 style="font-weight: bold;"> {{ photographer.name }}</h3>
                </div>
                <div class="p-info">
                    <div>
                        <div class="rating-div">
                            <i class="pi pi-star-fill"
                                style="font-size: 1.5rem; color: yellow; margin-right: 5px;"></i>{{
                                    photographer.avgRating }}
                        </div>
                    </div>
                </div>
            </template>
            <template #subtitle>
                <div class="p-info">
                    <i class="pi pi-map-marker" style="font-size: 1rem"></i> {{ photographer.serviceLocation }}
                </div>
            </template>

            <template #content>
                <p class="p-info">
                    <strong><i class="pi pi-face-smile" style="font-size: 1rem"></i></strong> {{ photographer.experience
                    }} year(s)
                </p>
                <p class="p-info">
                    <strong><i class="pi pi-language" style="font-size: 1rem"></i></strong> {{ photographer.languages }}
                </p>
                <p class="p-info">
                    <strong><i class="pi pi-camera" style="font-size: 1rem"></i></strong> {{ photographer.services }}
                </p>
                <p class="p-info">
                    <i class="pi pi-info-circle" style="font-size: 1rem"></i> {{ photographer.aboutMe }}
                </p>
            </template>
            <template #footer>

            </template>
        </Card>
    </div>

    <div class="card" v-if="photographer">
        <Tabs v-model:value="activeTab">
            <TabList>
                <Tab value="Albums"><i class="pi pi-images" style="font-size: 1rem"></i><span
                        style="font-weight: bold; font-size: smaller;">Albums</span></Tab>
                <Tab value="Packages"><i class="pi pi-list-check" style="font-size: 1rem"></i><span
                        style="font-weight: bold; font-size: smaller;">Packages</span></Tab>
                <Tab value="Equipments"><i class="pi pi-briefcase" style="font-size: 1rem"></i><span
                        style="font-weight: bold; font-size: smaller;">Equipments</span></Tab>
                <Tab value="Reviews"><i class="pi pi-star" style="font-size: 1rem"></i><span
                        style="font-weight: bold; font-size: smaller;">Reviews</span></Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="Albums">
                    <!-- <PhotographerAlbums :photographer_id="photographer.pid" /> -->
                </TabPanel>
                <TabPanel value="Packages">
                    <!-- <PackageDetails :packageDetails="package" :photographer_id="photographer.pid" /> -->
                </TabPanel>
                <TabPanel value="Equipments">
                    <!-- <PhotographerEquipments :photographer_id="photographer.pid" /> -->
                </TabPanel>
                <TabPanel value="Reviews">
                    <AllReviews />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
    <Toast position="bottom-center" />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import AllReviews from '@/components/AllReviews.vue';
import { ref } from 'vue';
const activeTab = ref('Albums'); // Set the default active tab
</script>
<script>
export default {
    data() {
        return {
            photographer: this.$store.state.user,
        }
    },
    mounted() {
        console.log(this.photographer);

    }
} 
</script>

<style scoped>
img {
    width: 20vw;
}

.p-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.p-card {
    flex-direction: row;
}

.card-container {
    padding-left: 15vw;
    padding-right: 15vw;
    padding-top: 3vw;
}

.card {
    margin-top: 15px;
    margin-left: 15vw;
    margin-right: 15vw;
}

.p-tab {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: small;
}

@media (max-width: 575px) {
    img {
        width: 15rem;
        border-radius: 100%;
    }

    .p-card {
        flex-direction: column;
    }

    .card-container {
        padding-left: 3vw;
        padding-right: 3vw;
        padding-top: 3vw;
    }

    .card {
        margin-top: 15px;
        margin-left: 3vw;
        margin-right: 3vw;
    }

    .p-card-body {
        width: 100%;
    }

    .p-tab {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-direction: column;
        padding: 1rem;
    }

}
</style>