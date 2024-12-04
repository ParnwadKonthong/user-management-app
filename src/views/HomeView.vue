<script setup>
import AddUser from "../components/AddUser.vue";
import AllUser from "../components/AllUser.vue";
</script>

<template>
  <div class="main container-fluid text-center p-5">
    <h2 class="pb-5">Management📝</h2>
    <AddUser />
    <hr />
    <AllUser />
  </div>
</template>

<style>
.main {
  height: 100dvh;
  position: relative;
  user-select: none;
}
</style>
