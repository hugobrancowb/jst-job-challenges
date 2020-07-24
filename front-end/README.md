# Cotação do Dólar

Utiliza API da [Frankfurter](https://www.frankfurter.app/docs/) para obter dados da cotação do dólar para diversas moedas ao fornecer uma faixa de tempo

## Planejamento

### Primeiras funcionalidades gerais

Apenas a contrução básica do que virá a ser a aplicação. Ainda não é uma versão com funcionalidade real.

- [x] Trabalhar com dados fakes antes de implementar API;
- [x] Ter certeza que os tipos utilizados funcionarão para todas funcionalidades abaixo;
- [x] Gerar uma tabela;
- [x] Gerar um gráfico (era plotly agora é ngx-echarts);
- [x] Encontrar solução de calendário para permitir a busca;
- [x] Converter calendário em datas no formato do API (yyyy-mm-dd);
- [x] Obter os dados através de uma API;

### Versões

## v1.0.1

- [x] Utilizar rotas para realizar a pesquisa;
- [x] Adicionar funcionalidade para observar dados de outras datas na tabela;
- [] Formatar todas as datas? Talvez?

## v1.0.0 - MVP

Antes de realizar a pesquisa:

- [x] Escolher datas (início e fim);
- [x] Escolher a moeda de preferência;

Após realizar a pesquisa:

- [x] Permitir que o usuário altere sua escolha de moeda ou datas e realizar nova Request;
- [x] Permitir que o usuário veja o gráfico de outras moedas além do Real;

Estilos:

- [x] Garantir responsividade do site;
- [x] Material Table
- [x] Responsividade do gráfico
