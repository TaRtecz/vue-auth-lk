<template>
  <div class="container">
    <header class="jumbotron">
      <h3> Добро пожаловать! </h3>
      <h5>{{ this.$store.state.auth.user.first_name }}</h5>
      <h5>{{ this.$store.state.auth.user.last_name }}</h5>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        this.content = response.data;
        console.log(response.data)
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
