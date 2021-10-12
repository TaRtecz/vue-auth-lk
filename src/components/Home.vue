<template>
  <div class="container">
    <header class="jumbotron">
      <h3> {{welcome_msg}} </h3>
      <h5></h5>
      <h5 v-if="currentUser">{{currentUser.first_name}} {{currentUser.last_name}}</h5>
      <div v-else>Пожалуйста войдите или зарегистрируйтесь
        <div class="flex-not-auth">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Войти
          </router-link>
        <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Регистрация
          </router-link>
          </div>
        
      </div>
    </header>
  </div>
</template>

<script>
// import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
      welcome_msg: "Добро пожаловать!",
    };
  },
computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    // UserService.getUserBoard().then(
    //   (response) => {
    //     this.content = response.data;
    //     console.log(response.data)
    //   },
    //   (error) => {
    //     this.content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },
};
</script>


<style>
.flex-not-auth{
  display: flex;
}
</style>