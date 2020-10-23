"use strict";
var arrayDados;
var clickRollDice = 0;
function start() {
    var _a, _b, _c;
    (_a = document.getElementById("rollButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", rollDice);
    var n = Math.floor(Math.random() * 12 + 1);
    var dado;
    var check = false;
    // cria o array de objetos do tipo Dado
    arrayDados = [];
    // Varre a quantidade n sorteada acima
    for (var i = 0; i < n; i++) {
        // Cria elemento li
        var li = document.createElement('li');
        // Cria elemento img
        var elementImg = document.createElement('img');
        // seta os atributos da imagem em branco 'brank.png'
        elementImg.setAttribute("src", "img/blank.png");
        elementImg.setAttribute("alt", "die image with " + (i + 1) + " spot(s)");
        // cria um objeto do tipo Dado a cada iteração
        dado = new Dado(elementImg);
        arrayDados.push(dado);
        // adiciona a imagem do dado em branco ao element 'ol'
        (_b = document.getElementById("olDados")) === null || _b === void 0 ? void 0 : _b.appendChild(li).appendChild(elementImg);
        // Realiza quebra de linha para posicionar os elementos
        if (i + 1 >= n / 2 && !check) {
            (_c = document.getElementById("olDados")) === null || _c === void 0 ? void 0 : _c.appendChild(document.createElement('br'));
            check = true;
        }
    }
}
function rollDice() {
    var _a;
    var die;
    var frequence;
    var percent;
    // Capptura valor inserido pelo usuario em tela
    var numerosVezes = Number((_a = document.getElementById("textNumber")) === null || _a === void 0 ? void 0 : _a.value);
    // Se não informado o valor de vezes que sera rodado os dados, a variavel recebe valor 1
    if (numerosVezes <= 0) {
        numerosVezes = 1;
    }
    // Varre a quantidade de vezes informado pelo input do user
    for (var j = 0; j < numerosVezes; j++) {
        // varre o array de objetos Dado
        arrayDados.forEach(function (dado) {
            var _a, _b;
            // Sorteia um dado para cada objeto do array
            dado.joga();
            // captura o valor do dado
            die = Number((_b = (_a = dado.face) === null || _a === void 0 ? void 0 : _a.getAttribute('src')) === null || _b === void 0 ? void 0 : _b.substring(7, 8));
            // Captura a frequencia da linha referente ao dado na tabela
            frequence = document.getElementById("f" + die);
            // Soma mais uma unidade ao valor da frequencia
            var numberFreq = Number(frequence === null || frequence === void 0 ? void 0 : frequence.textContent) + 1;
            // seta esse valor atualizado da frequencia
            frequence.textContent = String(numberFreq);
            // aumenta a quantidade de vezes que o usuario clicou em 'Roll Dice'
            clickRollDice++;
        });
        // Varre a quantidade de linhas para setar o valor percentual na terceira coluna
        for (var i = 1; i <= 6; i++) {
            // Captura o valor das frequencias e percentuais de cada linha referente ao dado
            frequence = document.getElementById("f" + i);
            percent = document.getElementById("p" + i);
            // Realiza a conta de percentual
            var numberPercent = (Number(frequence.textContent) / clickRollDice) * 100;
            // Seta o valor percentual para seu respectivo Dado, com 2 casas decimais
            percent.textContent = String(numberPercent.toFixed(2));
        }
    }
}
var Dado = /** @class */ (function () {
    function Dado(face) {
        this.face = face;
    }
    // metodo responsavel por sortear o objeto Dado
    Dado.prototype.joga = function () {
        var _a, _b;
        var dieValue = Math.floor(Math.random() * 6 + 1);
        (_a = this.face) === null || _a === void 0 ? void 0 : _a.setAttribute("src", "img/die" + dieValue + ".png");
        (_b = this.face) === null || _b === void 0 ? void 0 : _b.setAttribute("alt", "die image with " + dieValue + " spot(s)");
    };
    return Dado;
}());
window.addEventListener("load", start);
