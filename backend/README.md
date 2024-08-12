# FitPersonal Backend

## Descrição
Este é o backend do projeto FitPersonal, uma aplicação para monitoramento de fitness que permite a criação e gerenciamento de treinos e perfis de usuários.

## Pré-requisitos

- **Java 17**: Certifique-se de ter o Java 17 instalado na sua máquina. Você pode verificar a versão instalada usando o comando:
  ```bash
  java -version
  ```

- Maven:  Maven é necessário para gerenciar as dependências e a construção do projeto. Verifique se está instalado com o comando:
  ```bash
    java -version
  ```

## Descrição Como rodar o projeto

### Usando a linha de comando

1. Clone o repositório:
   ```bash
      git clone https://github.com/luciofdsantos/APS-2023.2-FitPersonal.git
    ```
2. Navegue até o diretório do projeto:
   ```bash
      cd fitpersonal_backend    
   ```
3. Compile e rode a aplicação:
  ```bash
      mvn spring-boot:run    
   ```
4. A aplicação estará rodando em http://localhost:8080.

## Usando o IntelliJ IDEA

1. Abra o IntelliJ IDEA.

2. Selecione "Open" e navegue até o diretório do projeto clonado.

3. O IntelliJ IDEA deve reconhecer automaticamente o projeto como um projeto Maven e baixar as dependências necessárias. Se não, você pode forçar a sincronização do Maven clicando no ícone do Maven na barra lateral direita e selecionando "Reload All Maven Projects".

4. No painel de projeto, localize a classe principal do Spring Boot (aquela com a anotação @SpringBootApplication).

5. Clique com o botão direito na classe principal e selecione "Run 'FitpersonalApplication.main()'".

6. A aplicação estará rodando em http://localhost:8080.