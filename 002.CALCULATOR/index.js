var numero1 = document.getElementById("numero1");
var numero2 = document.getElementById("numero2");
var resultado = document.getElementById("resultado");
var operacion = document.getElementById("operacion");
var Calcular = document.getElementById("calcular");


Calcular.addEventListener("click", function() {
    console.log(numero1.value);
    console.log(numero2.value);
    console.log(operacion.value);
    if (numero1.value =="" || numero2.value == "") {
        alert ("Por favor, ingrese ambos numeros.");
        return;
    }
    var num1 = parseFloat(numero1.value);
    var num2 = parseFloat(numero2.value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor, ingrese numeros validos.")
        return;
    }

    if(operacion.value == "+") {
        resultado.value = num1+num2;
    } else if (operacion.value == "-") {
        resultado.value = num1-num2;
    } else if (operacion.value == "*") {
        resultado.value = num1*num2;
    } else if (operacion.value == "/") {
        if (num2 ==0) {
            alert ("No se puede dividir entre 0.")
            return;
        }
        
        resultado.value = num1/num2;
    } else if (operacion.value == "%") {
        resultado.value = num1/num2;
    }

    
})