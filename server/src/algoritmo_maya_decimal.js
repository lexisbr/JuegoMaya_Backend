/*
Funcion que transforma un numero en base N a sistema decimal (base 10)
$ numeros: cadena de numeros separados por coma
$ base: base N en la que esta el numero ingresado

Ejemplo: 
	baseNToDecimal("15 7 16 3", 20) 
	El numero ingresado esta en base 20 y transformado a decimal produce "123123"
*/

function baseNToDecimal(numeros, base){
    let numeroResultate = 0; //variable que contiene el valor final
    const listadoNumeros = numeros.split(" "); //separamos por espacios
    
    for(let i = 0; i < listadoNumeros.length; i++){ //recorremos cada numero
        let aux = listadoNumeros[i]; //obtenemos el numero actual
        let nivel = (listadoNumeros.length - i - 1); //obtenemos el nivel o posicion de derecha a izquierda
        numeroResultate += aux * Math.pow(base, nivel);
    	
    	/*
        	el nivel es la posicion en la que se encuentra el numero
        	por ejemplo, 1 10, 1 está en el nivel 1, mientras que el 10 está en la posicion 0
        	este nivel se usa para calcular el valor real del numero en esa posicion
        	
        	Ej: 1 * base^1 + 10 * base^0, vemos que mientras mas alto el nivel, mas alto el valor
        	de cada numero
        */
    }
    
    return numeroResultate; //retornamos el valor
}

/*
Funcion que transforma un numero en decimal (base 10) a sistema base N
$ numeros: cadena/numero en sistema decimal
$ base: base N en la que se quiere el numero de salida esperado

Ejemplo: 
	baseNToDecimal("123123", 20) 
	El numero ingresado esta en decimal es "123123", se espera que el 
	numero resultado sea en base 20, dando como resultado "15 7 16 3"
	nota: en sistema maya, esos numeros van de arriba hacia abajo
*/

function decimalToBaseN(numeros, base){
   let valor = ""; //variable que contiene el valor final, poseera varios caracteres separados por espacio
   
   let resultado = Math.trunc(numeros / base); //el resultado es igual al numero dividido la base
   let residuo = numeros % base; //se calcula si tiene residuo
   
   if(resultado > 0){ //si el resultado es mayor a 0, significa que se agrega otro nivel/digito
       return decimalToBaseN(resultado, base).concat(" ", residuo);// + " " +  residuo; //concatenamos al valor recursivo el residuo
   }else{
       return valor.concat(residuo); //concatenamos el residuo
   }
   
   /*
   	Ejemplo: 60, base 20 
   		se ingresa 60, resultado: 60/20 = 3  Residuo: 0
   		se ingresa  3, resultado: 0          Residuo: 3
   		se retorna 3
   		se retorna "3" concatenado a 0
   		Salida "3 0"
   	
   */
}

console.log(baseNToDecimal("15 7 16 3", 20)); //123123
console.log(decimalToBaseN("123123", 20)); //15 7 16 3
