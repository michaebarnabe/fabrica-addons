// Variável para armazenar a instância do QR Code gerado
let qrCodeInstance = null;

/**
 * Gera e exibe um QR Code usando a biblioteca qr-code-styling.
 */
function generateQRCode() {
  const container = document.getElementById('qrcode-container');
  const downloadLink = document.getElementById('download-link');
  const url = document.getElementById('url-input').value;

  container.innerHTML = '';
  downloadLink.style.display = 'none';

  if (!url.trim()) {
    container.innerHTML = '<p style="color: red;">Por favor, insira uma URL válida.</p>';
    return;
  }

  // A nova biblioteca é instanciada com `new QRCodeStyling`
  // Ela está disponível no objeto `window` após o script do CDN carregar.
  qrCodeInstance = new window.QRCodeStyling({
    width: 256,
    height: 256,
    data: url,
    margin: parseInt(document.getElementById('padding-input').value, 10),
    dotsOptions: {
      color: document.getElementById('color-input').value,
      type: "rounded"
    },
    backgroundOptions: {
      color: document.getElementById('bg-color-input').value,
    },
    cornersSquareOptions: {
        type: "extra-rounded"
    },
    imageOptions: {
        margin: 5
    }
  });

  // A biblioteca gerencia a renderização (desenha um <canvas> ou <svg>)
  qrCodeInstance.append(container);
  downloadLink.style.display = 'inline-block';
}

/**
 * Aciona o download do QR Code gerado no formato SVG.
 */
function downloadQRCode() {
  if (qrCodeInstance) {
    // A própria biblioteca tem um método de download, muito mais robusto.
    qrCodeInstance.download({ name: "qrcode", extension: "svg" });
  } else {
    alert("Gere um QR Code antes de tentar baixar.");
  }
}

// Associa as funções aos eventos dos botões
const generateBtn = document.getElementById('generate-btn');
const downloadLink = document.getElementById('download-link');

generateBtn.addEventListener('click', generateQRCode);
downloadLink.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o link de navegar
    downloadQRCode();
});