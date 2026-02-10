/* ============================================================
   Iron Log — Gym Progress Tracker PWA
   Phase 1: Foundation, Exercise Library & Routine Creator
   Phase 2: The Active Logger
   ============================================================ */

// ── Service Worker Registration ──────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// ── Default Exercise Library ─────────────────────────────────
const DEFAULT_EXERCISES = [
  { id: 'ex1', name: 'Barbell Squat', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex2', name: 'Bench Press', muscle: 'Chest', equipment: 'Barbell' },
  { id: 'ex3', name: 'Deadlift', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex4', name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell' },
  { id: 'ex5', name: 'Barbell Row', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex6', name: 'Pull-ups', muscle: 'Back', equipment: 'Bodyweight' },
  { id: 'ex7', name: 'Dumbbell Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex8', name: 'Tricep Pushdown', muscle: 'Arms', equipment: 'Cable' },
  { id: 'ex9', name: 'Leg Press', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex10', name: 'Lateral Raise', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex11', name: 'Romanian Deadlift', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex12', name: 'Incline Dumbbell Press', muscle: 'Chest', equipment: 'Dumbbell' },
  { id: 'ex13', name: 'Cable Fly', muscle: 'Chest', equipment: 'Cable' },
  { id: 'ex14', name: 'Lat Pulldown', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex15', name: 'Leg Curl', muscle: 'Legs', equipment: 'Machine' },
];

// ── Data Layer (localStorage) ────────────────────────────────
const Store = {
  _get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  },
  _set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },

  getExercises() {
    return this._get('il_exercises', DEFAULT_EXERCISES);
  },
  saveExercises(list) {
    this._set('il_exercises', list);
  },

  getRoutines() {
    return this._get('il_routines', []);
  },
  saveRoutines(list) {
    this._set('il_routines', list);
  },

  getWorkouts() {
    return this._get('il_workouts', []);
  },
  saveWorkouts(list) {
    this._set('il_workouts', list);
  },

  // Active (in-progress) workout — survives page refresh
  getActiveWorkout() {
    return this._get('il_active_workout', null);
  },
  saveActiveWorkout(w) {
    this._set('il_active_workout', w);
  },
  clearActiveWorkout() {
    localStorage.removeItem('il_active_workout');
  },
};

// Seed exercises on first launch
if (!localStorage.getItem('il_exercises')) {
  Store.saveExercises(DEFAULT_EXERCISES);
}

// ── Tiny Router ──────────────────────────────────────────────
const Router = {
  _routes: {},
  _current: null,
  _skipNextHashChange: false,

  on(path, handler) {
    this._routes[path] = handler;
  },

  // Encode params into hash: /routine/edit?id=abc123
  _buildHash(path, params) {
    const qs = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    return qs ? `${path}?${qs}` : path;
  },

  // Parse hash back into { path, params }
  _parseHash(hash) {
    const [path, qs] = (hash || '/').split('?');
    const params = {};
    if (qs) {
      qs.split('&').forEach((pair) => {
        const [k, v] = pair.split('=');
        if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
      });
    }
    return { path, params };
  },

  go(path, params = {}) {
    const fullHash = this._buildHash(path, params);
    this._current = { path, params };
    const currentHash = window.location.hash.slice(1) || '/';
    if (currentHash !== fullHash) {
      this._skipNextHashChange = true;
    }
    window.location.hash = fullHash;
    const handler = this._routes[path];
    if (handler) handler(params);
  },

  start() {
    window.addEventListener('hashchange', () => {
      if (this._skipNextHashChange) {
        this._skipNextHashChange = false;
        return;
      }
      const { path, params } = this._parseHash(window.location.hash.slice(1));
      const handler = this._routes[path];
      if (handler) {
        this._current = { path, params };
        handler(params);
      }
    });
    const { path, params } = this._parseHash(window.location.hash.slice(1));
    this.go(path, params);
  },
};

// ── Helper: Render into #app ─────────────────────────────────
const $app = () => document.getElementById('app');

function render(html) {
  $app().innerHTML = html;
}

// Generate unique IDs
function uid() {
  return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
}

// ── XSS escape helper ────────────────────────────────────────
function esc(s) {
  if (s == null) return '';
  const d = document.createElement('div');
  d.textContent = String(s);
  return d.innerHTML;
}

// ── Muscle group icons (emoji) ───────────────────────────────
const MUSCLE_ICON = {
  Legs: '🦵',
  Chest: '🫁',
  Back: '🔙',
  Shoulders: '💪',
  Arms: '💪',
  Core: '🧘',
  Bodyweight: '🏋️',
  default: '🏋️',
};
function muscleIcon(muscle) {
  return MUSCLE_ICON[muscle] || MUSCLE_ICON.default;
}

// ── Bottom Tab Bar ───────────────────────────────────────────
function tabBar(active) {
  const tabs = [
    {
      id: '/',
      label: 'Routines',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
    },
    {
      id: '/history',
      label: 'History',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    },
    {
      id: '/exercises',
      label: 'Exercises',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11M6 12h12M6.5 17.5h11"/><path d="M4 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM4 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM4 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>`,
    },
  ];
  return `<nav class="tab-bar">${tabs
    .map(
      (t) =>
        `<button class="tab-btn ${active === t.id ? 'active' : ''}" onclick="Router.go('${
          t.id
        }')">${t.icon}<span>${t.label}</span></button>`,
    )
    .join('')}</nav>`;
}

// ══════════════════════════════════════════════════════════════
// VIEW: Routines List (Home)
// ══════════════════════════════════════════════════════════════
function viewRoutines() {
  const routines = Store.getRoutines();
  const active = Store.getActiveWorkout();

  render(`
    <header class="header">
      <h1>My Routines</h1>
      <button class="btn-icon" onclick="Router.go('/routine/new')" aria-label="New routine">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </header>
    <main class="content has-tabs">
      ${
        active
          ? `
        <div class="resume-banner" onclick="Router.go('/workout/active')">
          <div class="resume-banner-left">
            <span class="resume-pulse"></span>
            <div>
              <strong>${esc(active.routineName)}</strong>
              <span class="resume-meta">In Progress</span>
            </div>
          </div>
          <span class="btn-resume">Resume</span>
        </div>
      `
          : ''
      }
      ${
        routines.length === 0
          ? `
        <div class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <p class="empty-title">No routines yet</p>
          <p class="empty-sub">Tap + to create your first workout routine</p>
        </div>
      `
          : `
        <ul class="routine-list">
          ${routines
            .map(
              (r) => `
            <li class="routine-card">
              <div class="routine-card-body" onclick="Router.go('/routine/edit', { id: '${
                r.id
              }' })">
                <h3>${esc(r.name)}</h3>
                <p class="routine-meta">${r.exercises.length} exercise${
                r.exercises.length !== 1 ? 's' : ''
              }</p>
                <div class="routine-tags">
                  ${[...new Set(r.exercises.map((e) => e.muscle))]
                    .map((m) => `<span class="tag">${esc(m)}</span>`)
                    .join('')}
                </div>
              </div>
              <button class="btn-start-workout" onclick="event.stopPropagation(); startWorkout('${
                r.id
              }')" aria-label="Start workout">
                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21"/></svg>
              </button>
            </li>
          `,
            )
            .join('')}
        </ul>
      `
      }
    </main>
    ${tabBar('/')}
  `);
}

// ══════════════════════════════════════════════════════════════
// VIEW: Exercise Library
// ══════════════════════════════════════════════════════════════
function viewExercises() {
  const exercises = Store.getExercises();
  const muscles = ['All', ...new Set(exercises.map((e) => e.muscle))];

  render(`
    <header class="header">
      <h1>Exercises</h1>
      <button class="btn-icon" onclick="Router.go('/exercise/new')" aria-label="Add exercise">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </header>
    <main class="content has-tabs">
      <div class="search-bar">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="searchInput" placeholder="Search exercises…" autocomplete="off" />
      </div>
      <div class="filter-row" id="filterRow">
        ${muscles
          .map(
            (m) =>
              `<button class="filter-chip ${
                m === 'All' ? 'active' : ''
              }" data-muscle="${m}">${m}</button>`,
          )
          .join('')}
      </div>
      <ul class="exercise-list" id="exerciseList">
        ${renderExerciseItems(exercises)}
      </ul>
    </main>
    ${tabBar('/exercises')}
  `);

  // Bind search
  const searchInput = document.getElementById('searchInput');
  const filterRow = document.getElementById('filterRow');
  let activeFilter = 'All';

  function applyFilters() {
    const q = searchInput.value.toLowerCase().trim();
    let filtered = Store.getExercises();
    if (activeFilter !== 'All') filtered = filtered.filter((e) => e.muscle === activeFilter);
    if (q)
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.muscle.toLowerCase().includes(q) ||
          e.equipment.toLowerCase().includes(q),
      );
    document.getElementById('exerciseList').innerHTML = renderExerciseItems(filtered);
  }

  searchInput.addEventListener('input', applyFilters);
  filterRow.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    filterRow.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.muscle;
    applyFilters();
  });
}

function renderExerciseItems(list) {
  if (list.length === 0) return '<li class="empty-row">No exercises found</li>';
  return list
    .map(
      (ex) => `
    <li class="exercise-item" onclick="Router.go('/exercise/detail', { id: '${ex.id}' })">
      <span class="ex-icon">${muscleIcon(ex.muscle)}</span>
      <div class="ex-info">
        <span class="ex-name">${esc(ex.name)}</span>
        <span class="ex-meta">${esc(ex.muscle)} · ${esc(ex.equipment)}</span>
      </div>
      <span class="chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg></span>
    </li>
  `,
    )
    .join('');
}

// ══════════════════════════════════════════════════════════════
// VIEW: Add Custom Exercise
// ══════════════════════════════════════════════════════════════
function viewAddExercise() {
  render(`
    <header class="header">
      <button class="btn-back" onclick="Router.go('/exercises')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <h1>New Exercise</h1>
      <div class="header-spacer"></div>
    </header>
    <main class="content">
      <form id="addExForm" class="form">
        <label class="form-label">Exercise Name
          <input type="text" id="exName" class="form-input" placeholder="e.g. Bulgarian Split Squat" required autocomplete="off" />
        </label>
        <label class="form-label">Muscle Group
          <select id="exMuscle" class="form-input">
            <option>Legs</option><option>Chest</option><option>Back</option>
            <option>Shoulders</option><option>Arms</option><option>Core</option>
          </select>
        </label>
        <label class="form-label">Equipment
          <select id="exEquip" class="form-input">
            <option>Barbell</option><option>Dumbbell</option><option>Cable</option>
            <option>Machine</option><option>Bodyweight</option><option>Other</option>
          </select>
        </label>
        <button type="submit" class="btn-primary btn-full">Add Exercise</button>
      </form>
    </main>
  `);

  document.getElementById('addExForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('exName').value.trim();
    if (!name) return;
    const exercises = Store.getExercises();
    exercises.push({
      id: uid(),
      name,
      muscle: document.getElementById('exMuscle').value,
      equipment: document.getElementById('exEquip').value,
    });
    Store.saveExercises(exercises);
    Router.go('/exercises');
  });
}

// ══════════════════════════════════════════════════════════════
// VIEW: Create / Edit Routine
// ══════════════════════════════════════════════════════════════
function viewRoutineEditor(params) {
  const isEdit = params.id != null;
  const routines = Store.getRoutines();
  const existing = isEdit ? routines.find((r) => r.id === params.id) : null;

  const routineName = existing ? existing.name : '';
  const selected = existing ? [...existing.exercises] : [];

  renderRoutineEditor(routineName, selected, isEdit, params.id);
}

// ── Routine editor: persistent click handler (managed outside render cycle) ──

function renderRoutineEditor(routineName, selected, isEdit, routineId) {
  const allExercises = Store.getExercises();

  render(`
    <header class="header">
      <button class="btn-back" onclick="Router.go('/')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <h1>${isEdit ? 'Edit Routine' : 'New Routine'}</h1>
      ${
        isEdit
          ? `<button class="btn-icon danger" id="deleteRoutineBtn" aria-label="Delete routine">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>`
          : '<div class="header-spacer"></div>'
      }
    </header>
    <main class="content" id="routineEditorMain">
      <div class="form">
        <label class="form-label">Routine Name
          <input type="text" id="routineName" class="form-input" placeholder="e.g. Push Day" value="${esc(
            routineName,
          )}" autocomplete="off" />
        </label>
      </div>

      <section class="routine-section">
        <h2 class="section-title">Selected Exercises <span class="badge">${
          selected.length
        }</span></h2>
        <ul class="exercise-list selected-list" id="selectedList">
          ${
            selected.length === 0
              ? '<li class="empty-row">No exercises added yet</li>'
              : selected
                  .map(
                    (ex, i) => `
              <li class="exercise-item selected-item" draggable="true" data-index="${i}">
                <span class="drag-handle">
                  <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
                </span>
                <div class="ex-info">
                  <span class="ex-name">${esc(ex.name)}</span>
                  <span class="ex-meta">${esc(ex.muscle)} · ${esc(ex.equipment)}</span>
                </div>
                <button class="btn-remove" data-remove="${i}" aria-label="Remove">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </li>
            `,
                  )
                  .join('')
          }
        </ul>
      </section>

      <section class="routine-section">
        <h2 class="section-title">Add Exercises</h2>
        <div class="search-bar">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="routineSearch" placeholder="Search exercises…" autocomplete="off" />
        </div>
        <ul class="exercise-list" id="availableList">
          ${renderAvailableExercises(allExercises, selected)}
        </ul>
      </section>

      <button class="btn-primary btn-full btn-save" id="saveRoutineBtn">${
        isEdit ? 'Save Changes' : 'Create Routine'
      }</button>
    </main>
  `);

  // ── Helper: rerender preserving current name ─────────────
  function rerender() {
    const nameInput = document.getElementById('routineName');
    const name = nameInput ? nameInput.value : routineName;
    renderRoutineEditor(name, selected, isEdit, routineId);
  }

  // ── Save routine (re-bound every render) ─────────────────
  document.getElementById('saveRoutineBtn').addEventListener('click', () => {
    const name = document.getElementById('routineName').value.trim();
    if (!name) {
      shakeElement(document.getElementById('routineName'));
      return;
    }
    if (selected.length === 0) {
      shakeElement(document.getElementById('selectedList'));
      return;
    }

    const routines = Store.getRoutines();
    if (isEdit) {
      const idx = routines.findIndex((r) => r.id === routineId);
      if (idx !== -1) {
        routines[idx].name = name;
        routines[idx].exercises = selected;
      }
    } else {
      routines.push({ id: uid(), name, exercises: selected });
    }
    Store.saveRoutines(routines);
    Router.go('/');
  });

  // ── Delete routine (re-bound every render) ───────────────
  if (isEdit) {
    document.getElementById('deleteRoutineBtn').addEventListener('click', () => {
      if (confirm('Delete this routine?')) {
        const routines = Store.getRoutines().filter((r) => r.id !== routineId);
        Store.saveRoutines(routines);
        Router.go('/');
      }
    });
  }

  // ── Add exercise buttons (re-bound every render) ─────────
  document.querySelectorAll('.btn-add-ex').forEach((btn) => {
    btn.addEventListener('click', () => {
      const exId = btn.dataset.exid;
      const ex = allExercises.find((e) => e.id === exId);
      if (ex && !selected.some((s) => s.id === exId)) {
        selected.push({ ...ex });
        rerender();
      }
    });
  });

  // ── Remove exercise buttons (re-bound every render) ──────
  document.querySelectorAll('.btn-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      selected.splice(parseInt(btn.dataset.remove), 1);
      rerender();
    });
  });

  // ── Search ───────────────────────────────────────────────
  document.getElementById('routineSearch').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    let filtered = allExercises;
    if (q)
      filtered = filtered.filter(
        (ex) => ex.name.toLowerCase().includes(q) || ex.muscle.toLowerCase().includes(q),
      );
    document.getElementById('availableList').innerHTML = renderAvailableExercises(
      filtered,
      selected,
    );
    // Re-bind add buttons for the new search results
    document.querySelectorAll('.btn-add-ex').forEach((btn2) => {
      btn2.addEventListener('click', () => {
        const exId2 = btn2.dataset.exid;
        const ex2 = allExercises.find((e) => e.id === exId2);
        if (ex2 && !selected.some((s) => s.id === exId2)) {
          selected.push({ ...ex2 });
          rerender();
        }
      });
    });
  });

  // ── Drag-and-drop reorder ────────────────────────────────
  let dragIdx = null;
  const selectedList = document.getElementById('selectedList');

  selectedList.addEventListener('dragstart', (e) => {
    const item = e.target.closest('.selected-item');
    if (!item) return;
    dragIdx = parseInt(item.dataset.index);
    item.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  selectedList.addEventListener('dragend', (e) => {
    const item = e.target.closest('.selected-item');
    if (item) item.classList.remove('dragging');
  });
  selectedList.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  });
  selectedList.addEventListener('drop', (e) => {
    e.preventDefault();
    const item = e.target.closest('.selected-item');
    if (!item) return;
    const dropIdx = parseInt(item.dataset.index);
    if (dragIdx != null && dragIdx !== dropIdx) {
      const [moved] = selected.splice(dragIdx, 1);
      selected.splice(dropIdx, 0, moved);
      rerender();
    }
  });

  // ── Touch-based reorder for mobile ───────────────────────
  let touchStartY = 0;
  let touchItem = null;
  let touchIdx = null;

  selectedList.addEventListener(
    'touchstart',
    (e) => {
      const handle = e.target.closest('.drag-handle');
      if (!handle) return;
      touchItem = handle.closest('.selected-item');
      touchIdx = parseInt(touchItem.dataset.index);
      touchStartY = e.touches[0].clientY;
      touchItem.classList.add('dragging');
    },
    { passive: true },
  );

  selectedList.addEventListener(
    'touchmove',
    (e) => {
      if (!touchItem) return;
    },
    { passive: true },
  );

  selectedList.addEventListener('touchend', (e) => {
    if (!touchItem) return;
    const endY = e.changedTouches[0].clientY;
    const diff = endY - touchStartY;
    const threshold = 50;
    if (Math.abs(diff) > threshold && touchIdx != null) {
      const direction = diff > 0 ? 1 : -1;
      const newIdx = Math.max(0, Math.min(selected.length - 1, touchIdx + direction));
      if (newIdx !== touchIdx) {
        const [moved] = selected.splice(touchIdx, 1);
        selected.splice(newIdx, 0, moved);
        rerender();
        return;
      }
    }
    touchItem.classList.remove('dragging');
    touchItem = null;
    touchIdx = null;
  });
}

function renderAvailableExercises(exercises, selected) {
  const selectedIds = selected.map((e) => e.id);
  const available = exercises.filter((e) => !selectedIds.includes(e.id));
  if (available.length === 0) return '<li class="empty-row">No more exercises</li>';
  return available
    .map(
      (ex) => `
    <li class="exercise-item available-item">
      <span class="ex-icon">${muscleIcon(ex.muscle)}</span>
      <div class="ex-info">
        <span class="ex-name">${esc(ex.name)}</span>
        <span class="ex-meta">${esc(ex.muscle)} · ${esc(ex.equipment)}</span>
      </div>
      <button class="btn-add-ex" data-exid="${ex.id}" aria-label="Add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </li>
  `,
    )
    .join('');
}

// Shake animation helper
function shakeElement(el) {
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 500);
}

// ══════════════════════════════════════════════════════════════
// PHASE 2: THE ACTIVE LOGGER
// ══════════════════════════════════════════════════════════════

// ── Start a workout from a routine ───────────────────────────
function startWorkout(routineId) {
  const existing = Store.getActiveWorkout();
  if (existing) {
    if (!confirm('You have a workout in progress. Discard it and start a new one?')) return;
  }

  const routine = Store.getRoutines().find((r) => r.id === routineId);
  if (!routine) return;

  const workout = {
    id: uid(),
    routineId: routine.id,
    routineName: routine.name,
    startedAt: Date.now(),
    currentExerciseIdx: 0,
    exercises: routine.exercises.map((ex) => ({
      ...ex,
      sets: [],
    })),
  };

  Store.saveActiveWorkout(workout);
  Router.go('/workout/active');
}

// ── Rest Timer State ─────────────────────────────────────────
let _restTimer = null;
let _restRemaining = 0;
let _restTotal = 0;
let _restCallback = null;

function startRestTimer(seconds, onTick, onDone) {
  clearRestTimer();
  _restTotal = seconds;
  _restRemaining = seconds;
  _restCallback = onDone;

  onTick(_restRemaining, _restTotal);

  _restTimer = setInterval(() => {
    _restRemaining--;
    onTick(_restRemaining, _restTotal);
    if (_restRemaining <= 0) {
      clearRestTimer();
      if (onDone) onDone();
    }
  }, 1000);
}

function clearRestTimer() {
  if (_restTimer) {
    clearInterval(_restTimer);
    _restTimer = null;
  }
  _restRemaining = 0;
  _restTotal = 0;
}

function isRestTimerRunning() {
  return _restTimer !== null;
}

// ── Format helpers ───────────────────────────────────────────
function formatDuration(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ── Lookup last performance for an exercise ──────────────────
function getLastPerformance(exerciseId) {
  const workouts = Store.getWorkouts();
  for (let i = workouts.length - 1; i >= 0; i--) {
    const ex = workouts[i].exercises.find((e) => e.id === exerciseId);
    if (ex && ex.sets.length > 0) return ex.sets;
  }
  return null;
}

// ══════════════════════════════════════════════════════════════
// VIEW: Active Workout
// ══════════════════════════════════════════════════════════════
function viewActiveWorkout() {
  const workout = Store.getActiveWorkout();
  if (!workout) {
    Router.go('/');
    return;
  }

  renderActiveWorkout(workout);
}

function renderActiveWorkout(workout) {
  const exIdx = workout.currentExerciseIdx;
  const exercise = workout.exercises[exIdx];
  const totalExercises = workout.exercises.length;
  const isFirst = exIdx === 0;
  const isLast = exIdx === totalExercises - 1;
  const elapsed = Date.now() - workout.startedAt;
  const lastPerf = getLastPerformance(exercise.id);

  render(`
    <header class="header workout-header">
      <button class="btn-back" onclick="handleWorkoutBack()" aria-label="Back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="workout-header-center">
        <h1>${esc(workout.routineName)}</h1>
        <span class="workout-elapsed" id="workoutElapsed">${formatDuration(elapsed)}</span>
      </div>
      <button class="btn-icon danger" onclick="handleCancelWorkout()" aria-label="Cancel workout">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </header>

    <main class="content workout-content">
      <!-- Progress Bar -->
      <div class="workout-progress">
        <div class="workout-progress-bar">
          <div class="workout-progress-fill" style="width: ${
            ((exIdx + 1) / totalExercises) * 100
          }%"></div>
        </div>
        <span class="workout-progress-text">${exIdx + 1} / ${totalExercises}</span>
      </div>

      <!-- Exercise Card -->
      <div class="workout-exercise-card">
        <div class="workout-exercise-header">
          <span class="ex-icon">${muscleIcon(exercise.muscle)}</span>
          <div class="ex-info">
            <span class="workout-exercise-name">${esc(exercise.name)}</span>
            <span class="ex-meta">${esc(exercise.muscle)} · ${esc(exercise.equipment)}</span>
          </div>
        </div>

        ${
          lastPerf
            ? `
          <div class="last-performance">
            <span class="last-perf-label">Last time</span>
            <div class="last-perf-sets">
              ${lastPerf
                .map(
                  (s, i) =>
                    `<span class="last-perf-set">${s.weight}${s.weight ? 'kg' : ''} × ${
                      s.reps
                    }</span>`,
                )
                .join('')}
            </div>
          </div>
        `
            : ''
        }

        <!-- Sets Table -->
        <div class="sets-container">
          <div class="sets-table-header">
            <span class="set-col-num">Set</span>
            <span class="set-col-weight">kg</span>
            <span class="set-col-reps">Reps</span>
            <span class="set-col-diff">Effort</span>
            <span class="set-col-action"></span>
          </div>

          <div class="sets-list" id="setsList">
            ${exercise.sets.map((s, i) => renderSetRow(s, i, true)).join('')}
          </div>

          <!-- New Set Input Row -->
          <div class="set-input-row" id="setInputRow">
            <span class="set-col-num set-number">${exercise.sets.length + 1}</span>
            <div class="set-col-weight">
              <input type="number" id="inputWeight" class="set-input" placeholder="0"
                     inputmode="decimal" step="0.5" min="0"
                     value="${getDefaultWeight(exercise, lastPerf)}" />
            </div>
            <div class="set-col-reps">
              <input type="number" id="inputReps" class="set-input" placeholder="0"
                     inputmode="numeric" step="1" min="0"
                     value="${getDefaultReps(exercise, lastPerf)}" />
            </div>
            <div class="set-col-diff">
              <div class="difficulty-selector" id="difficultySelector">
                <button class="diff-btn" data-diff="easy" title="Easy">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </button>
                <button class="diff-btn active" data-diff="medium" title="Medium">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </button>
                <button class="diff-btn" data-diff="hard" title="Hard">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </button>
              </div>
            </div>
            <div class="set-col-action">
              <button class="btn-log-set" id="btnLogSet" aria-label="Log set">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Rest Timer -->
        <div class="rest-timer-container" id="restTimerContainer" style="display: none;">
          <div class="rest-timer-ring" id="restTimerRing">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg-elevated)" stroke-width="8"/>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--primary)" stroke-width="8"
                      stroke-dasharray="326.73" stroke-dashoffset="0" stroke-linecap="round"
                      transform="rotate(-90 60 60)" id="restTimerCircle"/>
            </svg>
            <span class="rest-timer-text" id="restTimerText">0:00</span>
          </div>
          <span class="rest-timer-label">Rest</span>
          <div class="rest-timer-controls">
            <button class="rest-adjust-btn" onclick="adjustRestTimer(-15)">-15s</button>
            <button class="rest-skip-btn" onclick="skipRestTimer()">Skip</button>
            <button class="rest-adjust-btn" onclick="adjustRestTimer(15)">+15s</button>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div class="workout-notes">
        <button class="notes-toggle" id="notesToggle" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Notes
          <span class="notes-indicator ${
            exercise.notes ? 'has-notes' : ''
          }" id="notesIndicator"></span>
        </button>
        <div class="notes-body" id="notesBody" style="display: none;">
          <textarea class="notes-textarea" id="notesTextarea" placeholder="Add notes for this exercise…" rows="3">${esc(
            exercise.notes || '',
          )}</textarea>
        </div>
      </div>

      <!-- Exercise Nav -->
      <div class="workout-nav">
        <button class="btn-nav ${isFirst ? 'disabled' : ''}" onclick="${
    isFirst ? '' : 'navigateExercise(-1)'
  }" ${isFirst ? 'disabled' : ''}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          Previous
        </button>
        ${
          isLast
            ? `
          <button class="btn-finish-workout" onclick="finishWorkout()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            Finish
          </button>
        `
            : `
          <button class="btn-nav btn-nav-next" onclick="navigateExercise(1)">
            Next
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg>
          </button>
        `
        }
      </div>
    </main>
  `);

  // ── Wire up interactions ─────────────────────────────────
  // Elapsed timer
  const elapsedEl = document.getElementById('workoutElapsed');
  const _elapsedInterval = setInterval(() => {
    const w = Store.getActiveWorkout();
    if (!w || !elapsedEl.isConnected) {
      clearInterval(_elapsedInterval);
      return;
    }
    elapsedEl.textContent = formatDuration(Date.now() - w.startedAt);
  }, 1000);

  // Difficulty selector
  let selectedDifficulty = 'medium';
  document.getElementById('difficultySelector').addEventListener('click', (e) => {
    const btn = e.target.closest('.diff-btn');
    if (!btn) return;
    document.querySelectorAll('.diff-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    selectedDifficulty = btn.dataset.diff;
  });

  // Log set
  document.getElementById('btnLogSet').addEventListener('click', () => {
    const weight = parseFloat(document.getElementById('inputWeight').value) || 0;
    const reps = parseInt(document.getElementById('inputReps').value) || 0;

    if (reps === 0) {
      shakeElement(document.getElementById('inputReps'));
      return;
    }

    const w = Store.getActiveWorkout();
    w.exercises[w.currentExerciseIdx].sets.push({
      weight,
      reps,
      difficulty: selectedDifficulty,
      loggedAt: Date.now(),
    });
    Store.saveActiveWorkout(w);

    // Start rest timer
    showRestTimer(getRestDuration(selectedDifficulty), w);
  });

  // Delete set buttons
  document.querySelectorAll('.btn-delete-set').forEach((btn) => {
    btn.addEventListener('click', () => {
      const setIdx = parseInt(btn.dataset.setidx);
      const w = Store.getActiveWorkout();
      w.exercises[w.currentExerciseIdx].sets.splice(setIdx, 1);
      Store.saveActiveWorkout(w);
      renderActiveWorkout(w);
    });
  });

  // Notes toggle + auto-save
  const notesToggle = document.getElementById('notesToggle');
  const notesBody = document.getElementById('notesBody');
  const notesTextarea = document.getElementById('notesTextarea');
  const notesIndicator = document.getElementById('notesIndicator');

  // Auto-expand if notes exist
  if (exercise.notes) {
    notesBody.style.display = 'block';
    notesToggle.classList.add('open');
  }

  notesToggle.addEventListener('click', () => {
    const showing = notesBody.style.display === 'block';
    notesBody.style.display = showing ? 'none' : 'block';
    notesToggle.classList.toggle('open', !showing);
    if (!showing) notesTextarea.focus();
  });

  notesTextarea.addEventListener('input', () => {
    const w = Store.getActiveWorkout();
    if (!w) return;
    w.exercises[w.currentExerciseIdx].notes = notesTextarea.value;
    Store.saveActiveWorkout(w);
    notesIndicator.classList.toggle('has-notes', !!notesTextarea.value.trim());
  });

  // If rest timer was running (page didn't change), maintain it
  if (isRestTimerRunning()) {
    const container = document.getElementById('restTimerContainer');
    if (container) container.style.display = 'flex';
  }
}

// ── Render a logged set row ──────────────────────────────────
function renderSetRow(set, index, completed) {
  const diffIcon = {
    easy: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
    medium: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
    hard: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  };

  return `
    <div class="set-row completed">
      <span class="set-col-num set-number">${index + 1}</span>
      <span class="set-col-weight set-value">${set.weight}</span>
      <span class="set-col-reps set-value">${set.reps}</span>
      <span class="set-col-diff set-diff-icon">${diffIcon[set.difficulty] || diffIcon.medium}</span>
      <span class="set-col-action">
        <button class="btn-delete-set" data-setidx="${index}" aria-label="Delete set">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </span>
    </div>
  `;
}

// ── Default values from last performance ─────────────────────
function getDefaultWeight(exercise, lastPerf) {
  if (lastPerf && lastPerf.length > 0) {
    const setIdx = exercise.sets.length; // current set being logged (0-based)
    const idx = Math.min(setIdx, lastPerf.length - 1);
    return lastPerf[idx].weight;
  }
  return '';
}

function getDefaultReps(exercise, lastPerf) {
  if (lastPerf && lastPerf.length > 0) {
    const setIdx = exercise.sets.length;
    const idx = Math.min(setIdx, lastPerf.length - 1);
    return lastPerf[idx].reps;
  }
  return '';
}

// ── Rest duration based on difficulty ────────────────────────
function getRestDuration(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 60;
    case 'medium':
      return 90;
    case 'hard':
      return 120;
    default:
      return 90;
  }
}

// ── Show rest timer after logging a set ──────────────────────
function showRestTimer(seconds, workout) {
  const container = document.getElementById('restTimerContainer');
  const circle = document.getElementById('restTimerCircle');
  const textEl = document.getElementById('restTimerText');

  if (!container) return;

  container.style.display = 'flex';
  const circumference = 2 * Math.PI * 52; // r=52

  startRestTimer(
    seconds,
    (remaining, total) => {
      if (!textEl.isConnected) {
        clearRestTimer();
        return;
      }
      textEl.textContent = formatTimer(remaining);
      const progress = remaining / total;
      circle.setAttribute('stroke-dashoffset', circumference * (1 - progress));
    },
    () => {
      container.style.display = 'none';
      // Vibrate on timer end if supported
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      // Re-render to update set number
      const w = Store.getActiveWorkout();
      if (w) renderActiveWorkout(w);
    },
  );
}

function adjustRestTimer(delta) {
  if (!isRestTimerRunning()) return;
  _restRemaining = Math.max(0, _restRemaining + delta);
  _restTotal = Math.max(_restTotal, _restRemaining);
}

function skipRestTimer() {
  clearRestTimer();
  const container = document.getElementById('restTimerContainer');
  if (container) container.style.display = 'none';
  const w = Store.getActiveWorkout();
  if (w) renderActiveWorkout(w);
}

// ── Exercise navigation ──────────────────────────────────────
function navigateExercise(direction) {
  clearRestTimer();
  const w = Store.getActiveWorkout();
  if (!w) return;
  const newIdx = w.currentExerciseIdx + direction;
  if (newIdx < 0 || newIdx >= w.exercises.length) return;
  w.currentExerciseIdx = newIdx;
  Store.saveActiveWorkout(w);
  renderActiveWorkout(w);
}

// ── Handle back from workout ─────────────────────────────────
function handleWorkoutBack() {
  clearRestTimer();
  Router.go('/');
}

// ── Cancel active workout ────────────────────────────────────
function handleCancelWorkout() {
  if (confirm('Cancel this workout? All logged sets will be lost.')) {
    clearRestTimer();
    Store.clearActiveWorkout();
    Router.go('/');
  }
}

// ── Finish workout → save to history ─────────────────────────
function finishWorkout() {
  const w = Store.getActiveWorkout();
  if (!w) return;

  // Check if any sets were logged
  const totalSets = w.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  if (totalSets === 0) {
    if (!confirm('No sets were logged. Discard this workout?')) return;
    clearRestTimer();
    Store.clearActiveWorkout();
    Router.go('/');
    return;
  }

  clearRestTimer();

  const completedWorkout = {
    id: w.id,
    routineId: w.routineId,
    routineName: w.routineName,
    startedAt: w.startedAt,
    finishedAt: Date.now(),
    duration: Date.now() - w.startedAt,
    exercises: w.exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      muscle: ex.muscle,
      equipment: ex.equipment,
      sets: ex.sets,
      notes: ex.notes || '',
    })),
  };

  const workouts = Store.getWorkouts();
  workouts.push(completedWorkout);
  Store.saveWorkouts(workouts);
  Store.clearActiveWorkout();

  Router.go('/workout/summary', { workoutId: completedWorkout.id });
}

// ══════════════════════════════════════════════════════════════
// VIEW: Workout Summary (shown after finishing)
// ══════════════════════════════════════════════════════════════
function viewWorkoutSummary(params) {
  const workouts = Store.getWorkouts();
  const workout = workouts.find((w) => w.id === params.workoutId);

  if (!workout) {
    Router.go('/');
    return;
  }

  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const totalVolume = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0),
    0,
  );
  const exercisesPerformed = workout.exercises.filter((ex) => ex.sets.length > 0).length;

  render(`
    <header class="header">
      <div class="header-spacer"></div>
      <h1>Workout Complete</h1>
      <div class="header-spacer"></div>
    </header>
    <main class="content">
      <div class="summary-hero">
        <div class="summary-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 class="summary-title">${esc(workout.routineName)}</h2>
        <span class="summary-date">${new Date(workout.startedAt).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })}</span>
      </div>

      <div class="summary-stats">
        <div class="summary-stat">
          <span class="summary-stat-val">${formatDuration(workout.duration)}</span>
          <span class="summary-stat-label">Duration</span>
        </div>
        <div class="summary-stat">
          <span class="summary-stat-val">${exercisesPerformed}</span>
          <span class="summary-stat-label">Exercises</span>
        </div>
        <div class="summary-stat">
          <span class="summary-stat-val">${totalSets}</span>
          <span class="summary-stat-label">Sets</span>
        </div>
        <div class="summary-stat">
          <span class="summary-stat-val">${
            totalVolume > 0
              ? totalVolume >= 1000
                ? (totalVolume / 1000).toFixed(1) + 'k'
                : totalVolume
              : '—'
          }</span>
          <span class="summary-stat-label">Volume (kg)</span>
        </div>
      </div>

      <div class="summary-exercises">
        ${workout.exercises
          .filter((ex) => ex.sets.length > 0)
          .map(
            (ex) => `
          <div class="summary-exercise">
            <h3 class="summary-ex-name">${esc(ex.name)}</h3>
            <div class="summary-sets">
              ${ex.sets
                .map(
                  (s, i) => `
                <div class="summary-set-row">
                  <span class="summary-set-num">${i + 1}</span>
                  <span class="summary-set-detail">${s.weight ? s.weight + ' kg' : 'BW'} × ${
                    s.reps
                  } reps</span>
                  <span class="summary-set-diff diff-${s.difficulty}">${s.difficulty}</span>
                </div>
              `,
                )
                .join('')}
            </div>
            ${
              ex.notes
                ? `<div class="summary-notes"><span class="summary-notes-label">Notes</span><p>${esc(
                    ex.notes,
                  )}</p></div>`
                : ''
            }
          </div>
        `,
          )
          .join('')}
      </div>

      <button class="btn-primary btn-full btn-save" onclick="Router.go('/')">Done</button>
    </main>
  `);
}

// ══════════════════════════════════════════════════════════════
// PHASE 3: HISTORY & PROGRESS
// ══════════════════════════════════════════════════════════════

// ── Format helpers for history ────────────────────────────────
function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function formatDurationShort(ms) {
  const totalMin = Math.floor(ms / 60000);
  if (totalMin < 60) return `${totalMin}m`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return formatDate(ts);
}

// ══════════════════════════════════════════════════════════════
// VIEW: Workout History
// ══════════════════════════════════════════════════════════════
function viewHistory() {
  const workouts = Store.getWorkouts().slice().reverse(); // newest first
  const exercises = Store.getExercises();

  // Group workouts by month
  const grouped = {};
  workouts.forEach((w) => {
    const d = new Date(w.startedAt);
    const key = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(w);
  });

  // Collect exercises that have history for progress links
  const exercisesWithHistory = [];
  const seen = new Set();
  workouts.forEach((w) => {
    w.exercises.forEach((ex) => {
      if (ex.sets.length > 0 && !seen.has(ex.id)) {
        seen.add(ex.id);
        exercisesWithHistory.push({ id: ex.id, name: ex.name, muscle: ex.muscle });
      }
    });
  });

  render(`
    <header class="header">
      <div class="header-spacer"></div>
      <h1>History</h1>
      <div class="header-spacer"></div>
    </header>
    <main class="content has-tabs">
      ${
        workouts.length === 0
          ? `
        <div class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <p class="empty-title">No workouts yet</p>
          <p class="empty-sub">Complete a workout to see your history here</p>
        </div>
      `
          : `
        ${
          exercisesWithHistory.length > 0
            ? `
          <section class="history-section">
            <h2 class="section-title">Progress Charts</h2>
            <div class="progress-chips">
              ${exercisesWithHistory
                .map(
                  (ex) => `
                <button class="progress-chip" onclick="Router.go('/history/progress', { exerciseId: '${
                  ex.id
                }' })">
                  <span class="progress-chip-icon">${muscleIcon(ex.muscle)}</span>
                  <span class="progress-chip-name">${esc(ex.name)}</span>
                  <svg class="progress-chip-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg>
                </button>
              `,
                )
                .join('')}
            </div>
          </section>
        `
            : ''
        }

        <section class="history-section">
          <h2 class="section-title">Workout Log</h2>
          ${Object.entries(grouped)
            .map(
              ([month, items]) => `
            <div class="history-month">
              <h3 class="history-month-label">${month}</h3>
              <ul class="history-list">
                ${items
                  .map((w) => {
                    const totalSets = w.exercises.reduce((s, ex) => s + ex.sets.length, 0);
                    const totalVolume = w.exercises.reduce(
                      (s, ex) => s + ex.sets.reduce((ss, set) => ss + set.weight * set.reps, 0),
                      0,
                    );
                    const muscles = [
                      ...new Set(w.exercises.filter((e) => e.sets.length > 0).map((e) => e.muscle)),
                    ];
                    return `
                  <li class="history-card" onclick="Router.go('/history/workout', { workoutId: '${
                    w.id
                  }' })">
                    <div class="history-card-top">
                      <div class="history-card-info">
                        <span class="history-card-name">${esc(w.routineName)}</span>
                        <span class="history-card-date">${formatDate(w.startedAt)} · ${formatTime(
                      w.startedAt,
                    )}</span>
                      </div>
                      <span class="history-card-ago">${timeAgo(w.startedAt)}</span>
                    </div>
                    <div class="history-card-stats">
                      <span class="history-stat"><strong>${formatDurationShort(
                        w.duration,
                      )}</strong> time</span>
                      <span class="history-stat"><strong>${totalSets}</strong> sets</span>
                      ${
                        totalVolume > 0
                          ? `<span class="history-stat"><strong>${
                              totalVolume >= 1000
                                ? (totalVolume / 1000).toFixed(1) + 'k'
                                : totalVolume
                            }</strong> kg</span>`
                          : ''
                      }
                    </div>
                    <div class="history-card-muscles">
                      ${muscles.map((m) => `<span class="tag">${esc(m)}</span>`).join('')}
                    </div>
                  </li>
                `;
                  })
                  .join('')}
              </ul>
            </div>
          `,
            )
            .join('')}
        </section>
      `
      }
    </main>
    ${tabBar('/history')}
  `);
}

// ══════════════════════════════════════════════════════════════
// VIEW: Workout Detail (from history)
// ══════════════════════════════════════════════════════════════
function viewWorkoutDetail(params) {
  const workout = Store.getWorkouts().find((w) => w.id === params.workoutId);
  if (!workout) {
    Router.go('/history');
    return;
  }

  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const totalVolume = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0),
    0,
  );
  const exercisesPerformed = workout.exercises.filter((ex) => ex.sets.length > 0).length;

  render(`
    <header class="header">
      <button class="btn-back" onclick="Router.go('/history')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <h1>Workout Detail</h1>
      <button class="btn-icon danger" id="deleteWorkoutBtn" aria-label="Delete workout">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>
    </header>
    <main class="content">
      <div class="summary-hero">
        <h2 class="summary-title">${esc(workout.routineName)}</h2>
        <span class="summary-date">${new Date(workout.startedAt).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })} · ${formatTime(workout.startedAt)}</span>
      </div>

      <div class="summary-stats">
        <div class="summary-stat">
          <span class="summary-stat-val">${formatDuration(workout.duration)}</span>
          <span class="summary-stat-label">Duration</span>
        </div>
        <div class="summary-stat">
          <span class="summary-stat-val">${exercisesPerformed}</span>
          <span class="summary-stat-label">Exercises</span>
        </div>
        <div class="summary-stat">
          <span class="summary-stat-val">${totalSets}</span>
          <span class="summary-stat-label">Sets</span>
        </div>
        <div class="summary-stat">
          <span class="summary-stat-val">${
            totalVolume > 0
              ? totalVolume >= 1000
                ? (totalVolume / 1000).toFixed(1) + 'k'
                : totalVolume
              : '—'
          }</span>
          <span class="summary-stat-label">Volume (kg)</span>
        </div>
      </div>

      <div class="summary-exercises">
        ${workout.exercises
          .filter((ex) => ex.sets.length > 0)
          .map(
            (ex) => `
          <div class="summary-exercise">
            <div class="summary-ex-header">
              <h3 class="summary-ex-name">${esc(ex.name)}</h3>
              <button class="btn-progress-link" onclick="event.stopPropagation(); Router.go('/history/progress', { exerciseId: '${
                ex.id
              }' })">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </button>
            </div>
            <div class="summary-sets">
              ${ex.sets
                .map(
                  (s, i) => `
                <div class="summary-set-row">
                  <span class="summary-set-num">${i + 1}</span>
                  <span class="summary-set-detail">${s.weight ? s.weight + ' kg' : 'BW'} × ${
                    s.reps
                  } reps</span>
                  <span class="summary-set-diff diff-${s.difficulty}">${s.difficulty}</span>
                </div>
              `,
                )
                .join('')}
            </div>
            ${
              ex.notes
                ? `<div class="summary-notes"><span class="summary-notes-label">Notes</span><p>${esc(
                    ex.notes,
                  )}</p></div>`
                : ''
            }
          </div>
        `,
          )
          .join('')}
      </div>
    </main>
  `);

  // Delete workout
  document.getElementById('deleteWorkoutBtn').addEventListener('click', () => {
    if (confirm('Delete this workout from history?')) {
      const workouts = Store.getWorkouts().filter((w) => w.id !== params.workoutId);
      Store.saveWorkouts(workouts);
      Router.go('/history');
    }
  });
}

// ══════════════════════════════════════════════════════════════
// VIEW: Exercise Progress Chart
// ══════════════════════════════════════════════════════════════
function viewProgress(params) {
  const exerciseId = params.exerciseId;
  const allExercises = Store.getExercises();
  const exercise = allExercises.find((e) => e.id === exerciseId);
  const workouts = Store.getWorkouts();

  // Extract data points: for each workout that has this exercise, get the best set (highest weight)
  const dataPoints = [];
  workouts.forEach((w) => {
    const ex = w.exercises.find((e) => e.id === exerciseId);
    if (!ex || ex.sets.length === 0) return;

    // Best set = highest weight; if same weight, most reps
    const bestSet = ex.sets.reduce((best, s) => {
      if (!best) return s;
      if (s.weight > best.weight) return s;
      if (s.weight === best.weight && s.reps > best.reps) return s;
      return best;
    }, null);

    const totalVolume = ex.sets.reduce((sum, s) => sum + s.weight * s.reps, 0);

    dataPoints.push({
      date: w.startedAt,
      weight: bestSet.weight,
      reps: bestSet.reps,
      sets: ex.sets.length,
      volume: totalVolume,
      difficulty: bestSet.difficulty,
    });
  });

  const exerciseName = exercise ? exercise.name : 'Exercise';

  // Calculate chart metrics
  const weights = dataPoints.map((d) => d.weight);
  const maxWeight = weights.length > 0 ? Math.max(...weights) : 0;
  const minWeight = weights.length > 0 ? Math.min(...weights) : 0;
  const latestWeight = weights.length > 0 ? weights[weights.length - 1] : 0;
  const firstWeight = weights.length > 0 ? weights[0] : 0;
  const weightChange = latestWeight - firstWeight;

  // Estimated 1RM using Epley formula: weight × (1 + reps/30)
  const e1rms = dataPoints.map((d) => d.weight * (1 + d.reps / 30));
  const latestE1RM = e1rms.length > 0 ? e1rms[e1rms.length - 1] : 0;
  const firstE1RM = e1rms.length > 0 ? e1rms[0] : 0;
  const e1rmChange = latestE1RM - firstE1RM;

  render(`
    <header class="header">
      <button class="btn-back" onclick="Router.go('/history')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <h1>Progress</h1>
      <div class="header-spacer"></div>
    </header>
    <main class="content">
      <div class="progress-header">
        <span class="progress-ex-icon">${muscleIcon(exercise ? exercise.muscle : 'default')}</span>
        <div>
          <h2 class="progress-ex-name">${esc(exerciseName)}</h2>
          <span class="progress-ex-meta">${dataPoints.length} workout${
    dataPoints.length !== 1 ? 's' : ''
  } tracked</span>
        </div>
      </div>

      ${
        dataPoints.length === 0
          ? `
        <div class="empty-state">
          <p class="empty-title">No data yet</p>
          <p class="empty-sub">Complete workouts with this exercise to see progress</p>
        </div>
      `
          : `
        <!-- Key Stats -->
        <div class="progress-stats">
          <div class="progress-stat-card">
            <span class="progress-stat-label">Best Weight</span>
            <span class="progress-stat-value">${maxWeight} kg</span>
          </div>
          <div class="progress-stat-card">
            <span class="progress-stat-label">Est. 1RM</span>
            <span class="progress-stat-value">${latestE1RM.toFixed(1)} kg</span>
          </div>
          <div class="progress-stat-card">
            <span class="progress-stat-label">Weight Change</span>
            <span class="progress-stat-value ${
              weightChange > 0 ? 'positive' : weightChange < 0 ? 'negative' : ''
            }">${weightChange > 0 ? '+' : ''}${weightChange} kg</span>
          </div>
          <div class="progress-stat-card">
            <span class="progress-stat-label">1RM Change</span>
            <span class="progress-stat-value ${
              e1rmChange > 0 ? 'positive' : e1rmChange < 0 ? 'negative' : ''
            }">${e1rmChange > 0 ? '+' : ''}${e1rmChange.toFixed(1)} kg</span>
          </div>
        </div>

        <!-- Chart: Best Weight Over Time -->
        <div class="chart-section">
          <h3 class="chart-title">Best Weight per Session</h3>
          <div class="chart-container" id="weightChart"></div>
        </div>

        <!-- Chart: Estimated 1RM Over Time -->
        <div class="chart-section">
          <h3 class="chart-title">Estimated 1RM</h3>
          <div class="chart-container" id="e1rmChart"></div>
        </div>

        <!-- History Table -->
        <div class="progress-history">
          <h3 class="section-title">Session History</h3>
          <div class="progress-table">
            <div class="progress-table-header">
              <span class="ptcol-date">Date</span>
              <span class="ptcol-weight">Best</span>
              <span class="ptcol-reps">Reps</span>
              <span class="ptcol-vol">Volume</span>
            </div>
            ${dataPoints
              .slice()
              .reverse()
              .map(
                (d) => `
              <div class="progress-table-row">
                <span class="ptcol-date">${formatDate(d.date)}</span>
                <span class="ptcol-weight">${d.weight} kg</span>
                <span class="ptcol-reps">${d.reps}</span>
                <span class="ptcol-vol">${
                  d.volume >= 1000 ? (d.volume / 1000).toFixed(1) + 'k' : d.volume
                } kg</span>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      `
      }
    </main>
  `);

  // Render SVG charts
  if (dataPoints.length > 0) {
    renderLineChart(
      'weightChart',
      dataPoints.map((d) => d.weight),
      dataPoints.map((d) => formatDate(d.date)),
    );
    renderLineChart(
      'e1rmChart',
      e1rms,
      dataPoints.map((d) => formatDate(d.date)),
    );
  }
}

