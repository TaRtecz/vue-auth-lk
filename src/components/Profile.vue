<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{info}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.phone}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  created() {
    this.info = this.$store.state.auth.user;
    console.log(this.$store.state.auth.user)
  },

  mounted() {
      this.info = this.$store.state.auth.user.first_name
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>