<template>
  <div v-click-outside='clickOutside' class="input-select" :class="[showDropdown ? inputActive : '']" >
    <input
        type="number"
        class="input-1"
        :disabled=disabledRight
        v-show="showDropdown === false"
        :value="modelValue"
        @input="updateAmount">

    <div class="select-1" v-show="showDropdown === false" @click="toggleShowForm" >
      <img class="select1-icon" :src="this.icon">
      <div class="select-1-text">{{ this.ticker }}</div>
    </div>

    <img class="arrowD" v-if="showDropdown === false"  src="@/img/Vector.svg" alt="">
    <img class="cross" v-if="showDropdown" @click="toggleShowForm"  src="@/img/Vectorr.svg" alt="">

    <ul class="dropdown-list" v-show="showDropdown" >
      <li @click="emitSelect_HideDropdown(crypto)" class="dropdown-list-item" v-for="crypto in cryptos">
        <img class="dropdown-list-item-icon" :src=crypto.image>
        <div class="dropdown-list-item-name">{{crypto.ticker.toUpperCase()}}</div>
        <span class="dropdown-list-item-description">{{crypto.name}}</span>ㅤ
      </li>
    </ul>

    <input
        class="dropdown-input--hidden"
        v-show="showDropdown"
        type="text"
        placeholder="Search"
        :value="search"
        @input="updateSearch">
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      showDropdown: false,
      inputActive: 'input-select--active',
    }
  },
  methods: {
    toggleShowForm()
    {
      this.showDropdown = !this.showDropdown;
    },
    updateAmount(event)
    {
      this.$emit('update:modelValue', event.target.value)
    },
    updateSearch(event)
    {
      this.$emit('update:search', event.target.value)
    },
    emitSelect_HideDropdown(crypto)
    {
      this.$emit('updateSelect', crypto);
      this.showDropdown = false;
    },
    clickOutside(event) {
      this.showDropdown = false;
    },
  },
  props: {
    modelValue: [String, Number],
    search: [String, Number],
    cryptos: [Array],
    icon: [String],
    ticker: [String],
    disabledRight: [Boolean],
  },
  watch: {
    showDropdown(newValue) {
      this.$store.state.check = newValue;
    }
  }

}
</script>

<style scoped>
.dropdown-list-item {
  display: flex;
  gap: 12px;
  margin: 0;
  padding: 0;
  padding-top: 13px;
  padding-left: 17px;
  padding-bottom: 11px;

  font-weight: 400;
  font-size: 16px;
  line-height: 23px;

  cursor: pointer;
}
.dropdown-list-item:first-child {

  padding-top: 14px;

}
.dropdown-list-item:last-child {

  padding-bottom: 10px;

}
.dropdown-list-item:hover {
  background: #EAF1F7;
}

.dropdown-list-item-icon
{
  width: 20px;
  height: 20px;
}
.dropdown-list-item-description
{

  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: #80A2B6;

  left: 97px;
}








.input-select {

  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  font-family: 'Vollkorn', serif;
  display: flex;
  justify-content: space-between;
  position: relative;

  width: 440px;

  height: 50px;
  background: #F6F7F8;
  border: 1px solid #E3EBEF;
  border-radius: 5px;
}
.input-select--active
{
  border: 1px solid #C1D9E6;
  border-radius: 5px 5px 0 0;
  border-bottom: none;
}
.input-1
{
  align-self: center;
  flex-basis: 230px;
  flex-grow: 1;
  height: 50px;
  border: none;
  border-right: 2px solid #E3EBEF;
  outline: none;
  background: none;
  padding-left: 16px;

  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  font-family: 'Vollkorn', serif;
}


.select-1
{
  padding-left: 29px;
  height: 50px;
  flex-basis: auto;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  overflow: hidden;

  cursor: pointer;
}
.select-1::after
{
  position: absolute;
  content: "";
  border-top: 10px solid #F6F7F8;
  width: 250px;
  left: 155px;
  top: 38px;
  pointer-events: none;
}
.select-1::before
{
  position: absolute;
  content: "";
  border-top: 10px solid #F6F7F8;
  width: 250px;
  left: 155px;
  top: 0px;
  pointer-events: none;
}
.select1-icon
{
  width: 20px;
  height: 20px;

}
.select-1-text
{
  margin-top: 2px;
  margin-right: 54px;
}

.arrowD
{

  position: absolute;

  right: 12px;
  top: 22px;

  pointer-events: none;
}
.cross
{
  position: absolute;
  right: 11px;
  top: 21px;

  cursor: pointer;

  z-index: 1;
}
.dropdown-input--hidden
{
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  font-family: 'Vollkorn', serif;

  align-self: center;
  width: 440px;
  height: 50px;
  border: none;
  outline: none;
  background: none;
  padding-left: 16px;
}
.dropdown-input--hidden::placeholder
{

  color: #80A2B6;
}
.dropdown-list
{

  position: absolute;
  left: -1px;
  top: 49px;
  list-style-type: none;


  height: 142px;
  width: 440px;
  border-radius: 5px;
  overflow-y: scroll;

  background: #F6F7F8;
  border: 1px solid #C1D9E6;
  border-top: 1px solid #E3EBEF;
  border-radius: 0 0 5px 5px;

  z-index: 1;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
  appearance: none;
  -moz-appearance: textfield;
}


:focus::-webkit-input-placeholder {
  color: transparent
}

:focus::-moz-placeholder {
  color: transparent
}

:focus:-moz-placeholder {
  color: transparent
}

:focus:-ms-input-placeholder {
  color: transparent
}
::-webkit-scrollbar {
  width: 7px;
}
.dropdown-list {
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG) ;
  border-radius: 6px;
  border: 1px solid var(--scrollbarBG);
}
</style>