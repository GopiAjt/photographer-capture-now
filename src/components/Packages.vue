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
                    <span v-html="HelperService.addLineBreaks(packages.description)"></span>
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
                        <Button label="Delete" class="p-button-sm p-button-dark" @click="deletePackage(packages.id)" raised outlined />
                    </div>
                </template>
            </Panel>
        </div>
    </div>
</template>

<script>
import HelperService from '@/services/HelperService';

export default {
    data() {
        return {
            visible: false,
            HelperService,
            packageDetails: this.$store.state.user.packages
        }
    },
    methods: {
        deletePackage(){
            console.log('deleting');
            
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

@media (max-width: 575px) {
    .p-footer {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
    }
}
</style>