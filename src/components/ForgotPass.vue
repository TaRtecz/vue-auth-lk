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
                        <input v-model="forgotForm.phone" type="text" class="form-control" id="phone" placeholder="Телефон">
                    </div>
                    <button @click="nextStep"  type="submit" class="btn btn-primary">Отправить код</button>
                </div>
            </form>
            <form @submit.prevent="forgotPass">
                <div v-show="step === 2" class="step">
                    <div class="form-group">
                        <label for="codeSMS">Код из СМС</label>
                        <input v-model="forgotForm.codeSMS" type="text" class="form-control" id="codeSMS" placeholder="Код из СМС">
                        <p>Отправить код повторно, через {{timertoSend}} секунд</p>
                        <button type="button" class="codeResend btn mt-2" v-bind:disabled="isButtonDisabled">Отправить код повторно</button>
                    </div>
                    <button @click="backStep" type="button" class="btn btn-light mr-2">Назад</button>
                    <button type="submit" class="btn btn-primary">Подтвердить код</button>
                </div>
            </form>
            <div
                    v-if="message"
                    class="alert"
                    :class="successful ? 'alert-success' : 'alert-danger'"
                >
                    {{ message }}
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
export default {
    name: 'ForgotPass',
    data() {
        return {
            msg: 'Восстановление пароля',
            step: 1,
            message: "",
            isButtonDisabled: true,
            timertoSend: 20,
            forgotForm: {
                phone: '',
                codeSMS: '',
            },
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
        nextStep() {
            if (this.step < 2) {
                this.step++;
                setTimeout(() => this.isButtonDisabled = false, 20000);
            
                // if(this.timertoSend > 0) {
                //     setInterval(() => {
                //         this.timertoSend--
                //     }, 1000)
                // }
            }
        },
        backStep() {
            if (this.step > 1) {
                this.step--;
                this.isButtonDisabled = true;
                this.timertoSend = 20;
            }
        },
        handleForgotPass(forgotForm) {
            this.loading = true;

            this.$store.dispatch("auth/login", forgotForm).then(
                (data) => {
                this.message = data.message;

                },
                (error) => {
                this.loading = false;
                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                }
            );
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>