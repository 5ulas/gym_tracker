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

  // Rest timer preferences per exercise — { [exerciseId]: seconds }
  getRestPrefs() {
    return this._get('il_rest_prefs', {});
  },
  saveRestPrefs(prefs) {
    this._set('il_rest_prefs', prefs);
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
  hideScrollToTop(); // Cleanup scroll listener when changing views
  $app().classList.remove('app-fixed-height');
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

// ── Muscle group SVG icons ───────────────────────────────────
const MUSCLE_SVG = {
  Chest: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4C10 4 6 5 4 8c-1.5 2.2-1 5 0 6.5C5.5 16.5 8 17 9.5 17c1 0 1.8-.3 2.5-1 .7.7 1.5 1 2.5 1 1.5 0 4-.5 5.5-2.5 1-1.5 1.5-4.3 0-6.5C18 5 14 4 12 4z"/><line x1="12" y1="6" x2="12" y2="15"/></svg>`,
  Back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-1.5 0-3 .5-4 1.5S6.5 7 6.5 9c0 2 .5 4 1 5.5s1.5 3.5 2 4.5c.4.8 1.5 2 2.5 2s2.1-1.2 2.5-2c.5-1 1.5-3 2-4.5s1-3.5 1-5.5c0-2-.5-3.5-1.5-4.5S13.5 3 12 3z"/><line x1="12" y1="5" x2="12" y2="19"/><path d="M8 7c1 1 2.5 2 4 2s3-1 4-2"/><path d="M8.5 12c1 .8 2 1.2 3.5 1.2s2.5-.4 3.5-1.2"/></svg>`,
  Shoulders: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" transform="translate(0,4)"/><path d="M5 14c0-3 2-5.5 4.5-6.5" transform="translate(0,2)"/><path d="M19 14c0-3-2-5.5-4.5-6.5" transform="translate(0,2)"/><circle cx="5" cy="14" r="2.5" transform="translate(0,2)"/><circle cx="19" cy="14" r="2.5" transform="translate(0,2)"/></svg>`,
  Arms: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 20v-4c0-1-.5-2-1.5-3S4 10.5 4 8.5 5 4 7 4s4 1.5 4 4c0 1.5-.5 2-1 3"/><path d="M7 4c.5-1 1.5-1.5 2.5-1.5"/><path d="M10 11c1.5 1 2 3 2 5v4"/><ellipse cx="8" cy="8" rx="2.5" ry="3.5"/></svg>`,
  Legs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2c-.5 2-1 4.5-1 7 0 3 .5 5 1 7 .3 1.2.5 3 .5 4.5V22"/><path d="M15 2c.5 2 1 4.5 1 7 0 3-.5 5-1 7-.3 1.2-.5 3-.5 4.5V22"/><ellipse cx="9.5" cy="7" rx="2" ry="4"/><ellipse cx="14.5" cy="7" rx="2" ry="4"/><path d="M8 17h2.5M13.5 17H16"/></svg>`,
  Core: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="3" width="10" height="18" rx="3"/><line x1="12" y1="5" x2="12" y2="19"/><line x1="7.5" y1="8" x2="16.5" y2="8"/><line x1="7.5" y1="12" x2="16.5" y2="12"/><line x1="7.5" y1="16" x2="16.5" y2="16"/></svg>`,
  default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5v11M17.5 6.5v11"/><rect x="5" y="8" width="3" height="8" rx="1"/><rect x="16" y="8" width="3" height="8" rx="1"/><rect x="3" y="9.5" width="2" height="5" rx="0.5"/><rect x="19" y="9.5" width="2" height="5" rx="0.5"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
};

function muscleSvg(muscle) {
  return MUSCLE_SVG[muscle] || MUSCLE_SVG.default;
}

// ── Muscle group color accents ──────────────────────────────
const MUSCLE_COLOR = {
  Chest: '#ff6b6b',
  Back: '#4ecdc4',
  Shoulders: '#ffd93d',
  Arms: '#6c5ce7',
  Legs: '#0984e3',
  Core: '#fd79a8',
  default: '#636e72',
};

function muscleColor(muscle) {
  return MUSCLE_COLOR[muscle] || MUSCLE_COLOR.default;
}

function exerciseIcon(exerciseId, muscle, cssClass = 'ex-icon') {
  const color = muscleColor(muscle);
  const svg = muscleSvg(muscle);
  return `<span class="${cssClass} ex-icon-muscle" style="color:${color};background:${color}15" data-exercise-info="${exerciseId}">${svg}</span>`;
}

// ── Exercise instruction cues ───────────────────────────────
const EXERCISE_CUES = {
  // Chest
  ex2:  { targets: 'Pecs, front delts, triceps', cues: ['Retract shoulder blades', 'Plant feet flat on floor', 'Touch chest, press to lockout', 'Keep wrists stacked over elbows'] },
  ex12: { targets: 'Upper chest, front delts', cues: ['Set bench to 30-45°', 'Squeeze pecs at the top', 'Control the negative', 'Don\'t flare elbows past 75°'] },
  ex13: { targets: 'Inner chest, pec stretch', cues: ['Slight bend in elbows', 'Squeeze chest at center', 'Control the stretch wide', 'Keep shoulders down'] },
  ex16: { targets: 'Upper chest, triceps', cues: ['Set bench to 30-45°', 'Grip slightly wider than shoulders', 'Touch upper chest', 'Drive through feet'] },
  ex17: { targets: 'Chest, stabilizers', cues: ['Arc dumbbells, don\'t press straight', 'Touch outer chest', 'Squeeze at the top', 'Keep wrists neutral'] },
  ex18: { targets: 'Lower chest, triceps', cues: ['Lean torso forward', 'Elbows flare slightly out', 'Go to 90° elbow bend', 'Drive up to lockout'] },
  ex19: { targets: 'Inner chest', cues: ['Sit tall, shoulders back', 'Squeeze pads together slowly', 'Hold the squeeze 1 second', 'Control the return'] },
  ex20: { targets: 'Lower chest, triceps', cues: ['Set bench to 15-30° decline', 'Touch lower chest', 'Press to lockout', 'Keep core tight'] },
  ex21: { targets: 'Chest, core, triceps', cues: ['Hands shoulder-width apart', 'Body in straight line', 'Chest touches floor', 'Squeeze core throughout'] },
  ex22: { targets: 'Upper chest, front delts', cues: ['Wedge one end in corner', 'Press upward at 45°', 'Keep core braced', 'Control the arc'] },
  // Back
  ex3:  { targets: 'Entire posterior chain', cues: ['Hinge at hips, chest up', 'Bar stays close to body', 'Drive through heels', 'Lock hips and knees together'] },
  ex5:  { targets: 'Upper back, lats, rear delts', cues: ['Hinge to ~45° torso angle', 'Pull bar to lower chest', 'Squeeze shoulder blades', 'Control the negative'] },
  ex6:  { targets: 'Lats, biceps, upper back', cues: ['Start from dead hang', 'Pull chest to bar', 'Engage lats first', 'Full extension at bottom'] },
  ex14: { targets: 'Lats, biceps', cues: ['Lean back slightly', 'Pull bar to upper chest', 'Squeeze lats at bottom', 'Control the return'] },
  ex23: { targets: 'Mid back, rhomboids, lats', cues: ['Sit tall, chest up', 'Pull handle to lower chest', 'Squeeze shoulder blades', 'Don\'t lean back too far'] },
  ex24: { targets: 'Mid back, lats, traps', cues: ['Straddle the bar', 'Hinge torso 45°', 'Pull to chest', 'Keep elbows close'] },
  ex25: { targets: 'Lats, rhomboids', cues: ['One knee on bench', 'Pull to hip/waist', 'Keep back flat', 'Squeeze at the top'] },
  ex26: { targets: 'Biceps, lats', cues: ['Supinated (palms in) grip', 'Pull chin over bar', 'Control the descent', 'Full extension at bottom'] },
  ex27: { targets: 'Rear delts, upper back', cues: ['Use rope attachment', 'Pull to face level', 'Separate rope at end', 'Squeeze rear delts'] },
  ex28: { targets: 'Lats, teres major', cues: ['Keep arms straight', 'Pull bar down in an arc', 'Squeeze lats at bottom', 'Lean slightly forward'] },
  ex29: { targets: 'Back, glutes, hamstrings', cues: ['Bar starts on floor each rep', 'Explosive pull', 'Reset position each rep', 'Keep back flat'] },
  ex30: { targets: 'Upper back, rear delts', cues: ['Chest on incline bench', 'Row dumbbells to waist', 'Squeeze shoulder blades', 'Eliminates momentum'] },
  ex31: { targets: 'Upper back, traps, glutes', cues: ['Set pins at knee height', 'Overhand or mixed grip', 'Drive hips forward', 'Squeeze at lockout'] },
  // Shoulders
  ex4:  { targets: 'Front & side delts, triceps', cues: ['Grip just outside shoulders', 'Press from clavicle to overhead', 'Lock out at the top', 'Brace your core'] },
  ex10: { targets: 'Side delts', cues: ['Slight bend in elbows', 'Raise to shoulder height', 'Lead with elbows not hands', 'Control the descent'] },
  ex32: { targets: 'Front & side delts', cues: ['Start at ear height', 'Press up and slightly in', 'Don\'t lock elbows hard', 'Keep core tight'] },
  ex33: { targets: 'All three delt heads', cues: ['Start palms facing you', 'Rotate as you press up', 'Finish palms forward', 'Control the rotation'] },
  ex34: { targets: 'Side delts', cues: ['Stand sideways to cable', 'Raise arm to shoulder height', 'Constant tension on cable', 'Slow negative'] },
  ex35: { targets: 'Rear delts, upper back', cues: ['Bend forward at hips', 'Raise arms out to sides', 'Squeeze shoulder blades', 'Slight bend in elbows'] },
  ex36: { targets: 'Side delts, traps', cues: ['Pull bar along body', 'Elbows lead the movement', 'Raise to chin height', 'Keep bar close'] },
  ex37: { targets: 'Front & side delts', cues: ['Adjust seat height', 'Press to full extension', 'Control the negative', 'Keep back against pad'] },
  ex38: { targets: 'Front delts', cues: ['Slight bend in elbows', 'Raise to eye level', 'Alternate or together', 'Don\'t swing momentum'] },
  ex39: { targets: 'Rear delts', cues: ['Face the machine', 'Push handles back', 'Squeeze rear delts', 'Controlled return'] },
  // Arms
  ex7:  { targets: 'Biceps', cues: ['Keep elbows pinned to sides', 'Full range of motion', 'Squeeze at the top', 'Control the negative'] },
  ex8:  { targets: 'Triceps', cues: ['Keep elbows at sides', 'Push down to full extension', 'Squeeze triceps at bottom', 'Don\'t flare elbows'] },
  ex40: { targets: 'Biceps, forearms', cues: ['Shoulder-width grip', 'Keep elbows stationary', 'Squeeze at the top', 'Full extension at bottom'] },
  ex41: { targets: 'Brachialis, biceps', cues: ['Neutral (hammer) grip', 'Keep elbows at sides', 'Curl to shoulder height', 'Control the descent'] },
  ex42: { targets: 'Triceps long head', cues: ['Lower bar to forehead', 'Keep upper arms vertical', 'Extend to lockout', 'Don\'t flare elbows'] },
  ex43: { targets: 'Triceps long head', cues: ['Keep elbows close to head', 'Lower behind head slowly', 'Extend to full lockout', 'Don\'t arch back'] },
  ex44: { targets: 'Biceps peak', cues: ['Arm flat on pad', 'Curl to full contraction', 'Slow negative', 'Don\'t lift elbow off pad'] },
  ex45: { targets: 'Biceps', cues: ['Stand facing cable', 'Curl handle to chin', 'Constant cable tension', 'Squeeze at the top'] },
  ex46: { targets: 'Biceps peak', cues: ['Elbow on inner thigh', 'Curl to shoulder', 'Squeeze at peak', 'Full stretch at bottom'] },
  ex47: { targets: 'Triceps, inner chest', cues: ['Grip narrower than shoulders', 'Keep elbows tucked', 'Touch lower chest', 'Lock out at the top'] },
  ex48: { targets: 'Triceps, chest', cues: ['Keep torso upright', 'Elbows back, not flared', 'Lower to 90° bend', 'Press to full lockout'] },
  ex49: { targets: 'Biceps', cues: ['Use EZ-bar angles', 'Keep elbows at sides', 'Curl to full contraction', 'Don\'t swing'] },
  ex50: { targets: 'Triceps', cues: ['Hinge forward at hips', 'Extend arm fully back', 'Squeeze tricep at top', 'Keep upper arm still'] },
  ex51: { targets: 'Forearm flexors', cues: ['Forearms on bench/thighs', 'Curl wrists up', 'Full range of motion', 'Don\'t lift forearms'] },
  // Legs
  ex1:  { targets: 'Quads, glutes, core', cues: ['Bar on upper traps', 'Break at hips and knees', 'Depth: hip crease below knee', 'Drive through full foot'] },
  ex9:  { targets: 'Quads, glutes', cues: ['Feet shoulder-width on platform', 'Lower until 90° knee bend', 'Press through heels', 'Don\'t lock knees hard'] },
  ex11: { targets: 'Hamstrings, glutes', cues: ['Hinge at hips', 'Slight knee bend, keep fixed', 'Feel hamstring stretch', 'Squeeze glutes at top'] },
  ex15: { targets: 'Hamstrings', cues: ['Adjust pad above ankles', 'Curl heels to glutes', 'Squeeze hamstrings', 'Control the return'] },
  ex52: { targets: 'Quads, glutes, balance', cues: ['Rear foot on bench', 'Front knee over ankle', 'Drop back knee down', 'Push through front heel'] },
  ex53: { targets: 'Quads', cues: ['Adjust pad on shins', 'Extend to full lockout', 'Squeeze quads at top', 'Control the descent'] },
  ex54: { targets: 'Quads, core', cues: ['Bar on front delts', 'Elbows high, chest up', 'Same squat depth', 'Core stays very tight'] },
  ex55: { targets: 'Glutes, hamstrings', cues: ['Upper back on bench', 'Bar on hip crease', 'Drive through heels', 'Squeeze glutes at top'] },
  ex56: { targets: 'Quads, glutes, balance', cues: ['Long stride forward', 'Back knee nearly touches floor', 'Keep torso upright', 'Push through front heel'] },
  ex57: { targets: 'Quads, core', cues: ['Hold dumbbell at chest', 'Squat between knees', 'Elbows inside knees', 'Keep torso upright'] },
  ex58: { targets: 'Quads', cues: ['Feet on platform shoulder-width', 'Lower until 90° bend', 'Press through full foot', 'Keep back against pad'] },
  ex59: { targets: 'Calves (gastrocnemius)', cues: ['Balls of feet on edge', 'Full stretch at bottom', 'Rise to full contraction', 'Hold top for 1 second'] },
  ex60: { targets: 'Calves (soleus)', cues: ['Knees bent at 90°', 'Balls of feet on edge', 'Full range of motion', 'Slow controlled reps'] },
  ex61: { targets: 'Glutes, inner thighs, back', cues: ['Wide stance, toes out', 'Hinge at hips', 'Bar close to body', 'Squeeze glutes at top'] },
  ex62: { targets: 'Quads, glutes', cues: ['Step onto bench/box', 'Drive through top foot', 'Full hip extension at top', 'Control the step down'] },
  ex63: { targets: 'Hamstrings, glutes', cues: ['Lock feet at ankles', 'Lower body with control', 'Hamstrings do the work', 'Use arms to push off floor if needed'] },
  // Core
  ex64: { targets: 'Entire core, transverse abs', cues: ['Forearms on floor', 'Body in straight line', 'Squeeze glutes and core', 'Don\'t let hips sag'] },
  ex65: { targets: 'Lower abs, hip flexors', cues: ['Hang from bar', 'Raise legs to parallel', 'Control the swing', 'Slow negative'] },
  ex66: { targets: 'Rectus abdominis', cues: ['Kneel facing cable', 'Crunch down rounding spine', 'Keep hips stationary', 'Squeeze abs at bottom'] },
  ex67: { targets: 'Entire core, lats', cues: ['Start on knees', 'Roll out with straight arms', 'Go as far as you can control', 'Squeeze abs to roll back'] },
  ex68: { targets: 'Obliques, core', cues: ['Lean back slightly', 'Rotate side to side', 'Keep feet off floor for harder', 'Control the twist'] },
  ex69: { targets: 'Upper abs', cues: ['Secure feet at top', 'Cross arms or hands behind head', 'Curl up, don\'t jerk', 'Slow negative'] },
  ex70: { targets: 'Anti-rotation, obliques', cues: ['Stand sideways to cable', 'Press handle straight out', 'Resist rotation', 'Hold 2-3 seconds extended'] },
  ex71: { targets: 'Entire core', cues: ['Lie on bench, grip behind head', 'Raise legs and hips straight', 'Lower with extreme control', 'Advanced movement'] },
  ex72: { targets: 'Core, cardio', cues: ['High plank position', 'Drive knees to chest fast', 'Keep hips level', 'Maintain breathing rhythm'] },
  ex73: { targets: 'Core stability', cues: ['Lie on back', 'Opposite arm and leg extend', 'Keep lower back pressed down', 'Alternate sides slowly'] },
};

// ── Exercise GIF URLs (ExerciseDB / wger.de) ─────────────────
const EXERCISE_GIF = {
  // Chest
  ex2:  'https://wger.de/media/exercise-images/192/Bench-press-1.png',
  ex12: 'https://wger.de/media/exercise-images/16/Incline-press-1.png',
  ex13: 'https://wger.de/media/exercise-images/238/2fc242d3-5bdd-4f97-99bd-678adb8c96fc.png',
  ex16: 'https://wger.de/media/exercise-images/41/Incline-bench-press-1.png',
  ex17: 'https://wger.de/media/exercise-images/97/Dumbbell-bench-press-1.png',
  ex19: 'https://wger.de/media/exercise-images/1655/b263c968-e067-4750-916a-d8758a7df23e.webp',
  ex20: 'https://wger.de/media/exercise-images/100/Decline-bench-press-1.png',
  ex21: 'https://wger.de/media/exercise-images/1551/a6a9e561-3965-45c6-9f2b-ee671e1a3a45.png',
  // Back
  ex3:  'https://wger.de/media/exercise-images/184/1709c405-620a-4d07-9658-fade2b66a2df.jpeg',
  ex5:  'https://wger.de/media/exercise-images/109/Barbell-rear-delt-row-1.png',
  ex6:  'https://wger.de/media/exercise-images/475/b0554016-16fd-4dbe-be47-a2a17d16ae0e.jpg',
  ex14: 'https://wger.de/media/exercise-images/158/02e8a7c3-dc67-434e-a4bc-77fdecf84b49.webp',
  ex23: 'https://wger.de/media/exercise-images/1117/e74255c0-67a0-4309-b78d-2d79e6ff8c11.png',
  ex24: 'https://wger.de/media/exercise-images/106/T-bar-row-1.png',
  ex25: 'https://wger.de/media/exercise-images/81/a751a438-ae2d-4751-8d61-cef0e9292174.png',
  ex26: 'https://wger.de/media/exercise-images/181/Chin-ups-2.png',
  ex28: 'https://wger.de/media/exercise-images/1726/2e7e541b-5f55-405a-ae78-3e71b3f42db4.png',
  ex30: 'https://wger.de/media/exercise-images/1283/e7262f70-7512-408a-8d00-4c499ef632fc.jpg',
  ex31: 'https://wger.de/media/exercise-images/161/Dead-lifts-2.png',
  // Shoulders
  ex4:  'https://wger.de/media/exercise-images/119/seated-barbell-shoulder-press-large-1.png',
  ex10: 'https://wger.de/media/exercise-images/148/lateral-dumbbell-raises-large-2.png',
  ex32: 'https://wger.de/media/exercise-images/123/dumbbell-shoulder-press-large-1.png',
  ex34: 'https://wger.de/media/exercise-images/1378/7c1fcf34-fb7e-45e7-a0c1-51f296235315.jpg',
  ex35: 'https://wger.de/media/exercise-images/829/ad724e5c-b1ed-49e8-9279-a17545b0dd0b.png',
  ex36: 'https://wger.de/media/exercise-images/693/05c91bd2-7814-40b6-b2d1-51ae942b8321.png',
  ex37: 'https://wger.de/media/exercise-images/53/Shoulder-press-machine-2.png',
  ex38: 'https://wger.de/media/exercise-images/256/b7def5bc-2352-499b-b9e5-fff741003831.png',
  ex39: 'https://wger.de/media/exercise-images/1744/cb9263c4-39fc-4261-8d30-a5d6d57841c1.jpg',
  // Arms
  ex7:  'https://wger.de/media/exercise-images/81/Biceps-curl-1.png',
  ex8:  'https://wger.de/media/exercise-images/1185/c5ca283d-8958-4fd8-9d59-a3f52a3ac66b.jpg',
  ex40: 'https://wger.de/media/exercise-images/74/Bicep-curls-1.png',
  ex41: 'https://wger.de/media/exercise-images/1567/0a8c155c-a48e-47e8-9df3-e39f025c6cad.png',
  ex42: 'https://wger.de/media/exercise-images/50/695ced5c-9961-4076-add2-cb250d01089e.png',
  ex43: 'https://wger.de/media/exercise-images/1336/ebf88217-df26-4ef7-94cb-f0c2220c6abe.webp',
  ex44: 'https://wger.de/media/exercise-images/193/Preacher-curl-3-1.png',
  ex45: 'https://wger.de/media/exercise-images/129/Standing-biceps-curl-1.png',
  ex46: 'https://wger.de/media/exercise-images/1649/441cc0e5-eca2-4828-8b0a-a0e554abb2ff.jpg',
  ex47: 'https://wger.de/media/exercise-images/88/Narrow-grip-bench-press-1.png',
  ex49: 'https://wger.de/media/exercise-images/74/Bicep-curls-1.png',
  ex51: 'https://wger.de/media/exercise-images/51/f1730f56-7aca-4566-8338-3e42b1bee6e1.webp',
  // Legs
  ex1:  'https://wger.de/media/exercise-images/1805/f166c599-4c03-42a0-9250-47f82a1f096d.jpg',
  ex9:  'https://wger.de/media/exercise-images/371/d2136f96-3a43-4d4c-9944-1919c4ca1ce1.webp',
  ex11: 'https://wger.de/media/exercise-images/1750/c5ff74e1-b494-4df0-a13f-89c630b88ef9.webp',
  ex15: 'https://wger.de/media/exercise-images/364/b318dde9-f5f2-489f-940a-cd864affb9e3.png',
  ex52: 'https://wger.de/media/exercise-images/1706/0c5243cc-2539-4005-aee0-d3a8c5d3a32c.jfif',
  ex54: 'https://wger.de/media/exercise-images/191/Front-squat-1-857x1024.png',
  ex55: 'https://wger.de/media/exercise-images/1614/7f3cfae2-e062-4211-9a6b-5a10851ce7f4.jpg',
  ex56: 'https://wger.de/media/exercise-images/113/Walking-lunges-1.png',
  ex57: 'https://wger.de/media/exercise-images/203/1c052351-2af0-4227-aeb0-244008e4b0a8.jpeg',
  ex59: 'https://wger.de/media/exercise-images/622/9a429bd0-afd3-4ad0-8043-e9beec901c81.jpeg',
  ex61: 'https://wger.de/media/exercise-images/630/b0f0c7d8-5878-4d9e-b820-21acc013741d.webp',
  // Core
  ex65: 'https://wger.de/media/exercise-images/125/Leg-raises-2.png',
};

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

// ── Scroll to top button helper ───────────────────────────────
let _scrollHandler = null; // Track the scroll handler for cleanup

function bindScrollToTop(mainId) {
  const main = document.getElementById(mainId);
  if (!main) return;

  // Create the button if it doesn't exist
  let btn = document.getElementById('scrollToTopBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.className = 'scroll-to-top-btn';
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);
  }

  // Remove previous scroll handler if any
  if (_scrollHandler) {
    window.removeEventListener('scroll', _scrollHandler);
  }

  // Show/hide based on scroll position
  _scrollHandler = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', _scrollHandler, { passive: true });
  _scrollHandler(); // Initial check
}

// Hide scroll-to-top when navigating away from pages that use it
function hideScrollToTop() {
  const btn = document.getElementById('scrollToTopBtn');
  if (btn) btn.classList.remove('visible');
  if (_scrollHandler) {
    window.removeEventListener('scroll', _scrollHandler);
    _scrollHandler = null;
  }
}

// ══════════════════════════════════════════════════════════════
// WEEKLY SCHEDULE — Helpers & Component
// ══════════════════════════════════════════════════════════════

// Schedule data model:
// Store.getSchedule() → { days: { 'YYYY-MM-DD': true | { routineId } }, recurring: [{ dayOfWeek: 0-6, routineId }] }
// days[dateStr] === true → simple planned day (no specific workout)
// days[dateStr] === { routineId: '...' } → planned with a specific workout
// recurring[].dayOfWeek → 0 = Monday … 6 = Sunday (ISO week)
// Completed workouts are detected from Store.getWorkouts() via finishedAt timestamp.

// Get YYYY-MM-DD for a date (local timezone, no UTC drift)
function toDateStr(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Get ISO day-of-week index for a date (0=Mon, 1=Tue, …, 6=Sun)
function isoDayOfWeek(date) {
  const d = new Date(date).getDay(); // 0=Sun
  return d === 0 ? 6 : d - 1;
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

// Resolve schedule entry for a date, merging recurring rules
function resolveScheduleEntry(dateStr, date, schedule) {
  const days = schedule.days || {};
  const recurring = schedule.recurring || [];

  // Explicit day entry takes priority
  if (dateStr in days) {
    const val = days[dateStr];
    if (val === false) return null; // explicitly cancelled recurring
    return val;
  }

  // Check recurring rules (only for today and future)
  const today = toDateStr(new Date());
  if (dateStr < today) return null; // Don't apply recurring to past dates

  const dow = isoDayOfWeek(date);
  const rule = recurring.find((r) => r.dayOfWeek === dow);
  if (rule) {
    return rule.routineId ? { routineId: rule.routineId } : true;
  }
  return null;
}

// For a given week offset, compute each day's status
function getWeekScheduleStatus(weekOffset) {
  const schedule = Store.getSchedule();
  const weekDates = getWeekDates(weekOffset);
  const workouts = Store.getWorkouts();
  const today = toDateStr(new Date());
  const routines = Store.getRoutines();

  return weekDates.map((date) => {
    const dateStr = toDateStr(date);
    const completed = workouts.some((w) => toDateStr(w.finishedAt) === dateStr);
    const entry = resolveScheduleEntry(dateStr, date, schedule);
    const scheduled = entry != null;

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

    // Resolve routine name for display
    let routineName = null;
    let routineId = null;
    if (entry && typeof entry === 'object' && entry.routineId) {
      routineId = entry.routineId;
      const r = routines.find((rt) => rt.id === entry.routineId);
      routineName = r ? r.name : null;
    }

    return { date, dateStr, status, isToday: dateStr === today, routineName, routineId };
  });
}

// Set a schedule day entry
function setScheduleDay(dateStr, value) {
  const schedule = Store.getSchedule();
  if (!schedule.days) schedule.days = {};
  if (value == null) {
    delete schedule.days[dateStr];
  } else {
    schedule.days[dateStr] = value;
  }
  Store.saveSchedule(schedule);
}

// Toggle a day's scheduled status (simple plan only, backward compatible)
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

// Move a scheduled workout from one date to another (preserving entry data)
function rescheduleDay(fromDate, toDate) {
  const schedule = Store.getSchedule();
  if (!schedule.days) schedule.days = {};
  const entry = schedule.days[fromDate] || true;
  delete schedule.days[fromDate];
  schedule.days[toDate] = entry;
  Store.saveSchedule(schedule);
}

// Add a recurring rule
function addRecurringRule(dayOfWeek, routineId) {
  const schedule = Store.getSchedule();
  if (!schedule.recurring) schedule.recurring = [];
  // Remove existing rule for same day
  schedule.recurring = schedule.recurring.filter((r) => r.dayOfWeek !== dayOfWeek);
  schedule.recurring.push({ dayOfWeek, routineId: routineId || null });
  Store.saveSchedule(schedule);
}

// Remove a recurring rule for a specific day
function removeRecurringRule(dayOfWeek) {
  const schedule = Store.getSchedule();
  if (!schedule.recurring) return;
  schedule.recurring = schedule.recurring.filter((r) => r.dayOfWeek !== dayOfWeek);
  Store.saveSchedule(schedule);
}

// Check if a recurring rule exists for a day of week
function getRecurringRule(dayOfWeek) {
  const schedule = Store.getSchedule();
  return (schedule.recurring || []).find((r) => r.dayOfWeek === dayOfWeek) || null;
}

// ── Day Action Sheet (slide-up) ──────────────────────────────
function showDayActionSheet(dateStr, date) {
  const schedule = Store.getSchedule();
  const days = schedule.days || {};
  const entry = days[dateStr];
  const hasExplicitEntry = dateStr in days;
  const recurring = schedule.recurring || [];
  const dow = isoDayOfWeek(date);
  const recurringRule = recurring.find((r) => r.dayOfWeek === dow);
  const isFromRecurring = !hasExplicitEntry && recurringRule;

  // Resolve effective entry: explicit entry (incl. false = cancelled) > recurring > null
  let effectiveEntry;
  if (hasExplicitEntry) {
    effectiveEntry = entry === false ? null : entry; // false = cancelled recurring
  } else if (recurringRule) {
    effectiveEntry = recurringRule.routineId ? { routineId: recurringRule.routineId } : true;
  } else {
    effectiveEntry = null;
  }
  const isScheduled = effectiveEntry != null && effectiveEntry !== false;

  const routines = Store.getRoutines();
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayLabel = dayLabels[dow];

  // Determine current routine assignment
  let currentRoutineId = null;
  if (effectiveEntry && typeof effectiveEntry === 'object' && effectiveEntry.routineId) {
    currentRoutineId = effectiveEntry.routineId;
  }
  const currentRoutine = currentRoutineId ? routines.find((r) => r.id === currentRoutineId) : null;

  // Remove any existing sheet
  const existing = document.querySelector('.day-action-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'day-action-overlay';

  const fmtDate = (() => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const d = new Date(dateStr + 'T12:00:00');
    return `${dayLabel}, ${months[d.getMonth()]} ${d.getDate()}`;
  })();

  // Recurring toggle SVG (reused)
  const recurringIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`;
  const chevronIcon = `<svg class="day-action-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>`;
  const dumbbellIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6.5 6.5v11M17.5 6.5v11"/><rect x="5" y="8" width="3" height="8" rx="1"/><rect x="16" y="8" width="3" height="8" rx="1"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`;

  // Build routine picker HTML (shared between scheduled & unscheduled views)
  const pickerHtml = routines.length > 0 ? `
    <div class="day-action-picker" id="dayActionPicker" style="display:none">
      <span class="day-action-picker-title">Select Workout</span>
      <ul class="day-action-routine-list">
        ${routines.map((r) => `
          <li class="day-action-routine-item ${r.id === currentRoutineId ? 'active' : ''}" data-routine-id="${r.id}">
            <span class="day-action-routine-name">${esc(r.name)}</span>
            <span class="day-action-routine-meta">${r.exercises.length} exercise${r.exercises.length !== 1 ? 's' : ''}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  ` : '';

  overlay.innerHTML = `
    <div class="day-action-backdrop"></div>
    <div class="day-action-panel">
      <div class="day-action-handle"></div>
      <div class="day-action-header">
        <span class="day-action-date">${fmtDate}</span>
        ${isFromRecurring ? '<span class="day-action-recurring-badge">Recurring</span>' : ''}
      </div>

      ${!isScheduled ? `
        <div class="day-action-section" id="dayActionMain">
          <button class="day-action-btn" data-action="plan-simple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            <span>Plan Gym Day</span>
          </button>
          ${routines.length > 0 ? `
            <button class="day-action-btn" data-action="show-picker">
              ${dumbbellIcon}
              <span>Plan with Workout</span>
              ${chevronIcon}
            </button>
          ` : ''}
          <button class="day-action-btn" data-action="quick-workout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>Quick Workout</span>
          </button>
        </div>
      ` : `
        <div class="day-action-section" id="dayActionMain">
          ${currentRoutine ? `
            <div class="day-action-current">
              <span class="day-action-current-label">Assigned Workout</span>
              <span class="day-action-current-name">${esc(currentRoutine.name)}</span>
            </div>
            <button class="day-action-btn primary" data-action="start-workout" data-routine-id="${currentRoutineId}">
              <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21"/></svg>
              <span>Start Workout</span>
            </button>
          ` : `
            <div class="day-action-current">
              <span class="day-action-current-label">Planned</span>
              <span class="day-action-current-name">Gym Day (no workout assigned)</span>
            </div>
          `}
          ${routines.length > 0 ? `
            <button class="day-action-btn" data-action="show-picker">
              ${dumbbellIcon}
              <span>${currentRoutine ? 'Change Workout' : 'Assign Workout'}</span>
              ${chevronIcon}
            </button>
          ` : ''}
          <button class="day-action-btn" data-action="toggle-recurring">
            ${recurringIcon}
            <span>${recurringRule ? `Remove Recurring ${dayLabel}` : `Repeat Every ${dayLabel}`}</span>
          </button>
          <button class="day-action-btn danger" data-action="remove">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            <span>Remove${isFromRecurring ? ' (this day only)' : ''}</span>
          </button>
        </div>
      `}

      ${pickerHtml}

      <button class="day-action-cancel" data-action="cancel">Cancel</button>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('open'));

  // Close helper
  const close = () => {
    overlay.classList.remove('open');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 400);
  };

  overlay.querySelector('.day-action-backdrop').addEventListener('click', close);

  // Swipe-down to dismiss
  let startY = 0;
  const panel = overlay.querySelector('.day-action-panel');
  panel.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; }, { passive: true });
  panel.addEventListener('touchend', (e) => { if (e.changedTouches[0].clientY - startY > 80) close(); }, { passive: true });

  // Action buttons
  overlay.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;

      if (action === 'cancel') {
        close();
      } else if (action === 'plan-simple') {
        setScheduleDay(dateStr, true);
        rerenderWeekStrip();
        // Re-open sheet to show management options (recurring, assign workout, etc.)
        close();
        setTimeout(() => showDayActionSheet(dateStr, date), 50);
      } else if (action === 'show-picker') {
        // Hide the main action section, show only the picker
        const mainSection = document.getElementById('dayActionMain');
        const picker = document.getElementById('dayActionPicker');
        if (mainSection) mainSection.style.display = 'none';
        if (picker) picker.style.display = 'block';
      } else if (action === 'start-workout') {
        const routineId = btn.dataset.routineId;
        close();
        startWorkout(routineId);
      } else if (action === 'quick-workout') {
        close();
        startQuickWorkout();
      } else if (action === 'toggle-recurring') {
        if (recurringRule) {
          removeRecurringRule(dow);
        } else {
          // Set recurring with current routine (if any)
          addRecurringRule(dow, currentRoutineId);
        }
        close();
        rerenderWeekStrip();
      } else if (action === 'remove') {
        if (isFromRecurring) {
          // Override recurring for this specific date: set to explicitly cancelled
          setScheduleDay(dateStr, false);
        } else {
          // Check if a recurring rule exists for this day of week
          // If so, we need to cancel this specific day, not just delete the explicit entry
          const ruleExists = getRecurringRule(dow);
          if (ruleExists) {
            setScheduleDay(dateStr, false); // Cancel this day to prevent recurring from applying
          } else {
            setScheduleDay(dateStr, null); // Just delete the explicit entry
          }
        }
        close();
        rerenderWeekStrip();
      }
    });
  });

  // Routine picker items
  overlay.querySelectorAll('.day-action-routine-item').forEach((item) => {
    item.addEventListener('click', () => {
      const routineId = item.dataset.routineId;
      setScheduleDay(dateStr, { routineId });
      // Also update recurring rule if one exists for this day of week
      const currentRule = getRecurringRule(dow);
      if (currentRule) {
        addRecurringRule(dow, routineId);
      }
      rerenderWeekStrip();
      // Re-open sheet to show management options (start, recurring, etc.)
      close();
      setTimeout(() => showDayActionSheet(dateStr, date), 50);
    });
  });
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
            ${d.routineName && (d.status === 'scheduled' || d.status === 'missed') ? `<span class="week-day-routine">${esc(d.routineName)}</span>` : ''}
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
        if (match) Router.go('/history/workout', { workoutId: match.id, from: 'home' });
      } else {
        // Open action sheet for planning options
        const date = new Date(dateStr + 'T12:00:00');
        showDayActionSheet(dateStr, date);
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
      <button class="btn-help" id="btnHelp" aria-label="How it works">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </button>
      <h1>Workouts</h1>
      <div class="header-spacer"></div>
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

      <button class="btn-new-routine" onclick="Router.go('/routine/new')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <span>New Workout</span>
      </button>

      <button class="btn-quick-workout" onclick="startQuickWorkout()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        <span>Quick Workout</span>
      </button>

      ${
        routines.length === 0
          ? `
        <div class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <p class="empty-title">No workouts yet</p>
          <p class="empty-sub">Create your first workout to start tracking</p>
        </div>
      `
          : `
        <h2 class="section-title home-section-title">My Workouts</h2>
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

  // Help button
  document.getElementById('btnHelp')?.addEventListener('click', showHelpModal);
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
    <main class="content has-tabs" id="exercisesMain">
      <div class="search-bar">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="searchInput" placeholder="Search exercises…" autocomplete="off" enterkeyhint="search" />
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

  // Scroll to top when search is focused to prevent layout jumps
  searchInput.addEventListener('focus', () => {
    setTimeout(() => {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  });

  // Dismiss keyboard on Enter/Search key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchInput.blur();
    }
  });

  filterRow.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    filterRow.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.muscle;
    applyFilters();
  });

  // Bind scroll to top button
  bindScrollToTop('exercisesMain');
}

function renderExerciseItems(list) {
  if (list.length === 0) return '<li class="empty-row">No exercises found</li>';
  return list
    .map(
      (ex) => `
    <li class="exercise-item" onclick="Router.go('/exercise/detail', { id: '${ex.id}' })">
      ${exerciseIcon(ex.id, ex.muscle)}
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

// Helper to render selected exercises as compact chips
function renderSelectedChips(selected) {
  if (selected.length === 0) return '';
  return selected.map((ex, i) => {
    const truncName = ex.name.length > 15 ? ex.name.slice(0, 15) + '…' : ex.name;
    return `<span class="chip" data-chip-idx="${i}">
      <span class="chip-name">${esc(truncName)}</span>
      <button class="chip-remove" data-chip-remove="${i}" aria-label="Remove ${esc(ex.name)}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </span>`;
  }).join('');
}

function renderRoutineEditor(routineName, selected, isEdit, routineId) {
  const allExercises = Store.getExercises();

  render(`
    <header class="header">
      <button class="btn-back" onclick="Router.go('/')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <h1>${isEdit ? 'Edit Workout' : 'New Workout'}</h1>
      ${
        isEdit
           ? `<button class="btn-icon danger" id="deleteRoutineBtn" aria-label="Delete workout">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>`
          : '<div class="header-spacer"></div>'
      }
    </header>
    <main class="content" id="routineEditorMain">
      <div class="routine-editor-top" id="routineEditorTop">
        <input type="text" id="routineName" class="routine-name-input" placeholder="Workout name" value="${esc(
          routineName,
        )}" autocomplete="off" />
        <div class="selected-chips" id="selectedChips">
          ${renderSelectedChips(selected)}
        </div>
        <div class="search-bar routine-search-bar">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="routineSearch" placeholder="Search exercises to add…" autocomplete="off" enterkeyhint="search" />
        </div>
      </div>

      <section class="routine-section routine-available-section">
        <ul class="exercise-list" id="availableList">
          ${renderAvailableExercises(allExercises, selected)}
        </ul>
      </section>
    </main>
    <div class="sticky-save-bar">
      <button class="btn-primary btn-full" id="saveRoutineBtn">${
        isEdit ? 'Save Changes' : 'Create Workout'
      }</button>
    </div>
  `);

  // ── Helper: partial update (preserves search input & focus) ─
  function updateLists() {
    const searchInput = document.getElementById('routineSearch');
    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Update selected chips
    const chipsContainer = document.getElementById('selectedChips');
    if (chipsContainer) {
      chipsContainer.innerHTML = renderSelectedChips(selected);
      bindChipRemoveButtons();
    }

    // Update available list (apply current search filter)
    let filtered = allExercises;
    if (q)
      filtered = filtered.filter(
        (ex) =>
          ex.name.toLowerCase().includes(q) ||
          ex.muscle.toLowerCase().includes(q) ||
          ex.equipment.toLowerCase().includes(q),
      );
    document.getElementById('availableList').innerHTML = renderAvailableExercises(filtered, selected);

    // Re-bind item buttons (not drag — container listeners persist)
    bindAddButtons();
  }

  // ── Bind chip remove buttons ─────────────────────────────────
  function bindChipRemoveButtons() {
    document.querySelectorAll('.chip-remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.chipRemove);
        selected.splice(idx, 1);
        updateLists();
      });
    });
  }

  // ── Bind add-exercise buttons ──────────────────────────────
  function bindAddButtons() {
    document.querySelectorAll('.btn-add-ex').forEach((btn) => {
      btn.addEventListener('click', () => {
        const exId = btn.dataset.exid;
        const ex = allExercises.find((e) => e.id === exId);
        if (ex && !selected.some((s) => s.id === exId)) {
          selected.push({ ...ex });
          updateLists();
        }
      });
    });
  }


  // ── Save routine ───────────────────────────────────────────
  document.getElementById('saveRoutineBtn').addEventListener('click', () => {
    const name = document.getElementById('routineName').value.trim();
    if (!name) {
      const nameInput = document.getElementById('routineName');
      shakeElement(nameInput);
      showFormError(nameInput, 'Please enter a workout name');
      nameInput.addEventListener('input', () => {
        const err = document.querySelector('.form-error');
        if (err) err.remove();
      }, { once: true });
      return;
    }
    if (selected.length === 0) {
      const chipsEl = document.getElementById('selectedChips');
      shakeElement(chipsEl);
      showFormError(chipsEl, 'Add at least one exercise');
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

  // ── Delete routine ─────────────────────────────────────────
  if (isEdit) {
    document.getElementById('deleteRoutineBtn').addEventListener('click', () => {
      showConfirmModal({
        icon: 'warning',
        title: 'Delete Workout',
        message: 'Are you sure you want to delete this workout template?',
        confirmText: 'Delete',
        confirmDanger: true,
        onConfirm: () => {
          const routines = Store.getRoutines().filter((r) => r.id !== routineId);
          Store.saveRoutines(routines);
          Router.go('/');
        },
      });
    });
  }

  // ── Initial button bindings ────────────────────────────────
  bindAddButtons();
  bindChipRemoveButtons();

  // ── Make #app fixed-height so .content becomes the scroll container ─
  // This allows position:sticky to work on .routine-editor-top
  document.getElementById('app').classList.add('app-fixed-height');

  // ── Search ─────────────────────────────────────────────────
  const routineSearchInput = document.getElementById('routineSearch');
  routineSearchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    let filtered = allExercises;
    if (q)
      filtered = filtered.filter(
        (ex) =>
          ex.name.toLowerCase().includes(q) ||
          ex.muscle.toLowerCase().includes(q) ||
          ex.equipment.toLowerCase().includes(q),
      );
    document.getElementById('availableList').innerHTML = renderAvailableExercises(
      filtered,
      selected,
    );
    bindAddButtons();
  });

  // Dismiss keyboard on Enter/Search key
  routineSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      routineSearchInput.blur();
    }
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
      ${exerciseIcon(ex.id, ex.muscle)}
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

  // Request notification permission when starting a workout
  requestNotificationPermission();

  const doStart = () => {
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
  };

  if (existing) {
    showConfirmModal({
      icon: 'warning',
      title: 'Workout in Progress',
      message: 'You have a workout in progress. Discard it and start a new one?',
      confirmText: 'Discard & Start',
      confirmDanger: true,
      onConfirm: doStart,
    });
  } else {
    doStart();
  }
}

