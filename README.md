# Projeto Tekever by Rafael Raimundo

## Descrição

Este projeto foi lançado pela Tekever no ambito de recrutamento para a academia da empresa. Encontrei algumas dificuldades pois não ser muito experiente em Backend, mas nada que a pesquisa e a documentação não resolvessem.

## Tecnologias Utilizadas

- [Node.JS](https://nodejs.org/pt)
- [React](https://react.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Express](https://expressjs.com)
- [SQLite3](https://www.sqlite.org)

## Instalação

1. Dentro da pasta Backend, instalar as dependências e correr a máquina
```bash
npm i
npm run dev
```

2. Dentro da pasta Frontend, instalar as dependências e correr a máquina
```bash
npm i
npm run dev
```

## Backend

A backend contém a criação de dois controllers, um para as transactions e outro para os users, onde muito identicamente foram exportados o tipo Transaction e User com os seus campos específicos correspondentes à base de dados, e foi criado mais um TransactionResponse para devolver toda a informação feita numa transação tanto da pessoa que manda como a de que recebe, que é utilizada para fazer a descrição da tabela de transações.

Foi exportado também, tanto nos Users, como nas Transactions, um type com o corpo dos anteriormente criados, onde foram omitidos alguns valores, maioritariamente a data de transação e o id em ambos os controllers, através do Omit que aponta primeiramente para o type referente em questão, e depois os campos que pretendemos omitir na sua utilização.

Toda a validação das funções encontram-se feitas (poder-me-á ter escapado algo, peço desculpa por isso).

A Promise é usada para lidar com múltiplas operações assíncronas e para gerir erros que podem ocorrer durante essas mesmas operações. O resolve é chamado quando, no caso das transactions por exemplo, é criada e obtida com sucesso, já o reject é chamado quando ocorre algum erro crasso garantindo que a função em si possa tratar dos resultados de forma apropriada a cada situação, isto segue o pensamento lógico para todas as funções criadas, tanto em transactions como em users.

Nos routes, fazemos todas as rotas relacionadas com os utilizadores e as transacoes, através do module Router do Express. É feita também, nos Posts, a verificação de preenchimento de todos os campos obrigatórios.
```react
    if (!amount || !from || !to) {
        res.status(400).json({ error: "Invalid body" });
        return
    }
```

## Frontend

Na Frontend foi utilizado como tecnologias o React e o TailwindCSS maioritariamente.

Foram criados três hooks, com a utilização da useQuery do React-Query, e também da função getTransactions e getUsers para serem utilizadas no useQuery, sendo o primeiro valor da função a "chave" utilizada para identificar os dados que a query retorna, e o segundo valor é então a função que foi chamada através de um import que vai buscar os dados através de uma chamada à API criada.

Foram criadas as routes também onde cada ficheiro tem o código React e TailwindCSS, e cada ficheiro exporta uma função que é posteriormente utilizada no main.tsx através do createBrowserRouter e do RouterProvider, onde é passada, para cada path, um elemento importado de cada router.
Em certas routes, como por exemplo o new-transaction.tsx (que utilizarei para exemplo), foram utilizados vários imports de funções anteiormente criadas, como o useUsers que vai buscar todos os utilizadores existentes na base de dados para serem lidos e apresentados como opção na escolha do destino e destinatário da transação. Foi criada também uma função assíncrona, de nome handleSubmit, que começa por criar um objeto FormData com os dados do formulário e, através da API createTransaction, envia os dados para um endpoint. É criada também uma variavel que vai ser passada na API, que vai ser igual ao type criado nos controllers da backend, e vai receber os valores e dados necessários para fazer a transação em si.

Nos serviços, foram criados tanto para a transaction como para os users, funções que interagem com a API, permitindo criar, editar ou ler utilizadores e transações.

Por último foram criados novamente os types também na frontend para ajudar a manter a consistência dos dados, permitindo assim a reutilização de código, resultando numa forma mais robusta e fácil de manter.

## Final Thoughts

Foi um projeto difícil de fazer, como referi estive o tempo parado desde que acabei o meu curso até começar as entrevistas. Dei muitas cabeçadas no teclado, e tive que mudar folgas para estar de corpo e alma neste projeto, acredito que certamente poderão encontrar erros, mas foi um projeto que me deu imenso gosto em fazer.

Ao Ronilton e à Sara só tenho a agradecer pela oportunidade, realmente foi a minha primeira entrevista A SÉRIO, o que me fez abrir os olhos que a programação é uma constante aprendizagem, e basta estarmos uma ou duas semanas parados para começarmos a perder o fio à linha. Independentemente do resultado das candidaturas, só vos queria agradecer pela conversa que tivemos, e em especial ao Ronilton por ter sido duro nas questões e no projeto que me colocou, como referi, realmente foi um abre-olhos para começar a voltar a estudar diariamente nem que sejam 2-4 horas.

Um forte abraço, e boa sorte em tudo o que vier no vosso caminho!

Rafael Raimundo.
