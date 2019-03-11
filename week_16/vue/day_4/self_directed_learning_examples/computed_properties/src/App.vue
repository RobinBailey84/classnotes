<template>
  <div id="app">
    <header>
      <h1>Bank of CodeClan</h1>
      <h2>Total deposits: £ {{ totalDeposits }}</h2>
      <p>Total Deposits ☝️ should update dynamically when we add a new account.</p>
    </header>

    <form>
      <h3>Add a new Account</h3>
      <input placeholder="Name" type="text" v-model="newName" />
      <input type="number" v-model="newBalance" />
      <button v-on:click="saveAccount">Add Account</button>
    </form>

    <section>
      <div class="account" v-for="account in accounts">
        <h2>{{ account.name }}</h2>
        <p>Balance: £{{ account.balance }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      accounts: [
        { name: "Daniella Ellicombe", balance: 600 },
        { name: "Barbara Rabson", balance: 750 },
        { name: "James Schofield", balance: 200 },
        { name: "Irma Diloway", balance: 1200 }
      ],
      newName: "",
      newBalance: 0
    }
  },
  methods: {
    saveAccount: function(event){
      event.preventDefault();

      this.accounts.unshift({
        name: this.newName,
        balance: parseInt(this.newBalance)
      });

      this.newName = "";
      this.newBalance = 0;
    }
  },
  computed: {
    totalDeposits: function(){
      return this.accounts.reduce((runningTotal, account) => runningTotal + account.balance, 0);
    }
  }
}
</script>

<style scoped>
  header {
    background: #eee;
    padding: 10px 20px;
    color: #333;
  }

  form {
    background: #eee;
    padding: 10px 20px 20px 20px;
    margin-top: 40px;
  }

  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .account {
    background: #eee;
    padding: 10px 20px;
    margin: 20px 0;
    width: 20%;
  }
</style>
