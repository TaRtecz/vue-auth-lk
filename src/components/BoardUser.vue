<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Личный Кабинет</h1>
      <h3 v-if="currentUser">Здравствуйте {{ currentUser.first_name }} {{ currentUser.last_name }}!</h3>
      <h6 v-if="currentUser">Ваш ID: {{ content.id }}</h6>
      <h6 v-if="currentUser">Ваш телефон: {{ content.phone }}</h6>
    </header>
  </div>
</template>

<script>

export default {
  name: "User",
  data() {
    return {
      content:'',
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.content = this.currentUser;
  },
};
</script>
