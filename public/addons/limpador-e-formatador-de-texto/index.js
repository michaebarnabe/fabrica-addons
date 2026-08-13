document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Update text helper
    const updateText = (fn) => {
        inputText.value = fn(inputText.value);
    };

    // Actions
    document.getElementById('btnRemoveExtraLines').addEventListener('click', () => {
        updateText(txt => txt.replace(/\n\s*\n/g, '\n\n'));
    });

    document.getElementById('btnRemoveExtraSpaces').addEventListener('click', () => {
        updateText(txt => txt.replace(/ +/g, ' ').trim());
    });

    document.getElementById('btnRemoveAccents').addEventListener('click', () => {
        updateText(txt => txt.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    });

    document.getElementById('btnRemoveDuplicates').addEventListener('click', () => {
        updateText(txt => {
            const lines = txt.split('\n');
            const uniqueLines = [...new Set(lines)];
            return uniqueLines.join('\n');
        });
    });

    document.getElementById('btnUppercase').addEventListener('click', () => {
        updateText(txt => txt.toUpperCase());
    });

    document.getElementById('btnLowercase').addEventListener('click', () => {
        updateText(txt => txt.toLowerCase());
    });

    document.getElementById('btnCapitalize').addEventListener('click', () => {
        updateText(txt => {
            return txt.charAt(0).toUpperCase() + txt.slice(1);
        });
    });

    document.getElementById('btnTitleCase').addEventListener('click', () => {
        updateText(txt => {
            return txt.toLowerCase().split(' ').map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
        });
    });

    // Utilities
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(inputText.value).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copiado!';
            setTimeout(() => copyBtn.textContent = originalText, 2000);
        });
    });

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
    });
});
