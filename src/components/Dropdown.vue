<template>
    <ul class='dropdown-list'>
        <li @click='emitSelect_HideDropdown(crypto)' class='dropdown-list-item' :key='crypto.ticker'
            v-for='crypto in cryptos'>
            <img class='dropdown-list-item-icon' :src=crypto.image>
            <div class='dropdown-list-item-name'>{{ crypto.ticker.toUpperCase() }}</div>
            <span class='dropdown-list-item-description'>{{ crypto.name }}</span>ㅤ
        </li>
    </ul>
</template>

<script>
export default {
    methods: {
        emitSelect_HideDropdown(crypto) {
            this.$emit('updateSelect', crypto)
        },
    },
    props: {
        cryptos: [Array],
    },
}
</script>

<style scoped>
.dropdown-list {

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

.dropdown-list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;

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

.dropdown-list-item-icon {
    width: 20px;
    height: 20px;
}

.dropdown-list-item-description {

    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #80A2B6;

    left: 97px;
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
    background-color: var(--thumbBG);
    border-radius: 6px;
    border: 1px solid var(--scrollbarBG);
}
@media (max-width: 1024px){
  .dropdown-list {
    width: 328px;
  }
  .dropdown-list-item {
    padding-left: 7px;
  }
}
</style>