<template>
  <div>
    <form @submit.prevent="validateForm">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="text" @keydown="validateEmail"/>
        <div v-if="errors.email.length" >
          <span v-for="(error, index) in errors.email" :key="index" class="error-item">{{ error }}</span>
        </div>
      </div>
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text"/>
        <div v-if="errors.username.length">
          <span v-for="(error, index) in errors.username" class="error-item" :key="index">{{ error }}</span>
        </div>
      </div>
      <div>
        <label for="city">City:</label>
        <input id="city" v-model="city" type="text" @keydown="validateCity"/>
        <div v-if="errors.city.length">
          <span v-for="(error, index) in errors.city" class="error-item" :key="index">{{ error }}</span>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import ValidationEngine from '../rules/ValidationEngine';
import RegexValidationRule from "@/rules/RegexValidationRule.ts";
import {IValidationRule} from "@/index.ts";

export default defineComponent({
  name: 'ValidationForm',
  setup() {
    const email = ref('');
    const username = ref('');
    const city = ref('')
    const errors = ref({email: [], username: [], city: []});

    const rulesForEmail = ['email', 'required'];
    const rulesForUsername = [
      'required',
      {
        rule: 'max',
        params: {length: 15},
        message: "Maximum length is 15 characters."
      },
      {
        rule: 'min',
        params: {length: 3},
        message: "Minimum length is 3 characters."
      }];

    const rulesForCity : IValidationRule[] = [
      new RegexValidationRule("^[a-zA-Z]+$")
    ]

    const validationEngineForEmail = new ValidationEngine(rulesForEmail);
    const validationEngineForUsername = new ValidationEngine(rulesForUsername);
    const validationEngineForCity = new ValidationEngine(rulesForCity);

    const validateForm = () => {
      errors.value.email = [];
      errors.value.username = [];

      const emailResult = validationEngineForEmail.validateValue(email.value);
      if (!emailResult.isValid) {
        errors.value.email = emailResult.errors;
      }

      const usernameResult = validationEngineForUsername.validateValue(username.value);
      if (!usernameResult.isValid) {
        errors.value.username = usernameResult.errors;
      }

      if (emailResult.isValid && usernameResult.isValid) {
        alert('Form is valid!');
      } else {
        alert('Form has errors.');
      }
    };

    const validateEmail = () => {
      errors.value.email = [];
      const emailResult = validationEngineForEmail.validateValue(email.value);
      if (!emailResult.isValid) {
        errors.value.email = emailResult.errors;
      }
    }

    const validateCity = () => {
      errors.value.city = [];
      const cityResult = validationEngineForCity.validateValue(city.value);
      if (!cityResult.isValid) {
        errors.value.city = cityResult.errors;
      }
    }

    return {
      email,
      username,
      city,
      errors,
      validateForm,
      validateEmail,
      validateCity
    };
  }
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}

div {
  margin-bottom: 16px;
  text-align: left;
}

label {
  margin-bottom: 4px;
  margin-right: 10px;
  width: 100px;
}

input {
  padding: 8px;
  font-size: 16px;
}

span {
  color: red;
  font-size: 12px;
}

button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>