// ── Start a Quick Workout (empty, add exercises on the fly) ───
function startQuickWorkout() {
  const existing = Store.getActiveWorkout();

  // Request notification permission when starting a workout
  requestNotificationPermission();

  const doStart = () => {
    const workout = {
      id: uid(),
      routineId: null,
      routineName: 'Quick Workout',
      startedAt: Date.now(),
      currentExerciseIdx: 0,
      isQuickWorkout: true,
      exercises: [],
    };

    Store.saveActiveWorkout(workout);
    Router.go('/workout/active');
  };

  if (existing) {
    showConfirmModal({
      icon: 'warning',
      title: 'Workout in Progress',
      message: 'You have a workout in progress. Discard it and start a new one?',
      confirmText: 'Discard & Start',
      confirmDanger: true,
      onConfirm: doStart,
    });
  } else {
    doStart();
  }
}

// ── Undo Set Deletion State ───────────────────────────────────
let _undoTimeout = null;
let _undoToastEl = null;

function showUndoToast(message, undoCallback, duration = 5000) {
  // Clear any existing undo toast
  hideUndoToast();

  const toast = document.createElement('div');
  toast.className = 'undo-toast';
  toast.innerHTML = `
    <span class="undo-message">${esc(message)}</span>
    <button class="btn-undo">Undo</button>
  `;

  document.body.appendChild(toast);
  _undoToastEl = toast;

  // Animate in
  requestAnimationFrame(() => toast.classList.add('visible'));

  // Undo button handler
  toast.querySelector('.btn-undo').addEventListener('click', () => {
    hideUndoToast();
    if (undoCallback) undoCallback();
  });

  // Auto-hide after duration
  _undoTimeout = setTimeout(() => {
    hideUndoToast();
  }, duration);
}

