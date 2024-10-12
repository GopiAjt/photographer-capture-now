<template>
    <div>
        <div v-if="packageDetails.length == 0" style="display: flex; justify-content: center;">
            <h3>No Packages Found!</h3>
        </div>
        <div class="card" v-for="packages in packageDetails" :key="packages.id">
            <Panel>
                <template #header>
                    <strong style="font-weight: bold;">{{ packages.packageName }}</strong>
                </template>

                <p class="m-0">
                    <strong style="font-weight: 500;">Description:</strong><br>
                    <!-- <span v-html="HelperService.addLineBreaks(packages.description)"></span> -->
                <pre class="formatted-text-display">{{ packages.description }}</pre>
                </p>

                <br>
                <div class="p-footer">
                    <p>
                        <strong>Event Price:</strong> {{ packages.eventRate }}
                    </p>
                    <p>
                        <strong>One Day Price:</strong> {{ packages.oneDayRate }}
                    </p>
                    <p>
                        <strong>One Hour Price:</strong> {{ packages.oneHourRate }}
                    </p>
                    <p>
                        <strong>Video Price:</strong> {{ packages.videoRate }}
                    </p>
                </div>
                <template #footer>
                    <div class="p-footer">
                        <p>
                            <strong>Total Price:</strong> {{ packages.eventRate + 100 }}
                        </p>
                        <Button icon="pi pi-trash" aria-label="delete" rounded outlined v-tooltip.bottom="'delete'"
                            @click="deletePackageVisible(packages.id)" />
                    </div>
                </template>
            </Panel>
        </div>
    </div>
</template>

<script>
import HelperService from '@/services/HelperService';
import AuthService from '@/services/AuthService';
export default {
    data() {
        return {
            visible: false,
            HelperService,
            packageDetails: this.$store.state.user.packages,
            user: this.$store.state.user
        }
    },
    methods: {
        deletePackageVisible(packageId) {
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
                        const response = await AuthService.deletePackage(packageId, this.user.authToken);
                        console.log(response);
                        if (response.status === 200) {
                            console.log('deleted');
                            this.packageDetails = this.packageDetails.filter(packages => packages.id !== packageId);
                        }
                    } catch (error) {
                        console.log(error);

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
.p-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.formatted-text-display {
    white-space: pre-wrap;
    /* This will ensure text wraps within the container */
    word-wrap: break-word;
    /* This ensures long words break and wrap */
    width: 100%;
    /* Ensure the text stays within the container width */
    overflow-wrap: break-word;
    /* Fallback for older browsers */
}

@media (max-width: 575px) {
    .p-footer {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
    }
}
</style>