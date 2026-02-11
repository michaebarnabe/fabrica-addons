/**
 * Função para o PASSO 1: Salva o texto do vCard como um arquivo .vcf.
 * Utiliza um Blob para criar um arquivo em memória que pode ser baixado pelo usuário.
 * * @param {string} vcardText - O conteúdo completo do vCard.
 * @param {string} filename - O nome do arquivo a ser salvo (ex: 'contato.vcf').
 */
export function saveVcfFile(vcardText, filename) {
  if (!vcardText.trim() || !filename.trim()) {
    alert("Por favor, preencha o conteúdo do vCard e o nome do arquivo.");
    return;
  }

  // Cria um Blob (Binary Large Object) com o texto do vCard.
  // O tipo 'text/vcard' ajuda os sistemas operacionais a reconhecerem o arquivo.
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8' });

  // Cria um link <a> temporário em memória.
  const link = document.createElement('a');
  // Gera uma URL temporária para o Blob.
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // Adiciona o link ao corpo do documento (necessário para o Firefox).
  document.body.appendChild(link);
  // Simula um clique no link para iniciar o download.
  link.click();
  // Remove o link do corpo do documento após o clique.
  document.body.removeChild(link);
  // Revoga a URL do objeto para liberar memória.
  URL.revokeObjectURL(link.href);
}

/**
 * Função para o PASSO 2: Gera um QR Code a partir de um texto (URL).
 *
 * @param {string} text - O texto (URL) a ser codificado no QR Code.
 * @param {HTMLElement} containerElement - O elemento div onde o QR Code será renderizado.
 * @param {HTMLAnchorElement} downloadLink - O elemento <a> que será usado para o download.
 */
export function generateQRCode(text, containerElement, downloadLink) {
  containerElement.innerHTML = '';
  downloadLink.style.display = 'none';

  if (!text.trim()) {
    containerElement.innerHTML = '<p style="color: red;">Por favor, insira a URL do seu arquivo .vcf.</p>';
    return;
  }

  try {
    new QRCode(containerElement, {
      text: text,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M // Nível médio é um bom equilíbrio
    });

    setTimeout(() => {
      const canvas = containerElement.querySelector('canvas');
      if (canvas) {
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");

        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode_contato.png";
        downloadLink.style.display = 'inline-block';
      } else {
        throw new Error("Não foi possível encontrar o elemento canvas do QR Code.");
      }
    }, 100);

  } catch (error) {
    console.error("Erro ao gerar o QR Code:", error);
    containerElement.innerHTML = `<p style="color: red;">Ocorreu um erro: ${error.message}</p>`;
  }
}