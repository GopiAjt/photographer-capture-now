<template>
    <div v-if="!bookings || bookings.length === 0" style="text-align: center;">
        <h3>You Don't Have Any Bookings Found!</h3>
    </div>
    <div class="card" v-for="b in bookings" :key="b.bookingId">
        <Fieldset>
            <template #legend>
                <div style="display: flex; align-items: center; gap: 5px">
                    <Avatar image="/default_profile.png" shape="circle" />
                    <span style="font-weight: bold;">{{ b.customerName }}</span>
                </div>
            </template>
            <div class="b-header">
                <p style="font-weight: bold;">{{ b.bookedPackage.category }}</p>
                <h5>{{ HelperService.formatDateTime(b.bookedDateTime) }}</h5>
                <Tag :severity="getSeverity(b.status)" :value="b.status" rounded></Tag>
            </div>
            <Accordion value="0">
                <AccordionPanel>
                    <AccordionHeader>package details</AccordionHeader>
                    <AccordionContent>
                        <pre class="formatted-text-display">{{ b.bookedPackage.description }}</pre>
                        <br>
                        <div style="display: flex; justify-content: space-between;">
                            <p>Event Price: {{ b.bookedPackage.eventRate }}</p>
                            <p>Video Price: {{ b.bookedPackage.videoRate }}</p>
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
            <div style="display: flex; justify-content: space-between;">
                <h5>From: {{ HelperService.formatDateTime(b.startDate) }}</h5>
                <h5>Till: {{ HelperService.formatDateTime(b.endDate) }}</h5>
            </div>
            <br>
            <div style="display: flex; gap: 2rem;">
                <Button label="Accept" @click="confirmAccept($event, b.bookingId)" fluid outlined></Button>
                <Button label="Cancel" @click="confirmDecline($event, b.bookingId)" text raised />
            </div>
        </Fieldset>
    </div>
    <ConfirmDialog></ConfirmDialog>
</template>

<script>
import AuthService from '@/services/AuthService';
import { useStore } from 'vuex';
import HelperService from '@/services/HelperService';

export default {
    data() {
        return {
            bookings: [],
            HelperService,
            photographer: this.$store.state.user
        }
    },
    computed: {
        store() {
            return useStore();
        }
    },
    methods: {
        async getBookingData() {
            try {
                const response = await AuthService.getBookings(this.photographer.email, this.photographer.authToken);
                this.bookings = response.data;
                console.log(response.data);

            } catch (error) {
                console.error('Error fetching bookings:', error);
                this.$toast.add({ severity: 'error', summary: 'Failed to load bookings', life: 3000 });
            }
        },
        confirmDecline(event, bookingId) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Do you want to decline this booking?',
                icon: 'pi pi-info-circle',
                position: 'bottom',
                rejectProps: {
                    label: 'No',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Yes',
                    severity: 'danger',
                    outlined: true
                },
                accept: async () => {
                    await this.declineBooking(bookingId);
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Cancelled', detail: 'You rejected the cancellation', life: 3000 });
                }
            });
        },
        confirmAccept(event, bookingId) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Do you want to accept this booking?',
                icon: 'pi pi-info-circle',
                position: 'bottom',
                rejectProps: {
                    label: 'No',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Yes',
                    severity: 'danger',
                    outlined: true
                },
                accept: async () => {
                    await this.acceptBooking(bookingId);
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Cancelled', detail: 'You rejected the cancellation', life: 3000 });
                }
            });
        },
        async acceptBooking(bookingId) {
            try {
                await AuthService.acceptBooking(bookingId, this.photographer.authToken);
                this.getBookingData(); // Refresh bookings after cancellation
                this.$toast.add({ severity: 'success', summary: 'Accepted', detail: 'Booking has been Accepted', life: 3000 });
            } catch (error) {
                console.error('Error accepting booking:', error);
                this.$toast.add({ severity: 'error', summary: 'Failed', detail: 'Failed to Accept booking', life: 3000 });
            }
        },
        async declineBooking(bookingId) {
            try {
                await AuthService.declineBooking(bookingId, this.photographer.authToken);
                this.getBookingData(); // Refresh bookings after cancellation
                this.$toast.add({ severity: 'info', summary: 'Declined', detail: 'Booking has been Declined', life: 3000 });
            } catch (error) {
                console.error('Error declining booking:', error);
                this.$toast.add({ severity: 'error', summary: 'Failed', detail: 'Failed to Decline booking', life: 3000 });
            }
        },
        getSeverity(status) {
            switch (status) {
                case 'Created':
                    return 'Contrast'
                case 'Accepted':
                    return 'success';
                case 'Pending':
                    return 'warning';
                case 'Rejected':
                    return 'danger';
                default:
                    return 'secondary';
            }
        }
    },
    mounted() {
        this.getBookingData();
    }
}
</script>

<style scoped>
.b-header {
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
</style>