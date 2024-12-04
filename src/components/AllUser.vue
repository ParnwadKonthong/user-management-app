<template>
  <div v-if="users.length > 0">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button class="btn btn-warning me-1" @click="editUser(user)">
              Edit
            </button>
            <button
              class="btn btn-danger ms-1"
              @click="deleteUser(user.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

     <div v-if="editingUser" class="modal">
      <div class="modal-content">
        <h3 class="p-3">Edit User</h3>
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <input
              v-model="editingUser.name"
              type="text"
              id="name"
              class="form-control"
              placeholder="Enter name"
            />
          </div>
          <div class="form-group mt-3">
            <input
              v-model="editingUser.email"
              type="email"
              id="email"
              class="form-control"
              placeholder="Enter email"
            />
          </div>
          <div class="form-actions p-3">
            <button type="submit" class="btn btn-success btn-edit me-4">Save</button>
            <button @click="cancelEdit" type="button" class="btn btn-secondary btn-edit ms-4">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div v-else>
    <p class="no-users-found">No users found</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "App",
  setup() {
    const userStore = useUserStore();
    const editingUser = ref("");
    const users = userStore.users;

    const editUser = (user) => {
      openEditDialog(user);
    };

    const openEditDialog = (user) => {
      editingUser.value = { ...user };
    };

    const updateUser = () => {
      if (editingUser.value) {
        userStore.editUser(editingUser.value.id, {
          name: editingUser.value.name,
          email: editingUser.value.email,
        });
        editingUser.value = null;
      }
    };

    const cancelEdit = () => {
      editingUser.value = null;
    };

    const deleteUser = (userId) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmed) {
        userStore.deleteUser(userId);
        location.reload();
        // window.location.reload()
        // document.location.reload()
      }
    };

    return {
      users,
      editUser,
      editingUser,
      openEditDialog,
      updateUser,
      cancelEdit,
      deleteUser,
    };
  },
};
</script>

<style scoped>

.table {
  width: 100%;
  margin-top: 20px;
}

th,
td {
  text-align: center;
}

th {
  background-color: #f8f9fa;
}

.no-users-found {
  color: #6c757d;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 50px;
}

.modal {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:rgba(0, 0, 0, 0.5);
}
.modal-content {
    width: 100%;
    max-width: 600px;
    margin: 0 3rem;
    padding: 0 2rem;
}

.btn-edit{
    width: 160px;
}
</style>
