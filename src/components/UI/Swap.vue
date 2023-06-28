<template>
  <img class="swap" src="@/img/swap.svg">
</template>

<script>

export default {
  name: 'my-swap'
}
</script>

<style scoped>
.swap
{
  width: 24px;
  height: 24px;
  cursor: pointer;
}
@media (max-width: 768px){
  .swap {
    align-self: end;
    transform: rotate(90deg);
  }
}
</style>