function hideUndoToast() {
  if (_undoTimeout) {
    clearTimeout(_undoTimeout);
    _undoTimeout = null;
  }
  if (_undoToastEl) {
    _undoToastEl.classList.remove('visible');
    setTimeout(() => {
      if (_undoToastEl && _undoToastEl.parentNode) {
        _undoToastEl.remove();
      }
      _undoToastEl = null;
    }, 300);
  }
}

// ── Rest Timer State ─────────────────────────────────────────
let _restTimer = null;
let _restRemaining = 0;
let _restTotal = 0;
let _restCallback = null;
let _restExerciseId = null; // Track which exercise this rest is for
let _restEndTime = null; // Timestamp when timer should end (for background support)
let _restOnTick = null; // Store tick callback for resuming

// Request notification permission on first workout
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function startRestTimer(seconds, onTick, onDone) {
  clearRestTimer();
  _restTotal = seconds;
  _restRemaining = seconds;
  _restCallback = onDone;
  _restOnTick = onTick;
  _restEndTime = Date.now() + seconds * 1000;

  // Store end time in localStorage for background recovery
  localStorage.setItem('il_rest_end_time', _restEndTime.toString());
  localStorage.setItem('il_rest_total', _restTotal.toString());

  onTick(_restRemaining, _restTotal);

  _restTimer = setInterval(() => {
    _restRemaining--;
    onTick(_restRemaining, _restTotal);
    if (_restRemaining <= 0) {
      clearRestTimer();
      showTimerNotification();
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
  _restExerciseId = null;
  _restEndTime = null;
  _restOnTick = null;
  localStorage.removeItem('il_rest_end_time');
  localStorage.removeItem('il_rest_total');
}

function isRestTimerRunning() {
  return _restTimer !== null;
}

// Show notification when timer ends
function showTimerNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    // Check if app is in background
    if (document.visibilityState === 'hidden') {
      new Notification('Rest Complete', {
        body: 'Time for your next set!',
        icon: '/icons/icon-192.png',
        tag: 'rest-timer',
        requireInteraction: false
      });
    }
  }
}

// Handle visibility change — recalculate timer when app resumes
function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    // App came back to foreground — check if timer was running
    const storedEndTime = localStorage.getItem('il_rest_end_time');
    const storedTotal = localStorage.getItem('il_rest_total');
    
    if (storedEndTime && storedTotal) {
      const endTime = parseInt(storedEndTime);
      const total = parseInt(storedTotal);
      const now = Date.now();
      const remainingMs = endTime - now;
      
      if (remainingMs > 0) {
        // Timer still has time left — resume it
        const remainingSec = Math.ceil(remainingMs / 1000);
        
        // If we have an active timer running, just update remaining
        if (_restTimer && _restOnTick) {
          _restRemaining = remainingSec;
          _restEndTime = endTime;
          _restOnTick(_restRemaining, total);
        }
      } else if (remainingMs <= 0 && remainingMs > -5000) {
        // Timer ended while in background (within last 5 seconds)
        // Clear stored values and trigger completion
        localStorage.removeItem('il_rest_end_time');
        localStorage.removeItem('il_rest_total');
        
        if (_restTimer) {
          clearRestTimer();
          showTimerNotification();
          // Vibrate to alert user
          if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
          // Re-render
          const w = Store.getActiveWorkout();
          if (w) renderActiveWorkout(w);
        }
      } else {
        // Timer ended long ago — just clean up
        localStorage.removeItem('il_rest_end_time');
        localStorage.removeItem('il_rest_total');
        if (_restTimer) {
          clearRestTimer();
          const w = Store.getActiveWorkout();
          if (w) renderActiveWorkout(w);
        }
      }
    }
  }
}

