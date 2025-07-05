// Inicializa o Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJk8-W80iJyGHoJBeNZDo5k9wmh8HRPrQ",
  authDomain: "mototaxi-tapaua.firebaseapp.com",
  databaseURL: "https://mototaxi-tapaua-default-rtdb.firebaseio.com",
  projectId: "mototaxi-tapaua",
  storageBucket: "mototaxi-tapaua.firebasestorage.app",
  messagingSenderId: "629986832248",
  appId: "1:629986832248:web:fd044f24cc51aa018ba28d",
  measurementId: "G-1S6PYNHWN5"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Alternar entre interface Passageiro e Motorista
function mostrarInterface(tipo) {
  const passageiroDiv = document.getElementById('interface-passageiro');
  const motoristaDiv = document.getElementById('interface-motorista');
  const btnPassageiro = document.getElementById('btn-passageiro');
  const btnMotorista = document.getElementById('btn-motorista');

  if (tipo === 'passageiro') {
    passageiroDiv.classList.remove('hidden');
    motoristaDiv.classList.add('hidden');
    btnPassageiro.classList.add('bg-primary', 'text-white');
    btnMotorista.classList.remove('bg-primary', 'text-white');
  } else {
    passageiroDiv.classList.add('hidden');
    motoristaDiv.classList.remove('hidden');
    btnMotorista.classList.add('bg-primary', 'text-white');
    btnPassageiro.classList.remove('bg-primary', 'text-white');
  }

  console.log(`Interface ${tipo} exibida`);
}

// Função para solicitar corrida
function solicitarCorrida() {
  const origem = document.getElementById('origem').value.trim();
  const destino = document.getElementById('destino').value.trim();

  if (!origem || !destino) {
    alert('Preencha origem e destino!');
    return;
  }

  const novaCorrida = {
    origem: origem,
    destino: destino,
    status: 'aguardando',
    timestamp: Date.now()
  };

  // Salvar no Firebase
  database.ref('corridas').push(novaCorrida)
    .then(() => {
      alert('Corrida solicitada com sucesso!');
      console.log('Corrida salva:', novaCorrida);
    })
    .catch(error => {
      console.error('Erro ao salvar corrida:', error);
    });
}

// Função para cadastrar motorista
function cadastrarMotorista() {
  const nome = document.getElementById('nome-motorista-input').value.trim();
  const telefone = document.getElementById('telefone-motorista').value.trim();
  const cpf = document.getElementById('cpf-motorista').value.trim();
  const idade = document.getElementById('idade-motorista').value.trim();

  if (!nome || !telefone || !cpf || !idade) {
    alert('Preencha todos os campos!');
    return;
  }

  const motorista = {
    nome: nome,
    telefone: telefone,
    cpf: cpf,
    idade: idade,
    cadastradoEm: Date.now()
  };

  // Salvar no Firebase
  database.ref('motoristas').push(motorista)
    .then(() => {
      alert('Motorista cadastrado com sucesso!');
      console.log('Motorista cadastrado:', motorista);
    })
    .catch(error => {
      console.error('Erro ao cadastrar motorista:', error);
    });
}

// (Opcional) Quando a página carregar, mostra interface passageiro por padrão
document.addEventListener('DOMContentLoaded', () => {
  mostrarInterface('passageiro');
});
// Função para abrir Área Administrativa
function abrirAreaAdministrativa() {
  alert('Área Administrativa ainda não foi implementada.');
}
