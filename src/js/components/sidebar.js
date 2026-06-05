import { createElement } from '../utils/renderer.js';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid', active: true },
  { id: 'courses', label: 'My Courses', icon: 'book', active: false },
  { id: 'ai-tutor', label: 'AI Tutor', icon: 'sparkles', active: false },
  { id: 'github', label: 'GitHub Insights', icon: 'code', active: false },
  { id: 'timetable', label: 'Timetable', icon: 'calendar', active: false },
  { id: 'settings', label: 'Settings', icon: 'settings', active: false },
];

const iconPaths = {
  grid: 'M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z',
  book: 'M4 6h16M4 12h16m-7 6h7M4 18h7M4 6l4-2 8 2 4-2v14l-4 2-8-2-4 2V6z',
  sparkles: 'M5 3l1.5 3L9.5 4 8 7l3 1.5L8 10l1.5 3L5 12l-2.5 3L4 10 1 8.5 4 7 2.5 4 5 3zm10 0l1 2 2-1-1 2 2 1-2 1 1 2-2-1-2 1 1-2-2-1 2-1-1-2 2 1zm-5 8l1 2 2-1-1 2 2 1-2 1 1 2-2-1-2 1 1-2-2-1 2-1-1-2 2 1z',
  code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  calendar: 'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm0 6h14M7 14h.01M12 14h.01M17 14h.01M7 18h.01M12 18h.01M17 18h.01',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
};

export function renderSidebar(container) {
  const sidebar = createElement('aside', { className: 'fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800/50 flex flex-col z-50' });

  const logo = createElement('div', { className: 'flex items-center gap-3 px-6 h-16 border-b border-gray-800/50' },
    createElement('div', { className: 'w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm' }, 'S'),
    createElement('span', { className: 'text-lg font-semibold tracking-tight' }, 'SomaSync'),
    createElement('span', { className: 'text-[10px] font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full ml-auto' }, 'BETA')
  );

  const nav = createElement('nav', { className: 'flex-1 px-3 py-4 space-y-1 overflow-y-auto' });
  navItems.forEach(item => {
    nav.appendChild(createElement('a', {
      href: '#',
      className: item.active ? 'nav-link-active' : 'nav-link-inactive',
      'data-nav': item.id
    },
      createElement('svg', { className: 'w-5 h-5 flex-shrink-0', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' },
        createElement('path', { d: iconPaths[item.icon] })
      ),
      item.label
    ));
  });

  const user = createElement('div', { className: 'px-4 py-4 border-t border-gray-800/50' },
    createElement('div', { className: 'flex items-center gap-3' },
      createElement('div', { className: 'w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm' }, 'KA'),
      createElement('div', { className: 'flex-1 min-w-0' },
        createElement('p', { className: 'text-sm font-medium truncate' }, 'Kofi Adomako'),
        createElement('p', { className: 'text-xs text-gray-500 truncate' }, 'kofi@uni.edu')
      ),
      createElement('div', { className: 'w-2 h-2 rounded-full bg-emerald-500' })
    )
  );

  sidebar.append(logo, nav, user);
  container.appendChild(sidebar);
}
