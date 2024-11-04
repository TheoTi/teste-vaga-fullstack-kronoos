
Olá ![](https://user-images.githubusercontent.com/18350557/176309783-0785949b-9127-417c-8b55-ab5a4333674e.gif)Meu nome é Matheus Ventura

=======================================================================================================================================

  

# Teste Full Stack


### Ferramentas Usadas

  

<p  align="left">

<a  href="https://www.typescriptlang.org/"  target="_blank"  rel="noreferrer"><img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg"  width="36"  height="36"  alt="TypeScript" /></a><a  href="https://git-scm.com/"  target="_blank"  rel="noreferrer"><img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/git-colored.svg"  width="36"  height="36"  alt="Git" /></a><a  href="https://code.visualstudio.com/"  target="_blank"  rel="noreferrer"><img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/visualstudiocode.svg"  width="36"  height="36"  alt="VS Code" /></a><a  href="https://reactjs.org/"  target="_blank"  rel="noreferrer"><img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg"  width="36"  height="36"  alt="React" /></a><a  href="https://tailwindcss.com/"  target="_blank"  rel="noreferrer"><img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg"  width="36"  height="36"  alt="TailwindCSS" /></a><a  href="https://vitejs.dev/"  target="_blank"  rel="noreferrer"><img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vite-colored.svg"  width="36"  height="36"  alt="Vite" /></a><a  href="https://nodejs.org/en/"  target="_blank"  rel="noreferrer"><img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg"  width="36"  height="36"  alt="NodeJS" /></a><a  href="https://aws.amazon.com"  target="_blank"  rel="noreferrer"><img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/aws-colored.svg"  width="36"  height="36"  alt="Amazon Web Services" /></a><a  href="https://www.linux.org"  target="_blank"  rel="noreferrer"><img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/linux-colored.svg"  width="36"  height="36"  alt="Linux" /></a>

</p>

  

### Redes Sociais

  

<p  align="left"> <a  href="https://www.github.com/theoti"  target="_blank"  rel="noreferrer"> <picture> <source  media="(prefers-color-scheme: dark)"  srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github-dark.svg" /> <source  media="(prefers-color-scheme: light)"  srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg" /> <img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg"  width="32"  height="32" /> </picture> </a> <a  href="https://www.linkedin.com/in/matheus-fernandes-14919118a"  target="_blank"  rel="noreferrer"> <picture> <source  media="(prefers-color-scheme: dark)"  srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin-dark.svg" /> <source  media="(prefers-color-scheme: light)"  srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg" /> <img  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg"  width="32"  height="32" /> </picture> </a></p>

=======================================================================================================================================

# Problemática

A grande problemática para o desafio é o upload de arquivos pesados (arquivos com tamanhos que excedem GigaBytes). Enquanto navegamos pela internet é "comum" que tenhamos alguns picos de instabilidade em nossa rede e, imaginando um cenário em que estamos fazendo o upload de um arquivo pesado (5GB) para o nosso servidor, corremos o risco de termos uma instabilidade quando o upload está 99,9% concluído, e o que acontece com o nosso upload? Isso mesmo, perdemos todo o progresso, além de travarmos o nosso servidor ou estaremos alocando recursos (memória e CPU) para o nosso client até que esse upload seja finalizado ou interrompido.
Além do mais, imaginando que o usuário faça o upload através de um browser para o servidor, e então lemos esse arquivo com FS (node:fs), estaremos carregando esse arquivo pesado na memória do nosso servidor e então fazemos o upload desse arquivo para um serviço de storage (S3, GCP Storage, etc), temos uma grande limitação pois temos que configurar os recursos do nosso servidor para suportar esse arquivo em memória (que trabalhão não é mesmo?).

# Solução

Por que ao invés de enviar esse arquivo pesado de uma vez, nós não cortamos ele em pedaços (chunks) e enviamos pedaço por pedaço para o nosso servidor? Parece meio trabalhoso não, pensando por cima, além do envio, precisaremos ter uma lógica para controlar o que já foi enviado e quanto falta enviar e etc...

Aí que entra o `MultiparUpload` (serviço do `AWS S3`), que nos permite fazer um upload (solicitação de criação de um MultipartUpload) que nos retorna uma URL assinada (`Presigned URL`) e um ID de upload (`UploadId`) onde, com esses dados, consigo enviar os meus chunks (essa abordagem possui algumas limitações extravagantes como, o tamanho máximo de upload é de `2TB`, o tamanho minimo do chunk é `5MB` exceto o último chunk e posso enviar até `10000` chunks por MPU), e então o meu S3 fica aguardando que eu envie todos os chunks e então chame uma função para concluir o meu MultipartUpload que ocorre quando todos os chunks são enviados e então o arquivo fica visível em nosso S3. Essa abordagem mantém o MPU (multipart upload) "aberto" para receber os chunks eternamente até que eu envie um comando para concluir esse MPU. Essa abordagem é interessante pois caso nós tenhamos uma queda de energia, não perdemos o nosso progresso, simplesmente podemos aplicar um retry somente para o chunk que falhou. A implementação é tão simples quanto essa explicação.

Resumindo, a idealização da minha abordagem permite uploads de até 2TB.

## Frontend

O front-end consiste em uma simples aplicação construída com `ReactJS`, `Vite`, `TailwindCSS` e `Shadcn/UI` e possui uma única tela para a realização do upload do arquivo .CSV.

## Backend

A solução possui maior enfoque no lado servidor, onde foi implementado o design system a seguir: 
![enter image description here](https://personaltheobucket.s3.sa-east-1.amazonaws.com/Captura+de+tela+de+2024-11-04+13-30-35.png)

Como pode-se notar no design system, a solução foi implementada com `funções lambda`, filas (`SQS`), `S3` e `DynamoDB` para armazenar os dados e fazer o controle do envio dos chunks.

A partir de uma ação do usuário no client, chamamos uma função que inicia o MPU, e então é disparado uma série de eventos automáticos, após o objeto ser enviado para nosso bucket, uma lambda é "triggada" onde, pensando em otimização de recursos (a função lambda ficou limitada em 128MB de memória), implementei uma lógica em que leio chunks desse objeto e para cada chunk, faço o envio de uma mensagem para o SQS informando a key do objeto, o range de bytes que estou lendo (chunks) e o dado em si (linhas do csv), tendo a atenção que a mensagem do SQS tem um tamanho máximo de 256KB e antecedendo o envio da mensagem, crio um Item no DynamoDB com os mesmos dados que envio para o SQS, acrescendo apenas dados de controle como data de criação, data de atualização e status que se inicia como 'pending'.

Após o envio da mensagem, uma outra lambda consome essas mensagens e faz o processamento desse chunk, fazendo update no dynamo passando o status para 'processing' e alterando a data de atualização e então aplico todas as validações necessárias nos dados (validação de cpf ou cnpj, valor de prestação e outros), e então salvo essas informações em outra table no dynamo onde ficam as informações consolidadas para acesso em geral. 

E por fim, altero o status da minha tabela de controle para 'completed', assim, consigo implementar facilmente uma lógica que processa e envia novamente um pedaço específico do meu objeto (csv) do s3. 

O design system não contempla, mas toda essa estrutura é montada com `serverless` (infra as code), ou seja, basta configurar o `AWS CLI` com suas credenciais de acesso: `secretKey` e `acessToken` e rodar o comando `sls deploy` e o serverless cuida de provisionar tudo para nós.
Além do mais, o bucket implementa `LifeCycleRules` para que remova automáticamente qualquer MultipartUpload que estiver incompleto após 1 dia, e também remove o arquivo que foi salvo no bucket também após 1 dia afim de evitar custos desnecessários.

### Resumo

Essa abordagem nos permite ter um sistema resiliente, baixo custo tendo em vista que não temos um servidor Up 24x7, as lambdas somente serão executadas quando ouver algum upload ou alguma ação em andamento. E o melhor de tudo, temos o monitoramento de TUDO!


# ATENÇÃO

Ao testar a aplicação, é necessário alterar no frontend a url dos services `abortMPU`, `completeMPU` e `initiateMPU` pois sempre que fazemos o primeiro deploy da aplicação, as url das funções lambdas são alterdas. 
Espero que avaliem a solução e que entendam este ponto.

Com carinho <3 Matheus.