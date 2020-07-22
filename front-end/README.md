# Cotação do Dólar

Utiliza API da [Frankfurter](https://www.frankfurter.app/docs/) para obter dados da cotação do dólar para diversas moedas ao fornecer uma faixa de tempo

## Planejamento

### Primeiras funcionalidades gerais

Apenas a contrução básica do que virá a ser a aplicação. Ainda não é uma versão com funcionalidade real.

- [x] Trabalhar com dados fakes antes de implementar API;
- [x] Ter certeza que os tipos utilizados funcionarão para todas funcionalidades abaixo;
- [x] Gerar uma tabela;
- [x] Gerar um gráfico;
- [x] Encontrar solução de calendário para permitir a busca;
- [x] Converter calendário em datas no formato do API (yyyy-mm-dd);
- [] Obter os dados através de uma API;

### MVP

Antes de realizar a pesquisa:

- [x] Escolher datas (início e fim);
- [x] Escolher a moeda de preferência;

Após realizar a pesquisa

- [x] Permitir que o usuário altere sua escolha de moeda ou datas e realizar nova Request;

### O que seria interessante implementar mas não é urgente

- [] Permitir escolher novas datas sem realizar nova Request caso os dados obtidos já contenham a faixa de datas desejada;
- [] Impedir que usuário escolha data-inicio igual à data-fim na pesquisa;
- [] Adicionar funcionalidade para converter dólares para a moeda selecionada (e vice-versa);
