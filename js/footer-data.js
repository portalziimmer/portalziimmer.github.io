(function() {
  'use strict';

  // Set footer year
  var yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Fetch company data from server API
  fetch('api.php?action=empresa')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data || !data.cnpj) return;

      var nome = data.nome_fantasia || data.razao_social || '';
      var cnpj = data.cnpj || '';
      var endereco = data.endereco || '';
      var telefone = data.telefone || '';

      // Show company bar in footer
      var footerCompany = document.getElementById('footerCompany');
      if (footerCompany && (endereco || telefone || cnpj)) {
        footerCompany.style.display = '';

        var nomeEl = document.getElementById('footerEmpresaNome');
        if (nomeEl && nome) nomeEl.textContent = nome;

        var enderecoEl = document.getElementById('footerEmpresaEndereco');
        if (enderecoEl && endereco) enderecoEl.textContent = endereco;

        var telefoneEl = document.getElementById('footerEmpresaTelefone');
        if (telefoneEl && telefone) telefoneEl.textContent = 'Tel: ' + telefone;

        var cnpjEl = document.getElementById('footerEmpresaCnpj');
        if (cnpjEl && cnpj) cnpjEl.textContent = 'CNPJ: ' + cnpj;
      }

      // Update footer copyright name
      var nomeEmpresaEls = document.querySelectorAll('.footer-nome-empresa');
      for (var i = 0; i < nomeEmpresaEls.length; i++) {
        if (nome) nomeEmpresaEls[i].textContent = nome;
      }
    })
    .catch(function() {});

})();
