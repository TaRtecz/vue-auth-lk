<template>
  <div class="container">
    <header class="jumbotron">
      <h1 v-if="!currentUser">Ваш Личный Кабинет недоступен</h1>
      <h1 v-if="currentUser">Ваш Личный Кабинет</h1>
      <h3 v-if="currentUser">Здравствуйте {{ currentUser.first_name }} {{ currentUser.last_name }}!</h3>
      <h6 v-if="currentUser">Ваш ID: {{ content.id }}</h6>
      <h6 v-if="currentUser">Ваш телефон: {{ content.phone }}</h6>
    </header>
    <div v-if="currentUser">
      <a :class="showCalc ? 'btn btn-success' : 'btn btn-light'" @click="hideCalc">{{lookCalc}}</a>
      <Calculator v-if="СalcType" />
    </div>
  </div>
</template>

<script>
import Calculator from '../components/Calculator.vue';

export default {
  name: "User",
  components:{
    Calculator,
  },
  data() {
    return {
      content:'',
      lookCalc: 'Показать калькулятор',
      СalcType: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
    methods: {
      hideCalc(){
        this.showCalc = !this.showCalc
        if (this.showCalc) {
            this.СalcType = true;
            this.lookCalc = 'Скрыть калькулятор'
          } else {
            this.СalcType = false;
            this.lookCalc = 'Показать калькулятор'
          } 
      },
    },
  mounted() {
    this.content = this.currentUser;
  },
};
</script>
