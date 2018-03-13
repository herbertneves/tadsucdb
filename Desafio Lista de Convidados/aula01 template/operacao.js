
class Operacao {

    leitura() {
        //Lendo

        let valorN1 = document.getElementById("n1").value;

        let valorN2 = document.getElementById("n2").value;

        let numeros = {};
        numeros.N1 = Number(valorN1);
        numeros.N2 = Number(valorN2);

        return numeros;

    }

    validar(){
        //Lendo
        let numeros = this.leitura();

        //Validando
        let errors = []
        if (numeros.N1 =="" || numeros.N2 ==""){
            errors.push( {msg:"digite dois numeros!"})
        }
        return errors;
    }

    somar() {
        //Lendo
        let numeros = this.leitura();
        //Validando
        let errors = this.validar();

        //Somando
        let resultadoSoma = numeros.N1 + numeros.N2;
 
        return resultadoSoma;
    }

    imprimir() {
        //Lendo
        let numeros = this.leitura();
        //Somando
        let resultadoSoma = this.somar();
        //Validando
        let errors = this.validar();
        //Imprimindo

        let msg = document.getElementById("n3");

        if (errors.length==0){
        msg.value = resultadoSoma
        }    else {

            for (let i =0 ; i< errors.length ; i++){
                msg.value += errors[i].msg;
            }
        }

    }
}

var op = new Operacao();