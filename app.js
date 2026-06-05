import { renderSidebar } from './components/sidebar.js';
import { renderCourseBlocks } from './components/courseBlocks.js';
import { renderGitHubWidget } from './components/githubWidget.js';
import { renderCalendarPreview } from './components/calendarPreview.js';

async function init() {
  const [courses, github, calendar] = await Promise.all([
    fetch('./src/data/courses.json').then(r => r.json()),
    fetch('./src/data/github.json').then(r => r.json()),
    fetch('./src/data/calendar.json').then(r => r.json()),
  ]);

  const app = document.getElementById('app');

  renderSidebar(app);

  const main = document.createElement('main');
  main.className = 'ml-64 flex-1 min-h-screen';

  const inner = document.createElement('div');
  inner.className = 'max-w-7xl mx-auto px-8 py-6';

  inner.innerHTML = `
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <p class="text-sm text-gray-500 mt-1">${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="btn-ghost relative">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
        </button>
        <button class="btn-primary flex items-center gap-2">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14m-7-7h14"/>
          </svg>
          New Event
        </button>
      </div>
    </div>
  `;

  const statsRow = document.createElement('div');
  statsRow.className = 'grid grid-cols-4 gap-4 mb-8';
  const stats = [
    { label: 'Enrolled Courses', value: courses.length, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'text-indigo-400 bg-indigo-500/10' },
    { label: 'Materials', value: courses.reduce((s, c) => s + c.materials.length, 0), icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z', color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Commit Streak', value: `${github.currentStreak} days`, icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'text-amber-400 bg-amber-500/10' },
    { label: 'Events This Week', value: calendar.length, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-rose-400 bg-rose-500/10' },
  ];
  stats.forEach(s => {
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `
      <div class="w-10 h-10 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="${s.icon}"/>
        </svg>
      </div>
      <div>
        <p class="text-2xl font-bold tabular-nums">${s.value}</p>
        <p class="text-xs text-gray-500">${s.label}</p>
      </div>
    `;
    statsRow.appendChild(card);
  });
  inner.appendChild(statsRow);

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8';

  const leftCol = document.createElement('div');
  leftCol.className = 'xl:col-span-3';

  const rightCol = document.createElement('div');
  rightCol.className = 'xl:col-span-2';

  const commitsSection = document.createElement('div');
  commitsSection.className = 'glass-panel p-5';
  commitsSection.innerHTML = `
    <h3 class="text-sm font-medium text-gray-400 mb-4">Latest Activity</h3>
    <div class="space-y-3">
      ${github.recentCommits.slice(0, 3).map(c => `
        <div class="flex items-start gap-3">
          <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-mono text-gray-200 truncate">${c.message}</p>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-xs text-gray-500">${c.repo}</span>
              <span class="text-xs text-gray-600">·</span>
              <span class="text-xs text-gray-500">${((Date.now() - new Date(c.timestamp).getTime()) / 3600000).toFixed(0)}h ago</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  rightCol.appendChild(commitsSection);

  grid.appendChild(leftCol);
  grid.appendChild(rightCol);
  inner.appendChild(grid);

  const courseArea = document.createElement('div');
  courseArea.id = 'course-blocks';

  const gitArea = document.createElement('div');
  gitArea.id = 'github-widget';

  const calArea = document.createElement('div');
  calArea.id = 'calendar-preview';

  inner.appendChild(courseArea);
  inner.appendChild(gitArea);
  inner.appendChild(calArea);

  main.appendChild(inner);
  app.appendChild(main);

  renderCourseBlocks(document.getElementById('course-blocks'), courses);
  renderGitHubWidget(document.getElementById('github-widget'), github);
  renderCalendarPreview(document.getElementById('calendar-preview'), calendar);
}

document.addEventListener('DOMContentLoaded', init);
