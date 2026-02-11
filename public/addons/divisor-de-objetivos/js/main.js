// main.js — orquestra a interface e integra storage + ui
import { saveState, loadState, clearState } from './storage.js';
import { renderSubtasks, renderSubtasksTable } from './ui.js';

const goalInput = document.getElementById('goal-input');
const generateBtn = document.getElementById('generate-btn');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const subtasksContainer = document.getElementById('subtasks-container');
const addSubtaskBtn = document.getElementById('add-subtask-btn');
const newSubtaskInput = document.getElementById('new-subtask-input');
const subtasksTableContainer = document.getElementById('subtasks-table-container');

let state = {
  goal: '',
  subtasks: []
};

// Carrega estado salvo, se existir
const saved = loadState();
if (saved) {
  state = saved;
}

// Render inicial
function refreshUI() {
  goalInput.value = state.goal || '';
  renderSubtasks(subtasksContainer, state.subtasks, {
    onChange: (value, idx) => {
      state.subtasks[idx] = value;
      saveState(state);
      refreshUI();
    },
    onRemove: (idx) => {
      state.subtasks.splice(idx, 1);
      saveState(state);
      refreshUI();
    }
  });

  // Renderiza a visão em tabela (legível)
  if (subtasksTableContainer) {
    renderSubtasksTable(subtasksTableContainer, state.subtasks, {
      onRemove: (idx) => {
        state.subtasks.splice(idx, 1);
        saveState(state);
        refreshUI();
      }
    });
  }
}

refreshUI();

// Heurística melhorada para gerar subtarefas a partir do objetivo — sem IA externa.
// Abordagem:
// 1. Extrai entidades simples (entregável, cliente, integrações, ações conhecidas).
// 2. Gera fases produtivas (Definir, Planejar, Implementar, Testar, Lançar) e insere
//    detalhes extraídos quando aplicável.
// Essa heurística não é perfeita, mas produz uma estrutura prática e legível.
function generateStructureFromGoal(goal) {
  if (!goal) return [];
  const text = goal.trim();
  const lower = text.toLowerCase();

  // Listas simples de palavras-chave para identificar elementos
  const deliverables = ['site', 'aplicativo', 'app', 'loja', 'landing', 'landing page', 'blog', 'portal', 'sistema'];
  const integrations = ['crm', 'zapier', 'ziaper', 'api', 'integração', 'integrar', 'pagamento', 'stripe', 'pay', 'woocommerce'];
  const actionVerbs = ['criar','desenvolver','construir','integrar','implementar','configurar','migrar','testar','lançar','publicar','projetar','design','contratar','pesquisar','planejar'];

  // Detecta entregável
  let foundDeliverable = null;
  for (const d of deliverables) {
    if (lower.includes(d)) { foundDeliverable = d; break; }
  }

  // Detecta integrações citadas (coleta várias)
  const foundIntegrations = [];
  for (const it of integrations) {
    if (lower.includes(it)) {
      // normalize common typos
      const norm = it === 'ziaper' ? 'zapier' : it;
      if (!foundIntegrations.includes(norm)) foundIntegrations.push(norm);
    }
  }

  // Detecta cliente (ex: "cliente MA")
  let client = null;
  const clientMatch = lower.match(/cliente\s+([A-Za-z0-9-_]+)/i);
  if (clientMatch) client = clientMatch[1];

  // Detecta verbo/ação principal
  let mainAction = null;
  for (const v of actionVerbs) {
    if (lower.includes(v)) { mainAction = v; break; }
  }

  const steps = [];

  // 1) Definição de requisitos — sempre útil
  const reqParts = [];
  reqParts.push(text);
  if (client) reqParts.push(`Cliente: ${client}`);
  if (foundIntegrations.length) reqParts.push(`Integrações: ${foundIntegrations.join(', ')}`);
  steps.push(`Definir requisitos e escopo — ${reqParts.join(' • ')}`);

  // 2) Planejamento / design
  if (foundDeliverable || mainAction) {
    const planParts = [];
    if (foundDeliverable) planParts.push(`Entregável: ${foundDeliverable}`);
    if (mainAction) planParts.push(`Ação: ${mainAction}`);
    if (foundIntegrations.length) planParts.push(`Verificar integrações: ${foundIntegrations.join(', ')}`);
    steps.push(`Planejar arquitetura e design — ${planParts.join(' • ')}`);
  } else {
    steps.push('Planejar arquitetura e cronograma — desenhar como será entregue o objetivo');
  }

  // 3) Implementação / desenvolvimento
  if (foundDeliverable) {
    steps.push(`Implementar ${foundDeliverable} — desenvolver funcionalidades principais e integrações necessárias`);
  } else if (mainAction) {
    steps.push(`Implementar ação principal (${mainAction}) — executar as tarefas técnicas necessárias`);
  } else {
    steps.push('Desenvolver e executar as tarefas planejadas');
  }

  // 4) Integrações específicas (se houver)
  if (foundIntegrations.length) {
    steps.push(`Configurar e testar integrações: ${foundIntegrations.join(', ')}`);
  }

  // 5) Testes e validação
  steps.push('Testar e validar — testes funcionais, integração e aceitação pelo cliente');

  // 6) Lançamento e monitoramento
  steps.push('Lançar e monitorar — deploy, checagens pós-lançamento e ajustes iniciais');

  // Formata em linhas numeradas
  return steps.map((s, i) => `${i+1}. ${s}`);
}

// Eventos
generateBtn.addEventListener('click', () => {
  const goal = goalInput.value.trim();
  state.goal = goal;
  const suggestions = generateStructureFromGoal(goal);
  // Apenas adicionar sugestões que não existam
  suggestions.forEach(s => {
    if (!state.subtasks.includes(s)) state.subtasks.push(s);
  });
  saveState(state);
  refreshUI();
});

saveBtn.addEventListener('click', () => {
  state.goal = goalInput.value.trim();
  saveState(state);
  refreshUI();
});

clearBtn.addEventListener('click', () => {
  if (!confirm('Limpar objetivo e subtarefas?')) return;
  state = { goal: '', subtasks: [] };
  clearState();
  refreshUI();
});

addSubtaskBtn.addEventListener('click', () => {
  const text = newSubtaskInput.value.trim();
  if (!text) return;
  state.subtasks.push(text);
  newSubtaskInput.value = '';
  saveState(state);
  refreshUI();
});

// também permite adicionar pressionando Enter no input
newSubtaskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addSubtaskBtn.click();
  }
});

// Atualiza estado ao digitar no objetivo principal
goalInput.addEventListener('input', () => {
  state.goal = goalInput.value;
  saveState(state);
  // atualiza UI apenas
  // avoid heavy JSON rendering on each keystroke
});