// Register visibility change listener
document.addEventListener('visibilitychange', handleVisibilityChange);

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
              ${exerciseIcon(exercise.id, exercise.muscle)}
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
            ${exerciseIcon(exercise.id, exercise.muscle)}
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
                    (s, i) => {
                      const diffColor = s.difficulty === 'easy' ? 'var(--success)' : s.difficulty === 'hard' ? 'var(--danger)' : 'var(--warning)';
                      return `<span class="last-perf-set"><span class="last-perf-diff" style="background:${diffColor}"></span>${s.weight}${s.weight ? 'kg' : ''} × ${s.reps}</span>`;
                    },
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
            <div class="set-input-row set-next-up" id="setInputRow">
              <span class="set-col-num set-number set-number-next">${exercise.sets.length + 1}</span>
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

            <!-- Planned upcoming sets from last performance -->
            ${lastPerf ? (() => {
              const doneCount = exercise.sets.length;
              // Planned rows start after the "next up" input row (which is set doneCount+1)
              // So planned rows are for set indices doneCount+1, doneCount+2, ... up to lastPerf.length-1
              const plannedRows = [];
              for (let pi = doneCount + 1; pi < lastPerf.length; pi++) {
                const ps = lastPerf[pi];
                plannedRows.push(renderPlannedSetRow(ps, pi));
              }
              return plannedRows.join('');
            })() : ''}
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
      <div class="workout-progress" ${totalExercises === 0 ? 'style="display:none"' : ''}>
        <div class="workout-progress-bar">
          <div class="workout-progress-fill" style="width: ${
            totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0
          }%"></div>
        </div>
        <span class="workout-progress-text">${completedExercises} / ${totalExercises}</span>
      </div>

      <!-- All Exercise Cards -->
      <div class="workout-exercises-list" id="workoutExercisesList">
        ${totalExercises === 0 ? `
          <div class="quick-workout-empty">
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <p class="empty-title">Quick Workout</p>
            <p class="empty-sub">Add exercises as you go</p>
          </div>
        ` : exerciseCardsHtml}
      </div>

      <!-- Add Exercise Button (for quick workouts) -->
      ${workout.isQuickWorkout ? `
        <button class="btn-add-exercise-workout" id="btnAddExerciseWorkout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Exercise
        </button>
      ` : ''}

      <!-- Finish Workout Button -->
      <div class="workout-finish-section">
        <button class="btn-finish-workout-inline" onclick="finishWorkout()">
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

  // Auto-select weight/reps input values on focus
  const inputWeight = document.getElementById('inputWeight');
  const inputReps = document.getElementById('inputReps');
  if (inputWeight) inputWeight.addEventListener('focus', () => inputWeight.select());
  if (inputReps) inputReps.addEventListener('focus', () => inputReps.select());

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
    // Disable log button while rest timer is running
    if (isRestTimerRunning()) {
      btnLogSet.disabled = true;
      btnLogSet.classList.add('btn-log-disabled');
    }

    btnLogSet.addEventListener('click', () => {
      if (btnLogSet.disabled) return;

      // Normalize comma to period for European locales
      const weightInput = document.getElementById('inputWeight').value.replace(',', '.');
      const weight = parseFloat(weightInput) || 0;
      const reps = parseInt(document.getElementById('inputReps').value) || 0;

      if (reps === 0) {
        shakeElement(document.getElementById('inputReps'));
        return;
      }

      const w = Store.getActiveWorkout();
      const currentExercise = w.exercises[w.currentExerciseIdx];
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
      // Use saved preference for this exercise, or default based on difficulty
      const restPrefs = Store.getRestPrefs();
      const savedRest = restPrefs[currentExercise.id];
      const restDuration = savedRest || getRestDuration(selectedDifficulty);
      showRestTimer(restDuration, w, currentExercise.id);
    });
  }

  // Delete set buttons (with undo)
  document.querySelectorAll('.btn-delete-set').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Don't trigger edit mode
      const setIdx = parseInt(btn.dataset.setidx);
      const w = Store.getActiveWorkout();
      const exIdx = w.currentExerciseIdx;

      // Store deleted set for undo
      const deletedSet = { ...w.exercises[exIdx].sets[setIdx] };
      const deletedFromExIdx = exIdx;
      const deletedAtIdx = setIdx;

      // Delete the set
      w.exercises[exIdx].sets.splice(setIdx, 1);
      Store.saveActiveWorkout(w);
      renderActiveWorkout(w);

      // Show undo toast
      showUndoToast('Set deleted', () => {
        const w2 = Store.getActiveWorkout();
        if (!w2) return;
        // Restore the set at original position
        w2.exercises[deletedFromExIdx].sets.splice(deletedAtIdx, 0, deletedSet);
        Store.saveActiveWorkout(w2);
        renderActiveWorkout(w2);
      });
    });
  });

  // Tap completed set row to enter edit mode
  document.querySelectorAll('.set-row.completed').forEach((row) => {
    row.addEventListener('click', () => {
      // If another row is already being edited, cancel it first
      const existingEdit = document.querySelector('.set-row.editing');
      if (existingEdit) {
        const w = Store.getActiveWorkout();
        renderActiveWorkout(w);
        return;
      }

      const setIdx = parseInt(row.dataset.setidx);
      const w = Store.getActiveWorkout();
      const set = w.exercises[w.currentExerciseIdx].sets[setIdx];
      if (!set) return;

      row.outerHTML = renderEditSetRow(set, setIdx);

      // Wire up the edit row event handlers
      const editRow = document.querySelector('.set-row.editing');
      if (!editRow) return;

      // Auto-select input values on focus
      editRow.querySelectorAll('.set-input').forEach((inp) => {
        inp.addEventListener('focus', () => inp.select());
      });

      // Focus the weight input
      const weightInput = editRow.querySelector('.edit-set-weight');
      if (weightInput) weightInput.focus();

      // Difficulty toggle within edit row
      editRow.querySelectorAll('.edit-diff-selector .diff-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          editRow.querySelectorAll('.edit-diff-selector .diff-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });

      // Save button
      const saveBtn = editRow.querySelector('.btn-save-edit-set');
      if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          // Normalize comma to period for European locales
          const weightInput = editRow.querySelector('.edit-set-weight').value.replace(',', '.');
          const newWeight = parseFloat(weightInput) || 0;
          const newReps = parseInt(editRow.querySelector('.edit-set-reps').value) || 0;
          const activeDiffBtn = editRow.querySelector('.edit-diff-selector .diff-btn.active');
          const newDiff = activeDiffBtn ? activeDiffBtn.dataset.diff : 'medium';

          const w2 = Store.getActiveWorkout();
          const s = w2.exercises[w2.currentExerciseIdx].sets[setIdx];
          if (s) {
            s.weight = newWeight;
            s.reps = newReps;
            s.difficulty = newDiff;
            Store.saveActiveWorkout(w2);
          }
          renderActiveWorkout(w2);
        });
      }
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
    // Update display immediately so it doesn't flash stale values
    const textEl = document.getElementById('restTimerText');
    const circle = document.getElementById('restTimerCircle');
    if (textEl) textEl.textContent = formatTimer(_restRemaining);
    if (circle) {
      const circumference = 2 * Math.PI * 52;
      const progress = _restRemaining / _restTotal;
      circle.setAttribute('stroke-dashoffset', circumference * (1 - progress));
    }
  }

  // Auto-scroll to active exercise card
  const activeCard = document.getElementById('activeExerciseCard');
  if (activeCard) {
    setTimeout(() => {
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  // Add Exercise button (quick workout)
  const btnAddExercise = document.getElementById('btnAddExerciseWorkout');
  if (btnAddExercise) {
    btnAddExercise.addEventListener('click', () => {
      showAddExerciseOverlay(workout);
    });
  }
}

// ── Render a logged set row ──────────────────────────────────
const DIFF_ICON = {
  easy: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  medium: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  hard: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
};

function renderSetRow(set, index, completed) {
  return `
    <div class="set-row completed" data-setidx="${index}">
      <span class="set-col-num set-number">${index + 1}</span>
      <span class="set-col-weight set-value" data-field="weight">${set.weight}</span>
      <span class="set-col-reps set-value" data-field="reps">${set.reps}</span>
      <span class="set-col-diff set-diff-icon">${DIFF_ICON[set.difficulty] || DIFF_ICON.medium}</span>
      <span class="set-col-action">
        <button class="btn-delete-set" data-setidx="${index}" aria-label="Delete set">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </span>
    </div>
  `;
}

function renderEditSetRow(set, index) {
  return `
    <div class="set-row editing" data-setidx="${index}">
      <span class="set-col-num set-number">${index + 1}</span>
      <div class="set-col-weight">
        <input type="number" class="set-input edit-set-weight" value="${set.weight}" inputmode="decimal" step="0.5" min="0" />
      </div>
      <div class="set-col-reps">
        <input type="number" class="set-input edit-set-reps" value="${set.reps}" inputmode="numeric" step="1" min="0" />
      </div>
      <div class="set-col-diff">
        <div class="difficulty-selector edit-diff-selector">
          <button class="diff-btn${set.difficulty === 'easy' ? ' active' : ''}" data-diff="easy" title="Easy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </button>
          <button class="diff-btn${set.difficulty === 'medium' || !set.difficulty ? ' active' : ''}" data-diff="medium" title="Medium">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </button>
          <button class="diff-btn${set.difficulty === 'hard' ? ' active' : ''}" data-diff="hard" title="Hard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </button>
        </div>
      </div>
      <div class="set-col-action">
        <button class="btn-save-edit-set" data-setidx="${index}" aria-label="Save edit">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>
    </div>
  `;
}

// ── Render a planned (upcoming ghost) set row from last performance ──
function renderPlannedSetRow(lastSet, index) {
  return `
    <div class="set-row planned">
      <span class="set-col-num set-number">${index + 1}</span>
      <span class="set-col-weight set-value">${lastSet.weight}</span>
      <span class="set-col-reps set-value">${lastSet.reps}</span>
      <span class="set-col-diff set-diff-icon">${DIFF_ICON[lastSet.difficulty] || DIFF_ICON.medium}</span>
      <span class="set-col-action"></span>
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
function showRestTimer(seconds, workout, exerciseId) {
  const container = document.getElementById('restTimerContainer');

  if (!container) return;

  // Track which exercise this rest is for
  _restExerciseId = exerciseId;

  container.style.display = 'flex';
  const circumference = 2 * Math.PI * 52; // r=52

  startRestTimer(
    seconds,
    (remaining, total) => {
      // Re-query DOM elements each tick so we survive re-renders
      const textEl = document.getElementById('restTimerText');
      const circle = document.getElementById('restTimerCircle');
      if (!textEl || !circle) return; // DOM not ready yet, skip this tick
      textEl.textContent = formatTimer(remaining);
      const progress = remaining / total;
      circle.setAttribute('stroke-dashoffset', circumference * (1 - progress));
    },
    () => {
      const c = document.getElementById('restTimerContainer');
      if (c) c.style.display = 'none';
      // Vibrate on timer end if supported
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      // Clear exercise tracking
      _restExerciseId = null;
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

  // Update end time in localStorage for background support
  _restEndTime = Date.now() + _restRemaining * 1000;
  localStorage.setItem('il_rest_end_time', _restEndTime.toString());
  localStorage.setItem('il_rest_total', _restTotal.toString());

  // Save this preference for the exercise
  if (_restExerciseId && _restTotal > 0) {
    const prefs = Store.getRestPrefs();
    prefs[_restExerciseId] = _restTotal;
    Store.saveRestPrefs(prefs);
  }
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
              ${exerciseIcon(ex.id, ex.muscle)}
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

// ── Add Exercise Overlay (for Quick Workouts) ─────────────────
function showAddExerciseOverlay(workout) {
  const allExercises = Store.getExercises();
  const existingIds = workout.exercises.map((ex) => ex.id);

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'swap-overlay add-exercise-overlay';

  let searchQuery = '';

  const renderExerciseList = (query) => {
    let filtered = allExercises.filter((ex) => !existingIds.includes(ex.id));
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (ex) =>
          ex.name.toLowerCase().includes(q) ||
          ex.muscle.toLowerCase().includes(q) ||
          ex.equipment.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      return '<p class="swap-empty">No exercises found</p>';
    }

    return `
      <ul class="swap-list add-exercise-list">
        ${filtered
          .map(
            (ex) => `
          <li class="swap-item add-exercise-item" data-add-id="${ex.id}">
            ${exerciseIcon(ex.id, ex.muscle)}
            <div class="ex-info">
              <span class="ex-name">${esc(ex.name)}</span>
              <span class="ex-meta">${esc(ex.muscle)} · ${esc(ex.equipment)}</span>
            </div>
            <span class="swap-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
          </li>
        `
          )
          .join('')}
      </ul>
    `;
  };

  overlay.innerHTML = `
    <div class="swap-panel add-exercise-panel">
      <div class="swap-header">
        <h2>Add Exercise</h2>
        <button class="btn-icon swap-close-btn" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="search-bar add-exercise-search">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="addExerciseSearch" placeholder="Search exercises…" autocomplete="off" enterkeyhint="search" />
      </div>
      <div id="addExerciseListContainer">
        ${renderExerciseList('')}
      </div>
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

  // Search functionality
  const searchInput = overlay.querySelector('#addExerciseSearch');
  const listContainer = overlay.querySelector('#addExerciseListContainer');

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    listContainer.innerHTML = renderExerciseList(searchQuery);
    bindAddHandlers();
  });

  // Add exercise handlers
  const bindAddHandlers = () => {
    overlay.querySelectorAll('.add-exercise-item').forEach((item) => {
      item.addEventListener('click', () => {
        const exId = item.dataset.addId;
        const ex = allExercises.find((e) => e.id === exId);
        if (!ex) return;

        const w = Store.getActiveWorkout();
        if (!w) return;

        // Add exercise to workout
        w.exercises.push({
          ...ex,
          sets: [],
          notes: '',
        });
        // Set as current exercise
        w.currentExerciseIdx = w.exercises.length - 1;
        existingIds.push(ex.id);
        Store.saveActiveWorkout(w);
        close();
        renderActiveWorkout(w);
      });
    });
  };

  bindAddHandlers();
  searchInput.focus();
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
  showConfirmModal({
    icon: 'warning',
    title: 'Cancel Workout',
    message: 'All logged sets will be lost. Are you sure?',
    confirmText: 'Cancel Workout',
    confirmDanger: true,
    onConfirm: () => {
      clearRestTimer();
      Store.clearActiveWorkout();
      Router.go('/');
    },
  });
}

