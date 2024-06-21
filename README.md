# Fast Feet API Rocketseat

# Descrição

<p> Bem-Vindos a Fast Feet API, este projeto visa facilitar o fluxo de entregas para entregadores e clientes, onde a aplicação busca clientes mais próximos para o entregador e assim os dois fiquem satisfeitos com uma entrega rápida e sem muito processos para chegar atpe uma bem sucedida.</p>

# Regras da aplicação

- [] Deve se cadastrar um usuário como Entregador ou Admin
- [] Deve se autenticar um usuário
- [] Deve se atualizar os dados de um entregador
- [] Deve se deletar um usuário
- [] Deve se cadastrar um destinatário 
- [] Deve se atualizar dados de um destinatário
- [] Deve se deletar um destinatário
- [] Deve se cadastrar uma encomenda
- [] Deve se atualizatar uma encomenda para retirada
- [] Deve se marcar uma entrega como entregue
- [] Deve se pegar dados de uma entrega com o detinatário
- [] Deve se filtrar encomendas por bairro, status e cidade

# Regras de negócio

- [] CRUD de usuário, encomendas e destinatário sendo realizadas apenas por ADMIN
- [] Alterar senha de entregadores apenas admin
- [] Marcar uma encomenda como entregue apenas mediante ao envio da foto
- [] Somente o entregador pode marcar uma entrega como entregue
- [] O entregador deve somente listar as suas entregas

# Requesitos não funcionais

- [] Persistência de dados no Banco de Dados Postgres
- [] Cache usando Redis
- [] Usar token jwt para autenticação
- [] Criptografar a senha dos usuários