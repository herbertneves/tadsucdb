class Cadastro{



    constructor(){
        this.arrClientes = [];
        this.indiceEditar=-1;
    }
   

    leitura(){
            //Lendo
            let campoNome= document.getElementById("nome");
            let valorNome = campoNome.value;

            let campoEmail = document.getElementById("email");
            let valorEmail =  campoEmail.value;
            //objeto
            let cliente = {};

            cliente.nome= valorNome;
            cliente.email= valorEmail;
            
            return  cliente;
    }

    validar (cliente){

       
        let errors = [];

         if ( cliente.nome =="") {
            errors.push( {msg:"Campo nome Vazio"} );
         }else {
            //Validar Nome
            let arrNome = cliente.nome.split(" ");
            
            if ( arrNome.length <2 ){
                    errors.push( {msg:"Apenas o primeiro nome encontrado"} );
            }
            for (let i = 0 ; i< arrNome.length ; i++){
                if(arrNome[i].length==0){
                    errors.push( {msg:"Sobrenome Invalido"} );
                }
    
            }
        }

         return errors; 

    }


    salvar (){

        
        //leitura
       let cliente =  this.leitura();
        //Valida
       let errors = this.validar (cliente);

        //Incluindo do vetor
       
       if (this.indiceEditar==-1){
            if (errors.length==0){
                this.arrClientes.push(cliente);
            }
        }else{  
            this.arrClientes[this.indiceEditar] = cliente;
            this.indiceEditar=-1;
        }

        //Limpar o form
        this.limparForm();
       //Saida
       this.mensagem (errors);

        //Gerar a lista da tela
       this.atualizarLista();
    }

    mensagem(errors){

        let msg = document.getElementById("mensagem");
     
        if (errors.length==0){
            msg.innerHTML = "Sucesso!";
        }    else {

            for (let i =0 ; i< errors.length ; i++){
                msg.innerHTML += errors[i].msg + "<br>";
            }
        }

    }

    limparForm(){
        let campoNome= document.getElementById("nome");
        campoNome.value="";

        let campoEmail = document.getElementById("email");
         campoEmail.value="";

         this.indiceEditar=-1;
    }

    atualizarListaAntigo(){
        let table  = document.getElementById("tbclientes"); 
      
        table.innerHTML= "";
       
        for (let i=0; i< this.arrClientes.length; i++){

            let cliente =  this.arrClientes[i];
            let tr = document.createElement("tr");  
          
            //TD - NOME
            let td = document.createElement("td");  
            let texto=  document.createTextNode(cliente.nome) ; 
            td.appendChild(texto);
            tr.appendChild(td);
          

            let td2 = document.createElement("td");  
            let texto2=  document.createTextNode(cliente.email) ; 
            td2.appendChild(texto2);
            tr.appendChild(td2);
           
            //TD - EMAL


            table.appendChild(tr); 
        }
    
    }

    excluir(index){
      if ( window.confirm('Confirma exclusão?')){
       this.arrClientes.splice(index,1);
       this. atualizarLista();
      }
    }

    editar (index){
           let cli = this.arrClientes[index];

           let campoNome= document.getElementById("nome");
           campoNome.value=cli.nome;
   
           let campoEmail = document.getElementById("email");
            campoEmail.value=cli.email;

            this.indiceEditar = index;

    }


    atualizarLista(){
        let table  = document.getElementById("tbcli"); 
    
        const str = 
        `<table>
            <thead>
                <td> Nome </td>
                <td> E-mail </td>
                <td> Ação</td>
            </thead>

            <tbody>
            ${ this.arrClientes.map(function (cli, index) {
                return `<tr> 
                    <td> ${cli.nome} </td>
                    <td> ${cli.email}  </td>
                    <td> 
                        <button onclick='cad.excluir(${index})'>Excluir</button>
                        <button onclick='cad.editar(${index})'>Editar</button>
                    </td>
                </tr>`

             }).join('')
            }
               
            
            </tbody>
        </table>`;
       
       
       
         table.innerHTML= str;
        
    }
    
}

var cad = new Cadastro();

