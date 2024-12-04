<template>
  <div class="d-flex justify-content-center align-items-center">
    <form @submit.prevent="addUser">
      <div class="row pb-4">
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter Name"
        />
      </div>

      <div class="row pb-4">
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter Email"
        />
      </div>

      <div class="text-center">
        <button
          type="submit"
          class="btn btn-info btn-custom"
          :disabled="!name || !email"
        >
          Add user
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const userStore = useUserStore();

    const addUser = () => {
      if (name.value && email.value) {
        userStore.addUser({ name: name.value, email: email.value });
        name.value = "";
        email.value = "";
      }
    };

    return {
      name,
      email,
      addUser,
    };
  },
};
</script>

<style>
.btn-custom {
  width: 200px;
}
form {
  width: 100%;
  max-width: 600px;
}
</style>
