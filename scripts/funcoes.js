function condicaoParada(p_matriz) {
	var i = p_matriz.length - 1;

	for (j = 1; j < p_matriz[i].length; j++) {
		if (p_matriz[i][j] > 0) {
			return true;
		}
	}
	return false;
}

function calcMatriz(p_matriz, exibirtab) {
	var nLinhas = p_matriz.length - 1;
	var nColunas = p_matriz[nLinhas].length - 1;

	var maior = p_matriz[nLinhas][1];
	indMaior = 1;
	for (j = 2; j <= nColunas; j++) {
		if (p_matriz[nLinhas][j] > maior) {
			maior = p_matriz[nLinhas][j];
			indMaior = j;
		}
	}

	var menor = Number.MAX_VALUE;
	var indMenor = 0;
	for (k = 1; k < nLinhas; k++) {
		var teste = p_matriz[k][nColunas] / p_matriz[k][indMaior];
		if (p_matriz[k][indMaior] != 0 && teste < menor && teste >= 0) {
			menor = p_matriz[k][nColunas] / p_matriz[k][indMaior];
			indMenor = k;
		}
	}
	var v_in = p_matriz[0][indMaior];
	var v_out = p_matriz[indMenor][0];
	//document.getElementById("tab").innerHTML += "<p>Troca B: entra " + v_in.substr(0, 1) + "<sub>" + v_in.substr(1, 1) + "</sub> e sai " + v_out.substr(0, 1) + "<sub>" + v_out.substr(1, 1) + "</sub></p>";
	p_matriz[indMenor][0] = p_matriz[0][indMaior];

	//printTabela(p_matriz);

	var aux = p_matriz[indMenor][indMaior];
	if (aux != 1) {
		for (l = 1; l <= nColunas; l++) {
			p_matriz[indMenor][l] = p_matriz[indMenor][l] / aux;
		}
		var fracao = new Fraction(1 / aux);
		var numFormatado = fracao.toFraction();
		//document.getElementById("tab").innerHTML += "<p>Linha " + indMenor + " = Linha " + indMenor + " * " + numFormatado + "</p>";
		//printTabela(p_matriz);
	}

	for (i = 1; i <= nLinhas; i++) {
		var aux = p_matriz[i][indMaior];
		if (i != indMenor && aux != 0) {
			for (j = 1; j <= nColunas; j++) {
				p_matriz[i][j] = parseFloat(p_matriz[i][j]) + parseFloat(-1 * aux * p_matriz[indMenor][j]);
			}
			var fracao = new Fraction(-1 * aux);
			var numFormatado = fracao.toFraction();
			//document.getElementById("tab").innerHTML += "<p>Linha " + i + " = Linha " + i + " + (" + numFormatado + ") * Linha " + indMenor + "</p>";
			if (i == nLinhas && exibirtab == true) {
				printTabela(p_matriz);
			}
		}
	}
}

function validarCoeficientes(p_variaveis, p_restricoes) {
	for (i = 1; i <= p_variaveis; i++) {
		if (document.getElementById('y' + i).value == "") {
			document.getElementById('y' + i).focus();
			alert('Informe os valores de todos os coeficientes.');
			return 1;
		}
		for (j = 1; j <= p_restricoes; j++) {
			if (document.getElementById('x' + j + i).value == "") {
				document.getElementById('x' + j + i).focus();
				alert('Informe os valores de todos os coeficientes.');
				return 1;
			}
		}
	}
	for (j = 1; j <= p_restricoes; j++) {
		if (document.getElementById('b' + j).value == "") {
			document.getElementById('b' + j).focus();
			alert('Informe os valores de todas as constantes.');
			return 1;
		}
	}
}

function atualizar() {
	window.location.href = '../simplex/simplex.html';
}