// ── Finish workout → save to history ─────────────────────────
function finishWorkout() {
  const w = Store.getActiveWorkout();
  if (!w) return;

  // Check if any sets were logged
  const totalSets = w.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  if (totalSets === 0) {
    showConfirmModal({
      icon: 'warning',
      title: 'No Sets Logged',
      message: 'You haven\'t logged any sets. Discard this workout?',
      confirmText: 'Discard',
      confirmDanger: true,
      onConfirm: () => {
        clearRestTimer();
        Store.clearActiveWorkout();
        Router.go('/');
      },
    });
    return;
  }

  // Check for skipped exercises
  const skippedExercises = w.exercises.filter((ex) => ex.sets.length === 0);
  if (skippedExercises.length > 0) {
    const skippedNames = skippedExercises.map((ex) => ex.name);
    showConfirmModal({
      icon: 'incomplete',
      title: 'Incomplete Workout',
      message: `${skippedExercises.length} exercise${skippedExercises.length > 1 ? 's' : ''} skipped:`,
      list: skippedNames,
      confirmText: 'Finish Anyway',
      confirmDanger: false,
      onConfirm: () => doFinishWorkout(w),
    });
    return;
  }

  doFinishWorkout(w);
}

function doFinishWorkout(w) {
  clearRestTimer();

  const isQuickWorkout = w.isQuickWorkout === true;

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
  const today = toDateStr(new Date());
  const todayEntry = resolveScheduleEntry(today, new Date(), schedule);
  const todayScheduled = todayEntry != null;

  if (!todayScheduled && Object.keys(schedule.days || {}).length > 0) {
    // Find the next future scheduled day and remove it
    const futureDates = Object.keys(schedule.days)
      .filter((d) => d > today && schedule.days[d] !== false)
      .sort();
    if (futureDates.length > 0) {
      delete schedule.days[futureDates[0]];
      Store.saveSchedule(schedule);
    }
  }

  // For quick workouts, offer to save as routine
  if (isQuickWorkout && w.exercises.length > 0) {
    showSaveAsRoutinePrompt(completedWorkout);
  } else {
    Router.go('/workout/summary', { workoutId: completedWorkout.id });
  }
}

