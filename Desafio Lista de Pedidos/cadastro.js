class Cadastro {

    constructor() {
        this.arrPedidos = [];
        this.indiceEditar=-1;
    }


    leitura() {
        //Lendo
        let campoP = document.getElementById("QP");
        let valorP = Number(campoP.value);

        let campoM = document.getElementById("QM");
        let valorM = Number(campoM.value);

        let campoG = document.getElementById("QG");
        let valorG = Number(campoG.value);


        //objeto
        let pedido = {};

        pedido.P = valorP;
        pedido.M = valorM;
        pedido.G = valorG;
        pedido.total = this.calcularTotal(pedido);

        return pedido;
    }

    calcularTotal(pedido) {

        let total = Number;
        total = (pedido.P * 10) + (pedido.M * 12) + (pedido.G * 15)

        return total;


    }


    validar(pedido) {


        let errors = [];

        if (pedido.P == null | pedido.M == null | pedido.G == null) {
            errors.push({ msg: "Digite o número de todas as camisas (mesmo que seja 0)" });
        }


        return errors;

    }


    salvar() {


        //leitura
        let pedido = this.leitura();
        let total = this.calcularTotal(pedido);
        //Valida
        let errors = this.validar(pedido);

        //Incluindo do vetor
       if (this.indiceEditar==-1){
            if (errors.length==0){
                this.arrPedidos.push(pedido);
            }
        }else{  
            this.arrPedidos[this.indiceEditar] = pedido;
            this.indiceEditar=-1;
        }
        //Limpar o form
        this.limparForm();
        //Saida
        this.mensagem(errors);

        //Gerar a lista da tela
        this.atualizarLista();
    }

    mensagem(errors) {

        let msg = document.getElementById("mensagem");

        if (errors.length > 0) {
            for (let i = 0; i < errors.length; i++) {
                msg.innerHTML += errors[i].msg + "<br>";
            }
        }

    }

    limparForm() {
        let campoP = document.getElementById("QP");
        campoP.value = "";

        let campoM = document.getElementById("QM");
        campoM.value = "";

        let campoG = document.getElementById("QG");
        campoG.value = "";
    }

    excluir(index) {
        if (window.confirm('Confirma exclusão?')) {
            this.arrPedidos.splice(index, 1);
            this.atualizarLista();
        }
    }

    editar(index) {
        let ped = this.arrPedidos[index];

        let campoP = document.getElementById("QP");
        campoP.value = ped.P;

        let campoM = document.getElementById("QM");
        campoM.value = ped.M;

        let campoG = document.getElementById("QG");
        campoG.value = ped.G;

        this.indiceEditar = index;

    }

    atualizarLista() {
        let table = document.getElementById("tbped");

        const str =
            `<table>
            <thead>
                <td> P </td>
                <td> M </td>
                <td> G </td>
                <td> Total </td>
                <td> Ação </td>
            </thead>
            <tbody>
            ${ this.arrPedidos.map(function (ped, index) {
                return `<tr> 
                    <td> ${ped.P} </td>
                    <td> ${ped.M}  </td>
                    <td> ${ped.G}  </td>
                    <td> R$ ${ped.total},00  </td>
                    <td> 
                        <button onclick='cad.excluir(${index})'>Excluir</button>
                        <button onclick='cad.editar(${index})'>Editar</button>
                    </td>
                </tr>`

            }).join('')
            }
               
            
            </tbody>


    </table>`;



        table.innerHTML = str;

    }

}

var cad = new Cadastro();



