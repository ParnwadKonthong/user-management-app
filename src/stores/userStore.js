import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")) || [],
  }),
  actions: {
    addUser(user) {
      const isDuplicate = this.users.some(
        (existingUser) =>
          existingUser.name === user.name || existingUser.email === user.email
      );
      if (isDuplicate) {
        alert("This name or email already exists!");
      } else {
        const newUser = {
          ...user,
          id: new Date().getTime(),
        };
        this.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(this.users));
      }
    },
    editUser(editingUser, updatedData) {
      const isDuplicate = this.users.some((user) => {
        return (user.email === editingUser.email || user.name === editingUser.name) && user.id !== editingUser.id
      })
      if (isDuplicate) {
        alert("This name or email already exists!");
      } else {
        const userIndex = this.users.findIndex((user) => user.id === editingUser.id);
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.users[userIndex], ...updatedData };
          localStorage.setItem("users", JSON.stringify(this.users));
        }
      }
    },
    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
      localStorage.setItem("users", JSON.stringify(this.users));                          
    },
  },
});
