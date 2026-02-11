/* ============================================================
   ArkLog — Gym Progress Tracker PWA
   Phase 1: Foundation, Exercise Library & Routine Creator
   Phase 2: The Active Logger
   ============================================================ */

// ── Service Worker Registration ──────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// ── Default Exercise Library ─────────────────────────────────
const DEFAULT_EXERCISES = [
  // ── Chest ───────────────────────────────────────────────────
  { id: 'ex2', name: 'Bench Press', muscle: 'Chest', equipment: 'Barbell' },
  { id: 'ex12', name: 'Incline Dumbbell Press', muscle: 'Chest', equipment: 'Dumbbell' },
  { id: 'ex13', name: 'Cable Fly', muscle: 'Chest', equipment: 'Cable' },
  { id: 'ex16', name: 'Incline Barbell Press', muscle: 'Chest', equipment: 'Barbell' },
  { id: 'ex17', name: 'Dumbbell Bench Press', muscle: 'Chest', equipment: 'Dumbbell' },
  { id: 'ex18', name: 'Chest Dip', muscle: 'Chest', equipment: 'Bodyweight' },
  { id: 'ex19', name: 'Pec Deck Machine', muscle: 'Chest', equipment: 'Machine' },
  { id: 'ex20', name: 'Decline Bench Press', muscle: 'Chest', equipment: 'Barbell' },
  { id: 'ex21', name: 'Push-ups', muscle: 'Chest', equipment: 'Bodyweight' },
  { id: 'ex22', name: 'Landmine Press', muscle: 'Chest', equipment: 'Barbell' },

  // ── Back ────────────────────────────────────────────────────
  { id: 'ex3', name: 'Deadlift', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex5', name: 'Barbell Row', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex6', name: 'Pull-ups', muscle: 'Back', equipment: 'Bodyweight' },
  { id: 'ex14', name: 'Lat Pulldown', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex23', name: 'Seated Cable Row', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex24', name: 'T-Bar Row', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex25', name: 'Dumbbell Row', muscle: 'Back', equipment: 'Dumbbell' },
  { id: 'ex26', name: 'Chin-ups', muscle: 'Back', equipment: 'Bodyweight' },
  { id: 'ex27', name: 'Face Pull', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex28', name: 'Straight Arm Pulldown', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex29', name: 'Pendlay Row', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex30', name: 'Chest Supported Row', muscle: 'Back', equipment: 'Dumbbell' },
  { id: 'ex31', name: 'Rack Pull', muscle: 'Back', equipment: 'Barbell' },

  // ── Shoulders ───────────────────────────────────────────────
  { id: 'ex4', name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell' },
  { id: 'ex10', name: 'Lateral Raise', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex32', name: 'Seated Dumbbell Press', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex33', name: 'Arnold Press', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex34', name: 'Cable Lateral Raise', muscle: 'Shoulders', equipment: 'Cable' },
  { id: 'ex35', name: 'Rear Delt Fly', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex36', name: 'Upright Row', muscle: 'Shoulders', equipment: 'Barbell' },
  { id: 'ex37', name: 'Machine Shoulder Press', muscle: 'Shoulders', equipment: 'Machine' },
  { id: 'ex38', name: 'Front Raise', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex39', name: 'Reverse Pec Deck', muscle: 'Shoulders', equipment: 'Machine' },

  // ── Arms ────────────────────────────────────────────────────
  { id: 'ex7', name: 'Dumbbell Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex8', name: 'Tricep Pushdown', muscle: 'Arms', equipment: 'Cable' },
  { id: 'ex40', name: 'Barbell Curl', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex41', name: 'Hammer Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex42', name: 'Skull Crushers', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex43', name: 'Overhead Tricep Extension', muscle: 'Arms', equipment: 'Cable' },
  { id: 'ex44', name: 'Preacher Curl', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex45', name: 'Cable Curl', muscle: 'Arms', equipment: 'Cable' },
  { id: 'ex46', name: 'Concentration Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex47', name: 'Close Grip Bench Press', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex48', name: 'Dips (Tricep)', muscle: 'Arms', equipment: 'Bodyweight' },
  { id: 'ex49', name: 'EZ-Bar Curl', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex50', name: 'Tricep Kickback', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex51', name: 'Wrist Curl', muscle: 'Arms', equipment: 'Dumbbell' },

  // ── Legs ────────────────────────────────────────────────────
  { id: 'ex1', name: 'Barbell Squat', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex9', name: 'Leg Press', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex11', name: 'Romanian Deadlift', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex15', name: 'Leg Curl', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex52', name: 'Bulgarian Split Squat', muscle: 'Legs', equipment: 'Dumbbell' },
  { id: 'ex53', name: 'Leg Extension', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex54', name: 'Front Squat', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex55', name: 'Hip Thrust', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex56', name: 'Walking Lunges', muscle: 'Legs', equipment: 'Dumbbell' },
  { id: 'ex57', name: 'Goblet Squat', muscle: 'Legs', equipment: 'Dumbbell' },
  { id: 'ex58', name: 'Hack Squat', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex59', name: 'Standing Calf Raise', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex60', name: 'Seated Calf Raise', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex61', name: 'Sumo Deadlift', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex62', name: 'Step Ups', muscle: 'Legs', equipment: 'Dumbbell' },
  { id: 'ex63', name: 'Glute-Ham Raise', muscle: 'Legs', equipment: 'Bodyweight' },

  // ── Core ────────────────────────────────────────────────────
  { id: 'ex64', name: 'Plank', muscle: 'Core', equipment: 'Bodyweight' },
  { id: 'ex65', name: 'Hanging Leg Raise', muscle: 'Core', equipment: 'Bodyweight' },
  { id: 'ex66', name: 'Cable Crunch', muscle: 'Core', equipment: 'Cable' },
  { id: 'ex67', name: 'Ab Wheel Rollout', muscle: 'Core', equipment: 'Other' },
  { id: 'ex68', name: 'Russian Twist', muscle: 'Core', equipment: 'Other' },
  { id: 'ex69', name: 'Decline Sit-ups', muscle: 'Core', equipment: 'Bodyweight' },
  { id: 'ex70', name: 'Pallof Press', muscle: 'Core', equipment: 'Cable' },
  { id: 'ex71', name: 'Dragon Flag', muscle: 'Core', equipment: 'Bodyweight' },
  { id: 'ex72', name: 'Mountain Climbers', muscle: 'Core', equipment: 'Bodyweight' },
  { id: 'ex73', name: 'Dead Bug', muscle: 'Core', equipment: 'Bodyweight' },
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

  // Weekly schedule — per-date model
  getSchedule() {
    return this._get('il_schedule', { days: {} });
  },
  saveSchedule(s) {
    this._set('il_schedule', s);
  },
};

// Seed exercises on first launch
if (!localStorage.getItem('il_exercises')) {
  Store.saveExercises(DEFAULT_EXERCISES);
} else {
  // Merge new default exercises for existing users
  const existing = Store.getExercises();
  const existingIds = new Set(existing.map((e) => e.id));
  const newExercises = DEFAULT_EXERCISES.filter((e) => !existingIds.has(e.id));
  if (newExercises.length > 0) {
    Store.saveExercises([...existing, ...newExercises]);
  }
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
      label: 'Workouts',
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
    {
      id: '/settings',
      label: 'Settings',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
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
// WEEKLY SCHEDULE — Helpers & Component
// ══════════════════════════════════════════════════════════════

// Schedule data model:
// Store.getSchedule() → { days: { 'YYYY-MM-DD': true, ... } }
// Each date key means "workout scheduled on this day".
// Completed workouts are detected from Store.getWorkouts() via finishedAt timestamp.

// Get YYYY-MM-DD for a date (local timezone, no UTC drift)
function toDateStr(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Get 7 dates for a week at a given offset from current week (0 = this week)
function getWeekDates(weekOffset) {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff + weekOffset * 7);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

// Format a week range label
function formatWeekLabel(weekOffset) {
  if (weekOffset === 0) return 'This Week';
  const dates = getWeekDates(weekOffset);
  const mon = dates[0];
  const sun = dates[6];
  const fmt = (d) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}`;
  };
  return `${fmt(mon)} – ${fmt(sun)}`;
}

// For a given week offset, compute each day's status
function getWeekScheduleStatus(weekOffset) {
  const schedule = Store.getSchedule();
  const scheduledDays = schedule.days || {};
  const weekDates = getWeekDates(weekOffset);
  const workouts = Store.getWorkouts();
  const today = toDateStr(new Date());

  return weekDates.map((date) => {
    const dateStr = toDateStr(date);
    const completed = workouts.some((w) => toDateStr(w.finishedAt) === dateStr);
    const scheduled = scheduledDays[dateStr] === true;

    let status;
    if (completed) {
      status = 'completed';
    } else if (scheduled && dateStr < today) {
      status = 'missed';
    } else if (scheduled) {
      status = 'scheduled';
    } else {
      status = 'rest';
    }

    return { date, dateStr, status, isToday: dateStr === today };
  });
}

// Toggle a day's scheduled status
function toggleScheduleDay(dateStr) {
  const schedule = Store.getSchedule();
  if (!schedule.days) schedule.days = {};
  if (schedule.days[dateStr]) {
    delete schedule.days[dateStr];
  } else {
    schedule.days[dateStr] = true;
  }
  Store.saveSchedule(schedule);
}

// Move a scheduled workout from one date to another
function rescheduleDay(fromDate, toDate) {
  const schedule = Store.getSchedule();
  if (!schedule.days) schedule.days = {};
  delete schedule.days[fromDate];
  schedule.days[toDate] = true;
  Store.saveSchedule(schedule);
}

// Dumbbell SVG icon (reused)
const DUMBBELL_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11"/><path d="M6.5 17.5h11"/><rect x="2" y="5" width="4.5" height="14" rx="1.5"/><rect x="17.5" y="5" width="4.5" height="14" rx="1.5"/><line x1="12" y1="5" x2="12" y2="19"/></svg>`;

// Current week offset state (module-level so it persists across re-renders within the same view)
let _weekOffset = 0;
let _progressRange = 30; // days: 14, 30, 90, or 0 for All

// Render the weekly schedule strip with navigation
function renderWeekStrip(weekOffset) {
  const days = getWeekScheduleStatus(weekOffset);
  const labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const weekLabel = formatWeekLabel(weekOffset);

  // Can navigate ±4 weeks
  const canPrev = weekOffset > -4;
  const canNext = weekOffset < 4;

  return `
    <div class="week-schedule-card" id="weekScheduleCard">
      <div class="week-nav">
        <button class="week-nav-btn ${canPrev ? '' : 'disabled'}" id="weekPrev" aria-label="Previous week">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="week-nav-label">${weekLabel}</span>
        <button class="week-nav-btn ${canNext ? '' : 'disabled'}" id="weekNext" aria-label="Next week">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div class="week-strip" id="weekStrip">
        ${days
          .map(
            (d, i) => `
          <div class="week-day ${d.status} ${d.isToday ? 'today' : ''}" data-date="${d.dateStr}" data-index="${i}">
            <div class="week-day-ring">
              <span class="week-day-label">${labels[i]}</span>
            </div>
            <div class="week-day-icon">
              ${
                d.status === 'completed'
                  ? `<span class="week-icon-done">${DUMBBELL_SVG}<span class="week-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span></span>`
                  : d.status === 'scheduled' || d.status === 'missed'
                    ? `<span class="week-icon-scheduled">${DUMBBELL_SVG}</span>`
                    : '<span class="week-icon-rest"></span>'
              }
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}

// Bind all interactions on the week schedule card
function bindWeekStripEvents() {
  const card = document.getElementById('weekScheduleCard');
  if (!card) return;
  const strip = document.getElementById('weekStrip');

  // ── Navigation arrows ──
  const prevBtn = document.getElementById('weekPrev');
  const nextBtn = document.getElementById('weekNext');
  if (prevBtn && !prevBtn.classList.contains('disabled')) {
    prevBtn.addEventListener('click', () => {
      _weekOffset--;
      rerenderWeekStrip();
    });
  }
  if (nextBtn && !nextBtn.classList.contains('disabled')) {
    nextBtn.addEventListener('click', () => {
      _weekOffset++;
      rerenderWeekStrip();
    });
  }

  // ── Day interactions: tap to toggle/navigate, long-press to drag ──
  let dragSrcDate = null;
  let longPressTimer = null;
  let isDragging = false;
  let tapBlocked = false;

  strip.querySelectorAll('.week-day').forEach((dayEl) => {
    const dateStr = dayEl.dataset.date;
    const isCompleted = dayEl.classList.contains('completed');
    const isScheduledOrMissed = dayEl.classList.contains('scheduled') || dayEl.classList.contains('missed');

    // ── Tap action for this day ──
    const handleTap = () => {
      if (isDragging || tapBlocked) return;
      if (isCompleted) {
        const workouts = Store.getWorkouts();
        const match = workouts.find((w) => toDateStr(w.finishedAt) === dateStr);
        if (match) Router.go('/history/workout', { workoutId: match.id });
      } else {
        toggleScheduleDay(dateStr);
        rerenderWeekStrip();
      }
    };

    // ── Touch handling: unified for all days ──
    dayEl.addEventListener('touchstart', (e) => {
      e.preventDefault();
      tapBlocked = false;
      if (isScheduledOrMissed) {
        longPressTimer = setTimeout(() => {
          tapBlocked = true;
          isDragging = true;
          dragSrcDate = dateStr;
          dayEl.classList.add('dragging');
          strip.classList.add('drag-mode');
          strip.querySelectorAll('.week-day').forEach((el) => {
            const elDate = el.dataset.date;
            if (elDate !== dateStr && !el.classList.contains('completed')) {
              el.classList.add('drop-target');
            }
          });
        }, 500);
      }
    }, { passive: false });

    dayEl.addEventListener('touchend', (e) => {
      clearTimeout(longPressTimer);
      if (!isDragging && !tapBlocked) {
        handleTap();
      }
    }, { passive: true });

    // ── Mouse: long-press for drag ──
    if (isScheduledOrMissed) {
      dayEl.addEventListener('mousedown', () => {
        longPressTimer = setTimeout(() => {
          isDragging = true;
          dragSrcDate = dateStr;
          dayEl.classList.add('dragging');
          strip.classList.add('drag-mode');
          strip.querySelectorAll('.week-day').forEach((el) => {
            const elDate = el.dataset.date;
            if (elDate !== dateStr && !el.classList.contains('completed')) {
              el.classList.add('drop-target');
            }
          });
        }, 500);
      });
    }

    // ── Mouse click (desktop) ──
    dayEl.addEventListener('click', () => handleTap());
    dayEl.style.cursor = 'pointer';
  });

  // ── Drag move ──
  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;
    const target = document.elementFromPoint(clientX, clientY);
    if (!target) return;
    const dayEl = target.closest('.week-day');
    strip.querySelectorAll('.week-day.drag-over').forEach((el) => el.classList.remove('drag-over'));
    if (dayEl && dayEl.classList.contains('drop-target')) {
      dayEl.classList.add('drag-over');
    }
  };

  strip.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });
  strip.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));

  // ── Drag end ──
  const handleEnd = (clientX, clientY) => {
    clearTimeout(longPressTimer);
    if (!isDragging) return;
    isDragging = false;

    const target = document.elementFromPoint(clientX, clientY);
    const dayEl = target ? target.closest('.week-day') : null;
    if (dayEl && dayEl.classList.contains('drop-target') && dragSrcDate) {
      rescheduleDay(dragSrcDate, dayEl.dataset.date);
      rerenderWeekStrip();
      return;
    }

    strip.classList.remove('drag-mode');
    strip.querySelectorAll('.dragging, .drop-target, .drag-over').forEach((el) => {
      el.classList.remove('dragging', 'drop-target', 'drag-over');
    });
    dragSrcDate = null;
  };

  strip.addEventListener('touchend', (e) => handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
  strip.addEventListener('mouseup', (e) => handleEnd(e.clientX, e.clientY));

  const cancelDrag = () => {
    clearTimeout(longPressTimer);
    if (isDragging) {
      isDragging = false;
      strip.classList.remove('drag-mode');
      strip.querySelectorAll('.dragging, .drop-target, .drag-over').forEach((el) => {
        el.classList.remove('dragging', 'drop-target', 'drag-over');
      });
      dragSrcDate = null;
    }
  };
  strip.addEventListener('mouseleave', cancelDrag);
  strip.addEventListener('touchcancel', cancelDrag);

  // ── Swipe left/right to navigate weeks ──
  let touchStartX = 0;
  card.addEventListener('touchstart', (e) => {
    if (isDragging) return;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  card.addEventListener('touchend', (e) => {
    if (isDragging) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 60) {
      if (deltaX > 0 && _weekOffset > -4) {
        _weekOffset--;
        rerenderWeekStrip();
      } else if (deltaX < 0 && _weekOffset < 4) {
        _weekOffset++;
        rerenderWeekStrip();
      }
    }
  }, { passive: true });
}

// Re-render just the schedule card without re-rendering the whole page
function rerenderWeekStrip() {
  const card = document.getElementById('weekScheduleCard');
  if (!card) return;
  const container = card.parentElement;
  const temp = document.createElement('div');
  temp.innerHTML = renderWeekStrip(_weekOffset);
  const newCard = temp.firstElementChild;
  container.replaceChild(newCard, card);
  bindWeekStripEvents();
}

// ══════════════════════════════════════════════════════════════
// VIEW: Routines List (Home)
// ══════════════════════════════════════════════════════════════
// VIEW: Routines List (Home)
// ══════════════════════════════════════════════════════════════
function viewRoutines() {
  const routines = Store.getRoutines();
  const active = Store.getActiveWorkout();
  _weekOffset = 0;

  render(`
    <header class="header">
      <h1>Workouts</h1>
      <button class="btn-icon" onclick="Router.go('/routine/new')" aria-label="New workout">
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
      ${renderWeekStrip(_weekOffset)}
      ${
        routines.length === 0
          ? `
        <div class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <p class="empty-title">No workouts yet</p>
          <p class="empty-sub">Tap + to create your first workout</p>
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
  bindWeekStripEvents();
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

    </main>
    <div class="sticky-save-bar">
      <button class="btn-primary btn-full" id="saveRoutineBtn">${
        isEdit ? 'Save Changes' : 'Create Routine'
      }</button>
    </div>
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
      const nameInput = document.getElementById('routineName');
      shakeElement(nameInput);
      showFormError(nameInput.closest('label'), 'Please enter a routine name');
      nameInput.addEventListener('input', () => {
        const err = document.querySelector('.form-error');
        if (err) err.remove();
      }, { once: true });
      return;
    }
    if (selected.length === 0) {
      const list = document.getElementById('selectedList');
      shakeElement(list);
      showFormError(list, 'Add at least one exercise');
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

// Inline form-error helper
function showFormError(anchorEl, message) {
  document.querySelectorAll('.form-error').forEach((el) => el.remove());
  const div = document.createElement('div');
  div.className = 'form-error';
  div.textContent = message;
  anchorEl.insertAdjacentElement('afterend', div);
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

// ── Lookup personal best for an exercise ─────────────────────
function getPersonalBest(exerciseId) {
  const workouts = Store.getWorkouts();
  let bestWeight = null;
  let bestVolume = null;

  workouts.forEach((w) => {
    const ex = w.exercises.find((e) => e.id === exerciseId);
    if (!ex || ex.sets.length === 0) return;

    ex.sets.forEach((s) => {
      // Best by weight
      if (!bestWeight || s.weight > bestWeight.weight || (s.weight === bestWeight.weight && s.reps > bestWeight.reps)) {
        bestWeight = { weight: s.weight, reps: s.reps, date: w.startedAt };
      }
    });

    // Best total volume in a single session
    const sessionVol = ex.sets.reduce((sum, s) => sum + s.weight * s.reps, 0);
    if (!bestVolume || sessionVol > bestVolume.volume) {
      bestVolume = { volume: sessionVol, date: w.startedAt };
    }
  });

  return { bestWeight, bestVolume };
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
  const totalExercises = workout.exercises.length;
  const elapsed = Date.now() - workout.startedAt;
  const completedExercises = workout.exercises.filter((ex) => ex.sets.length > 0).length;

  // Build exercise cards
  const exerciseCardsHtml = workout.exercises
    .map((exercise, idx) => {
      const isActive = idx === exIdx;
      const lastPerf = getLastPerformance(exercise.id);
      const pb = getPersonalBest(exercise.id);
      const setCount = exercise.sets.length;

      if (!isActive) {
        // ── Collapsed card ─────────────────────────────────────
        const setsInfo =
          setCount > 0
            ? exercise.sets.map((s) => `${s.weight}kg×${s.reps}`).join(', ')
            : 'No sets yet';
        return `
          <div class="workout-exercise-card collapsed" data-ex-idx="${idx}">
            <div class="workout-exercise-header collapsed-header">
              <span class="ex-icon">${muscleIcon(exercise.muscle)}</span>
              <div class="ex-info">
                <span class="workout-exercise-name">${esc(exercise.name)}</span>
                <span class="ex-meta collapsed-sets">${setCount > 0 ? `${setCount} set${setCount !== 1 ? 's' : ''} — ${setsInfo}` : setsInfo}</span>
              </div>
              ${setCount > 0 ? '<span class="collapsed-check"><svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>' : '<span class="collapsed-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>'}
            </div>
          </div>
        `;
      }

      // ── Expanded (active) card ────────────────────────────────
      return `
        <div class="workout-exercise-card active-card" id="activeExerciseCard" data-ex-idx="${idx}">
          <div class="workout-exercise-header">
            <span class="ex-icon">${muscleIcon(exercise.muscle)}</span>
            <div class="ex-info">
              <span class="workout-exercise-name">${esc(exercise.name)}</span>
              <span class="ex-meta">${esc(exercise.muscle)} · ${esc(exercise.equipment)}</span>
            </div>
            <button class="btn-swap-exercise" id="btnSwapExercise" aria-label="Swap exercise" title="Swap for similar exercise">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            </button>
          </div>

          ${
            pb.bestWeight && pb.bestWeight.weight > 0
              ? `
            <div class="personal-best-bar">
              <span class="pb-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>
              <span class="pb-label">PR</span>
              <span class="pb-value">${pb.bestWeight.weight}kg × ${pb.bestWeight.reps}</span>
              ${pb.bestVolume ? `<span class="pb-divider">·</span><span class="pb-value">${pb.bestVolume.volume >= 1000 ? (pb.bestVolume.volume / 1000).toFixed(1) + 'k' : pb.bestVolume.volume}kg vol</span>` : ''}
            </div>
          `
              : ''
          }

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
            ${(() => {
              const prog = getProgression(exercise, lastPerf);
              if (!prog.reason) return '';
              const iconMap = {
                increase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>',
                decrease: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
                maintain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
                reps_up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>',
              };
              return `
                <div class="progression-badge progression-${prog.reason}">
                  <span class="progression-icon">${iconMap[prog.reason]}</span>
                  <span class="progression-detail">${esc(prog.detail)}</span>
                </div>
              `;
            })()}
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

          <!-- Notes -->
          <div class="workout-notes-inline">
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
        </div>
      `;
    })
    .join('');

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
            (completedExercises / totalExercises) * 100
          }%"></div>
        </div>
        <span class="workout-progress-text">${completedExercises} / ${totalExercises}</span>
      </div>

      <!-- All Exercise Cards -->
      <div class="workout-exercises-list" id="workoutExercisesList">
        ${exerciseCardsHtml}
      </div>

      <!-- Finish Workout Button -->
      <div class="workout-finish-section">
        <button class="btn-finish-workout" onclick="finishWorkout()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          Finish Workout
        </button>
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

  // Collapsed card click → expand that exercise
  document.querySelectorAll('.workout-exercise-card.collapsed').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.exIdx, 10);
      const w = Store.getActiveWorkout();
      if (!w) return;
      w.currentExerciseIdx = idx;
      Store.saveActiveWorkout(w);
      renderActiveWorkout(w);
    });
  });

  // Difficulty selector
  let selectedDifficulty = 'medium';
  const diffSelector = document.getElementById('difficultySelector');
  if (diffSelector) {
    diffSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.diff-btn');
      if (!btn) return;
      document.querySelectorAll('.diff-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDifficulty = btn.dataset.diff;
    });
  }

  // Log set
  const btnLogSet = document.getElementById('btnLogSet');
  if (btnLogSet) {
    btnLogSet.addEventListener('click', () => {
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

      // Re-render immediately to show the new set and update set counter
      renderActiveWorkout(w);

      // Start rest timer (after re-render so DOM exists)
      showRestTimer(getRestDuration(selectedDifficulty), w);
    });
  }

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

  // Swap exercise button
  const btnSwap = document.getElementById('btnSwapExercise');
  if (btnSwap) {
    btnSwap.addEventListener('click', () => {
      const exercise = workout.exercises[exIdx];
      showSwapOverlay(exercise, workout);
    });
  }

  // Notes toggle + auto-save
  const notesToggle = document.getElementById('notesToggle');
  const notesBody = document.getElementById('notesBody');
  const notesTextarea = document.getElementById('notesTextarea');
  const notesIndicator = document.getElementById('notesIndicator');

  if (notesToggle && notesBody && notesTextarea) {
    const exercise = workout.exercises[exIdx];

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
  }

  // If rest timer was running (page didn't change), maintain it
  if (isRestTimerRunning()) {
    const container = document.getElementById('restTimerContainer');
    if (container) container.style.display = 'flex';
  }

  // Auto-scroll to active exercise card
  const activeCard = document.getElementById('activeExerciseCard');
  if (activeCard) {
    setTimeout(() => {
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
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

// ── Progression Engine ────────────────────────────────────────
// Rep ranges per context (used for progression decisions)
const REP_RANGE = { min: 6, max: 12 };
// Weight increment suggestions
const WEIGHT_INCREMENT = { Barbell: 2.5, Dumbbell: 2, Cable: 2.5, Machine: 2.5, Bodyweight: 0, Other: 2.5 };

// ── Exercise Similarity Groups (for swapping) ────────────────
// Each group lists exercise IDs that are biomechanically similar
const SIMILARITY_GROUPS = [
  // Horizontal press
  ['ex2', 'ex17', 'ex16', 'ex12', 'ex20', 'ex22', 'ex21', 'ex18'],
  // Chest isolation
  ['ex13', 'ex19'],
  // Vertical pull
  ['ex6', 'ex26', 'ex14', 'ex28'],
  // Horizontal row
  ['ex5', 'ex24', 'ex25', 'ex23', 'ex29', 'ex30'],
  // Deadlift / hip hinge (back)
  ['ex3', 'ex31', 'ex61'],
  // Overhead press
  ['ex4', 'ex32', 'ex33', 'ex37'],
  // Lateral delts
  ['ex10', 'ex34', 'ex38'],
  // Rear delts
  ['ex35', 'ex39', 'ex27'],
  // Bicep curl
  ['ex7', 'ex40', 'ex41', 'ex45', 'ex46', 'ex44', 'ex49'],
  // Tricep extension
  ['ex8', 'ex43', 'ex42', 'ex47', 'ex48', 'ex50'],
  // Squat pattern
  ['ex1', 'ex54', 'ex57', 'ex58', 'ex9'],
  // Single leg
  ['ex52', 'ex56', 'ex62'],
  // Hip hinge (legs)
  ['ex11', 'ex55', 'ex63'],
  // Knee flexion
  ['ex15', 'ex53'],
  // Calves
  ['ex59', 'ex60'],
  // Core
  ['ex64', 'ex65', 'ex66', 'ex67', 'ex68', 'ex69', 'ex70', 'ex71', 'ex72', 'ex73'],
];

function getSimilarExercises(exerciseId) {
  const allExercises = Store.getExercises();
  const group = SIMILARITY_GROUPS.find((g) => g.includes(exerciseId));
  if (!group) {
    // Fallback: return exercises from the same muscle group
    const exercise = allExercises.find((e) => e.id === exerciseId);
    if (!exercise) return [];
    return allExercises.filter((e) => e.id !== exerciseId && e.muscle === exercise.muscle);
  }
  const similarIds = group.filter((id) => id !== exerciseId);
  return similarIds
    .map((id) => allExercises.find((e) => e.id === id))
    .filter(Boolean);
}

function getProgression(exercise, lastPerf) {
  if (!lastPerf || lastPerf.length === 0) return { weight: '', reps: '', reason: null };

  const setIdx = exercise.sets.length; // which set we're about to log
  const idx = Math.min(setIdx, lastPerf.length - 1);
  const lastSet = lastPerf[idx];
  const lastWeight = lastSet.weight;
  const lastReps = lastSet.reps;
  const lastDiff = lastSet.difficulty || 'medium';

  // Analyze ALL sets from last session for this exercise
  const avgReps = lastPerf.reduce((sum, s) => sum + s.reps, 0) / lastPerf.length;
  const allEasyOrMedium = lastPerf.every((s) => s.difficulty === 'easy' || s.difficulty === 'medium');
  const anyHard = lastPerf.some((s) => s.difficulty === 'hard');
  const hitTopOfRange = avgReps >= REP_RANGE.max;
  const missedBottom = avgReps < REP_RANGE.min;

  const increment = WEIGHT_INCREMENT[exercise.equipment] || 2.5;

  // Rule 1: Hit top of rep range + felt easy/medium → increase weight, reset reps to bottom
  if (hitTopOfRange && allEasyOrMedium && lastWeight > 0) {
    return {
      weight: lastWeight + increment,
      reps: '',
      reason: 'increase',
      detail: `+${increment}kg — you hit ${Math.round(avgReps)} reps last time`,
    };
  }

  // Rule 2: Missed bottom of rep range + all sets hard → decrease weight
  const allHard = lastPerf.every((s) => s.difficulty === 'hard');
  if (missedBottom && allHard && lastWeight > 0) {
    const newWeight = Math.max(0, lastWeight - increment);
    return {
      weight: newWeight,
      reps: '',
      reason: 'decrease',
      detail: `-${increment}kg — you only hit ${Math.round(avgReps)} reps and it felt hard`,
    };
  }

  // Rule 3: Felt hard or missed rep target → keep same weight
  if (anyHard || missedBottom) {
    return {
      weight: lastWeight,
      reps: lastReps,
      reason: 'maintain',
      detail: `Same weight — ${anyHard ? 'last session felt hard' : 'build up reps first'}`,
    };
  }

  // Rule 4: Normal progression — keep weight, aim for +1 rep if below max
  if (lastReps < REP_RANGE.max) {
    return {
      weight: lastWeight,
      reps: lastReps + 1,
      reason: 'reps_up',
      detail: `+1 rep target — working toward ${REP_RANGE.max} reps`,
    };
  }

  // Fallback: carry over
  return { weight: lastWeight, reps: lastReps, reason: null };
}

// ── Default values from last performance ─────────────────────
function getDefaultWeight(exercise, lastPerf) {
  return getProgression(exercise, lastPerf).weight;
}

function getDefaultReps(exercise, lastPerf) {
  return getProgression(exercise, lastPerf).reps;
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

// ── Exercise Swap Overlay ─────────────────────────────────────
function showSwapOverlay(currentExercise, workout) {
  const similar = getSimilarExercises(currentExercise.id);

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'swap-overlay';
  overlay.innerHTML = `
    <div class="swap-panel">
      <div class="swap-header">
        <h2>Swap Exercise</h2>
        <button class="btn-icon swap-close-btn" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <p class="swap-current">Replacing: <strong>${esc(currentExercise.name)}</strong></p>
      ${
        similar.length === 0
          ? '<p class="swap-empty">No similar exercises found</p>'
          : `
        <ul class="swap-list">
          ${similar
            .map(
              (ex) => `
            <li class="swap-item" data-swap-id="${ex.id}">
              <span class="ex-icon">${muscleIcon(ex.muscle)}</span>
              <div class="ex-info">
                <span class="ex-name">${esc(ex.name)}</span>
                <span class="ex-meta">${esc(ex.muscle)} · ${esc(ex.equipment)}</span>
              </div>
              <span class="swap-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg></span>
            </li>
          `,
            )
            .join('')}
        </ul>
      `
      }
    </div>
  `;

  document.body.appendChild(overlay);

  // Animate in
  requestAnimationFrame(() => overlay.classList.add('active'));

  // Close handler
  const close = () => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  };

  overlay.querySelector('.swap-close-btn').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Swap handlers
  overlay.querySelectorAll('.swap-item').forEach((item) => {
    item.addEventListener('click', () => {
      const newExId = item.dataset.swapId;
      const allExercises = Store.getExercises();
      const newEx = allExercises.find((e) => e.id === newExId);
      if (!newEx) return;

      const w = Store.getActiveWorkout();
      if (!w) return;

      // Replace the exercise in the active workout, keeping any logged sets
      const idx = w.currentExerciseIdx;
      w.exercises[idx] = {
        ...newEx,
        sets: w.exercises[idx].sets, // keep sets if any were already logged
        notes: w.exercises[idx].notes || '',
      };
      Store.saveActiveWorkout(w);
      close();
      renderActiveWorkout(w);
    });
  });
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

  // ── Schedule stacking: if workout done on unscheduled day, consume next scheduled day ──
  const schedule = Store.getSchedule();
  const scheduledDays = schedule.days || {};
  const today = toDateStr(new Date());
  const todayScheduled = scheduledDays[today] === true;

  if (!todayScheduled && Object.keys(scheduledDays).length > 0) {
    // Find the next future scheduled day and remove it
    const futureDates = Object.keys(scheduledDays)
      .filter((d) => d > today)
      .sort();
    if (futureDates.length > 0) {
      delete schedule.days[futureDates[0]];
      Store.saveSchedule(schedule);
    }
  }

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
      <button class="btn-icon" onclick="Router.go('/history/heatmap')" aria-label="Muscle heatmap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
      </button>
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

  // Extract ALL data points: for each workout that has this exercise, get the best set (highest weight)
  const allDataPoints = [];
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

    allDataPoints.push({
      date: w.startedAt,
      weight: bestSet.weight,
      reps: bestSet.reps,
      sets: ex.sets.length,
      volume: totalVolume,
      difficulty: bestSet.difficulty,
    });
  });

  // Filter data points by selected time range
  const now = Date.now();
  const dataPoints = _progressRange > 0
    ? allDataPoints.filter((d) => now - d.date < _progressRange * 86400000)
    : allDataPoints;

  const exerciseName = exercise ? exercise.name : 'Exercise';

  // Calculate chart metrics from filtered data
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

  // Time range chip options
  const ranges = [
    { value: 14, label: '14D' },
    { value: 30, label: '30D' },
    { value: 90, label: '90D' },
    { value: 0, label: 'All' },
  ];
  const rangeChipsHtml = ranges
    .map(
      (r) =>
        `<button class="range-chip ${_progressRange === r.value ? 'active' : ''}" data-range="${r.value}">${r.label}</button>`,
    )
    .join('');

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
          <span class="progress-ex-meta">${allDataPoints.length} workout${
    allDataPoints.length !== 1 ? 's' : ''
  } tracked</span>
        </div>
      </div>

      <!-- Time Range Filter -->
      <div class="range-chips" id="rangeChips">
        ${rangeChipsHtml}
      </div>

      ${
        dataPoints.length === 0
          ? `
        <div class="empty-state">
          <p class="empty-title">No data in this period</p>
          <p class="empty-sub">${allDataPoints.length > 0 ? 'Try a wider time range' : 'Complete workouts with this exercise to see progress'}</p>
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

  // Bind range chip click handlers
  document.getElementById('rangeChips')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.range-chip');
    if (!chip) return;
    _progressRange = parseInt(chip.dataset.range, 10);
    viewProgress(params);
  });

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
            <h3 class="detail-section-title">Used in Workouts</h3>
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
        !confirm(`This exercise is used in: ${names}.\n\nDelete it and remove from those workouts?`)
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

// ══════════════════════════════════════════════════════════════
// VIEW: Muscle Heatmap
// ══════════════════════════════════════════════════════════════
function viewMuscleHeatmap() {
  const workouts = Store.getWorkouts();
  const allMuscles = ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core'];

  // Analyze last 4 weeks
  const now = Date.now();
  const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const weeks = 4;

  // Build data: { muscle: [weekCounts...] }
  const heatmapData = {};
  allMuscles.forEach((m) => {
    heatmapData[m] = { sessions: new Array(weeks).fill(0), totalSets: 0, totalVolume: 0 };
  });

  workouts.forEach((w) => {
    const weeksAgo = Math.floor((now - w.startedAt) / WEEK_MS);
    if (weeksAgo >= weeks) return;
    const weekIdx = weeks - 1 - weeksAgo; // 0 = oldest, weeks-1 = current

    w.exercises.forEach((ex) => {
      if (ex.sets.length === 0) return;
      const muscle = ex.muscle;
      if (!heatmapData[muscle]) {
        heatmapData[muscle] = { sessions: new Array(weeks).fill(0), totalSets: 0, totalVolume: 0 };
      }
      heatmapData[muscle].sessions[weekIdx]++;
      heatmapData[muscle].totalSets += ex.sets.length;
      heatmapData[muscle].totalVolume += ex.sets.reduce((s, set) => s + set.weight * set.reps, 0);
    });
  });

  // Find max sessions in any single week for color scaling
  let maxWeekSessions = 1;
  allMuscles.forEach((m) => {
    const d = heatmapData[m];
    if (d) d.sessions.forEach((s) => { if (s > maxWeekSessions) maxWeekSessions = s; });
  });

  // Week labels
  const weekLabels = [];
  for (let i = 0; i < weeks; i++) {
    const wDate = new Date(now - (weeks - 1 - i) * WEEK_MS);
    weekLabels.push(wDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  render(`
    <header class="header">
      <button class="btn-back" onclick="Router.go('/history')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <h1>Muscle Heatmap</h1>
      <div class="header-spacer"></div>
    </header>
    <main class="content">
      <p class="heatmap-subtitle">Training frequency — last ${weeks} weeks</p>

      <!-- Heatmap Grid -->
      <div class="heatmap-grid">
        <div class="heatmap-header-row">
          <span class="heatmap-muscle-label"></span>
          ${weekLabels.map((l) => `<span class="heatmap-week-label">${l}</span>`).join('')}
        </div>
        ${allMuscles
          .map((muscle) => {
            const d = heatmapData[muscle] || { sessions: new Array(weeks).fill(0), totalSets: 0, totalVolume: 0 };
            return `
            <div class="heatmap-row">
              <span class="heatmap-muscle-label">${muscleIcon(muscle)} ${esc(muscle)}</span>
              ${d.sessions
                .map((count) => {
                  const intensity = count / maxWeekSessions;
                  const level = count === 0 ? 0 : intensity < 0.33 ? 1 : intensity < 0.66 ? 2 : 3;
                  return `<span class="heatmap-cell heatmap-level-${level}" title="${count} session${count !== 1 ? 's' : ''}">${count > 0 ? count : ''}</span>`;
                })
                .join('')}
            </div>
          `;
          })
          .join('')}
      </div>

      <!-- Heatmap Legend -->
      <div class="heatmap-legend">
        <span class="heatmap-legend-label">Less</span>
        <span class="heatmap-cell heatmap-level-0 heatmap-legend-cell"></span>
        <span class="heatmap-cell heatmap-level-1 heatmap-legend-cell"></span>
        <span class="heatmap-cell heatmap-level-2 heatmap-legend-cell"></span>
        <span class="heatmap-cell heatmap-level-3 heatmap-legend-cell"></span>
        <span class="heatmap-legend-label">More</span>
      </div>

      <!-- Summary Cards -->
      <h2 class="section-title" style="margin-top: 24px;">Summary (4 Weeks)</h2>
      <div class="heatmap-summary">
        ${allMuscles
          .map((muscle) => {
            const d = heatmapData[muscle] || { sessions: new Array(weeks).fill(0), totalSets: 0, totalVolume: 0 };
            const totalSessions = d.sessions.reduce((a, b) => a + b, 0);
            return `
            <div class="heatmap-summary-card">
              <div class="heatmap-summary-header">
                <span class="heatmap-summary-icon">${muscleIcon(muscle)}</span>
                <span class="heatmap-summary-name">${esc(muscle)}</span>
              </div>
              <div class="heatmap-summary-stats">
                <div class="heatmap-summary-stat">
                  <span class="heatmap-summary-val">${totalSessions}</span>
                  <span class="heatmap-summary-label">Sessions</span>
                </div>
                <div class="heatmap-summary-stat">
                  <span class="heatmap-summary-val">${d.totalSets}</span>
                  <span class="heatmap-summary-label">Sets</span>
                </div>
                <div class="heatmap-summary-stat">
                  <span class="heatmap-summary-val">${d.totalVolume >= 1000 ? (d.totalVolume / 1000).toFixed(1) + 'k' : d.totalVolume}</span>
                  <span class="heatmap-summary-label">Vol (kg)</span>
                </div>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
    </main>
  `);
}

// ══════════════════════════════════════════════════════════════
// EXPORT / IMPORT DATA
// ══════════════════════════════════════════════════════════════

function exportData() {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    exercises: Store.getExercises(),
    routines: Store.getRoutines(),
    workouts: Store.getWorkouts(),
    schedule: Store.getSchedule(),
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toTimeString().slice(0, 5).replace(':', '-');
  const a = document.createElement('a');
  a.href = url;
  a.download = `arklog-backup-${date}_${time}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Backup downloaded successfully');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);

        // Validate structure
        if (!data || typeof data !== 'object') {
          showToast('Invalid backup file', true);
          return;
        }
        if (!Array.isArray(data.exercises) || !Array.isArray(data.routines) || !Array.isArray(data.workouts)) {
          showToast('Invalid backup format — missing data', true);
          return;
        }

        // Count what's being imported
        const counts = `${data.exercises.length} exercises, ${data.routines.length} routines, ${data.workouts.length} workouts`;

        if (!confirm(`Import this backup?\n\n${counts}\n\nThis will REPLACE all your current data. Make sure you've exported a backup first.`)) {
          return;
        }

        Store.saveExercises(data.exercises);
        Store.saveRoutines(data.routines);
        Store.saveWorkouts(data.workouts);
        if (data.schedule) Store.saveSchedule(data.schedule);

        showToast('Data imported successfully');

        // Refresh the view
        setTimeout(() => Router.go('/settings'), 300);
      } catch (err) {
        showToast('Failed to read file — invalid JSON', true);
      }
    };
    reader.readAsText(file);
  });

  input.click();
}

function clearAllData() {
  const workoutCount = Store.getWorkouts().length;
  const routineCount = Store.getRoutines().length;

  if (!confirm(`Delete ALL data?\n\n${routineCount} routines, ${workoutCount} workouts\n\nThis cannot be undone!`)) {
    return;
  }
  if (!confirm('Are you absolutely sure? All workout history will be permanently deleted.')) {
    return;
  }

  localStorage.removeItem('il_exercises');
  localStorage.removeItem('il_routines');
  localStorage.removeItem('il_workouts');
  localStorage.removeItem('il_active_workout');
  localStorage.removeItem('il_schedule');

  // Re-seed default exercises
  Store.saveExercises(DEFAULT_EXERCISES);

  showToast('All data cleared');
  setTimeout(() => Router.go('/'), 300);
}

// ── Toast notification ────────────────────────────────────────
function showToast(message, isError = false) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'toast-error' : 'toast-success'}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ══════════════════════════════════════════════════════════════
// VIEW: Settings
// ══════════════════════════════════════════════════════════════
function viewSettings() {
  const workouts = Store.getWorkouts();
  const routines = Store.getRoutines();
  const exercises = Store.getExercises();

  // Calculate storage usage
  let storageBytes = 0;
  ['il_exercises', 'il_routines', 'il_workouts', 'il_active_workout', 'il_schedule'].forEach((key) => {
    const val = localStorage.getItem(key);
    if (val) storageBytes += val.length * 2; // UTF-16
  });
  const storageKB = (storageBytes / 1024).toFixed(1);

  // Last workout date
  const lastWorkout = workouts.length > 0 ? workouts[workouts.length - 1] : null;
  const lastWorkoutText = lastWorkout
    ? formatDate(lastWorkout.startedAt)
    : 'No workouts yet';

  render(`
    <header class="header">
      <div class="header-spacer"></div>
      <h1>Settings</h1>
      <div class="header-spacer"></div>
    </header>
    <main class="content has-tabs">
      <!-- Data Overview -->
      <section class="settings-section">
        <h2 class="section-title">Your Data</h2>
        <div class="settings-stats">
          <div class="settings-stat-card">
            <span class="settings-stat-val">${workouts.length}</span>
            <span class="settings-stat-label">Workouts</span>
          </div>
          <div class="settings-stat-card">
            <span class="settings-stat-val">${routines.length}</span>
            <span class="settings-stat-label">Workouts</span>
          </div>
          <div class="settings-stat-card">
            <span class="settings-stat-val">${exercises.length}</span>
            <span class="settings-stat-label">Exercises</span>
          </div>
          <div class="settings-stat-card">
            <span class="settings-stat-val">${storageKB} KB</span>
            <span class="settings-stat-label">Storage</span>
          </div>
        </div>
        <p class="settings-hint">Last workout: ${esc(lastWorkoutText)}</p>
      </section>

      <!-- Export / Import -->
      <section class="settings-section">
        <h2 class="section-title">Backup & Restore</h2>
        <p class="settings-description">Export your data as a JSON file to keep a backup or transfer to another device. Import a backup to restore your data.</p>

        <div class="settings-actions">
          <button class="btn-settings-action" id="btnExport">
            <span class="settings-action-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </span>
            <div class="settings-action-text">
              <span class="settings-action-name">Export Data</span>
              <span class="settings-action-desc">Download a JSON backup file</span>
            </div>
          </button>

          <button class="btn-settings-action" id="btnImport">
            <span class="settings-action-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </span>
            <div class="settings-action-text">
              <span class="settings-action-name">Import Data</span>
              <span class="settings-action-desc">Restore from a backup file</span>
            </div>
          </button>
        </div>
      </section>

      <!-- Danger Zone -->
      <section class="settings-section">
        <h2 class="section-title danger-title">Danger Zone</h2>
        <button class="btn-settings-action danger" id="btnClearData">
          <span class="settings-action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </span>
          <div class="settings-action-text">
            <span class="settings-action-name">Clear All Data</span>
            <span class="settings-action-desc">Delete all data including workouts & exercises</span>
          </div>
        </button>
      </section>

      <!-- About -->
      <section class="settings-section settings-about">
        <p class="settings-about-text">ArkLog v1.0</p>
        <p class="settings-about-sub">Data stored locally on this device</p>
      </section>
    </main>
    ${tabBar('/settings')}
  `);

  // Bind actions
  document.getElementById('btnExport').addEventListener('click', exportData);
  document.getElementById('btnImport').addEventListener('click', importData);
  document.getElementById('btnClearData').addEventListener('click', clearAllData);
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
Router.on('/history/heatmap', viewMuscleHeatmap);
Router.on('/settings', viewSettings);

// ── Boot ─────────────────────────────────────────────────────
Router.start();
