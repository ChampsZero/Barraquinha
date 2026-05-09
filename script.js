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
  const precoOutros = document.getElementById('precoOutros');

  // Configurar o campo de pagamento
  valorPago.setAttribute('type', 'tel');
  valorPago.setAttribute('inputmode', 'numeric');
  valorPago.setAttribute('pattern', '[0-9]*');

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
    // Remove qualquer caractere que não seja número
    let valor = e.target.value.replace(/\D/g, '');
    e.target.value = valor; // Atualiza o valor do campo com apenas números
    
    const pago = parseFloat(valor) || 0;
    const total = parseFloat(totalCompra.textContent);
    
    if (valor === '') {
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
      const produto = produtos[index];
      const item = produto.closest('.item');
      const campoPrecoLivre = item.querySelector('.preco-outro');

      // Para "Outros", o campo principal vira acumulador de valor (R$)
      if (campoPrecoLivre) {
        const precoDigitado = parseFloat(campoPrecoLivre.value);
        if (!Number.isFinite(precoDigitado) || precoDigitado <= 0) {
          alert('Digite um valor válido em "Outros" antes de adicionar.');
          campoPrecoLivre.focus();
          return;
        }
        const valorAtual = parseFloat(produto.value) || 0;
        produto.value = (valorAtual + precoDigitado).toFixed(2);
        return;
      }

      produto.value = parseInt(produto.value) + 1;
    });
  });

  botoesMenos.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const produto = produtos[index];
      const item = produto.closest('.item');
      const campoPrecoLivre = item.querySelector('.preco-outro');

      if (campoPrecoLivre) {
        const precoDigitado = parseFloat(campoPrecoLivre.value);
        if (!Number.isFinite(precoDigitado) || precoDigitado <= 0) {
          alert('Digite um valor válido em "Outros" para remover.');
          campoPrecoLivre.focus();
          return;
        }
        const valorAtual = parseFloat(produto.value) || 0;
        const novoValor = Math.max(0, valorAtual - precoDigitado);
        produto.value = novoValor.toFixed(2);
        return;
      }

      let valor = parseInt(produto.value);
      if (valor > 0) produto.value = valor - 1;
    });
  });

  gerarCompraBtn.addEventListener('click', () => {
    itensCompra.innerHTML = '';
    let total = 0;

    produtos.forEach(produto => {
      const item = produto.closest('.item');
      const campoPrecoLivre = item.querySelector('.preco-outro');

      if (campoPrecoLivre) {
        const valorOutros = parseFloat(produto.value) || 0;
        if (valorOutros > 0) {
          const nome = produto.parentElement.parentElement.querySelector('.titulo').innerText;
          const li = document.createElement('li');
          li.textContent = `${nome} = R$ ${valorOutros.toFixed(2)}`;
          itensCompra.appendChild(li);
          total += valorOutros;
        }
        return;
      }

      const quantidade = parseInt(produto.value);
      if (quantidade > 0) {
        const preco = parseFloat(produto.dataset.preco || 0);
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
    // Alterna entre os ícones de lua e sol
    modoEscuroToggle.textContent = document.body.classList.contains('escuro') ? '☀️' : '🌙';
  });
});
