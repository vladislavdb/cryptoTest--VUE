<template>
    <input class="input_address">
</template>

<script>
export default {
  name: 'my-input'
}
</script>

<style scoped>
.input_address
{
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  font-family: 'Vollkorn', serif;

  padding-left: 16px;
  width: 723px;
  height: 50px;
  background: #F6F7F8;
  border: 1px solid #E3EBEF;
  border-radius: 5px;
}
.input_address:focus
{
  outline: none;
}
</style>