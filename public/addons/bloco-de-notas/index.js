let db;
let currentId = null;

/* ABRIR BANCO */
const openDB = indexedDB.open("NotasDB", 1);

openDB.onupgradeneeded = e => {
  const db = e.target.result;
  db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
};

openDB.onsuccess = e => {
  db = e.target.result;
  loadNotes();
};

/* NOVA NOTA */
window.newNote = function() {
  currentId = null;
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

/* SALVAR */
window.saveNote = function() {
  const title = document.getElementById("title").value || "Sem título";
  const content = document.getElementById("content").value;

  const tx = db.transaction("notes", "readwrite");
  const store = tx.objectStore("notes");

  if (currentId) {
    store.put({ id: currentId, title, content });
  } else {
    store.add({ title, content });
  }

  tx.oncomplete = () => {
    newNote();
    loadNotes();
  };
}

/* EXCLUIR */
window.deleteNote = function() {
  if (!currentId) {
    alert("Nenhuma nota selecionada.");
    return;
  }

  if (!confirm("Excluir esta nota?")) return;

  const tx = db.transaction("notes", "readwrite");
  const store = tx.objectStore("notes");
  store.delete(currentId);

  tx.oncomplete = () => {
    newNote();
    loadNotes();
  };
}

/* LISTAR */
function loadNotes(filter = "") {
  const list = document.getElementById("notesList");
  list.innerHTML = "";

  const tx = db.transaction("notes", "readonly");
  const store = tx.objectStore("notes");
  const cursor = store.openCursor();

  cursor.onsuccess = e => {
    const cur = e.target.result;
    if (!cur) return;

    const note = cur.value;
    const text = (note.title + note.content).toLowerCase();

    if (text.includes(filter)) {
      const div = document.createElement("div");
      div.className = "note-item";
      div.textContent = note.title;
      div.onclick = (ev) => openNote(note, ev);
      list.appendChild(div);
    }
    cur.continue();
  };
}

/* ABRIR */
function openNote(note, ev) {
  currentId = note.id;
  document.getElementById("title").value = note.title;
  document.getElementById("content").value = note.content;

  document.querySelectorAll(".note-item").forEach(i => i.classList.remove("active"));
  ev.target.classList.add("active");
}

/* BUSCA */
document.getElementById("search").addEventListener("input", e => {
  loadNotes(e.target.value.toLowerCase());
});

/* IMPORTAR TXT (SEM DUPLICAR) */
document.getElementById("importBtn").addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".txt";
  input.multiple = true;

  input.onchange = async () => {
    const files = Array.from(input.files);

    for (const file of files) {
      const text = await file.text();
      const title = file.name;

      const exists = await noteExists(title, text);
      if (exists) continue;

      const tx = db.transaction("notes", "readwrite");
      tx.objectStore("notes").add({ title, content: text });
      await new Promise(res => tx.oncomplete = res);
    }

    loadNotes();
  };

  input.click();
});

/* VERIFICA DUPLICADO */
function noteExists(title, content) {
  return new Promise(resolve => {
    const tx = db.transaction("notes", "readonly");
    const store = tx.objectStore("notes");
    const cursor = store.openCursor();

    cursor.onsuccess = e => {
      const cur = e.target.result;
      if (!cur) return resolve(false);

      const note = cur.value;
      if (note.title === title && note.content === content) {
        return resolve(true);
      }
      cur.continue();
    };
  });
}