function criarForm(p_variaveis, p_restricoes) {

	if (p_variaveis == "" || p_variaveis <= 0 || p_variaveis != parseInt(p_variaveis)) {
		alert('Preencha o campo com a quantidade de variáveis.');
		form1.variaveis.focus();
		return;
	} else {
		if (p_restricoes == "" || p_restricoes <= 0 || p_restricoes != parseInt(p_restricoes)) {
			alert('Preencha o campo com a quantidade de restrições.');
			form1.regras.focus();
			return;
		}
	}
	if (p_variaveis > 0 && p_restricoes > 0) {
		var strvariavel = ""

		var strrestricao = ""

		document.getElementById("varinicial").style.display = 'none';
		document.getElementById("form2").style.display = 'block';
		document.getElementById("aqui").style.display = 'block';

		strvariavel += "<form class='form-group row mb-5' >"
		strvariavel += "<label class='col-form-label'>Z = </label>";
		strvariavel += "<input style='width: 100px' type='number' class='inputZ form-control' required autocomplete='off' size='15' maxlength='10' id='y1' name='y1' /> <label class='col-form-label'> x</label><sub>1</sub>";
		for (var h = 2; h <= p_variaveis; h++) {
			strvariavel += " + <input style='width: 100px' type='number' class='inputZ form-control ' required autocomplete='off' size='15' maxlength='10' id='y" + h + "' name='y" + h + "' /> x<sub>" + h + "</sub>";
		}
		strvariavel += "</form>";
		document.getElementById("aqui").innerHTML += strvariavel;


		for (var i = 1; i <= p_restricoes; i++) {
			strrestricao += "<p>Restrição " + i + "</p>";
			strrestricao += "<form class='form-group row mb-3' >"
			strrestricao += "<input style='width: 100px' type='number' class='input form-control' required autocomplete='off' size='15' maxlength='10' id='x" + i + "1' name='x" + i + "1' /><label class='col-form-label'> x</label><sub>1</sub>";
			for (var j = 2; j <= p_variaveis; j++) {
				strrestricao += " + <input style='width: 100px' type='number' class='input form-control' required autocomplete='off' size='15' maxlength='10' id='x" + i + j + "' name='x" + i + j + "' /> x<sub>" + j + "</sub>";
			}
			strrestricao += "<span> <= </span>"
				+ "<input style='width: 100px' type='number' class='input form-control' required size='15' maxlength='10' id='b" + i + "' name='b" + i + "' style='text-align:left' />";
			strrestricao += "</form>";
		}
		document.getElementById("aqui").innerHTML += strrestricao


		document.getElementById("aqui").innerHTML += "<p>Restrição " + (++p_restricoes) + "</p>"
			+ "<p>x<sub>i</sub> >= 0</p>";
		document.getElementById("btn1").style.display = 'none';
		document.getElementById("in1").disabled = true;
		document.getElementById("in2").disabled = true;
	}
}

