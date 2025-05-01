<template>
  <div class="legend">
    <ul>
      <li>
        <span class="rect-color"></span>
        <h6>Bom</h6>
      </li>
      <li>
        <span class="rect-color"></span>
        <h6>Moderada</h6>
      </li>
      <li>
        <span class="rect-color"></span>
        <h6>Não saudável para grupos sensíveis</h6>
      </li>
      <li>
        <span class="rect-color"></span>
        <h6>Não saudável</h6>
      </li>
      <li>
        <span class="rect-color"></span>
        <h6>Muito não saudável</h6>
      </li>
      <li>
        <span class="rect-color"></span>
        <h6>Perigosa</h6>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.legend {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
}
.rect-color {
  width: 35px;
  height: 20px;
  display: inline-block;
  margin-right: 10px;
}
ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  gap: 10px;
}
ul li:nth-child(1) .rect-color {
  background-color: #3ab83a;
}
ul li:nth-child(2) .rect-color {
  background-color: #c2c200;
}
ul li:nth-child(3) .rect-color {
  background-color: #ff7e00;
}
ul li:nth-child(4) .rect-color {
  background-color: #f00;
}
ul li:nth-child(5) .rect-color {
  background-color: #8f3f97;
}
ul li:nth-child(6) .rect-color {
  background-color: #7e0023;
}
h6 {
  margin: 0;
}
</style>
