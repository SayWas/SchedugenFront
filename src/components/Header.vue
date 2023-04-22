<template>
    <div class="header">
        <div class="left-block">
            <div class="title">Schedugen</div>
        </div>
        <div class="right-block">
            <div class="sign-in">Войти</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-header);
    height: 60px;
}

.header .title{
    font-size: 20px;
    font-weight: normal;
    color: white;
}

.header .left-block{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 250px;
}

.header .right-block{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100px;
}

.header .sign-in{
    font-size: 18px;
    font-weight: bold;
    color: white;
}
</style>