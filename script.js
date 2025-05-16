document.addEventListener('DOMContentLoaded', function () {
  const botoesMais = document.querySelectorAll('.mais');
  const botoesMenos = document.querySelectorAll('.menos');
  const produtos = document.querySelectorAll('.produto');
  const gerarCompraBtn = document.getElementById('gerarCompra');
  const editarCompraBtn = document.getElementById('editarCompra');
  const excluirCompraBtn = document.getElementById('excluirCompra');
  const modalCompra = document.getElementById('modalCompra');
  const fecharModalBtn = document.getElementById('fecharModal');
  const itensCompra = document.getElementById('itensCompra');
  const totalCompra = document.getElementById('totalCompra');
  const valorPago = document.getElementById('valorPago');
  const troco = document.getElementById('troco');
  const modoEscuroToggle = document.getElementById('modoEscuroToggle');

  // Configurar o campo de pagamento para mostrar apenas teclado numérico
  valorPago.setAttribute('inputmode', 'numeric');
  valorPago.setAttribute('pattern', '[0-9]*');
  valorPago.setAttribute('type', 'number');
  valorPago.setAttribute('step', '0.01');
  valorPago.setAttribute('min', '0');

  botoesMais.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      produtos[index].value = parseInt(produtos[index].value) + 1;
    });
  });

  botoesMenos.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      let valor = parseInt(produtos[index].value);
      if (valor > 0) produtos[index].value = valor - 1;
    });
  });

  gerarCompraBtn.addEventListener('click', () => {
    itensCompra.innerHTML = '';
    let total = 0;

    produtos.forEach(produto => {
      const quantidade = parseInt(produto.value);
      if (quantidade > 0) {
        const preco = parseFloat(produto.dataset.preco);
        const nome = produto.parentElement.parentElement.querySelector('.titulo').innerText;
        const li = document.createElement('li');
        li.textContent = `${nome} - ${quantidade}x = R$ ${(quantidade * preco).toFixed(2)}`;
        itensCompra.appendChild(li);
        total += quantidade * preco;
      }
    });

    totalCompra.textContent = total.toFixed(2);
    troco.textContent = "0,00";
    valorPago.value = "";
    modalCompra.style.display = 'block';
    gerarCompraBtn.style.display = 'none';
  });

  editarCompraBtn.addEventListener('click', () => {
    modalCompra.style.display = 'none';
    gerarCompraBtn.style.display = 'inline-block';
  });

  excluirCompraBtn.addEventListener('click', () => {
    produtos.forEach(produto => produto.value = 0);
    modalCompra.style.display = 'none';
    gerarCompraBtn.style.display = 'inline-block';
  });

  fecharModalBtn.addEventListener('click', () => {
    modalCompra.style.display = 'none';
    gerarCompraBtn.style.display = 'inline-block';
  });

  valorPago.addEventListener('input', () => {
    const pago = parseFloat(valorPago.value);
    const total = parseFloat(totalCompra.textContent);
    if (!isNaN(pago) && pago >= 0) {
      const calcTroco = pago - total;
      troco.textContent = calcTroco >= 0 ? calcTroco.toFixed(2) : '0,00';
    }
  });

  modoEscuroToggle.addEventListener('click', () => {
    document.body.classList.toggle('escuro');
  });

  // Criar teclado numérico
  const tecladoNumerico = document.createElement('div');
  tecladoNumerico.className = 'teclado-numerico';
  tecladoNumerico.style.display = 'none';
  tecladoNumerico.innerHTML = `
    <div class="teclas">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>.</button>
      <button>0</button>
      <button class="apagar">⌫</button>
    </div>
  `;
  document.body.appendChild(tecladoNumerico);

  // Mostrar teclado quando o campo de valor for clicado
  valorPago.addEventListener('click', (e) => {
    e.preventDefault();
    tecladoNumerico.style.display = 'grid';
    valorPago.blur(); // Remove o foco do input para evitar o teclado padrão
  });

  // Esconder teclado quando clicar fora
  document.addEventListener('click', (e) => {
    if (!tecladoNumerico.contains(e.target) && e.target !== valorPago) {
      tecladoNumerico.style.display = 'none';
    }
  });

  // Adicionar funcionalidade aos botões do teclado
  tecladoNumerico.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('apagar')) {
        valorPago.value = valorPago.value.slice(0, -1);
      } else {
        // Verifica se já existe um ponto decimal
        if (btn.textContent === '.' && valorPago.value.includes('.')) {
          return;
        }
        // Limita a 2 casas decimais
        if (valorPago.value.includes('.')) {
          const partes = valorPago.value.split('.');
          if (partes[1].length >= 2) {
            return;
          }
        }
        valorPago.value += btn.textContent;
      }
      // Disparar evento de input para atualizar o troco
      valorPago.dispatchEvent(new Event('input'));
    });
  });
});
