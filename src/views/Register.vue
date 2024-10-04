<template>
    <div class="card">
        <Stepper value="1">
            <StepItem value="1">
                <Step>Personal details</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div
                            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                            <InputText v-model="name" type="text" placeholder="Name" />
                            <InputText v-model="email_id" type="email" placeholder="Email Id" />
                            <InputText v-model="phoNo" type="text" placeholder="Phone No" />
                        </div>
                    </div>
                    <div class="py-6">
                        <Button label="Next" @click="activateCallback('2')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="2">
                <Step>Set Password</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div
                            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                            <Password v-model="password" toggleMask fluid />
                            <Password v-model="confirmPassword" :feedback="false" fluid />
                        </div>
                    </div>
                    <div class="flex py-6 gap-2">
                        <Button label="Back" severity="secondary" @click="activateCallback('1')" />
                        <Button label="Next" @click="activateCallback('3')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="3">
                <Step>Service Location</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div
                            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                            <InputText v-model="serviceLocation" type="text" placeholder="Service Location" /></div>
                    </div>
                    <div class="py-6">
                        <Button label="Back" severity="secondary" @click="activateCallback('2')" />
                        <Button label="Next" @click="activateCallback('4')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="4">
                <Step>Languages</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div
                            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                            <InputText v-model="languages" type="text" placeholder="Languages" /></div>
                    </div>
                    <div class="py-6">
                        <Button label="Back" severity="secondary" @click="activateCallback('3')" />
                        <Button label="Next" @click="activateCallback('5')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="5">
                <Step>Services</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div
                            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                            <InputText v-model="services" type="text" placeholder="Services" /></div>
                    </div>
                    <div class="py-6">
                        <Button label="Back" severity="secondary" @click="activateCallback('4')" />
                        <Button label="Next" @click="activateCallback('6')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="6">
                <Step>Experience</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div
                            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                            <InputText v-model="experience" type="text" placeholder="Experience" /></div>
                    </div>
                    <div class="py-6">
                        <Button label="Back" severity="secondary" @click="activateCallback('5')" />
                        <Button label="Next" @click="activateCallback('7')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="7">
                <Step>About Me</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div
                            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                            <Textarea v-model="aboutMe" autoResize rows="5" cols="40" fluid placeholder="About Me" class="responsive-textarea"/>
                        </div>
                    </div>
                    <div class="py-6">
                        <Button label="Back" severity="secondary" @click="activateCallback('6')" />
                    </div>
                </StepPanel>
            </StepItem>
        </Stepper>
    </div>
</template>

<script>
console.log('this is stepper');

</script>

<style scoped>
.responsive-textarea {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}
</style>