// ── Save Quick Workout as Routine prompt ──────────────────────
function showSaveAsRoutinePrompt(completedWorkout) {
  const overlay = document.createElement('div');
  overlay.className = 'confirm-modal-overlay';
  overlay.innerHTML = `
    <div class="confirm-modal save-routine-modal">
      <div class="confirm-modal-icon save">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
      </div>
      <h3 class="confirm-modal-title">Save as Workout?</h3>
      <p class="confirm-modal-message">Would you like to save this as a reusable workout template?</p>
      <input type="text" id="saveRoutineNameInput" class="save-routine-input" placeholder="Workout name" value="${esc(completedWorkout.routineName === 'Quick Workout' ? '' : completedWorkout.routineName)}" autocomplete="off" />
      <div class="confirm-modal-actions">
        <button class="confirm-modal-btn cancel">Skip</button>
        <button class="confirm-modal-btn confirm" id="btnSaveAsRoutine">Save</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visible'));

  const nameInput = overlay.querySelector('#saveRoutineNameInput');
  const modal = overlay.querySelector('.save-routine-modal');

  // Fix keyboard overlap on iOS: shift modal up when keyboard appears
  const adjustForKeyboard = () => {
    if (window.visualViewport) {
      const vvH = window.visualViewport.height;
      const offsetTop = window.visualViewport.offsetTop;
      overlay.style.height = vvH + 'px';
      overlay.style.top = offsetTop + 'px';
    }
  };
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', adjustForKeyboard);
    window.visualViewport.addEventListener('scroll', adjustForKeyboard);
  }

  // Delay focus slightly so the modal animates in before keyboard pushes it
  setTimeout(() => {
    nameInput.focus();
    nameInput.select();
  }, 300);

  const close = () => {
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', adjustForKeyboard);
      window.visualViewport.removeEventListener('scroll', adjustForKeyboard);
    }
    overlay.style.height = '';
    overlay.style.top = '';
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 200);
  };

  const goToSummary = () => {
    close();
    Router.go('/workout/summary', { workoutId: completedWorkout.id });
  };

  overlay.querySelector('.confirm-modal-btn.cancel').addEventListener('click', goToSummary);

  overlay.querySelector('#btnSaveAsRoutine').addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) {
      shakeElement(nameInput);
      return;
    }

    // Create routine from workout exercises
    const routines = Store.getRoutines();
    routines.push({
      id: uid(),
      name,
      exercises: completedWorkout.exercises.map((ex) => ({
        id: ex.id,
        name: ex.name,
        muscle: ex.muscle,
        equipment: ex.equipment,
      })),
    });
    Store.saveRoutines(routines);
    goToSummary();
  });

  // Enter key to save
  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      overlay.querySelector('#btnSaveAsRoutine').click();
    }
  });
}

// ── Help/Tutorial Modal ───────────────────────────────────────
function showHelpModal() {
  const overlay = document.createElement('div');
  overlay.className = 'help-modal-overlay';
  overlay.innerHTML = `
    <div class="help-modal">
      <div class="help-modal-header">
        <h2>How ArkLog Works</h2>
        <button class="btn-close-help" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="help-modal-content">
        <div class="help-section">
          <h3>Getting Started</h3>
          <p>Create workouts with your favorite exercises, then start tracking your progress. The app remembers your performance and helps you improve over time.</p>
        </div>

        <div class="help-section">
          <h3>Week View</h3>
          <p>The week strip shows your training schedule. Tap any day to:</p>
          <ul>
            <li>Mark it as a planned gym day</li>
            <li>Assign a specific workout</li>
            <li>Make workouts recurring (e.g., every Monday)</li>
            <li>View completed workout details</li>
          </ul>
        </div>

        <div class="help-section">
          <h3>Smart Suggestions</h3>
          <p>When you perform the same workout again, ArkLog pre-fills weights and reps based on your last session, with smart progression:</p>
          <ul>
            <li><strong>Easy + top of rep range:</strong> Suggests weight increase</li>
            <li><strong>Hard:</strong> Maintains current weight</li>
            <li><strong>Medium:</strong> Suggests +1 rep toward your goal</li>
          </ul>
        </div>

        <div class="help-section">
          <h3>During Workouts</h3>
          <ul>
            <li><strong>Log sets:</strong> Enter weight, reps, and difficulty (easy/medium/hard)</li>
            <li><strong>Rest timer:</strong> Automatically starts after each set, adjustable with +/- buttons</li>
            <li><strong>Swap exercise:</strong> Tap the swap icon to replace an exercise with a similar alternative</li>
            <li><strong>Edit sets:</strong> Tap any logged set to modify it</li>
            <li><strong>Notes:</strong> Add notes to any exercise</li>
          </ul>
        </div>

        <div class="help-section">
          <h3>Tracking Progress</h3>
          <ul>
            <li><strong>Personal bests:</strong> Shown above each exercise input</li>
            <li><strong>History:</strong> View all past workouts in the History tab</li>
            <li><strong>Progress charts:</strong> Tap any exercise in History to see trends over time</li>
          </ul>
        </div>

        <div class="help-section">
          <h3>Tips</h3>
          <ul>
            <li>Use <strong>Quick Workout</strong> for unplanned sessions</li>
            <li>Difficulty affects rest time: Easy=60s, Medium=90s, Hard=120s</li>
            <li>The rest timer remembers your preferred duration per exercise</li>
            <li>Export your data regularly from Settings for backup</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visible'));

  const close = () => {
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 200);
  };

  overlay.querySelector('.btn-close-help').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
}

