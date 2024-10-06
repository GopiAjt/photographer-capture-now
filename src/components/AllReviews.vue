<template>
    <div class="card" v-for="(review, index) in reviews" :key="index">
        <Panel>
            <div style="display: flex; justify-content: space-between;">
                <div style="display: flex; gap: 10px; align-items: center;">
                    <Avatar image="/default_profile.png" size="normal" shape="circle" />
                    <div style="display: flex; flex-direction: column;">
                        <span class="font-bold">{{ review.customerName }}</span>
                        <p style="font-size: smaller;">{{ formatDate(review.ratingDate) }}</p>
                    </div>
                </div>
                <div class="rating-div">
                    <i class="pi pi-star-fill" style="font-size: 1.5rem; color: yellow; margin-right: 5px;"></i> {{
                        review.rating }}<br>
                </div>
            </div>

            <p class="m-0">
                <strong v-html="HelperService.addLineBreaks(review.comment) || 'No comment provided'"> </strong> <br>
            </p>
        </Panel>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';
export default {
    data() {
        return {
            reviews: null,
            token: this.$store.state.token
        }
    },
    methods:{
        async fetchAllReviews(){
            try {
                console.log(this.token);
                
                // const response = AuthService.fetchReviews(id, token);
                console.log(response);
                console.log(response.data);
            } catch (error) {
                console.log(error);
                
            }
        }
    },
    mounted(){
        this.fetchAllReviews();
    }
};
</script>

<style>
.p-panel-header {
    padding: 1%;
}
</style>
