/* 
=========================================================
RELATÓRIO DE AUDITORIA OOP (Mapeamento e Delegação)
Auditores: Seu Nome e Nome do Colega

1. Por que um dado JSON (ex: {id: "123"}) que vem da internet não possui os métodos da nossa classe Voo? Como o comando 'new' resolve isso?

R: Porque o JSON é apenas uma estrutura de dados simples contendo propriedades e valores. Ele não possui ligação com a classe Voo nem acesso aos métodos definidos nela. Quando usamos o comando "new Voo()", criamos uma instância da classe, que herda todos os métodos e comportamentos definidos no protótipo da classe. Esse processo é conhecido como mapeamento ou hidratação de objetos.

2. O que aconteceria com a manutenção do sistema se tivéssemos 15 arquivos diferentes avaliando a velocidade do vento manualmente com "IFs", e amanhã a regra mudasse para "ventos > 100"? Por que colocar essa regra dentro do método da Classe Voo salva a nossa vida?

R: Teríamos que procurar e alterar todos os IFs espalhados pelo sistema, aumentando o risco de erros e inconsistências. Ao encapsular a regra dentro do método da classe Voo, basta alterar a regra em um único lugar, facilitando a manutenção e garantindo que todos os voos sigam a mesma lógica.
=========================================================
*/

class Voo {
    #status;

    constructor(codigo, destino) {
        this.codigo = codigo;
        this.destino = destino;
        this.#status = "Aguardando Leitura do Radar";
    }

    get status() {
        return this.#status;
    }

    avaliarCondicoesClimaticas(velocidadeDoVento) {
        if (velocidadeDoVento > 80) {
            this.#status = "CANCELADO - Risco de Ciclone";
        } else {
            this.#status = "Liberado para Decolagem";
        }
    }
}

// Simulação da API
const dadosDaApi = [
    { id_voo: "G3-111", cidade: "Curitiba", vento_kmh: 90 },
    { id_voo: "LA-222", cidade: "São Paulo", vento_kmh: 40 },
    { id_voo: "AZ-333", cidade: "RIo de Janeiro", vento_kmh: 75 }
];

// Array de objetos ricos
const listaDeVoos = [];

for (let vooAtual of dadosDaApi) {

    const meuNovoVoo = new Voo(
        vooAtual.id_voo,
        vooAtual.cidade
    );

    meuNovoVoo.avaliarCondicoesClimaticas(
        vooAtual.vento_kmh
    );

    listaDeVoos.push(meuNovoVoo);
}

// Exibe no console
console.log("=== RELATÓRIO DE VOOS ===");

listaDeVoos.forEach(voo => {
    console.log(
        `Voo ${voo.codigo} | Destino: ${voo.destino} | Status: ${voo.status}`
    );
});

// Exibe na página HTML
const container = document.getElementById("voos");

listaDeVoos.forEach(voo => {

    const card = document.createElement("div");

    card.classList.add("card");

    if (voo.status.includes("CANCELADO")) {
        card.classList.add("cancelado");
    } else {
        card.classList.add("liberado");
    }

    card.innerHTML = `
        <h2>${voo.codigo}</h2>
        <p><strong>Destino:</strong> ${voo.destino}</p>
        <p><strong>Status:</strong> ${voo.status}</p>
    `;

    container.appendChild(card);
});