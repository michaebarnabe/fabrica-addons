// ui.js — funções de renderização e manipulação do DOM

export function createSubtaskElement(text, index, onChange, onRemove) {
  const wrap = document.createElement('div');
  wrap.className = 'subtask';

  const input = document.createElement('input');
  input.value = text || '';
  input.placeholder = `Subtarefa ${index + 1}`;
  input.addEventListener('input', () => onChange(input.value, index));

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remover';
  removeBtn.className = 'remove';
  removeBtn.addEventListener('click', () => onRemove(index));

  wrap.appendChild(input);
  wrap.appendChild(removeBtn);

  return wrap;
}

export function renderSubtasks(container, subtasks, callbacks) {
  container.innerHTML = '';
  subtasks.forEach((s, i) => {
    const el = createSubtaskElement(s, i, callbacks.onChange, callbacks.onRemove);
    container.appendChild(el);
  });
}

export function updateRawData(preElement, state) {
  preElement.textContent = JSON.stringify(state, null, 2);
}

// Renderiza uma tabela legível com todas as subtarefas — permite remover diretamente.
export function renderSubtasksTable(container, subtasks, callbacks) {
  container.innerHTML = '';
  if (!subtasks || subtasks.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'Nenhuma subtarefa criada.';
    container.appendChild(empty);
    return;
  }

  const table = document.createElement('table');
  table.className = 'subtasks-table';

  const thead = document.createElement('thead');
  const trh = document.createElement('tr');
  ['#','Subtarefa','Ações'].forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    trh.appendChild(th);
  });
  thead.appendChild(trh);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  subtasks.forEach((s, i) => {
    const tr = document.createElement('tr');

    const tdIndex = document.createElement('td');
    tdIndex.textContent = String(i+1);

    const tdText = document.createElement('td');
    const divText = document.createElement('div');
    divText.className = 'task-text';
    divText.textContent = s;
    tdText.appendChild(divText);

    const tdActions = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.className = 'action-btn';
    removeBtn.textContent = 'Remover';
    removeBtn.addEventListener('click', () => callbacks.onRemove(i));
    tdActions.appendChild(removeBtn);

    tr.appendChild(tdIndex);
    tr.appendChild(tdText);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
