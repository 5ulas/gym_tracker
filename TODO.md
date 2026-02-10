1. [x] Implement "Next Session" Recommendations: The app looks at last session's performance and auto-populates target weight/reps with smart progression rules (increase weight if top of rep range + easy/medium, maintain if hard, +1 rep if working toward max).

2. [x] Volume/Frequency Heatmap: Visual muscle group heatmap showing training frequency over the last 4 weeks, accessible from the History tab.

3. [x] "Previous Best" Reference: Personal record (PR) bar displayed above input fields showing all-time best weight x reps and best session volume.

4. [x] Custom Workout Builder: Exercise database expanded from 15 to 73 exercises across all muscle groups (Chest, Back, Shoulders, Arms, Legs, Core). Existing search and filter functionality works with the expanded list. Existing users automatically get new exercises merged in.

5. [x] Exercise Swapper: During an active workout, users can tap the swap button on any exercise to see biomechanically similar alternatives (e.g., Bench Press -> Dumbbell Press, Incline Press). Swapping preserves any already-logged sets.

6. [x] Export/Import Data: Settings tab with full data backup and restore. Export downloads a JSON file with all exercises, routines, and workouts. Import validates the file structure and replaces current data with confirmation. Also includes storage stats overview and a danger-zone clear-all-data option.

7. ![alt text](image.png) I would like t

Visual Requirements (See reference image in the 7th):

Layout: A horizontal row representing the current week (Sun-Sat).

Day Indicators: Each day is represented by a circular ring containing the day name (e.g., "Mo", "Tu").

Completed Days: Green ring/fill.

Current Day: Highlighted (e.g., Blue fill).

Future/Rest Days: Grey ring.

Status Icons: Below the day circles, display icons:

Scheduled Workout: A standard "Dumbbell" icon.

Completed Workout: A "Dumbbell" icon with a green checkmark badge.

Rest Day: No icon (empty).

Core Logic & State Management:

Default Schedule: The user can define a "Base Schedule" (e.g., Mon, Wed, Fri). The app should pre-populate these days with the "Scheduled Workout" icon.

Completion Logic: When a workout is logged, the day turns Green and gets the checked dumbbell icon.

The "Flexibility" Feature (Crucial):

Rescheduling: Users must be able to tap/drag a scheduled workout from one day to another (e.g., moving Wednesday's lift to Thursday).

Stacking/Early Completion: If a user performs a workout on a non-scheduled day (e.g., doing Friday's workout on Thursday), the system should mark the current day as "Completed" and remove the "Scheduled" icon from the original future day.

Missed Workouts: If a scheduled day passes without completion, it stays Grey (or turns red/alert) and the workout remains "pending" or can be pushed to the next day.

User Interaction Flows:

Long Press: On a scheduled day to enter "Edit Mode" where the workout can be dragged to a different day.

Tap: On a future scheduled day to see details or mark it as "Doing Today."

Technical constraints:

Use [Insert your Tech Stack, e.g., React Native / Flutter / Swift].

Ensure the state updates immediately (optimistic UI) when days are moved.
