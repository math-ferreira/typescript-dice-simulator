let arrayDados: Dado [];
let clickRollDice: number = 0

function start(){
    document.getElementById("rollButton")?.addEventListener("click", rollDice)
    const n: number = Math.floor(Math.random() * 12 + 1)
    let dado: Dado
    let check: boolean = false
    
    // cria o array de objetos do tipo Dado
    arrayDados = []
    // Varre a quantidade n sorteada acima
    for (let i = 0; i < n; i++) {
        // Cria elemento li
        let li = document.createElement('li')
        // Cria elemento img
        let elementImg = document.createElement('img')
        // seta os atributos da imagem em branco 'brank.png'
        elementImg.setAttribute("src", `img/blank.png`)
        elementImg.setAttribute("alt", `die image with ${i+1} spot(s)`)
        // cria um objeto do tipo Dado a cada iteração
        dado = new Dado(elementImg)
        arrayDados.push(dado)
        // adiciona a imagem do dado em branco ao element 'ol'
        document.getElementById("olDados")?.appendChild(li).appendChild(elementImg)
        // Realiza quebra de linha para posicionar os elementos
        if (i+1 >= n/2 && !check){
            document.getElementById("olDados")?.appendChild(document.createElement('br'))
            check = true
        }
    }
}

function rollDice(){
    let die: number
    let frequence: HTMLElement | number | null
    let percent: HTMLElement | number | null

    // Capptura valor inserido pelo usuario em tela
    let numerosVezes: Number = Number((<HTMLInputElement>document.getElementById("textNumber"))?.value);
    // Se não informado o valor de vezes que sera rodado os dados, a variavel recebe valor 1
    if (numerosVezes <= 0){
        numerosVezes = 1
    }
    // Varre a quantidade de vezes informado pelo input do user
    for(var j=0; j < numerosVezes; j++){
    // varre o array de objetos Dado
        arrayDados.forEach(function(dado) {
            // Sorteia um dado para cada objeto do array
            dado.joga()
            // captura o valor do dado
            die = Number(dado.face?.getAttribute('src')?.substring(7,8))
            // Captura a frequencia da linha referente ao dado na tabela
            frequence = document.getElementById(`f${die}`)
            // Soma mais uma unidade ao valor da frequencia
            let numberFreq = Number(frequence?.textContent) + 1
            // seta esse valor atualizado da frequencia
            frequence!.textContent = String(numberFreq)
            // aumenta a quantidade de vezes que o usuario clicou em 'Roll Dice'
            clickRollDice++;
        });
        // Varre a quantidade de linhas para setar o valor percentual na terceira coluna
        for(var i=1; i <= 6; i++){
            // Captura o valor das frequencias e percentuais de cada linha referente ao dado
            frequence = document.getElementById(`f${i}`)
            percent = document.getElementById(`p${i}`)
            // Realiza a conta de percentual
            let numberPercent = (Number(frequence!.textContent) / clickRollDice) * 100
            // Seta o valor percentual para seu respectivo Dado, com 2 casas decimais
            percent!.textContent = String(numberPercent.toFixed(2))
          
        }
    }

}

class Dado {
    face: HTMLElement | null;

    constructor(face: HTMLElement){
        this.face = face;
    }
    // metodo responsavel por sortear o objeto Dado
    joga(){
        let dieValue = Math.floor(Math.random() * 6 + 1)
        this.face?.setAttribute("src", `img/die${dieValue}.png`)
        this.face?.setAttribute("alt", `die image with ${dieValue} spot(s)`)
    }
}


window.addEventListener("load", start)