// ── SVG Line Chart Renderer ──────────────────────────────────
function renderLineChart(containerId, values, labels) {
  const container = document.getElementById(containerId);
  if (!container || values.length === 0) return;

  const width = container.clientWidth || 320;
  const height = 180;
  const padL = 45;
  const padR = 16;
  const padT = 16;
  const padB = 32;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  // Add 10% padding to range
  const adjMin = min - range * 0.1;
  const adjMax = max + range * 0.1;
  const adjRange = adjMax - adjMin;

  function x(i) {
    if (values.length === 1) return padL + chartW / 2;
    return padL + (i / (values.length - 1)) * chartW;
  }
  function y(v) {
    return padT + chartH - ((v - adjMin) / adjRange) * chartH;
  }

  // Build polyline points
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

  // Build area fill
  const areaPoints =
    `${x(0).toFixed(1)},${(padT + chartH).toFixed(1)} ` +
    points +
    ` ${x(values.length - 1).toFixed(1)},${(padT + chartH).toFixed(1)}`;

  // Y-axis labels (4 ticks)
  const ticks = 4;
  let yLabels = '';
  let gridLines = '';
  for (let i = 0; i <= ticks; i++) {
    const val = adjMin + (adjRange / ticks) * i;
    const yPos = y(val);
    yLabels += `<text x="${padL - 8}" y="${
      yPos + 4
    }" text-anchor="end" fill="var(--text-dim)" font-size="10" font-family="-apple-system, sans-serif">${Math.round(
      val,
    )}</text>`;
    gridLines += `<line x1="${padL}" y1="${yPos}" x2="${
      width - padR
    }" y2="${yPos}" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="4,4"/>`;
  }

  // X-axis labels (show first, middle, last if > 2)
  let xLabels = '';
  if (values.length <= 5) {
    values.forEach((_, i) => {
      xLabels += `<text x="${x(i)}" y="${
        height - 4
      }" text-anchor="middle" fill="var(--text-dim)" font-size="9" font-family="-apple-system, sans-serif">${
        labels[i]
      }</text>`;
    });
  } else {
    [0, Math.floor(values.length / 2), values.length - 1].forEach((i) => {
      xLabels += `<text x="${x(i)}" y="${
        height - 4
      }" text-anchor="middle" fill="var(--text-dim)" font-size="9" font-family="-apple-system, sans-serif">${
        labels[i]
      }</text>`;
    });
  }

  // Dots
  const dots = values
    .map(
      (v, i) =>
        `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(
          1,
        )}" r="4" fill="var(--primary)" stroke="var(--bg-card)" stroke-width="2"/>`,
    )
    .join('');

  container.innerHTML = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      ${gridLines}
      ${yLabels}
      ${xLabels}
      <defs>
        <linearGradient id="grad_${containerId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="var(--primary)" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      <polygon points="${areaPoints}" fill="url(#grad_${containerId})"/>
      <polyline points="${points}" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${dots}
    </svg>
  `;
}

// ══════════════════════════════════════════════════════════════
// VIEW: Exercise Detail
// ══════════════════════════════════════════════════════════════
function viewExerciseDetail(params) {
  const exercises = Store.getExercises();
  const exercise = exercises.find((e) => e.id === params.id);
  if (!exercise) {
    Router.go('/exercises');
    return;
  }

  // Check if there's workout history for this exercise
  const workouts = Store.getWorkouts();
  const hasHistory = workouts.some((w) =>
    w.exercises.some((ex) => ex.id === exercise.id && ex.sets.length > 0),
  );

  // Check which routines use this exercise
  const routines = Store.getRoutines();
  const usedInRoutines = routines.filter((r) => r.exercises.some((ex) => ex.id === exercise.id));

  render(`
    <header class="header">
      <button class="btn-back" onclick="Router.go('/exercises')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <h1>Exercise</h1>
      <div class="header-spacer"></div>
    </header>
    <main class="content">
      <div class="exercise-detail-card">
        <div class="exercise-detail-header">
          <span class="progress-ex-icon">${muscleIcon(exercise.muscle)}</span>
          <div>
            <h2 class="progress-ex-name">${esc(exercise.name)}</h2>
            <span class="progress-ex-meta">${esc(exercise.muscle)} · ${esc(
    exercise.equipment,
  )}</span>
          </div>
        </div>

        ${
          usedInRoutines.length > 0
            ? `
          <div class="detail-section">
            <h3 class="detail-section-title">Used in Routines</h3>
            <div class="detail-routine-tags">
              ${usedInRoutines.map((r) => `<span class="tag">${esc(r.name)}</span>`).join('')}
            </div>
          </div>
        `
            : ''
        }
      </div>

      <div class="detail-actions">
        ${
          hasHistory
            ? `
          <button class="btn-detail-action" onclick="Router.go('/history/progress', { exerciseId: '${exercise.id}' })">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            View Progress
          </button>
        `
            : ''
        }
        <button class="btn-detail-action" onclick="Router.go('/exercise/edit', { id: '${
          exercise.id
        }' })">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit Exercise
        </button>
        <button class="btn-detail-action danger" id="deleteExBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          Delete Exercise
        </button>
      </div>
    </main>
  `);

  // Delete exercise
  document.getElementById('deleteExBtn').addEventListener('click', () => {
    if (usedInRoutines.length > 0) {
      const names = usedInRoutines.map((r) => r.name).join(', ');
      if (
        !confirm(`This exercise is used in: ${names}.\n\nDelete it and remove from those routines?`)
      )
        return;
      // Remove from routines
      const allRoutines = Store.getRoutines();
      allRoutines.forEach((r) => {
        r.exercises = r.exercises.filter((ex) => ex.id !== exercise.id);
      });
      Store.saveRoutines(allRoutines);
    } else {
      if (!confirm('Delete this exercise?')) return;
    }
    const updatedExercises = Store.getExercises().filter((e) => e.id !== exercise.id);
    Store.saveExercises(updatedExercises);
    Router.go('/exercises');
  });
}

// ══════════════════════════════════════════════════════════════
// VIEW: Edit Exercise
// ══════════════════════════════════════════════════════════════
function viewExerciseEdit(params) {
  const exercises = Store.getExercises();
  const exercise = exercises.find((e) => e.id === params.id);
  if (!exercise) {
    Router.go('/exercises');
    return;
  }

  const muscles = ['Legs', 'Chest', 'Back', 'Shoulders', 'Arms', 'Core'];
  const equipment = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight', 'Other'];

  render(`
    <header class="header">
      <button class="btn-back" onclick="Router.go('/exercise/detail', { id: '${exercise.id}' })">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <h1>Edit Exercise</h1>
      <div class="header-spacer"></div>
    </header>
    <main class="content">
      <form id="editExForm" class="form">
        <label class="form-label">Exercise Name
          <input type="text" id="exName" class="form-input" value="${esc(
            exercise.name,
          )}" required autocomplete="off" />
        </label>
        <label class="form-label">Muscle Group
          <select id="exMuscle" class="form-input">
            ${muscles
              .map((m) => `<option${m === exercise.muscle ? ' selected' : ''}>${m}</option>`)
              .join('')}
          </select>
        </label>
        <label class="form-label">Equipment
          <select id="exEquip" class="form-input">
            ${equipment
              .map((eq) => `<option${eq === exercise.equipment ? ' selected' : ''}>${eq}</option>`)
              .join('')}
          </select>
        </label>
        <button type="submit" class="btn-primary btn-full">Save Changes</button>
      </form>
    </main>
  `);

  document.getElementById('editExForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('exName').value.trim();
    if (!name) return;
    const muscle = document.getElementById('exMuscle').value;
    const equip = document.getElementById('exEquip').value;

    // Update exercise in library
    const allExercises = Store.getExercises();
    const exIdx = allExercises.findIndex((ex) => ex.id === exercise.id);
    if (exIdx !== -1) {
      allExercises[exIdx].name = name;
      allExercises[exIdx].muscle = muscle;
      allExercises[exIdx].equipment = equip;
    }
    Store.saveExercises(allExercises);

    // Update exercise in all routines that reference it
    const routines = Store.getRoutines();
    routines.forEach((r) => {
      r.exercises.forEach((rex) => {
        if (rex.id === exercise.id) {
          rex.name = name;
          rex.muscle = muscle;
          rex.equipment = equip;
        }
      });
    });
    Store.saveRoutines(routines);

    Router.go('/exercise/detail', { id: exercise.id });
  });
}

// ── Register Routes ──────────────────────────────────────────
Router.on('/', viewRoutines);
Router.on('/exercises', viewExercises);
Router.on('/exercise/new', viewAddExercise);
Router.on('/exercise/detail', (p) => viewExerciseDetail(p));
Router.on('/exercise/edit', (p) => viewExerciseEdit(p));
Router.on('/routine/new', (p) => viewRoutineEditor({ ...p }));
Router.on('/routine/edit', (p) => viewRoutineEditor(p));
Router.on('/workout/active', viewActiveWorkout);
Router.on('/workout/summary', (p) => viewWorkoutSummary(p));
Router.on('/history', viewHistory);
Router.on('/history/workout', (p) => viewWorkoutDetail(p));
Router.on('/history/progress', (p) => viewProgress(p));

// ── Boot ─────────────────────────────────────────────────────
Router.start();