function printTabela(p_matriz) {
	var restricoes = parseInt(document.form1.regras.value);
	var variaveis = parseInt(document.form1.variaveis.value);
	var linhas = restricoes + 1;
	var colunas = restricoes + variaveis + 1;
	var tabela = document.createElement("table");
	tabela.className = "table table-striped";
	var thead = document.createElement("thead");
	thead.className = "bg-primary text-white";
	var tbody = document.createElement("tbody");

	var tr = document.createElement("tr");
	for (var l = 0; l <= colunas; l++) {
		var variavel = p_matriz[0][l];
		var th = document.createElement("th");
		if (l == 0) {
			var texto = document.createTextNode(variavel);
			th.appendChild(texto)
		} else {
			var sub = document.createElement("sub");
			var textoSub = document.createTextNode(variavel.substr(1, 1));
			var texto = document.createTextNode(variavel.substr(0, 1));
			sub.appendChild(textoSub)
			th.appendChild(sub);
			th.insertBefore(texto, th.firstChild);
		}
		tr.appendChild(th);
	}
	thead.appendChild(tr);

	for (var n = 1; n <= linhas; n++) {
		var tr = document.createElement("tr");
		for (var o = 0; o <= colunas; o++) {
			var variavel = p_matriz[n][o];
			var td = document.createElement("td");
			if (o == 0 && n < linhas) {
				var sub = document.createElement("sub");
				var b = document.createElement("b");
				var textoSub = document.createTextNode(variavel.substr(1, 1));
				var texto = document.createTextNode(variavel.substr(0, 1));
				sub.appendChild(textoSub)
				b.appendChild(sub);
				b.insertBefore(texto, b.firstChild);
				td.appendChild(b);
			} else {
				if (variavel != 'Z') {
					var fracao = new Fraction(variavel);
					variavel = fracao.toFraction();
					var texto = document.createTextNode(variavel);
					td.appendChild(texto);
				} else {
					var b = document.createElement("b");
					var texto = document.createTextNode(variavel);
					b.appendChild(texto);
					td.appendChild(b);
				}
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}

	tabela.appendChild(thead);
	tabela.appendChild(tbody);
	document.getElementById("tab").appendChild(tabela);
}

// Botão PASSO A PASSO
function passPass(p) {
	var restricoes = parseInt(document.form1.regras.value);
	var variaveis = parseInt(document.form1.variaveis.value);
	var linhas = parseInt(document.form1.regras.value) + 1;
	var colunas = parseInt(document.form1.variaveis.value) + parseInt(document.form1.regras.value) + 1;
	var tabresult;


	if (document.getElementById('tab').style.display == "none") {
		document.getElementById('tab').style.display = 'block';
	}

	document.getElementById('form2').style.display = 'none';
	document.getElementById("btnPass").style.display = 'none';
	document.getElementById("btn3").style.display = 'none';

	if (validarCoeficientes(variaveis, restricoes) == 1) {
		return;
	}
	if (p) {
		var ninteracao = prompt("Quantas Iterações?", "Todas");
	}

	document.getElementById("tab").innerHTML += "<h2>Resolução</h2>";
	document.getElementById("tab").innerHTML += "<hr/>";
	document.getElementById("tab").innerHTML += "<p><b>Tabela Base</b></p>";
	mother = [[]];

	mother[0][0] = 'Base';

	var indice = 1;
	for (var l = 1; l <= variaveis; l++) {
		mother[0][indice] = "x" + indice;
		indice++;
	}
	for (var m = 1; m <= restricoes; m++) {
		mother[0][indice] = "f" + m;
		indice++;
	}

	mother[0][mother[0].length] = 'b';

	var x = document.querySelectorAll(".input");
	indice = 0;
	var coluna = 0;
	for (var i = 1; i < linhas; i++) {
		mother.push(['f' + i]);
		for (var j = 1; j <= variaveis; j++) {
			mother[i][j] = parseFloat(x[indice].value.replace(",", "."));
			indice++;
		}
		coluna = variaveis + 1;
		for (var k = 1; k <= restricoes; k++) {
			if (i == k) {
				mother[i][coluna] = 1;
			} else {
				mother[i][coluna] = 0;
			}
			coluna++;
		}
		mother[i][coluna] = x[indice].value;
		indice++;
	}

	var z = document.querySelectorAll(".inputZ");
	coluna = 0;
	mother.push(['Z']);
	for (var l = 0; l < variaveis; l++) {
		mother[linhas][l + 1] = parseFloat(z[l].value.replace(",", "."));
	}
	coluna = variaveis + 1;
	for (var m = 1; m <= restricoes; m++) {
		mother[linhas][coluna] = 0;
		coluna++;
	}
	mother[linhas][coluna] = 0;

	printTabela(mother);

	var totalite = 0;
	var auxmatriz = createCopy(mother);

	while (condicaoParada(auxmatriz)) {
		calcMatriz(auxmatriz, false);
		totalite++;
	}

	if (ninteracao == "" || ninteracao == null || ninteracao == "Todas" || ninteracao > totalite) { ninteracao = totalite }

	var ite = 1;
	var ultimo = false;

	if(p){
		while (ite <= ninteracao) {
			document.getElementById("tab").innerHTML += "<p><b>Iteração " + ite + "</b></p>";
			calcMatriz(mother, true);
			ite++;
		}
	} else{
		while (ite <= ninteracao) {
			if (ite == ninteracao) {
				document.getElementById("tab").innerHTML += "<p><b>Iteração " + ite + "</b></p>";
				ultimo = true;
			}
			calcMatriz(mother, ultimo);
			ite++;
		}
	}


	if (ninteracao >= totalite) {
		var solucao = "<center class='mt-5'> <h3> Solução: ";

		for (var n = 1; n <= variaveis; n++) {
			var valor = 0;
			for (var o = 1; o <= restricoes; o++) {
				if (mother[o][0] == 'x' + n) {
					valor = mother[o][colunas];
					break;
				}
			}
			var fracao = new Fraction(valor);
			var numFormatado = fracao.toFraction();
			if (n == variaveis) {
				solucao += "x<sub>" + n + "</sub> = " + numFormatado;
			} else {
				solucao += "x<sub>" + n + "</sub> = " + numFormatado + ", ";
			}
		}
		var fracao = new Fraction((mother[linhas][colunas]) * -1);
		var z = fracao.toFraction();
		solucao += " e Z = " + z + "</h3><center>";
		document.getElementById("tab").innerHTML += "<p><b>" + solucao + "</b></p>";
	} else {
		document.getElementById("tab").innerHTML += "<center class='mt-5'> <h3> Solução disponivel apenas com " + totalite + " Iterações! </h3><center>";
	}

	document.getElementById("btnfim").style.visibility = "visible";
};

$("#btnPass").on("click", function (e) {
	passPass(true);
});
$("#btnDirect").on("click", function (e) {
	passPass(false);
});

function voltarrestr() {
	$('#tab').html('');
	document.getElementById("btnfim").style.visibility = "hidden";

	document.getElementById('form2').style.display = 'block';
	document.getElementById("btnPass").style.display = 'block';
	document.getElementById("btn3").style.display = 'block';

};
function respDirect() {

}

function createCopy(matrizCopy) {
	copy = [[]];
	for (let i = 0; i < matrizCopy.length; i++) {
		copy[i] = matrizCopy[i].slice();
	}
	return copy;
}

// function getSensibilityTable(final) {
//     var sensibilityTable = {
//         labelRow: ["Variável", "Valor Final", "Preço Sombra", "+", "-"],
//         labelColumn: final.labelRow.concat(["Z"]),
//         table: Matriz(final.labelRow.length + 1, 4)
//     };
//     // VALOR FINAL
//     for (let index = 0; index <= final.labelColumn.length; index++) {
//         let i = sensibilityTable.labelColumn.indexOf(final.labelColumn[index]);
//         sensibilityTable.table[i >= 0 ? i : (sensibilityTable.labelColumn.length - 1)][0] = (final.tableau[index + 1] || final.tableau[0])[0];
//     }
//     // PREÇO SOMBRA
//     for (let index = 0; index < sensibilityTable.labelColumn.length; index++) {
//         sensibilityTable.table[index][1] = "-";
//         if (sensibilityTable.labelColumn[index].match(/^f/)) {
//             sensibilityTable.table[index][1] = final.tableau[0][(index + 1) % sensibilityTable.labelColumn.length];
//         }
//     }
//     // Calcular + e - 
//     let firstColumn = final.labelRow.indexOf("f1") + 1;
//     for (let index = 0, total = sensibilityTable.labelColumn.length; index < total; index++) {
//         sensibilityTable.table[index][2] = "-";
//         sensibilityTable.table[index][3] = "-";

//         if (index >= firstColumn && (total) > index) {
//             let divide = final.tableau[1][0];
//             let maior = (divide) / (final.tableau[1][index]), menor = (divide) / (final.tableau[1][index]);

//             for (let l = 1; l <= final.labelColumn.length; l++) {
//                 let divide = final.tableau[l][0];
//                 const element = final.tableau[l][index];
//                 let mn = (divide) / (element), mx = (divide) / (element);
//                 if (Math.abs(mn) !== Infinity) {
//                     if (mn < menor) {
//                         menor = mn;
//                     }
//                     if (mx > maior) {
//                         maior = mx;
//                     }
//                 }
//             }
//             sensibilityTable.table[index - 1][2] = Math.abs(maior);
//             sensibilityTable.table[index - 1][3] = Math.abs(menor);
//             if (final.labelColumn.indexOf(final.labelRow[index]) >= 0){
//                 sensibilityTable.table[index - 1][2] = Math.abs(menor);
//                 sensibilityTable.table[index - 1][3] = Math.abs(maior);
//             }
//         }

//     }
//     return sensibilityTable;
// }