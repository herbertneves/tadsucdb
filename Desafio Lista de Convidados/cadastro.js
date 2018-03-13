class Cadastro {

    constructor() {
        this.arrpessoas = [];
        this.arrQuantidade = [0, 0, 0, 0];
    }


    leitura() {
        //Lendo
        let campoNome = document.getElementById("nome");
        let valorNome = (campoNome.value);

        let campoidade = document.getElementById("idade");
        let valoridade = Number(campoidade.value);
        //objeto
        let pessoa = {};

        pessoa.nome = valorNome;
        pessoa.idade = valoridade;

        return pessoa;
    }

    validar(pessoa) {


        let errors = [];

        if (pessoa.nome == "") {
            errors.push({ msg: "Campo nome Vazio" });
        } else {
            //Validar Nome
            let arrNome = pessoa.nome.split(" ");

            if (arrNome.length < 2) {
                errors.push({ msg: "Apenas o primeiro nome encontrado" });
            }
            for (let i = 0; i < arrNome.length; i++) {
                if (arrNome[i].length == 0) {
                    errors.push({ msg: "Sobrenome Invalido" });
                }

            }
        }

        return errors;

    }

    gerarRelatorio() {

        this.arrQuantidade = [0, 0, 0, 0];

        for (let i = 0; i < this.arrpessoas.length; i++) {
            if (this.arrpessoas[i].idade < 14) { this.arrQuantidade[0]++ } else
                if (this.arrpessoas[i].idade < 21) { this.arrQuantidade[1]++ } else
                    if (this.arrpessoas[i].idade < 60) { this.arrQuantidade[2]++ } else
                        this.arrQuantidade[3]++

        }

        return this.arrQuantidade;

    }
    salvar() {


        //leitura
        let pessoa = this.leitura();
        //Valida
        let errors = this.validar(pessoa);

        //Incluindo do vetor
        if (errors.length == 0) {
            this.arrpessoas.push(pessoa);
        }

        //Limpar o form
        this.limparForm();
        //Saida
        this.mensagem(errors);

        //Gerar a lista da tela
        this.atualizarLista();
    }

    salvarRelatorio() {

        //Gerar o relatorio
        this.gerarRelatorio();

        //Atualizar a lista da tela
        this.atualizarRelatorio();
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
        let campoNome = document.getElementById("nome");
        campoNome.value = "";

        let campoidade = document.getElementById("idade");
        campoidade.value = "";
    }

    /*      atualizarRelatorio(){
              let table = document.getElementById("tbrelatorio");
  
              table.innerHTML = "";
  
              for (let i = 0; i < this.arrpessoas.length; i++) {
  
                  let pessoa = this.arrpessoas[i];
                  let tr = document.createElement("tr");
  
                  //TD - NOME
                  let td = document.createElement("td");
                  let texto = document.createTextNode(pessoa.nome);
                  td.appendChild(texto);
                  tr.appendChild(td);
  
  
                  let td2 = document.createElement("td");
                  let texto2 = document.createTextNode(pessoa.idade);
                  td2.appendChild(texto2);
                  tr.appendChild(td2);
  
                  //TD - IDADE
  
  
                  table.appendChild(tr);
  
  }
  
  }*/

    atualizarLista() {
        let table = document.getElementById("tbpess");

        const str =
            `<table>
            <thead>
                <td> Nome</td>
                <td> Idade</td>
            </thead>


        <tbody id="tbpessoas">

            ${ this.arrpessoas.map(function (pess) {
                return `<tr> 
                    <td> ${pess.nome} </td>
                    <td> ${pess.idade}  </td>
                </tr>`

            }).join('')
            }
        
        </tbody>
    </table>`;



        table.innerHTML = str;

    }

    atualizarRelatorio() {
        let table = document.getElementById("tbrela");

        const str =
            `<table>
            <thead>
                <td> Classificação</td>
                <td> Quantidade</td>
            </thead>
            <tbody id="tbrelatorio">
                <tr>
                    <th> Crianças </th>
                    <td id="cri">${this.arrQuantidade[0]}</td>
                </tr>
                <tr>
                    <th> Adolescentes </th>
                    <td id="ado">${this.arrQuantidade[1]}</td>
                </tr>
                <tr>
                    <th> Adultos </th>
                    <td id="adu">${this.arrQuantidade[2]}</td>
                </tr>
                <tr>
                    <th> Idosos </th>
                    <td id="ido">${this.arrQuantidade[3]}</td>
                </tr>
            </tbody>


    </table>`;

        table.innerHTML = str;

    }

}

var cad = new Cadastro();



