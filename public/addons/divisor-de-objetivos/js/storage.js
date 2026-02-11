// storage.js — responsável por salvar/carregar do localStorage
const STORAGE_KEY = 'divisor_de_objetivos_v1';

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Erro ao salvar no localStorage', e);
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Erro ao carregar do localStorage', e);
    return null;
  }
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
