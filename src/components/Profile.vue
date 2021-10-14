<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong v-if="currentUser">Пасхалка)</strong> 
      </h3>
      <h3 v-if="currentUser">
        <p class="todolist">В разработке To Do List и собственный back-end</p> 
      </h3>
    </header>
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
    console.log(this.$store.state.auth.user)
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.todolist{
  color: #e9ecef;
  -webkit-touch-callout: none; 
  -webkit-user-select: none;   
  -moz-user-select: none;     
  -ms-user-select: none;       
  user-select: none;           
}
.todolist:hover{
  color: #8a8c8f;
}
</style>