document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const charNoSpaceCount = document.getElementById('charNoSpaceCount');
    const sentenceCount = document.getElementById('sentenceCount');
    const paragraphCount = document.getElementById('paragraphCount');
    const readTime = document.getElementById('readTime');
    const keywordList = document.getElementById('keywordList');

    inputText.addEventListener('input', () => {
        const text = inputText.value;
        const textTrimmed = text.trim();
        
        charCount.textContent = text.length;
        charNoSpaceCount.textContent = text.replace(/\s/g, '').length;
        
        const words = textTrimmed ? textTrimmed.split(/\s+/).filter(w => w.length > 0) : [];
        wordCount.textContent = words.length;
        
        const sentences = textTrimmed ? textTrimmed.split(/[.!?]+/).filter(s => s.trim().length > 0) : [];
        sentenceCount.textContent = sentences.length;
        
        const paragraphs = textTrimmed ? textTrimmed.split(/\n+/).filter(p => p.trim().length > 0) : [];
        paragraphCount.textContent = paragraphs.length;
        
        const rTime = Math.ceil(words.length / 200); // 200 wpm
        readTime.textContent = rTime + ' min';

        // Density
        const wordMap = {};
        words.forEach(w => {
            const lw = w.toLowerCase().replace(/[^a-zá-úãõâêîôû]/g, '');
            if (lw.length > 3) {
                wordMap[lw] = (wordMap[lw] || 0) + 1;
            }
        });
        
        const sorted = Object.entries(wordMap).sort((a,b) => b[1] - a[1]).slice(0, 10);
        keywordList.innerHTML = sorted.map(k => `<li>${k[0]}: ${k[1]}x</li>`).join('');
    });
});
