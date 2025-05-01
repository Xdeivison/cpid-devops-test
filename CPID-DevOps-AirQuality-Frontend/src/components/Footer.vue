<script>
export default{
    name: 'Footer'
}
</script>
<template>  
    <div>
        <span>AirQuality &copy; 2024</span>
    </div>
</template>
<style scoped>
div{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100vw;
    bottom: 0;
    background-color: #201547;
    text-align: center;
    height: 3vh;
}

span{
    color: #fff;
    font-weight: lighter;
    font-size: 15px;
}
</style>