import { defineStore } from 'pinia'

export const useSignUpStore = defineStore('signup', () => {
    const email = ref('')
    function setEmail(newEmail: string) {
        email.value = newEmail
    }

return { email, setEmail }
})