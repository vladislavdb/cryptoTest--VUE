<template>
  <main class="main-content">
    <section class="crypto-exchange">
      <h1>Crypto Exchange</h1>
      <p>Exchange fast and easy</p>

      <div class="exchange-1row">
        <InputSelect
            @updateSelect="updateLeft"
            :icon="iconLeft"
            :ticker="tickerLeft"
            :cryptos="cryptosLeft"
            v-model="valAmountLeft"
            v-model:search="valSearchLeft"/>

                <my-swap @click="swap" v-if="!loading"/>
                <my-loading v-if="loading"/>

        <InputSelect
            @updateSelect="updateRight"
            :disabledRight="disabledRight"
            :icon="iconRight"
            :ticker="tickerRight"
            :cryptos="cryptosRight"
            v-model="valAmountRight"
            v-model:search="valSearchRight"/>
      </div>

      <label>Your Ethereum address</label>
      <div class="exchange-2row">
        <my-input/>
        <my-button :error="error">Exchange</my-button>
      </div>

    </section>
  </main>
</template>

<script>
import InputSelect from "@/components/InputSelect";

export default {
  data() {
    return {
      valAmountLeft: '',
      valSearchLeft: '',
      valAmountRight: '',
      valSearchRight: '',
      error: false,
      loading: false,
      cryptosLeft: [],
      cryptosRight: [],
      iconLeft: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg',
      tickerLeft: 'BTC',
      iconRight: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
      tickerRight: 'ETH',
      disabledRight: true,
    }
  },
  components: {
    InputSelect,
  },
  methods: {
    async fetchObj() {
      try {
        const response = await fetch("https://api.changenow.io/v1/currencies?active=true");
        let cryptoObj = await response.json();
        this.cryptosLeft = cryptoObj;
        this.cryptosRight = cryptoObj;
      } catch {
        alert('Ошибка')
      }
    },
    async fetchMinimalAmount() {
      try {
        this.loading = true;
        let url = `https://api.changenow.io/v1/min-amount/${this.tickerLeft}_${this.tickerRight}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
          this.error = true;
          this.valAmountLeft = '';
          return;
        }
        this.valAmountLeft = data.minAmount;
      } catch {
        alert('Ошибка 1')
      }
      finally {
        this.loading = false;
      }
    },
    updateLeft(crypto) {
        this.iconLeft = crypto.image;
        this.tickerLeft = crypto.ticker.toUpperCase();
        this.fetchMinimalAmount();
    },
    updateRight(crypto) {
      this.iconRight = crypto.image;
      this.tickerRight = crypto.ticker.toUpperCase();
      this.fetchMinimalAmount();
    },
    swap() {
      let temp = this.iconLeft;
      this.iconLeft = this.iconRight;
      this.iconRight = temp;

      temp = this.tickerLeft;
      this.tickerLeft = this.tickerRight;
      this.tickerRight = temp;

      this.fetchMinimalAmount();
    },

  },
  mounted() {
    this.fetchObj();
    this.fetchMinimalAmount();
  },
  computed: {
    cryptosLeft() {
      return this.cryptosLeft.filter(crypto =>
          (crypto.ticker.toLowerCase().includes(this.valSearchLeft.toLowerCase()) || crypto.name.toLowerCase().includes(this.valSearchLeft.toLowerCase()))
      );
    },
    cryptosRight() {
      return this.cryptosRight.filter(crypto =>
          (crypto.ticker.toLowerCase().includes(this.valSearchRight.toLowerCase()) || crypto.name.toLowerCase().includes(this.valSearchRight.toLowerCase()))
      );
    },
  },
  watch: {
   async valAmountLeft(newValue) {
      if (newValue.length == 0)
      {
        this.valAmountRight = '';
        return;
      }
      let url = `https://api.changenow.io/v1/exchange-amount/${newValue}/${this.tickerLeft}_${this.tickerRight}/?c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd`;
      let minurl = `https://api.changenow.io/v1/min-amount/${this.tickerLeft}_${this.tickerRight}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd`;
      console.log("Minimal = ", minurl);
      console.log("Estimated = ", url);

        try {
          this.loading = true;
          const responseMinmal = await fetch(minurl);
          const dataMinmal = await responseMinmal.json();
          const response = await fetch(url);
          const data = await response.json();
          this.valAmountRight = data.estimatedAmount;

          if (newValue < dataMinmal.minAmount) {
            this.valAmountRight = '';
            this.error = true;
          }
          if (newValue >= dataMinmal.minAmount) {
            this.error = false;
          }
        } catch (e){
          console.log(e);
        }
        finally {
          this.loading = false;
        }
    },
  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  --scrollbarBG: #CFD8DC;
  --thumbBG: #90A4AE;
}
.main-content
{
  width: 960px;
  margin: 0 auto;


  font-family: 'Vollkorn', serif;
  font-size: 20px;
  line-height: 20px;
  color: #282828;
  background-color: #FFFFFF;
}
.crypto-exchange h1
{

  margin-bottom: 16px;
  padding-top: 220px;

  font-size: 50px;
  line-height: 60px;
  font-weight: 300;
}
.crypto-exchange p
{
  margin-bottom: 60px;
  padding: 0;

  font-size: 20px;
  line-height: 20px;
}
.exchange-1row
{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}



.exchange-2row
{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.crypto-exchange label
{
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 23px;
}

/** { outline: 2px dotted red; }*/
/** * { outline: 2px dotted green; }*/
/** * * { outline: 2px dotted orange; }*/
/** * * * { outline: 2px dotted blue; }*/
/** * * * * { outline: 1px solid red; }*/
/** * * * * * { outline: 1px solid green; }*/
/** * * * * * * { outline: 1px solid orange; }*/
/** * * * * * * * { outline: 1px solid blue; }*/
</style>