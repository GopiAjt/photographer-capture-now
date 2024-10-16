<template>
    <div class="album-card">
        <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="images"
            :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px" :circular="true"
            :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
            <template #item="slotProps">
                <img :src="`data:image/jpeg;base64,${slotProps.item.photo}`" :alt="slotProps.item.name"
                    style="width: 100%; display: block" />
            </template>
            <template #thumbnail="slotProps">
                <img :src="`data:image/jpeg;base64,${slotProps.item.photo}`" :alt="slotProps.item.name"
                    style="display: block; width: 100%;" />
            </template>
        </Galleria>

        <div v-if="images" class="album-images">
            <div v-for="(image, index) in images" :key="index">
                <img :src="`data:image/jpeg;base64,${image.photo}`" :alt="image.name" style="cursor: pointer"
                    @click="imageClick(index)" class="images" />

                <div class="album-images-foot">
                    <p>{{ image.category }}</p>
                    <Button icon="pi pi-trash" aria-label="Album" rounded outlined v-tooltip.bottom="'delete'"
                        @click="deleteEquipmentVisible(image.id)" />
                </div>
            </div>
        </div>
    </div>
    <div v-if="images" style="text-align: center;">
        <ProgressSpinner v-if="Loading" style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
            animationDuration=".5s" aria-label="Loading.." />
        <h3 v-if="images.length === 0">No Albums to Display!</h3>
    </div>
    <div class="card">
        <Paginator :rows="pageSize" :totalRecords="totalPhotographers" :rowsPerPageOptions="[10, 20, 30]"
            @page="onPageChange">
        </Paginator>
    </div>
    <LoadingScreen :isVisible="isLoading"></LoadingScreen>
</template>

<script>
import LoadingScreen from './LoadingScreen.vue';
import AuthService from '@/services/AuthService';
import { useStore } from 'vuex';
import { ref, watch } from 'vue';

export default {
    components: {
        LoadingScreen
    },
    data() {
        return {
            user: this.$store.state.user,
            isLoading: false
        }
    },
    setup(props) {
        const store = useStore(); // Access Vuex store
        const images = ref([]);
        const activeIndex = ref(0);
        const displayCustom = ref(false);
        const page = ref(0);
        const pageSize = ref(10);
        const totalPhotographers = ref(0);
        const Loading = ref(false);
        const responsiveOptions = [
            { breakpoint: '1024px', numVisible: 5 },
            { breakpoint: '768px', numVisible: 3 },
            { breakpoint: '560px', numVisible: 1 }
        ];

        const loadAlbums = async () => {
            Loading.value = true;
            try {
                const offset = page.value * pageSize.value;
                const response = await AuthService.fetchEquipments(store.state.user.id, offset, pageSize.value, store.state.user.authToken);
                console.log(response.data);

                images.value = response.data.content;
                totalPhotographers.value = response.data.totalElements;
                Loading.value = false;
            } catch (error) {
                console.log(error);
                Loading.value = false;
            }
        };

        const imageClick = (index) => {
            activeIndex.value = index;
            displayCustom.value = true;
        };

        const onPageChange = (event) => {
            page.value = event.page;
            pageSize.value = event.rows;
            loadAlbums();
        };

        watch(() => props.photographer_id, loadAlbums, { immediate: true });
        watch([page, pageSize], loadAlbums);

        return {
            images,
            activeIndex,
            displayCustom,
            responsiveOptions,
            page,
            pageSize,
            totalPhotographers,
            Loading,
            imageClick,
            onPageChange,
            loadAlbums
        };
    },
    methods: {
        deleteEquipmentVisible(photoId) {
            this.$confirm.require({
                message: 'Do you want to delete this Equipment?',
                header: 'Delete Equipment',
                icon: 'pi pi-info-circle',
                rejectProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Delete',
                    severity: 'danger'
                },
                accept: async () => {
                    try {
                        this.isLoading = true;
                        const response = await AuthService.deleteAlbum(photoId, this.user.authToken);
                        console.log(response);
                        if (response.status === 200) {
                            console.log('deleted');
                            this.loadAlbums();
                        }
                    } catch (error) {
                        console.log(error);
                    }finally{
                        this.isLoading = false;
                    }
                    this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Photo deleted', life: 3000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
        }
    }
};
</script>

<style scoped>
.album-card {
    display: flex;
    justify-content: center;
}

.album-images {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 1.5rem;
}

.album-images-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;

}

.images {
    width: 400px;
}

@media (max-width: 575px) {
    .images {
        width: 350px;
    }
}
</style>
<style>
.p-galleria-close-button {
    background-color: black;
}

.p-galleria-nav-button {
    background-color: black;
}
</style>