// ── Custom confirmation modal ─────────────────────────────────
function showConfirmModal({ icon, title, message, list, confirmText, confirmDanger, onConfirm }) {
  const iconSvg = icon === 'warning'
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  const listHtml = list && list.length > 0
    ? `<div class="confirm-modal-list">${list.map((name) => `<span class="confirm-modal-item">${esc(name)}</span>`).join('')}</div>`
    : '';

  const overlay = document.createElement('div');
  overlay.className = 'confirm-modal-overlay';
  overlay.innerHTML = `
    <div class="confirm-modal">
      <div class="confirm-modal-icon ${icon}">${iconSvg}</div>
      <h3 class="confirm-modal-title">${esc(title)}</h3>
      <p class="confirm-modal-message">${esc(message)}</p>
      ${listHtml}
      <div class="confirm-modal-actions">
        <button class="confirm-modal-btn cancel">Cancel</button>
        <button class="confirm-modal-btn ${confirmDanger ? 'danger' : 'confirm'}">${esc(confirmText)}</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  // Trigger animation
  requestAnimationFrame(() => overlay.classList.add('visible'));

  const close = () => {
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 200);
  };

  overlay.querySelector('.confirm-modal-btn.cancel').addEventListener('click', close);
  overlay.querySelector('.confirm-modal-btn:not(.cancel)').addEventListener('click', () => {
    close();
    onConfirm();
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
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

  // Gather sparkline data for each exercise
  const exerciseChartData = {};
  workout.exercises.forEach((ex) => {
    if (ex.sets.length === 0) return;
    const history = getExerciseHistory(ex.id);
    if (history.length >= 2) {
      exerciseChartData[ex.id] = history;
    }
  });

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
          .map((ex) => {
            const history = exerciseChartData[ex.id];
            const trendHtml = (() => {
              if (!history || history.length < 2) return '';
              const prev = history[history.length - 2];
              const curr = history[history.length - 1];
              const diff = curr.weight - prev.weight;
              if (diff === 0) return '';
              const cls = diff > 0 ? 'positive' : 'negative';
              const arrow = diff > 0
                ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
              return `<span class="summary-trend ${cls}">${arrow}${Math.abs(diff)}kg</span>`;
            })();

            return `
          <div class="summary-exercise">
            <div class="summary-ex-header">
              <h3 class="summary-ex-name">${esc(ex.name)}</h3>
              ${trendHtml}
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
            ${history ? `<div class="summary-sparkline" id="spark_${ex.id}"></div>` : ''}
            ${
              ex.notes
                ? `<div class="summary-notes"><span class="summary-notes-label">Notes</span><p>${esc(
                    ex.notes,
                  )}</p></div>`
                : ''
            }
          </div>
        `;
          })
          .join('')}
      </div>

      <button class="btn-primary btn-full btn-save" onclick="Router.go('/')">Done</button>
    </main>
  `);

  // Render sparklines after DOM is ready
  workout.exercises.forEach((ex) => {
    const history = exerciseChartData[ex.id];
    if (history) {
      const weights = history.map((d) => d.weight);
      const lastWeight = weights[weights.length - 1];
      const prevWeight = weights.length >= 2 ? weights[weights.length - 2] : lastWeight;
      const color = lastWeight >= prevWeight ? 'var(--success)' : 'var(--danger)';
      renderSparkline(`spark_${ex.id}`, weights, color);
    }
  });
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
// Track how many workouts to show in history (pagination)
let _historyLimit = 20;

