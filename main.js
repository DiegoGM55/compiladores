// Obtendo referências para elementos HTML
const inputText = document.getElementById("text");
const analyzeButton = document.getElementById('analyse');
const tableBody = document.getElementById('tableBody');
const symbolTable = []; // Tabela de símbolos para armazenar lexemas e tokens

// Definição dos valores de tokens para operadores
const TOKEN_VALUES = [
  { lexeme: '+', token: 'OPPSOMA' },
  { lexeme: '-', token: 'OPPSUB' },
  { lexeme: '*', token: 'OPPMULT' },
  { lexeme: '/', token: 'OPPDIV' },
  { lexeme: '(', token: 'PARENINI' },
  { lexeme: ')', token: 'PARENFIM' }
];

// Adicionar um ouvinte de evento para o botão de análise
analyzeButton.addEventListener('click', analyzeText);

// Função para analisar o texto de entrada
function analyzeText() {
  clearTable(); // Limpar a tabela antes de cada análise
  
  const value = inputText.value;
  const cleanedText = value.replaceAll(' ', ''); // Remover espaços em branco
  console.log({ cleanedText });
  
  let lexeme = ''; // Variável para armazenar lexema durante a análise
  
  for (let i = 0; i < cleanedText.length; i++) {
    const char = cleanedText[i];
    const isOperator = TOKEN_VALUES.some(pred => pred.lexeme === char); // Verificar se o caractere é um operador
    
    if (isOperator) {
      handleLexeme(lexeme); // Processar o lexema anterior
      symbolTable.push(TOKEN_VALUES.find(item => item.lexeme === char)); // Adicionar o operador à tabela de símbolos
      lexeme = ''; // Resetar o lexema para o próximo caractere
    } else {
      lexeme += char; // Construir o lexema caractere a caractere
      if (i === cleanedText.length - 1) {
        handleLexeme(lexeme); // Processar o lexema final
      }
    }
  }
  
  updateSymbolTable(); // Atualizar a tabela de símbolos no HTML
}

// Função para limpar a tabela de símbolos
function clearTable() {
  symbolTable.length = 0;
  tableBody.innerHTML = '';
}

// Função para processar um lexema e determinar seu token
function handleLexeme(lexeme) {
  const integerRegex = /^\d+$/; // Expressão regular para números inteiros
  const floatRegex = /^\d+\.\d*$/; // Expressão regular para números reais
  
  if (lexeme === '') return null; // Se o lexema estiver vazio, não fazer nada

  // Verificar se o lexema é um número inteiro
  if (integerRegex.test(lexeme)) {
    symbolTable.push({ lexeme, token: 'NUMERO_INTEIRO' });
  } else if (floatRegex.test(lexeme)) { // Verificar se o lexema é um número real
    symbolTable.push({ lexeme, token: 'NUMERO_REAL' });
  } else {
    symbolTable.push({ lexeme, token: 'ERRO' }); // Caso contrário, é um erro léxico
  }
}

// Função para atualizar a tabela de símbolos no HTML
function updateSymbolTable() {
  symbolTable.forEach(symbol => {
    const row = document.createElement('tr'); // Criar uma nova linha
    const lexemeCell = document.createElement('td'); // Criar célula para lexema
    const tokenCell = document.createElement('td'); // Criar célula para token

    lexemeCell.textContent = symbol.lexeme; // Definir o conteúdo da célula de lexema
    tokenCell.textContent = symbol.token; // Definir o conteúdo da célula de token

    row.appendChild(lexemeCell); // Adicionar célula de lexema à linha
    row.appendChild(tokenCell); // Adicionar célula de token à linha
    tableBody.appendChild(row); // Adicionar a linha à tabela
  });
}

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Pega o arquivo selecionado

    if (file) {
        const reader = new FileReader(); // Cria um leitor de arquivo

        reader.onload = function(e) {
            const content = e.target.result; // Conteúdo do arquivo lido
            const textArea = document.getElementById('text'); // Elemento <textarea>
            console.log({ content });
            textArea.value = content; // Define o conteúdo do <textarea>
        };

        reader.readAsText(file); // Lê o arquivo como texto
    }
});
