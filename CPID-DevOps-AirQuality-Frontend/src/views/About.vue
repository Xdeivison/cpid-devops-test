<script>
import HeaderHome from '../components/HeaderHome.vue'
import Footer from "../components/Footer.vue";
export default{
    components: {
        HeaderHome,
        Footer
    }
}
</script>
<template>
    <div>
  <div>
    <div id="header">
        <HeaderHome />
    </div>
   <section id="quality-air">
    <div class="text-title">
        <h1>índice de qualidade do Ar (AQI)</h1>
    </div>
    <div class="text">
    <p>AQI ou Air Quality Index é a principal forma de medir a qualidade do ar no mundo hoje. O Índice de Qualidade do Ar é um indicador padronizado do nível de poluição do ar numa determinada zona, e resulta de uma média aritmética calculada para cada indicador. Na aplicação usamos PM 2.5 (Particulate Matter/Material Particulado com diâmetro máximo de 2.5 microns).
    O índice visa a conversão de dados analíticos e científicos num índice de fácil compreensão que permite que a população em geral tenha um acesso mais fácil e compreensível da informação.
    No Brasil, os padrões foram instituídos pelo IBAMA, e aprovados pelo CONAMA.</p>
    </div>
   </section>

   <section id="visualization-partic">
    <div class="text-title">
        <h1>
            Para melhor visualização, segue imagem ilustrando uma partícula com 2.5 microns de diâmetro:
        </h1>
    </div>
    <div class="img">
        <img src="../assets/images/img-particula.png" alt="Imagem da particula.">
    </div>
   </section>

   <section id="indice-quality">
    <div class="text-title"><h1>índice de Qualidade do Ar(AQI)</h1></div>
    <div class="text"><p>AQI ou Air Quality Index é a principal forma de medir a qualidade do ar no mundo hoje. O Índice de Qualidade do Ar é um indicador padronizado do nível de poluição do ar numa determinada zona, e resulta de uma média aritmética calculada para cada indicador. Na aplicação usamos PM 2.5 (Particulate Matter/Material Particulado com diâmetro máximo de 2.5 microns).
O índice visa a conversão de dados analíticos e científicos num índice de fácil compreensão que permite que a   população em geral tenha um acesso mais fácil e compreensível da informação.
    No Brasil, os padrões foram instituídos pelo IBAMA, e aprovados pelo CONAMA.</p>
    <br><br>

    <h1>A fórmula para o cálculo do AQI, baseada no parâmetro PM 2.5, é a seguinte:</h1>
    <div class="calculate-img">
        <img src="../assets/images/calculate-img.png" alt="Imagem do cálculo que é feito.">
    </div>
    <div class="description text">
        <ul>
            <li class="text"><strong>C</strong> é a concentração de PM 2.5 medida (em µg/m³);</li>
            <li class="text"><strong>Clow</strong> e <strong>Chigh</strong> são os limites, inferior e superior, respectivamente, de concentração que englobam o valor medido;</li>
            <li class="text"><strong>Ilow</strong> e <strong>Ihigh</strong> são os limites, inferior e superior, respectivamente, do índice AQI correspondentes a Clow e Chigh.</li>
        </ul>
    </div>
</div>
   </section>

   <section id="table">
    <div class="text-title"><h1>O AQUI assumirá um valor em uma das seguintes faixas:</h1></div>
    <div class="table-container">
        <table>
                <tr class="thead">
                    <th>Intervalo de Concentração de PM2.5(µg/m³)</th>
                    <th>Intervalo</th>
                    <th>Qualidade do Ar</th>
                </tr>
                <tr>
                    <td>0.0 - 12.0</td>
                    <td>0 - 50</td>
                    <td>Boa</td>
                </tr>
            <tr>
                    <td>12.1 - 35.4</td>
                    <td>51 - 100</td>
                    <td>Moderada</td>
            </tr>
              <tr>
                <td>35.5 - 55.4</td>
                <td>101 - 150</td>
                <td>Não saudável para grupos sensíveis</td>
              </tr>

              <tr>
                <td>55.5 - 150.4</td>
                <td>151 - 200</td>
                <td>Não saudável</td>
              </tr>

              <tr>
                <td>150.5 - 250.4</td>
                <td>201 - 300</td>
                <td>Muito não saudável</td>
              </tr>

              <tr>
                <td>250.5 - 500.4</td>
                <td>301 - 500</td>
                <td>Perigosa</td>
              </tr>

        </table>
    </div>
   </section>
  </div>

  <section id="cards">
    <div class="card">
        <div class="card-title"><h1>Coleta de Dados</h1></div>
        <div class="card-text"><p>Para coleta de dados, usamos sensores montados no CPID que medem a quantidade de material particulado no ar e outros parâmetros também.
        Tratamos e armazenamos essas informações em um banco de dados para futuras interpretações.</p>
        </div>
        </div>
        <div class="card">
        <div class="card-title"><h1>Interpretações dos Dados</h1></div>
        <div class="card-text"><p>Para coleta de dados, usamos sensores montados no CPID que medem a quantidade de material particulado no ar e outros parâmetros também.
        Tratamos e armazenamos essas informações em um banco de dados para futuras interpretações.</p>
        </div>
        </div>
        <div class="card">
        <div class="card-title"><h1>Trativa de Dados</h1></div>
        <div class="card-text"><p>Para inserir no banco de dados, utilizamos o parâmetro PM 2.5 e tiramos uma média dos 5 últimos dados daquele minuto.
        Tiramos a média ponderada onde os valores mais próximos da mediana possuem maior peso, e valores mais   distantes da mediana possuem menor peso.</p>
        </div>
        </div>
  </section>
  </div>
  <div id="rodape">
    <p>AirQuality&copy; 2024</p>
  </div>
</template>

<style scoped>
#header{
    width: 100%;
    background-color: #BFBEA0;
}

section#quality-air{
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center ;
    gap: 10px;
    margin-left: 20px;
}

.text-title{
}

.text-title > h1{
    font-family: 'Poppins';
    font-size: 40px;
    text-align: center;
}

.text{
    text-align: center;
    font-family: 'Poppins';
}

.text > p {
    font-family: 'Poppins';
}

#visualization-partic{
    margin-top: 100px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 60px;
}

.img{
    display: flex;
    align-items: center;
    justify-content: center;
}

#indice-quality{
    margin-top: 180px;
    margin-left: 20px
}

.calculate-img{
    display: flex;
    margin-top: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
}

ul{
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    list-style: none;
}

#table{
    margin-top: 100px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
    justify-self: center;
    align-items: center;
    
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
  
}

tr:nth-child(even) {
  background-color: #fff;
}

#cards{
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-bottom: 200px;
}

.card{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 500px;

}
.card-title{
    text-align: center;
    color: #fff;
    background-color: #201547;
    width: 100%;
}

.card-title > h1 {
    font-family: 'Poppins';
    padding: 10px;
}

.card-text > p{
    font-family: 'Poppins';
    padding: 5px;
}

.card-text{
    text-align: center;
    background-color: #EDEDED;
    height: 200px;
    padding-top: 20px;
}


div#rodape{
    width: 100%;
    background-color: #201547;
}

div#rodape > p {
    text-align: center;
    color: #fff;
    font-family: 'Poppins';
}


</style>