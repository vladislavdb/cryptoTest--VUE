<template>
    <button class="myBut" >
      <transition name="fade">
      <p v-if="!$store.state.check && error" class="button__error--hidden">This pair is disabled now</p>
      </transition>
      <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'my-button',
  props: {
    error: [Boolean]
  },
  data() {
    return {
      errorClass: 'button__error--hidden',
    }
  },
}
</script>

<style scoped>
.myBut
{

  font-size: 16px;
  line-height: 19px;
  font-family: 'Vollkorn', serif;
  letter-spacing: 0.03em;
  font-weight: 400;
  color: #FFFFFF;
  text-transform: uppercase;

  position: relative;
  background: #11B3FE;
  border-radius: 5px;
  border: none;
  width: 205px;
  height: 50px;
  cursor: pointer;
}
.myBut:hover
{
  background: #0095E0;
}

.button__error--hidden
{
  margin: 0;
  padding: 0;
  font-family: 'Vollkorn', serif;
  color: #E03F3F;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;

  position: absolute;
  top: 58px;
  left: 15px;
  text-transform: none;
  pointer-events: none;

}
.button__error--hidden::before
{
  content: "";
  border: 1px solid rgba(233, 235, 236, 0.44);
  width: 230px;
  height: 0px;
  pointer-events: none;
  position: absolute;
  top: -146px;
  left: -225px;
  display: block;
  pointer-events: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
@media (max-width: 1024px){
  .button__error--hidden::before {
    width: 110px;
    left: -120px;
  }
}
@media (max-width: 768px){
  .myBut {
    width: 328px;
  }
  .button__error--hidden::before {
    left: -55px;
    top: -228px;
  }
  .button__error--hidden {
    left: 75px;
  }
}
</style>