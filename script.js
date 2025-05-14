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
  
    // Aumentar quantidade
    botoesMais.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        produtos[index].value = parseInt(produtos[index].value) + 1;
      });
    });
  
    // Diminuir quantidade
    botoesMenos.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        let valor = parseInt(produtos[index].value);
        if (valor > 0) produtos[index].value = valor - 1;
      });
    });
  
    // Gerar compra e abrir modal
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
      modalCompra.style.display = 'block';
      gerarCompraBtn.style.display = 'none';
    });
  
    // Editar compra (fecha o modal e mostra o botão novamente)
    editarCompraBtn.addEventListener('click', () => {
      modalCompra.style.display = 'none';
      gerarCompraBtn.style.display = 'inline-block';
    });
  
    // Excluir compra (zera valores e fecha o modal)
    excluirCompraBtn.addEventListener('click', () => {
      produtos.forEach(produto => produto.value = 0);
      modalCompra.style.display = 'none';
      gerarCompraBtn.style.display = 'inline-block';
    });
  
    // Fechar modal ao clicar no botão X
    fecharModalBtn.addEventListener('click', () => {
      modalCompra.style.display = 'none';
      gerarCompraBtn.style.display = 'inline-block';
    });
  
    // Desabilita fechamento clicando fora do conteúdo do modal
    window.addEventListener('click', (event) => {
      // Intencionalmente não faz nada para impedir o fechamento ao clicar fora
      // Ou seja: se o clique for fora, não fecha
      if (event.target === modalCompra) {
        // Não fechar o modal aqui
      }
    });
  });
  const toggleModo = document.getElementById('toggleModo');

toggleModo.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Troca o ícone do botão conforme o modo
  if (document.body.classList.contains('dark-mode')) {
    toggleModo.textContent = '☀️'; // Sol para voltar ao claro
  } else {
    toggleModo.textContent = '🌙'; // Lua para ativar escuro
  }
});
