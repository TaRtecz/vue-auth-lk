<template>
  <div class="container">
    <header class="jumbotron">
      <h3> {{welcome_msg}} </h3>
      <h5></h5>
      <div>
        <div class="flex-not-auth">
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