document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['phone', 'message', 'utm_source', 'utm_medium', 'utm_campaign'].map(id => document.getElementById(id));
    const resultLink = document.getElementById('resultLink');
    const copyBtn = document.getElementById('copyBtn');

    const generate = () => {
        let phone = inputs[0].value.replace(/\D/g, '');
        const msg = inputs[1].value;
        const utm_source = inputs[2].value;
        const utm_medium = inputs[3].value;
        const utm_campaign = inputs[4].value;

        if (phone && !phone.startsWith('55') && phone.length === 11) {
            phone = '55' + phone; // Padrão BR se o usuário esquecer
        }

        let url = phone ? `https://wa.me/${phone}` : 'https://wa.me/';
        
        const params = new URLSearchParams();
        if (msg) params.append('text', msg);
        if (utm_source) params.append('utm_source', utm_source);
        if (utm_medium) params.append('utm_medium', utm_medium);
        if (utm_campaign) params.append('utm_campaign', utm_campaign);

        const queryString = params.toString();
        if (queryString) {
            url += '?' + queryString;
        }
        
        resultLink.value = (phone || msg) ? url : '';
    };

    inputs.forEach(input => input.addEventListener('input', generate));
    
    copyBtn.addEventListener('click', () => {
        if (!resultLink.value) return;
        navigator.clipboard.writeText(resultLink.value).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copiado!';
            setTimeout(() => copyBtn.textContent = originalText, 2000);
        });
    });
});
