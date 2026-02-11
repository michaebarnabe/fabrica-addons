# Add-on: Fluxo de Trabalho para QR Code de vCard

Este add-on web fornece um fluxo de trabalho completo e robusto para criar QR Codes de contato (vCard). Ele resolve o problema de limite de dados em QR Codes guiando o usuário a criar um arquivo `.vcf` e, em seguida, gerar um QR Code a partir da URL desse arquivo.

## Funcionalidades

-   **Etapa 1: Criador de .vcf:** Uma área de texto para inserir informações de contato no formato vCard e um botão para salvar esses dados localmente como um arquivo `.vcf` pronto para upload.
-   **Etapa 2: Gerador de QR Code:** Um campo para inserir a URL pública do arquivo `.vcf` e gerar um QR Code limpo, leve e confiável.
-   Permite o download da imagem do QR Code gerado em formato PNG.

## Como Usar

1.  **Abra `index.html` no seu navegador.**
2.  **No Passo 1:**
    -   Cole (ou edite) o conteúdo completo do seu cartão de visitas no formato vCard na primeira caixa de texto.
    -   Confirme o nome do arquivo (o padrão `contato.vcf` é recomendado).
    -   Clique em "Salvar como .vcf". O arquivo será baixado para o seu computador.
3.  **Faça o upload do arquivo `.vcf`** que você acabou de salvar para o seu site ou serviço de hospedagem de arquivos.
4.  **No Passo 2:**
    -   Copie a URL pública do arquivo que você acabou de hospedar.
    -   Cole esta URL no campo "URL pública do seu arquivo .vcf".
    -   Clique em "Gerar QR Code".
5.  O QR Code aparecerá na tela. Clique em **"Baixar Imagem (PNG)"** para salvá-lo.