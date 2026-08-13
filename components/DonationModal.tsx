import React, { useState } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const pixKey = "a3f5b721-9x88-4444-a123-bcdef9876543"; // Chave aleatória fictícia
  const cryptoAddress = "TXYZ1234567890abcdefghijklmnopqrstuv"; // USDT TRC-20 fictícia

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Apoie o Projeto</h3>
          <button className="modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div className="modal-body">
          <p>Sua doação ajuda a manter os servidores ativos e no desenvolvimento de novas ferramentas. <strong>Sua privacidade é garantida!</strong></p>

          <div className="donation-option">
            <h4><i className="bi bi-lightning-charge"></i> Pix (Chave Aleatória)</h4>
            <div className="copy-box">
              <code>{pixKey}</code>
              <button 
                className="btn-copy" 
                onClick={() => handleCopy(pixKey, 'pix')}
              >
                {copied === 'pix' ? 'Copiado!' : <><i className="bi bi-copy"></i> Copiar</>}
              </button>
            </div>
          </div>

          <div className="donation-option">
            <h4><i className="bi bi-currency-bitcoin"></i> Criptomoedas (USDT TRC-20)</h4>
            <div className="copy-box">
              <code>{cryptoAddress}</code>
              <button 
                className="btn-copy" 
                onClick={() => handleCopy(cryptoAddress, 'crypto')}
              >
                {copied === 'crypto' ? 'Copiado!' : <><i className="bi bi-copy"></i> Copiar</>}
              </button>
            </div>
          </div>

          <div className="donation-option">
            <h4><i className="bi bi-cup-hot"></i> Plataformas</h4>
            <div className="platforms-links">
              <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" className="platform-btn">
                Buy Me a Coffee
              </a>
              <a href="https://livepix.gg" target="_blank" rel="noopener noreferrer" className="platform-btn">
                LivePix
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
