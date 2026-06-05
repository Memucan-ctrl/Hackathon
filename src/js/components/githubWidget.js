import { createElement, timeAgo } from '../utils/renderer.js';

export function renderGitHubWidget(container, data) {
  const section = createElement('section', { className: 'mb-8' });

  const header = createElement('div', { className: 'flex items-center justify-between mb-5' },
    createElement('div', null,
      createElement('h2', { className: 'text-xl font-semibold' }, 'GitHub Insights'),
      createElement('p', { className: 'text-sm text-gray-500 mt-0.5' }, 'Live contribution tracking')
    ),
    createElement('a', { href: data.profileUrl, target: '_blank', className: 'btn-ghost flex items-center gap-2' },
      createElement('svg', { className: 'w-4 h-4', viewBox: '0 0 24 24', fill: 'currentColor' },
        createElement('path', { d: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' })
      ),
      'View Profile'
    )
  );

  const grid = createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-4' });

  grid.appendChild(createStreakCard(data));
  grid.appendChild(createCalendarCard(data));
  grid.appendChild(createCommitsCard(data));

  section.append(header, grid);
  container.appendChild(section);
}

function createStreakCard(data) {
  const card = createElement('div', { className: 'glass-panel-hover p-5' });
  const title = createElement('h3', { className: 'text-sm font-medium text-gray-400 mb-4 flex items-center gap-2' },
    createElement('svg', { className: 'w-4 h-4 text-amber-400', viewBox: '0 0 24 24', fill: 'currentColor' },
      createElement('path', { d: 'M11.38 2.019a7.5 7.5 0 10-4.38 12.49v-.01a6.87 6.87 0 01-.5-2.5 5.79 5.79 0 012.9-5.74l.75-.4.38.82a5.48 5.48 0 011.57 1.86 5.57 5.57 0 01.58 2.4 3.52 3.52 0 01-1.78 3.08 5.97 5.97 0 01-.96.48 7.5 7.5 0 001.84-9.52l.2-.37 1.48-.12z' })
    ),
    'Streak'
  );

  const row = createElement('div', { className: 'flex items-center gap-6' },
    createElement('div', null,
      createElement('p', { className: 'text-4xl font-bold tabular-nums' }, data.currentStreak),
      createElement('p', { className: 'text-xs text-gray-500' }, 'day streak')
    ),
    createElement('div', { className: 'border-l border-gray-800 pl-6' },
      createElement('p', { className: 'text-2xl font-bold tabular-nums text-gray-400' }, data.totalCommits),
      createElement('p', { className: 'text-xs text-gray-500' }, 'total commits')
    ),
    createElement('div', null,
      createElement('p', { className: 'text-lg font-semibold tabular-nums text-gray-400' }, data.contributionsThisYear),
      createElement('p', { className: 'text-xs text-gray-500' }, 'this year')
    )
  );

  const longest = createElement('p', { className: 'mt-3 text-xs text-gray-500' },
    `Best: ${data.longestStreak} day streak`
  );

  card.append(title, row, longest);
  return card;
}

function createCalendarCard(data) {
  const card = createElement('div', { className: 'glass-panel-hover p-5' });
  const title = createElement('h3', { className: 'text-sm font-medium text-gray-400 mb-4' }, 'Contributions');

  const { weeks, colorScale } = data.contributionCalendar;

  const grid = createElement('div', { className: 'flex gap-0.5' });

  weeks.forEach(week => {
    const col = createElement('div', { className: 'flex flex-col gap-0.5' });
    week.days.forEach(count => {
      const idx = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 10 ? 3 : 4;
      col.appendChild(createElement('div', { className: `contribution-cell ${colorScale[idx]}`, title: `${count} contributions` }));
    });
    grid.appendChild(col);
  });

  const legend = createElement('div', { className: 'flex items-center gap-1.5 mt-3 text-xs text-gray-500' },
    createElement('span', null, 'Less'),
    ...[0, 1, 2, 3, 4].map(i => createElement('div', { className: `contribution-cell ${colorScale[i]}` })),
    createElement('span', null, 'More')
  );

  card.append(title, grid, legend);
  return card;
}

function createCommitsCard(data) {
  const card = createElement('div', { className: 'glass-panel-hover p-5' });
  const title = createElement('h3', { className: 'text-sm font-medium text-gray-400 mb-4' }, 'Recent Commits');

  const list = createElement('div', { className: 'space-y-3' });

  data.recentCommits.slice(0, 4).forEach(c => {
    const item = createElement('div', { className: 'flex items-start gap-3' },
      createElement('div', { className: 'w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0' }),
      createElement('div', { className: 'flex-1 min-w-0' },
        createElement('p', { className: 'text-sm font-mono text-gray-200 truncate' }, c.message),
        createElement('div', { className: 'flex items-center gap-2 mt-0.5' },
          createElement('span', { className: 'text-xs text-gray-500' }, c.repo),
          createElement('span', { className: 'text-xs text-gray-600' }, '·'),
          createElement('span', { className: 'text-xs text-gray-500' }, timeAgo(c.timestamp)),
          createElement('span', { className: 'text-xs text-emerald-500' }, `+${c.additions}`),
          createElement('span', { className: 'text-xs text-rose-500' }, `-${c.deletions}`)
        )
      )
    );
    list.appendChild(item);
  });

  card.append(title, list);
  return card;
}
