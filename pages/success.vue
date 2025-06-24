<template>
    <div class="n-container-xs n-margin-i-auto n-typeset n-color-status-success-weak n-stack n-padding-xl n-margin-bs-xxl n-border-radius">
      <div class="n-stack n-align-center n-text-center n-gap-m">
        <h1 class="n-color-text-success">Registration successful!</h1>
        <div>Thank you for signing up <span class="n-color-text-succes n-font-weight-strong">{{ email }}</span>!</div>
        <div>Your account has been successfully created.</div>
        <nord-icon name="generic-amphibia" size="xxl" class="n-margin-i-auto n-margin-bs-xl" color="var(--n-color-status-success)"></nord-icon>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useSignUpStore } from '@/stores/signup'
import { useRouter } from 'vue-router'

const router = useRouter()

const signUpStore = useSignUpStore()
const email = computed(() => signUpStore.email)

if (!email.value) {
  router.push('/')
}
</script>