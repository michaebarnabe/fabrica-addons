document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('jsonInput');
    const treeView = document.getElementById('treeView');
    const errorMsg = document.getElementById('errorMsg');
    const indentSize = document.getElementById('indentSize');

    const parseJSON = () => {
        try {
            const val = jsonInput.value.trim();
            if (!val) {
                errorMsg.style.display = 'none';
                treeView.textContent = '';
                return null;
            }
            const obj = JSON.parse(val);
            errorMsg.style.display = 'none';
            return obj;
        } catch (e) {
            errorMsg.textContent = 'Erro: ' + e.message;
            errorMsg.style.display = 'block';
            return null;
        }
    };

    const getIndent = () => {
        const val = indentSize.value;
        return val === '\\t' ? '\t' : parseInt(val, 10);
    };

    const updateView = (str) => {
        treeView.textContent = str;
    };

    document.getElementById('btnFormat').addEventListener('click', () => {
        const obj = parseJSON();
        if (obj) {
            const formatted = JSON.stringify(obj, null, getIndent());
            jsonInput.value = formatted;
            updateView(formatted);
        }
    });

    document.getElementById('btnMinify').addEventListener('click', () => {
        const obj = parseJSON();
        if (obj) {
            const minified = JSON.stringify(obj);
            jsonInput.value = minified;
            updateView(minified);
        }
    });

    jsonInput.addEventListener('input', () => {
        const obj = parseJSON();
        if (obj) {
            updateView(JSON.stringify(obj, null, getIndent()));
        }
    });

    document.getElementById('btnCopy').addEventListener('click', (e) => {
        const btn = e.target;
        navigator.clipboard.writeText(jsonInput.value).then(() => {
            const old = btn.textContent;
            btn.textContent = 'Copiado!';
            setTimeout(() => btn.textContent = old, 2000);
        });
    });

    document.getElementById('btnPaste').addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            jsonInput.value = text;
            jsonInput.dispatchEvent(new Event('input'));
        } catch (e) {
            console.error('Falha ao colar', e);
        }
    });
});
