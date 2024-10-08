<template>
    <div class="nav-card">
        <Toolbar id="blurred-toolbar">
            <template #start>
                <img src="/CaptureNow.svg" alt="CaptureNoww" width="40px" @click="navigateTo('/')"
                    style="cursor: pointer;">
            </template>


            <template #end>
                <Button 
                    icon="pi pi-images" 
                    aria-label="Album" rounded raised 
                    v-tooltip.bottom="'Add Albums'" 
                    @click="addAlbumVisible = true"
                />
                <Button 
                    icon="pi pi-list-check" 
                    aria-label="Packages" rounded raised
                    v-tooltip.bottom="'Add Packages'" 
                    @click="addPackageVisible = true"
                />
                <Button 
                    icon="pi pi-briefcase" 
                    aria-label="Equipments" rounded raised
                    v-tooltip.bottom="'Add Equipments'" 
                    @click="addEquipmentVisible = true"
                />
                <span style="color: black;">|</span>

                <Avatar class="mr-2" size="1.5rem" style="background-color: #fff0; color: #2a1261" shape="circle">
                    <div style="display: flex; justify-self: center;" class="card">
                        <img src="/default_profile.png" width="35" alt="" @click="toggle" aria-controls="overlay_menu"
                            style="cursor: pointer;">
                        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                    </div>
                </Avatar>
            </template>
        </Toolbar>
    </div>
    <Drawer v-model:visible="addAlbumVisible" header="Add Albums" position="bottom" style="height: auto">
        <AddAlbums></AddAlbums>
    </Drawer>
    <Drawer v-model:visible="addPackageVisible" header="Add Package" position="full">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo
            consequat.</p>
    </Drawer>
    <Drawer v-model:visible="addEquipmentVisible" header="Add Equipments" position="bottom" style="height: auto">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo
            consequat.</p>
    </Drawer>
</template>

<script>
import AddAlbums from '@/components/AddAlbums.vue';
export default {
    components:{
        AddAlbums
    },
    data() {
        return {
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => {
                        this.$router.push('/userProfile');
                    }
                },
                {
                    label: 'Log Out',
                    icon: 'pi pi-external-link',
                    command: () => {
                        // this.$toast.add({ severity: 'success', summary: 'Log Out', detail: 'You have been logged out', life: 3000 });
                        this.$store.dispatch('logout');
                    }
                }
            ],
            addAlbumVisible: false,
            addPackageVisible: false,
            addEquipmentVisible: false
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        toggle(event) {
            this.$refs.menu.toggle(event);
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

.p-menu-item-link {
    padding: 5%;
}

.p-menu {
    min-width: 10rem;
}

.p-menu-item-label {
    color: rgb(114, 114, 114);
    font-weight: 600;
}
</style>