function viewHistory() {
  const allWorkouts = Store.getWorkouts().slice().reverse(); // newest first
  const exercises = Store.getExercises();
  const hasMore = allWorkouts.length > _historyLimit;
  const workouts = allWorkouts.slice(0, _historyLimit);

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
  allWorkouts.forEach((w) => {
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
    <main class="content has-tabs" id="historyMain">
      ${
        allWorkouts.length === 0
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
                  ${exerciseIcon(ex.id, ex.muscle, 'progress-chip-icon')}
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
          ${hasMore ? `
            <button class="btn-show-more" id="showMoreBtn">
              <span>Show More</span>
              <span class="show-more-count">${allWorkouts.length - _historyLimit} more workouts</span>
            </button>
          ` : ''}
        </section>
      `
      }
    </main>
    ${tabBar('/history')}
  `);

  // Bind show more button
  const showMoreBtn = document.getElementById('showMoreBtn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      _historyLimit += 20;
      viewHistory();
    });
  }

  // Bind scroll to top button
  bindScrollToTop('historyMain');
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

  const backPath = params.from === 'home' ? '/' : '/history';
  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const totalVolume = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0),
    0,
  );
  const exercisesPerformed = workout.exercises.filter((ex) => ex.sets.length > 0).length;

  render(`
    <header class="header">
      <button class="btn-back" id="workoutDetailBack">
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

      <div class="workout-note-section">
        <div class="workout-note-header" id="workoutNoteToggle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>Note</span>
          <span class="workout-note-indicator${workout.note ? ' has-notes' : ''}" id="workoutNoteIndicator"></span>
        </div>
        <textarea class="workout-note-textarea" id="workoutNoteTextarea" placeholder="Add a note about this workout…" rows="3">${esc(workout.note || '')}</textarea>
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

  // Back button — go to home if opened from week strip, otherwise history
  document.getElementById('workoutDetailBack').addEventListener('click', () => {
    Router.go(backPath);
  });

  // Delete workout
  document.getElementById('deleteWorkoutBtn').addEventListener('click', () => {
    showConfirmModal({
      icon: 'warning',
      title: 'Delete Workout',
      message: 'Delete this workout from history? This cannot be undone.',
      confirmText: 'Delete',
      confirmDanger: true,
      onConfirm: () => {
        const workouts = Store.getWorkouts().filter((w) => w.id !== params.workoutId);
        Store.saveWorkouts(workouts);
        Router.go('/history');
      },
    });
  });

  // Workout-level note auto-save
  const workoutNoteTextarea = document.getElementById('workoutNoteTextarea');
  const workoutNoteToggle = document.getElementById('workoutNoteToggle');
  const workoutNoteIndicator = document.getElementById('workoutNoteIndicator');

  if (workoutNoteToggle && workoutNoteTextarea) {
    // Auto-expand if note exists
    if (workout.note) {
      workoutNoteTextarea.style.display = 'block';
      workoutNoteToggle.classList.add('open');
    }

    workoutNoteToggle.addEventListener('click', () => {
      const showing = workoutNoteTextarea.style.display === 'block';
      workoutNoteTextarea.style.display = showing ? 'none' : 'block';
      workoutNoteToggle.classList.toggle('open', !showing);
      if (!showing) workoutNoteTextarea.focus();
    });

    workoutNoteTextarea.addEventListener('input', () => {
      const workouts = Store.getWorkouts();
      const w = workouts.find((w) => w.id === params.workoutId);
      if (!w) return;
      w.note = workoutNoteTextarea.value;
      Store.saveWorkouts(workouts);
      workoutNoteIndicator.classList.toggle('has-notes', !!workoutNoteTextarea.value.trim());
    });
  }
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
        ${exerciseIcon(exerciseId, exercise ? exercise.muscle : 'default', 'progress-ex-icon')}
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

// ── Sparkline SVG renderer (compact, no labels) ─────────────
function renderSparkline(containerId, values, color) {
  const container = document.getElementById(containerId);
  if (!container || values.length < 2) return;

  const width = container.clientWidth || 200;
  const height = 48;
  const pad = 4;
  const chartW = width - pad * 2;
  const chartH = height - pad * 2;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const adjMin = min - range * 0.1;
  const adjMax = max + range * 0.1;
  const adjRange = adjMax - adjMin;

  const strokeColor = color || 'var(--primary)';

  function x(i) { return pad + (i / (values.length - 1)) * chartW; }
  function y(v) { return pad + chartH - ((v - adjMin) / adjRange) * chartH; }

  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const areaPoints = `${x(0).toFixed(1)},${(pad + chartH).toFixed(1)} ${points} ${x(values.length - 1).toFixed(1)},${(pad + chartH).toFixed(1)}`;
  const lastDot = `<circle cx="${x(values.length - 1).toFixed(1)}" cy="${y(values[values.length - 1]).toFixed(1)}" r="3" fill="${strokeColor}"/>`;

  container.innerHTML = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="sg_${containerId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      <polygon points="${areaPoints}" fill="url(#sg_${containerId})"/>
      <polyline points="${points}" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      ${lastDot}
    </svg>
  `;
}

// ── Get exercise history data points for sparklines ─────────
function getExerciseHistory(exerciseId) {
  const workouts = Store.getWorkouts();
  const dataPoints = [];
  workouts.forEach((w) => {
    const ex = w.exercises.find((e) => e.id === exerciseId);
    if (!ex || ex.sets.length === 0) return;
    const bestSet = ex.sets.reduce((best, s) => {
      if (!best) return s;
      if (s.weight > best.weight) return s;
      if (s.weight === best.weight && s.reps > best.reps) return s;
      return best;
    }, null);
    dataPoints.push({
      date: w.startedAt,
      weight: bestSet.weight,
      reps: bestSet.reps,
      e1rm: bestSet.weight * (1 + bestSet.reps / 30),
    });
  });
  return dataPoints;
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
          ${exerciseIcon(exercise.id, exercise.muscle, 'progress-ex-icon')}
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
    const doDelete = () => {
      if (usedInRoutines.length > 0) {
        // Remove from routines
        const allRoutines = Store.getRoutines();
        allRoutines.forEach((r) => {
          r.exercises = r.exercises.filter((ex) => ex.id !== exercise.id);
        });
        Store.saveRoutines(allRoutines);
      }
      const updatedExercises = Store.getExercises().filter((e) => e.id !== exercise.id);
      Store.saveExercises(updatedExercises);
      Router.go('/exercises');
    };

    if (usedInRoutines.length > 0) {
      const names = usedInRoutines.map((r) => r.name);
      showConfirmModal({
        icon: 'warning',
        title: 'Exercise In Use',
        message: 'This exercise is used in the following workouts:',
        list: names,
        confirmText: 'Delete Anyway',
        confirmDanger: true,
        onConfirm: doDelete,
      });
    } else {
      showConfirmModal({
        icon: 'warning',
        title: 'Delete Exercise',
        message: 'Are you sure you want to delete this exercise?',
        confirmText: 'Delete',
        confirmDanger: true,
        onConfirm: doDelete,
      });
    }
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
               <span class="heatmap-muscle-label"><span class="heatmap-muscle-svg" style="color:${muscleColor(muscle)}">${muscleSvg(muscle)}</span> ${esc(muscle)}</span>
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
                <span class="heatmap-summary-icon" style="color:${muscleColor(muscle)}">${muscleSvg(muscle)}</span>
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
        const counts = `${data.exercises.length} exercises, ${data.routines.length} workouts, ${data.workouts.length} logs`;

        showConfirmModal({
          icon: 'warning',
          title: 'Import Backup',
          message: `This will REPLACE all your current data with: ${counts}. Make sure you've exported a backup first.`,
          confirmText: 'Import',
          confirmDanger: true,
          onConfirm: () => {
            Store.saveExercises(data.exercises);
            Store.saveRoutines(data.routines);
            Store.saveWorkouts(data.workouts);
            if (data.schedule) Store.saveSchedule(data.schedule);

            showToast('Data imported successfully');

            // Refresh the view
            setTimeout(() => Router.go('/settings'), 300);
          },
        });
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

  showConfirmModal({
    icon: 'warning',
    title: 'Delete All Data',
    message: `This will permanently delete ${routineCount} workout templates and ${workoutCount} workout logs. This cannot be undone!`,
    confirmText: 'Delete Everything',
    confirmDanger: true,
    onConfirm: () => {
      // Second confirmation
      showConfirmModal({
        icon: 'warning',
        title: 'Are You Sure?',
        message: 'All workout history will be permanently deleted. This is your last chance to cancel.',
        confirmText: 'Yes, Delete All',
        confirmDanger: true,
        onConfirm: () => {
          localStorage.removeItem('il_exercises');
          localStorage.removeItem('il_routines');
          localStorage.removeItem('il_workouts');
          localStorage.removeItem('il_active_workout');
          localStorage.removeItem('il_schedule');

          // Re-seed default exercises
          Store.saveExercises(DEFAULT_EXERCISES);

          showToast('All data cleared');
          setTimeout(() => Router.go('/'), 300);
        },
      });
    },
  });
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
            <span class="settings-stat-label">Logs</span>
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

// ══════════════════════════════════════════════════════════════
// Exercise Info Modal (slide-up detail panel)
// ══════════════════════════════════════════════════════════════
function showExerciseInfoModal(exerciseId) {
  const exercises = Store.getExercises();
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (!exercise) return;

  const cues = EXERCISE_CUES[exerciseId];
  const gifUrl = EXERCISE_GIF[exerciseId];
  const color = muscleColor(exercise.muscle);

  // Remove any existing modal
  const existing = document.querySelector('.exercise-info-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'exercise-info-overlay';
  overlay.innerHTML = `
    <div class="exercise-info-backdrop"></div>
    <div class="exercise-info-panel">
      <div class="exercise-info-handle"></div>
      <div class="exercise-info-header">
        <span class="exercise-info-icon" style="color:${color};background:${color}15">${muscleSvg(exercise.muscle)}</span>
        <div class="exercise-info-title">
          <h2>${esc(exercise.name)}</h2>
          <span class="exercise-info-meta">${esc(exercise.muscle)} · ${esc(exercise.equipment)}</span>
        </div>
        <button class="exercise-info-close" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      ${cues ? `
        <div class="exercise-info-section">
          <div class="exercise-info-targets">
            <span class="exercise-info-label">Targets</span>
            <span class="exercise-info-targets-text">${esc(cues.targets)}</span>
          </div>
        </div>

        <div class="exercise-info-section">
          <span class="exercise-info-label">Form Cues</span>
          <ul class="exercise-info-cues">
            ${cues.cues.map((c) => `<li>${esc(c)}</li>`).join('')}
          </ul>
        </div>
      ` : `
        <div class="exercise-info-section">
          <p class="exercise-info-empty">No form cues available for this exercise yet.</p>
        </div>
      `}

      ${gifUrl ? `
        <div class="exercise-info-section exercise-info-media">
          <span class="exercise-info-label">Reference</span>
          <div class="exercise-info-img-wrap">
            <div class="exercise-info-loader">
              <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-dasharray="31.4" stroke-dashoffset="10" stroke-linecap="round"/></svg>
              Loading image…
            </div>
            <img src="${gifUrl}" alt="${esc(exercise.name)}" class="exercise-info-img"
                 loading="eager" />
          </div>
        </div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(overlay);

  // Image load/error handlers (programmatic to avoid inline escaping issues)
  const infoImg = overlay.querySelector('.exercise-info-img');
  if (infoImg) {
    infoImg.addEventListener('load', () => {
      infoImg.previousElementSibling.style.display = 'none';
      infoImg.style.display = 'block';
    });
    infoImg.addEventListener('error', () => {
      infoImg.previousElementSibling.innerHTML = '<span class="exercise-info-no-img">Image unavailable offline</span>';
      infoImg.style.display = 'none';
    });
  }

  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('open');
  });

  // Close handlers
  const close = () => {
    overlay.classList.remove('open');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    // Fallback removal if no transition fires
    setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 400);
  };

  overlay.querySelector('.exercise-info-backdrop').addEventListener('click', close);
  overlay.querySelector('.exercise-info-close').addEventListener('click', close);

  // Swipe-down to dismiss on panel
  let startY = 0;
  const panel = overlay.querySelector('.exercise-info-panel');
  panel.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  }, { passive: true });
  panel.addEventListener('touchend', (e) => {
    const diffY = e.changedTouches[0].clientY - startY;
    if (diffY > 80) close();
  }, { passive: true });
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

// ── Global: Exercise Info Modal delegation ───────────────────
document.addEventListener('click', (e) => {
  const icon = e.target.closest('[data-exercise-info]');
  if (!icon) return;
  e.stopPropagation();
  e.preventDefault();
  showExerciseInfoModal(icon.dataset.exerciseInfo);
});

// ── iOS viewport stabilization ──────────────────────────────
// On iOS Safari/PWA, the visual viewport can shift on initial load
// causing fixed-position elements (tab bar) to appear offset.
// Force a scroll reset and resize event to stabilize.
if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
  window.scrollTo(0, 0);
  setTimeout(() => { window.scrollTo(0, 0); }, 50);
  setTimeout(() => { window.scrollTo(0, 0); }, 150);
  window.addEventListener('resize', () => { window.scrollTo(0, 1); window.scrollTo(0, 0); }, { once: true });
}
