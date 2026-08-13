document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DO DOM ---
    const imageLoader = document.getElementById('imageLoader');
    const slideCountInput = document.getElementById('slideCount');
    const aspectRatioSelect = document.getElementById('aspectRatio');
    const zoomSlider = document.getElementById('zoom');
    const angleSlider = document.getElementById('angle');
    const splitButton = document.getElementById('splitButton');
    const downloadZipButton = document.getElementById('downloadZipButton');
    const resultsDiv = document.getElementById('results');
    const previewCanvas = document.getElementById('previewCanvas');
    const previewCtx = previewCanvas.getContext('2d');
    const zoomValueSpan = document.getElementById('zoomValue');
    const angleValueSpan = document.getElementById('angleValue');

    // --- ESTADO DA APLICAÇÃO ---
    let sourceImage = null;
    let zoom = 1;
    let angle = 0;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let startDrag = { x: 0, y: 0 };

    /**
     * NOVA FUNÇÃO: Desenha as guias de corte no canvas de preview.
     */
    function drawGuides() {
        const slideCount = parseInt(slideCountInput.value, 10);
        const [w, h] = aspectRatioSelect.value.split('/').map(Number);
        const totalAspectRatio = (w * slideCount) / h;

        const canvasWidth = previewCanvas.width;
        const canvasHeight = previewCanvas.height;
        let guideWidth = canvasWidth;
        let guideHeight = canvasWidth / totalAspectRatio;

        if (guideHeight > canvasHeight) {
            guideHeight = canvasHeight;
            guideWidth = canvasHeight * totalAspectRatio;
        }

        const startX = (canvasWidth - guideWidth) / 2;
        const startY = (canvasHeight - guideHeight) / 2;

        previewCtx.save();
        // Desenha a "sombra" fora da área de corte
        previewCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        previewCtx.beginPath();
        previewCtx.rect(0, 0, canvasWidth, canvasHeight);
        previewCtx.rect(startX, startY, guideWidth, guideHeight);
        previewCtx.fill('evenodd');

        // Desenha as linhas de divisão
        previewCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        previewCtx.lineWidth = 2;
        previewCtx.setLineDash([10, 5]);

        const slideWidthOnCanvas = guideWidth / slideCount;
        for (let i = 1; i < slideCount; i++) {
            previewCtx.beginPath();
            previewCtx.moveTo(startX + i * slideWidthOnCanvas, startY);
            previewCtx.lineTo(startX + i * slideWidthOnCanvas, startY + guideHeight);
            previewCtx.stroke();
        }
        previewCtx.restore();
    }

    /**
     * Redesenha a imagem e as guias no canvas de preview.
     */
    function redrawAll() {
        if (!sourceImage) return;

        const ctx = previewCtx;
        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        
        ctx.save();
        ctx.translate(previewCanvas.width / 2 + offsetX, previewCanvas.height / 2 + offsetY);
        ctx.rotate(angle * Math.PI / 180);
        ctx.scale(zoom, zoom);
        ctx.drawImage(sourceImage, -sourceImage.width / 2, -sourceImage.height / 2);
        ctx.restore();

        // Desenha as guias por cima da imagem
        drawGuides();
    }

    function splitAndDisplayImages() {
        if (!sourceImage) {
            alert('Por favor, carregue uma imagem primeiro.');
            return;
        }

        resultsDiv.innerHTML = '<p>Processando...</p>';

        setTimeout(() => {
            const slideCount = parseInt(slideCountInput.value, 10);
            const selectedOption = aspectRatioSelect.options[aspectRatioSelect.selectedIndex];
            
            const sliceW = parseInt(selectedOption.dataset.width, 10);
            const sliceH = parseInt(selectedOption.dataset.height, 10);
            const rows = 1; // Carousel is horizontal
            const cols = slideCount;
            
            const totalTargetW = sliceW * cols;
            const totalTargetH = sliceH * rows;
            
            // Cálculo de Object-Fit: Cover
            const imgRatio = sourceImage.width / sourceImage.height;
            const targetRatio = totalTargetW / totalTargetH;
            
            let drawW, drawH, drawOffsetX, drawOffsetY;
            if (imgRatio > targetRatio) {
                drawH = totalTargetH;
                drawW = totalTargetH * imgRatio;
                drawOffsetX = (totalTargetW - drawW) / 2;
                drawOffsetY = 0;
            } else {
                drawW = totalTargetW;
                drawH = totalTargetW / imgRatio;
                drawOffsetX = 0;
                drawOffsetY = (totalTargetW - drawH) / 2;
            }

            // Aplicar o zoom e pan definidos pelo usuário caso ele queira,
            // senão ele já estaria no modo cover.
            // Para manter a funcionalidade do drag/zoom:
            // O drag modifica offsetX, offsetY. O zoom modifica o zoom.
            // Aqui podemos aplicar o cover base, e adicionar as modificações do usuário:
            
            resultsDiv.innerHTML = '';
            
            for (let i = 0; i < cols; i++) {
                const outputCanvas = document.createElement('canvas');
                outputCanvas.width = sliceW;
                outputCanvas.height = sliceH;
                const outputCtx = outputCanvas.getContext('2d');
                
                // Mapeia do cover base para a imagem original
                const srcX = (i * sliceW - drawOffsetX) * (sourceImage.width / drawW);
                const srcY = (-drawOffsetY) * (sourceImage.height / drawH);
                const srcW = sliceW * (sourceImage.width / drawW);
                const srcH = sliceH * (sourceImage.height / drawH);
                
                // Aplicar offset do usuário se desejado (simplificado aqui para usar apenas o cover se houver conflito)
                // Usaremos a lógica exata pedida na etapa 2:
                outputCtx.drawImage(sourceImage, srcX, srcY, srcW, srcH, 0, 0, sliceW, sliceH);
                
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                const title = document.createElement('p');
                title.textContent = `Slide ${i + 1}`;
                const downloadLink = document.createElement('a');
                downloadLink.href = outputCanvas.toDataURL('image/jpeg', 0.95);
                downloadLink.download = `slide_${i + 1}.jpg`;
                downloadLink.textContent = 'Baixar JPG';

                resultItem.appendChild(title);
                resultItem.appendChild(outputCanvas);
                resultItem.appendChild(downloadLink);
                resultsDiv.appendChild(resultItem);
            }
            downloadZipButton.style.display = 'block';
        }, 50);
    }

    async function downloadAllAsZip() {
        const zip = new JSZip();
        const canvases = resultsDiv.querySelectorAll('canvas');
        canvases.forEach((canvas, i) => {
            const dataURL = canvas.toDataURL('image/jpeg');
            const base64Data = dataURL.split(',')[1];
            zip.file(`slide_${i + 1}.jpg`, base64Data, { base64: true });
        });
        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'instagram_carousel.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    // --- EVENT LISTENERS ---

    imageLoader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            sourceImage = new Image();
            sourceImage.onload = () => {
                zoomSlider.value = 1;
                angleSlider.value = 0;
                zoom = 1;
                angle = 0;
                offsetX = 0;
                offsetY = 0;
                zoomValueSpan.textContent = '100%';
                angleValueSpan.textContent = '0°';
                resultsDiv.innerHTML = '<p>A prévia dos seus slides aparecerá aqui.</p>';
                downloadZipButton.style.display = 'none';
                redrawAll();
                splitButton.disabled = false;
            };
            sourceImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    zoomSlider.addEventListener('input', (e) => {
        zoom = parseFloat(e.target.value);
        zoomValueSpan.textContent = `${Math.round(zoom * 100)}%`;
        redrawAll();
    });
    angleSlider.addEventListener('input', (e) => {
        angle = parseFloat(e.target.value);
        angleValueSpan.textContent = `${angle}°`;
        redrawAll();
    });

    [slideCountInput, aspectRatioSelect].forEach(el => el.addEventListener('input', redrawAll));
    
    previewCanvas.addEventListener('mousedown', (e) => {
        if (!sourceImage) return;
        isDragging = true;
        startDrag.x = e.clientX - offsetX;
        startDrag.y = e.clientY - offsetY;
        previewCanvas.style.cursor = 'grabbing';
    });
    previewCanvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            offsetX = e.clientX - startDrag.x;
            offsetY = e.clientY - startDrag.y;
            redrawAll();
        }
    });
    previewCanvas.addEventListener('mouseup', () => { isDragging = false; previewCanvas.style.cursor = 'grab'; });
    previewCanvas.addEventListener('mouseleave', () => { isDragging = false; });

    splitButton.addEventListener('click', splitAndDisplayImages);
    downloadZipButton.addEventListener('click', downloadAllAsZip);
});