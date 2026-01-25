#### 1 Correcoes realizadas no projeto ao iniciar
    - Estava faltando a implementacao da funcao getAllProducts na rota de produtos.
    - O id serial do banco postgres estava desatualizado, o que gerava erro ao tentar inserir um novo produto. Adicionei um comando SQL no arquivo init.sql para ajustar a sequencia a partir do ultimo valor inserido no banco.

#### 2 Implementacoes realizadas    
    - Criacao de routes, services e repositories para os modulos de estoque e movimentacoes.
    - Implementacao da logica para que as movimentacoes atualizem o saldo do estoque automaticamente.
    - Adicao das abas de estoque e movimentacoes na interface da pagina.
    - Ajuste no retorno das rotas para que os dados incluam informacoes detalhadas do produto.
    - Desenvolvimento do modal para registro de novas movimentacoes de estoque.
    - Inclusao de busca global integrada ao componente DataTable.
    - Sistema de ordenacao por colunas no DataTable para facilitar a analise.
    - Paginacao configurada com o limite padrao de 10 itens por pagina.
    - Atualizacao no fluxo de cadastro para permitir o registro do estoque inicial do produto.

#### 3 Processo de analise e desenvolvimento
Iniciei o projeto usando o Obsidian para organizar as ideias e o fluxo de trabalho. Analisei o schema do banco e vi que a estrutura era simples, com quatro tabelas. Assim que rodei o codigo pela primeira vez, notei erros na api e foquei primeiro em corrigir esses problemas fundamentais.
Depois segui para a criacao dos repositories, services e rotas. Tenho mais facilidade com o backend, entao essa parte foi mais fluida. Usar o Prisma ORM e o Prisma Studio foi um diferencial enorme, ja que a visualizacao clara das tabelas e das relacoes ajuda muito no desenvolvimento. Inclusive, durante essa analise, percebi que a tabela de estoque e desnecessaria, ja que os dados poderiam estar salvos diretamente na tabela de produto para simplificar o sistema.
No frontend, usei os componentes que ja existiam para criar as telas que faltavam. Implementei busca, ordenacao e paginacao no componente DataTable. Eu tinha o plano original de fazer a paginacao direto no backend, mas como o tempo ficou apertado para a entrega, acabei deixando essa parte no frontend e foquei em fazer alguns ajustes menores para garantir que tudo estivesse funcionando bem.

#### 4 Sugestoes de melhorias ou atualizacoes futuras
Unificacao de tabelas: Como a relacao entre produto e estoque e de um para um, o ideal seria unificar esses dados. Ter tudo na tabela de produtos simplifica as consultas no banco de dados e deixa a manutencao do sistema muito mais agil.
SKU automatico: Implementar uma logica para gerar o SKU de forma automatica ajuda a manter a padronizacao e evita erros de digitacao que podem comprometer a organizacao do inventario.
Paginacao no servidor: Mover a logica de paginacao para o backend e um passo importante para a escalabilidade. Isso garante que o sistema continue rapido mesmo com milhares de itens, ja que o servidor entregaria apenas os dados necessarios para a tela atual.
Seguranca e testes: Adicionar autenticacao para proteger as rotas da api e criar uma suite de testes unitarios. Isso garante que o sistema seja seguro e que novas atualizacoes nao quebrem o que ja esta funcionando.
Gestao de compras e rastreabilidade: Sugiro a criacao de um modulo de compras para gerir fornecedores e a inclusao de campos para identificar a destinacao das saidas (como ordens de servico) e a origem das entradas. Essa sugestao vem da minha experiencia previa com sistemas ERP no desenvolvimento do projeto OSSJ, onde percebi que ter esse controle detalhado e fundamental para uma gestao de estoque profissional e eficiente.
Documentacao automatica: Adicao de uma ferramenta como o Swagger para gerar a documentacao da api. Isso facilita muito a integracao com outros sistemas e ajuda novos desenvolvedores a entenderem as rotas rapidamente.
Desacoplamento do sistema: Separar o frontend do backend de forma completa. Isso permite que cada parte evolua de maneira independente e que a api possa ser consumida por outros clientes, como aplicativos para celular.
Versionamento de api: Implementar o controle de versoes nas rotas. E uma boa pratica essencial para que melhorias no codigo nao causem erros em quem ja usa a versao atual do sistema.