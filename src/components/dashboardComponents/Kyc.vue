<template>
    <div class="card-main">
        <div class="card-ele">
            <label for="account-number">Account Number</label>
            <InputNumber v-model="accountNumber" inputId="account-number" :useGrouping="false"
                placeholder="Enter Account Number" fluid />
        </div>
        <div class="card-ele">
            <label for="ifsc-code">IFSC Code</label>
            <InputText type="text" v-model="ifscCode" placeholder="Enter IFSC Code" />
        </div>
        <div class="card-ele">
            <label for="gov-id">Upload your Government ID</label>
            <FileUpload ref="govIdUpload" mode="basic" name="govId" url="/api/upload" accept="image/*"
                :maxFileSize="1000000" @upload="onUploadGovId" />
        </div>
        <div class="card-ele">
            <label for="studio-licence">Upload your Studio Licence (optional)</label>
            <FileUpload ref="studioLicenceUpload" mode="basic" name="studioLicence" url="/api/upload" accept="image/*"
                :maxFileSize="1000000" @upload="onUploadStudioLicence" />
        </div>
        <Button label="Submit" @click="handleSubmit" raised class="submit-btn" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            accountNumber: null,
            ifscCode: "",
            govId: "",
            stdLicence: "",
        };
    },
    methods: {
        async handleSubmit() {
            // Validate fields
            if (!this.accountNumber || !this.ifscCode) {
                this.$toast.add({
                    severity: "error",
                    summary: "Validation Error",
                    detail: "Account Number and IFSC Code are required.",
                    life: 3000,
                });
                return;
            }

            // Trigger file uploads
            try {
                const govIdUploadStatus = await this.$refs.govIdUpload.upload();
                const studioLicenceUploadStatus = await this.$refs.studioLicenceUpload.upload();

                // Show success message after all uploads
                this.$toast.add({
                    severity: "success",
                    summary: "Submission Successful",
                    detail: "All data and files have been submitted.",
                    life: 3000,
                });
            } catch (error) {
                // Handle errors
                this.$toast.add({
                    severity: "error",
                    summary: "Submission Error",
                    detail: "Failed to upload files. Please try again.",
                    life: 3000,
                });
            }
        },
        onUploadGovId() {
            this.$toast.add({
                severity: "info",
                summary: "Government ID Uploaded",
                detail: "File uploaded successfully.",
                life: 3000,
            });
        },
        onUploadStudioLicence() {
            this.$toast.add({
                severity: "info",
                summary: "Studio Licence Uploaded",
                detail: "File uploaded successfully.",
                life: 3000,
            });
        },
    },
};
</script>

<style scoped>
.card-main {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: 0 auto;
}

.card-ele {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.card-ele label {
    font-weight: bold;
}

.submit-btn {
    align-self: center;
    margin-top: 20px;
}
</style>
