<template>
<div class="title">
    <div class="grid">
        <h3 class="title-app">Простой калькулятор</h3>
            <input @keyup.enter="calc()" type="text" v-model="result" placeholder="0" class="input-calc" style="width:100%;">            
            <button  v-for="num in numbers" :key="num" @click="input(num)" class="cell num" >{{num}}</button>
            <button  v-for="op in operations" :key="op" @click="input(op)" class="cell op" >{{op}}</button>
            <button @click="reset()" class="cell op">R</button>
            <button @click="calc()" class="cell op">=</button>
        </div>
</div>
</template>


<script>

export default {
  name: "CalculatorVue",
  data() {
    return {
        result: '',
        numbers: [1,2,3,4,5,6,7,8,9,0],
        operations: ['+', '-', '*', '/'],
    };
  },
  methods: {
        input: function(char) {
            this.result = this.result.toString();
            this.result+=char;
        },
        reset: function() {
            this.result = '';
        },
        calc: function() {
            this.result = eval(this.result);
        }
    
  },
};
</script>

<style>
.title{
  margin-top: 20px;
  text-align: center;
}

.title-app{
  font-size: 22px;
  color: #243844;
  margin-bottom: 25px;
}

.input-calc {
    width: 400px;
    border: 0;
    color: #000;
    font-size: 18px;
    padding: 5px 5px;
    text-align: right;
}

.grid{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 50%;
}

.cell{
    flex: 33%;
    height: 50px;
    font-size: 18px;
    border: none;
}

.num{
    background-color: #243844;
    color: honeydew;
    font-weight: 400;
}

.cell:hover{
    background-color: #243854;
}

.op{
    background-color: khaki;
    color: #243844;
}
</style>