<template>
  <div class="product-sign-up n-typeset n-container-xxs n-box-shadow-card n-padding-xxl n-margin-i-auto n-margin-bs-xxl n-border-radius">
    <div class="n-stack n-gap-m">
      <h1 class="product-sign-up__title n-font-size-xxxl">Sign up for our product</h1>
      <nord-input label="Email" v-model="form.email" :error="errors.email" required novalidate expand></nord-input>
      <div class="product-sign-up__password n-margin-be-l n-width-full">
        <nord-input label="Password" v-model="form.password" :type="passwordVisible ? 'text' : 'password'" :error="errors.password" required novalidate expand></nord-input>
        <nord-icon :name="passwordVisible ? 'interface-edit-on' : 'interface-edit-off'" class="product-sign-up__password-icon" @click="togglePassword"/>
      </div>
      <nord-checkbox label="Send me occasional product updates and announcements" type="checkbox" v-model="form.productUpdates" aria-label="Allow updates"></nord-checkbox>
      <nord-button variant="primary" @click="register" :disabled="isLoading">
        {{ isLoading ? 'Registering...' : 'Register' }}
        <nord-icon slot="end" v-if="isLoading">
          <span class="product-sign-up__spinner"></span>
        </nord-icon>
      </nord-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormData, FormErrors } from "@/stores/types/types";
import { useSignUpStore } from '@/stores/signup'

const router = useRouter()
const signUpStore = useSignUpStore()

const form = ref<FormData>({
  email: '',
  password: '',
  productUpdates: false
})

const errors = ref<FormErrors>({
  email: '',
  password: ''
})

const isLoading = ref(false)
const passwordVisible = ref(false)
const togglePassword = () => (passwordVisible.value = !passwordVisible.value)

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPassword(password: string): boolean {
  const lengthRequirement = password.length >= 8
  const digitRequirement = /\d/.test(password)
  const specialCharRequirement = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  return lengthRequirement && digitRequirement && specialCharRequirement
}

const register = async () => {
  errors.value = { email: '', password: '' }

  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (!isValidPassword(form.value.password)) {
    errors.value.password =
        'Password must be at least 8 characters long, contain a number and a special character'
  }

  if (!errors.value.email && !errors.value.password) {
    isLoading.value = true

    // Simulate sending request
    await new Promise((resolve) => setTimeout(resolve, 1500))

    signUpStore.setEmail(form.value.email)
    isLoading.value = false
    router.push('/success')
  }

}
</script>

<style lang="scss" scoped>
  .product-sign-up {
    &__title {
      font-weight: var(--n-font-weight);
    }

    &__password {
      position: relative;
    }

    &__password-icon {
      position: absolute;
      top: 38px;
      right: 10px;
      cursor: pointer;
    }

    &__spinner {
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 2px solid var(--n-color-text);
      border-top: 2px solid transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      position: absolute;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  }
</style>