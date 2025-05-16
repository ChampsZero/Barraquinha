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

  // Configurar o campo de pagamento
  valorPago.setAttribute('type', 'number');
  valorPago.setAttribute('inputmode', 'numeric');
  valorPago.setAttribute('pattern', '[0-9]*');
  valorPago.setAttribute('min', '0');
  valorPago.setAttribute('step', '1');

  // Função para formatar valor em reais
  function formatarValor(valor) {
    // Remove tudo que não é número
    valor = valor.replace(/\D/g, '');
    
    // Formata o número com R$
    return `R$ ${valor}`;
  }

  // Função para obter apenas o número do valor formatado
  function obterValorNumerico(valor) {
    return parseFloat(valor.replace(/\D/g, ''));
  }

  // Evento para calcular o troco
  valorPago.addEventListener('input', function(e) {
    const pago = parseFloat(e.target.value) || 0;
    const total = parseFloat(totalCompra.textContent);
    
    if (e.target.value === '') {
      troco.textContent = `-R$ ${total.toFixed(2)}`;
      troco.style.color = '#ff0000';
      return;
    }
    
    const calcTroco = pago - total;
    if (calcTroco < 0) {
      troco.textContent = `-R$ ${Math.abs(calcTroco).toFixed(2)}`;
      troco.style.color = '#ff0000';
    } else {
      troco.textContent = `R$ ${calcTroco.toFixed(2)}`;
      troco.style.color = '#4CAF50';
    }
  });

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
    troco.textContent = `-R$ ${total.toFixed(2)}`;
    troco.style.color = '#ff0000';
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

  modoEscuroToggle.addEventListener('click', () => {
    document.body.classList.toggle('escuro');
  });
});
