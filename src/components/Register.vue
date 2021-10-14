<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="phone">Номер телефона</label>
            <Field name="phone" type="text" class="form-control" />
            <ErrorMessage name="phone" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="first_name">Имя</label>
            <Field name="first_name" type="text" class="form-control" />
            <ErrorMessage name="first_name" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="last_name">Фамилия</label>
            <Field name="last_name" type="text" class="form-control" />
            <ErrorMessage name="last_name" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <Field name="password" v-bind:type="passwordType" class="form-control" />
          <a class="password-view" @click="hidePass">{{lookPass}}</a><br>
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-success btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Регистрация
            </button>
          </div>
          <router-link to="/login" class="nav-link text-center">
            <font-awesome-icon icon="sign-in-alt" /> Авторизация
          </router-link>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import axios from 'axios';
import authHeader from '../services/auth-header';
const API_URL = 'https://backend-front-test.dev.echo-company.ru/api/';

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      phone: yup
        .string()
        .required("Обязательное поле!")
        .min(3, "Минимальная длина 3 символа!")
        .max(11, "Максимальная длина 11 символов!"),
      first_name: yup
        .string()
        .required("Обязательное поле!")
        .max(50, "Максимальная длина 50 символов!"),
      last_name: yup
        .string()
        .required("Обязательное поле!")
        .max(50, "Максимальная длина 50 символов!"),
      password: yup
        .string()
        .required("Обязательное поле!")
        .min(6, "Минимальная длина 6 символа!")
        .max(40, "Максимальная длина 40 символов!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      passwordType: "password",
      showPass: false,
      lookPass: 'Показать пароль',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    hidePass(){
        this.showPass = !this.showPass
        if (this.showPass) {
            this.passwordType = 'text';
            this.lookPass = 'Скрыть пароль'
          } else {
            this.passwordType = 'password';
            this.lookPass = 'Показать пароль'
          } 
    },
    async handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

  await axios.post(API_URL + 'user/registration', {
            phone: user.phone,
            first_name: user.first_name,
            last_name: user.last_name,
            password: user.password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                axios.get(API_URL + 'user', { headers: authHeader() })
                      .then(response => {
                        if (response.data) {
                            localStorage.setItem('user', JSON.stringify(response.data));
                            user = JSON.parse(localStorage.getItem('user'));
                            console.log(user)
                            this.$store.dispatch("auth/loginuser", user)
                            this.$router.push("/home");
                        }
                        return response.data;
                    });
            }

            return response.data;
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

.password-view{
  text-decoration: none;
  cursor: pointer;
}

</style>
