// --- ELEMENTOS DA UI ---
const fileInput = document.getElementById('fileInput');
const selectFolderBtn = document.getElementById('selectFolderBtn');
const selectFilesBtn = document.getElementById('selectFilesBtn');
const processBtn = document.getElementById('processBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resultsBody = document.getElementById('resultsBody');
const statusText = document.getElementById('statusText');
const progressBar = document.getElementById('progressBar');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');

// --- ESTADO GLOBAL ---
let filesToProcess = []; 
let convertedFiles = []; 

// --- UTILITÁRIOS ---
const humanSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${['B','KB','MB','GB'][i]}`;
};

qualitySlider.addEventListener('input', (e) => {
    qualityValue.textContent = `${Math.round(e.target.value * 100)}%`;
});

// --- FUNÇÃO DE CONVERSÃO ---
async function convertImageItem(item) {
    const { file, row } = item;
    
    // Pega as configurações
    const targetFormat = document.querySelector('input[name="format"]:checked').value;
    const quality = parseFloat(qualitySlider.value);
    
    // Mapa simples: Apenas WebP e JPG
    const extMap = { 
        'image/jpeg': 'jpg',
        'image/webp': 'webp'
    };
    const targetExt = extMap[targetFormat];

    try {
        updateStatusCell(row, "Lendo...", "neutral");
        let processableBlob = file;

        // Decodificação de HEIC (iPhone)
        if (file.name.toLowerCase().endsWith('.heic')) {
            updateStatusCell(row, "Decodificando HEIC...", "neutral");
            const result = await heic2any({ blob: file, toType: "image/png" });
            processableBlob = Array.isArray(result) ? result[0] : result;
        }

        updateStatusCell(row, "Convertendo...", "neutral");
        const imageBitmap = await createImageBitmap(processableBlob);

        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext('2d');

        // --- TRATAMENTO DE FUNDO ---
        if (targetFormat === 'image/jpeg') {
            // JPG: Aplica fundo BRANCO
            ctx.fillStyle = '#FFFFFF'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            // WebP: Mantém transparência
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Desenha a imagem
        ctx.drawImage(imageBitmap, 0, 0);

        // --- EXPORTAÇÃO ---
        const newBlob = await new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Erro ao gerar imagem"));
            }, targetFormat, quality);
        });

        const relativePath = file.webkitRelativePath || file.name;
        const newName = relativePath.replace(/\.[^/.]+$/, "") + "." + targetExt;

        convertedFiles.push({ path: newName, blob: newBlob });
        
        updateResultRow(row, {
            status: 'Concluído',
            origSize: file.size,
            outSize: newBlob.size,
            previewUrl: URL.createObjectURL(newBlob),
            downloadName: newName.split('/').pop()
        });

    } catch (e) {
        console.error(e);
        updateStatusCell(row, `Erro: ${e.message || e}`, 'bad');
    }
}

// --- UI HELPERS ---

function createResultRow(file) {
    const row = resultsBody.insertRow();
    row.innerHTML = `
        <td><div style="width:50px; height:50px; background:#f0f0f0; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#ccc; font-size:10px;">...</div></td>
        <td style="word-break: break-all;">${file.name}</td>
        <td class="status-cell">Aguardando</td>
        <td>${humanSize(file.size)}</td>
        <td>-</td>
        <td>-</td>
        <td style="text-align: center;"><button class="btn-sm disabled">⬇</button></td>
    `;
    return row;
}

function updateStatusCell(row, text, className) {
    const cell = row.cells[2];
    cell.textContent = text;
    cell.className = ''; // Limpa classes
    if (className) cell.classList.add(className);
}

function updateResultRow(row, { status, origSize, outSize, previewUrl, downloadName }) {
    const reduction = 100 * (origSize - outSize) / origSize;
    const isPositive = reduction > 0;
    
    if (previewUrl) {
        row.cells[0].innerHTML = `<img src="${previewUrl}" class="thumb-img">`;
    }
    
    const statusCell = row.cells[2];
    statusCell.textContent = status;
    statusCell.className = 'good';

    row.cells[4].textContent = humanSize(outSize);
    
    const reductionCell = row.cells[5];
    reductionCell.textContent = `${reduction.toFixed(1)}%`;
    // Se aumentou (negativo) fica vermelho, se reduziu fica verde
    reductionCell.className = isPositive ? 'good' : 'bad'; 

    const actionCell = row.cells[6];
    actionCell.innerHTML = '';
    
    const dwnLink = document.createElement('a');
    dwnLink.href = previewUrl;
    dwnLink.download = downloadName;
    dwnLink.className = 'btn-sm';
    dwnLink.textContent = 'Baixar';
    actionCell.appendChild(dwnLink);
}

// --- EVENTOS ---

selectFolderBtn.addEventListener('click', () => {
    fileInput.webkitdirectory = true;
    fileInput.click();
});

selectFilesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fileInput.removeAttribute('webkitdirectory');
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const rawFiles = Array.from(e.target.files);
    // Aceita JPG, PNG, HEIC, WEBP na entrada
    const validExts = ['.jpg', '.jpeg', '.png', '.heic', '.webp'];
    const validFiles = rawFiles.filter(f => validExts.some(ext => f.name.toLowerCase().endsWith(ext)));

    if (validFiles.length === 0) {
        alert("Nenhuma imagem compatível encontrada.");
        return;
    }

    filesToProcess = [];
    convertedFiles = [];
    resultsBody.innerHTML = '';
    downloadBtn.style.display = 'none';
    progressBar.value = 0;
    progressBar.style.display = 'none';

    validFiles.forEach(file => {
        const row = createResultRow(file);
        filesToProcess.push({ file, row });
    });

    statusText.textContent = `${filesToProcess.length} arquivo(s) carregado(s).`;
    processBtn.disabled = false;
});

processBtn.addEventListener('click', async () => {
    processBtn.disabled = true;
    selectFolderBtn.disabled = true;
    selectFilesBtn.disabled = true;
    progressBar.style.display = 'block';
    
    convertedFiles = [];
    let processedCount = 0;
    
    for (const item of filesToProcess) {
        await convertImageItem(item);
        processedCount++;
        progressBar.value = (processedCount / filesToProcess.length) * 100;
        statusText.textContent = `Processando ${processedCount}/${filesToProcess.length}...`;
    }

    statusText.textContent = "Processamento concluído!";
    downloadBtn.style.display = 'inline-block';
    downloadBtn.textContent = `Baixar Tudo (${convertedFiles.length} arqs)`;
    
    selectFolderBtn.disabled = false;
    selectFilesBtn.disabled = false;
    processBtn.disabled = false;
});

downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = "Compactando ZIP...";
    downloadBtn.disabled = true;

    const zip = new JSZip();
    convertedFiles.forEach(file => {
        zip.file(file.path, file.blob);
    });

    zip.generateAsync({ type: "blob" }).then(content => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = "imagens_otimizadas.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    });
});