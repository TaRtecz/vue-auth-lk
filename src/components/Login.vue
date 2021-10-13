<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="phone">Номер телефона</label>
          <Field name="phone" type="text" class="form-control" />
          <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <Field name="password" v-bind:type="passwordType" class="form-control" />
          <a :class="showPass ? 'password-view' : 'password-not-view'" @click="hidePass"></a>
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Войти</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
      <router-link to="/forgotpass" class="btn btn-secondary">Забыли Пароль?</router-link>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import axios from 'axios';
import authHeader from '../services/auth-header';

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      phone: yup.string().required("Обязательное поле!"),
      password: yup.string().required("Обязательное поле!"),
    });

    return {
      loading: false,
      message: "",
      schema,
      passwordType: "password",
      showPass: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    hidePass(){
       this.showPass = !this.showPass
       if (this.showPass) {
          this.passwordType = 'text';
        } else {
          this.passwordType = 'password';
        } 
    },
    async handleLogin(user) {
      this.loading = true;
        await axios.post('https://backend-front-test.dev.echo-company.ru/api/auth/login', {
                phone: user.phone,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    axios.get('https://backend-front-test.dev.echo-company.ru/api/user', { headers: authHeader() })
                      .then(response => {
                        if (response.data) {
                            localStorage.setItem('user', JSON.stringify(response.data));
                            user = JSON.parse(localStorage.getItem('user'));
                            console.log(user)
                            this.$store.dispatch("auth/loginuser", user)
                            this.$router.push("/user");
                        }
                        //return response.data;
                    });
                }
            },(error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}

.password-not-view{
  position: absolute;
  cursor: pointer;
  top: 284px;
  right: 50px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../assets/view.svg") 0 0 no-repeat;
}

.password-view{
  position: absolute;
  cursor: pointer;
  top: 284px;
  right: 50px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../assets/no-view.svg") 0 0 no-repeat;
}


</style>
