function limparFormatacao() {
	campoTime.classList.remove("formulario__input--erro");
	campoLogo.classList.remove("formulario__input--erro");
	alertaTexto.classList.remove("formulario__alerta-erro--ativo");
	alertaTexto.classList.remove("formulario__alerta-sucesso--ativo");
	
	campoTime.value = "";
	campoLogo.value = "";
}

function exibirMensagem(tipo, msg) {	
	if (tipo == "erro") {
		alertaTexto.classList.add("formulario__alerta-erro--ativo");
		alertaTexto.innerHTML = msg;
	}
	else if (tipo == "sucesso") {
		alertaTexto.classList.add("formulario__alerta-sucesso--ativo");
		alertaTexto.innerHTML = msg;
	}
}

function exibirJogadores() {
	const tabelaJogadores = document.getElementById("tabelaJogadores");
	let elemento = "";

	for (let i = 0; i < jogadores.length; i++) {
		elemento += "<tr class='tabela__linha'>";
		elemento += "<td class='tabela__nome-time' style='background-image: url(" + jogadores[i].imagem + ");'>" + jogadores[i].nome + "</td>";
		elemento += "<td>" + jogadores[i].vitorias + "</td>";
		elemento += "<td>" + jogadores[i].empates + "</td>";
		elemento += "<td>" + jogadores[i].derrotas + "</td>";
		elemento += "<td>" + jogadores[i].pontos + "</td>";
		elemento +=
			"<td><button onClick='adicionarVitoria(" + i + ")' class='tabela__botao tabela__botao--vitoria'>Vitória</button></td>";
		elemento +=
			"<td><button onClick='adicionarEmpate(" + i + ")' class='tabela__botao tabela__botao--empate'>Empate</button></td>";
		elemento +=
			"<td><button onClick='adicionarDerrota(" + i + ")' class='tabela__botao tabela__botao--derrota'>Derrota</button></td>";
		elemento += "</tr>";
	}

	tabelaJogadores.innerHTML = elemento;
}

function validarItem(time, logo) {
	let isValid = false;
	
	for (let i = 0; i < jogadores.length; i++) {
		if (jogadores[i]["nome"] == time){
			exibirMensagem("erro", "Time já está no placar");		
			return isValid;
		}
	}
	
	if (!logo.endsWith(".jpg") && !logo.endsWith(".jpeg") && !logo.endsWith(".png") && time == ""){
		limparFormatacao();
		exibirMensagem("erro", "Nome e logo inválidos");
		
		campoTime.classList.add("formulario__input--erro");
		campoLogo.classList.add("formulario__input--erro");
	}
	else if (!logo.endsWith(".jpg") && !logo.endsWith(".jpeg") && !logo.endsWith(".png")) {
		limparFormatacao();
		exibirMensagem("erro", "Logo informada não é uma imagem");
		
		campoLogo.classList.add("formulario__input--erro");
	}
	else if (time == "") {
		limparFormatacao();
		exibirMensagem("erro", "Nome inválido");
		
		campoTime.classList.add("formulario__input--erro");
	}
	else {
		limparFormatacao();
		exibirMensagem("sucesso", "Time adicionado no placar");
		
		isValid = true;
	}
	
	return isValid;
}

function adicionarVitoria(jogador) {
	jogadores[jogador].vitorias++;
	calcularPontos();
	validarPontos();
}

function adicionarEmpate(jogador) {
	jogadores[jogador].empates++;
	calcularPontos();
	validarPontos();
}

function adicionarDerrota(jogador) {
	jogadores[jogador].derrotas++;
	calcularPontos();
	validarPontos();
}

function validarPontos() {
	let vitorias = 0;
	let derrotas = 0;
	let empates = 0;
	
	for (let i = 0; i < jogadores.length; i++){
		vitorias += jogadores[i].vitorias;
		derrotas += jogadores[i].derrotas;
		empates += jogadores[i].empates;
	}
	
	if (vitorias != derrotas) {
		exibirMensagem("erro", "A relação entre virótias e derrotas não conferem")
	}
	else if ((empates % 2) != 0) {
		exibirMensagem("erro", "A relação de empates não conferem")
	}
	else {
		limparFormatacao();
	}
}

function calcularPontos() {
	for (let i = 0; i < jogadores.length; i++) {
		jogadores[i].pontos = (jogadores[i].vitorias * 3) + jogadores[i].empates;
	}
	
	exibirJogadores(jogadores);
}

function adicionarJogador() {
	const time = document.getElementById("time").value.toLowerCase();
	const logo = document.getElementById("logo").value;
	
	if (validarItem(time, logo)) {
		jogadores.push({nome: time, vitorias: 0, empates: 0, derrotas: 0, pontos: 0, imagem: logo});
		exibirJogadores(jogadores);	
	}
}

function removerJogador() {
	const nome = document.getElementById("time").value.toLowerCase();
	let isFound = false;
	
	if (nome != "") {
		for (let i = 0; i < jogadores.length; i++) {
			if (nome == jogadores[i].nome) {
				jogadores.splice(i, 1);
				isFound = true;
			}
		}
		
		if (isFound == false) {
			exibirMensagem("erro", "Jogador não encontrado");
		}
		else {
			exibirMensagem("erro", "Jogador excluído");
			exibirJogadores(jogadores);
		}
	}
	else {
		exibirMensagem("erro", "Nenhum jogador informado");
	}
}

function resetarPontuacao() {
	for (let i = 0; i < jogadores.length; i++) {
		jogadores[i].vitorias = 0;
		jogadores[i].empates = 0;
		jogadores[i].derrotas = 0;
		jogadores[i].pontos = 0;
	}
	
	exibirJogadores(jogadores);
}

const campoTime = document.getElementById("time");
const campoLogo = document.getElementById("logo");

const alertaTexto = document.getElementById("formulario__alerta");
const jogadores = [
	{nome: "astralis",
	 vitorias: 0,
	 empates: 0,
	 derrotas: 0,
	 pontos: 0,
	 imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Astralis_logo.svg/512px-Astralis_logo.svg.png"}, 
	{nome: "mibr",
	 vitorias: 0,
	 empates: 0,
	 derrotas: 0,
	 pontos: 0,
	 imagem: "https://apiesltv.imgix.net/images/team/logo/159-496be8c4-7515-4a9b-a7b8-2536a9d0e3b7.png?auto=compress,format&w=400"}
];

exibirJogadores(jogadores);
