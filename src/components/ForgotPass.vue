<template>
    <div class="container">
        <header class="jumbotron">
            <h3>{{ content }}</h3>
        
        <h2 class="text-center">{{ msg }}</h2>
    <div class="row">
        <div class="col-12 col-md-6 mx-auto">
            <form @submit.prevent="handleForgotPass">
                <div v-show="step === 1" class="step">
                    <div class="form-group">
                        <label for="phone">Телефон</label>
                        <input v-model="phone" type="text" class="form-control" id="phone" placeholder="Телефон">
                    </div>
                    <button @click="nextStep"  type="submit" class="btn btn-success">Отправить код</button>
                </div>
            </form>
            <form  v-if="!successful"  @submit.prevent="forgotPassConfirm">  
                <div v-show="step === 2" class="step">
                    
                    <div class="form-group">
                        <label for="codeSMS">Код из СМС</label>
                        <input v-model="codeSMS" type="text" class="form-control" id="codeSMS" maxlength="4" placeholder="Код из СМС">
                        <p v-if="countDown > 0">Отправить код повторно, через {{countDown}} секунд</p>
                        <button @click="resendCode" type="button" class="codeResend btn btn-light mt-2" v-else>Отправить код повторно</button>
                    </div>
                    <div class="form-group">
                        <label for="password">Новый пароль</label>
                        <input v-model="password" v-bind:type="passwordType" class="form-control" id="password" placeholder="Новый пароль">
                        <a class="password-view" @click="hidePass">{{lookPass}}</a><br>
                    </div>
                    <button v-if="!successful" @click="backStep" type="button" class="btn btn-light mr-2">Назад</button>
                    <button v-if="!successful" type="submit" class="btn btn-success">Подтвердить код</button>
                </div>
            </form>
            <div
                    v-if="message"
                    class="alert mt-3"
                    :class="successful ? 'alert-success' : 'alert-danger'"
                >
                    {{ message }}
                <div
                        v-if="successful"
                        class="mt-3"
                        :class="successful ? 'alert-success' : 'alert-danger'"
                    >
                        Перейдите на страницу Авторизации
                    <router-link to="/login" class="nav-link text-center mt-3">
                        <font-awesome-icon icon="sign-in-alt" /> Авторизация
                    </router-link>
                </div>
            </div>
            
            <div class="mt-2">
                <router-link to="/register" class="badge badge-secondary mr-2 p-1">Регистрация</router-link>
                <router-link to="/login" class="badge badge-secondary p-1">Вспомнил пароль!</router-link>
            </div>
        </div>        
    </div>
    </header>
  </div>
</template>



<script>
import axios from 'axios';
const API_URL = 'https://backend-front-test.dev.echo-company.ru/api/';

export default {
    name: 'ForgotPass',
    data() {
        return {
            msg: 'Восстановление пароля',
            step: 1,
            message: "",
            isButtonDisabled: true,
            phone: '',
            codeSMS: '',
            password: '',
            countDown : 20,
            successful: false,
            passwordType: "password",
            showPass: false,
            lookPass: 'Показать пароль',
        }
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
            this.lookPass = 'Скрыть пароль'
            } else {
            this.passwordType = 'password';
            this.lookPass = 'Показать пароль'
            } 
        },
        countDownTimer() {
                if(this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
            },

        nextStep() {
            if (this.phone != ""){
                if (this.step < 2) {
                    this.step++;
                    setTimeout(() => this.isButtonDisabled = false, 20000);
                }
            }
        },
        backStep() {
            if (this.step > 1) {
                this.step--;
                this.isButtonDisabled = true;
                this.countDown = 20;
                this.message = '';
            }
        },
    async handleForgotPass() {
            this.loading = true;

        await axios.post(API_URL + 'user/forgot-start', {
            phone: this.phone,
        })
        .then(response => {
            if (response.data) {
                this.message = response.data.message;
                if (response.data.success == true){
                    this.countDownTimer()
                    console.log(response.data);
                }
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

       async resendCode(){
           this.loading = true;
            this.countDown = 20;
            this.message = '';
        await axios.post(API_URL + 'user/forgot-start', {
            phone: this.phone,
        })
        .then(response => {
            if (response.data) {
                this.message = response.data.message;
                if (response.data.success == true){
                    this.countDownTimer()
                    console.log(response.data);
                }
                
                
            }

            return response.data;
        },(error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          
          this.loading = false;
        });
        },

        async forgotPassConfirm(){
           this.loading = true;
            this.countDown = 0;
            this.message = '';
        await axios.post(API_URL + 'user/forgot-end', {
            phone: this.phone,
            code: this.codeSMS,
            password: this.password,
        })
        .then(response => {
            if (response.data) {
                this.message = response.data.message;
                if (response.data.success == true){
                    this.successful = true;
                    console.log(response.data);
                }
                
                
            }

            return response.data;
        },(error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
         
          this.loading = false;
        });
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.password-view{
  text-decoration: none;
  cursor: pointer;
}
</style>