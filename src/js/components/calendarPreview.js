import { createElement, formatTime } from '../utils/renderer.js';

const typeIcons = {
  lecture: { path: 'M12 6v6l4 2', color: 'text-indigo-400 bg-indigo-500/10' },
  tutorial: { path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', color: 'text-violet-400 bg-violet-500/10' },
  lab: { path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', color: 'text-rose-400 bg-rose-500/10' },
  workshop: { path: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'text-amber-400 bg-amber-500/10' },
  study: { path: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'text-emerald-400 bg-emerald-500/10' },
  deadline: { path: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-red-400 bg-red-500/10' },
  meeting: { path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color: 'text-cyan-400 bg-cyan-500/10' },
};

const groupColors = {
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  rose: 'bg-rose-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  cyan: 'bg-cyan-500',
};

export function renderCalendarPreview(container, events) {
  const section = createElement('section', { className: 'mb-8' });

  const header = createElement('div', { className: 'flex items-center justify-between mb-5' },
    createElement('div', null,
      createElement('h2', { className: 'text-xl font-semibold' }, 'Upcoming Schedule'),
      createElement('p', { className: 'text-sm text-gray-500 mt-0.5' }, `${events.length} events this week`)
    ),
    createElement('button', { className: 'btn-primary' }, 'Open Timetable')
  );

  const timeline = createElement('div', { className: 'glass-panel p-5' });
  const list = createElement('div', { className: 'space-y-0' });

  const sorted = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));

  sorted.forEach((evt, idx) => {
    const isLast = idx === sorted.length - 1;
    const icon = typeIcons[evt.type] || typeIcons.lecture;
    const dotColor = groupColors[evt.color] || 'bg-gray-500';

    const row = createElement('div', { className: 'flex gap-4' });

    const timelineCol = createElement('div', { className: 'flex flex-col items-center' },
      createElement('div', { className: `w-2.5 h-2.5 rounded-full ${dotColor} ring-4 ring-gray-900` }),
      isLast ? null : createElement('div', { className: 'w-0.5 flex-1 bg-gray-800 my-1' })
    );

    const content = createElement('div', { className: `flex-1 pb-${isLast ? '0' : '5'} min-w-0` });

    const top = createElement('div', { className: 'flex items-start justify-between gap-3' },
      createElement('div', null,
        createElement('p', { className: 'text-sm font-medium' }, evt.title),
        createElement('div', { className: 'flex items-center gap-2 mt-0.5' },
          createElement('span', { className: 'text-xs text-gray-500' }, evt.courseCode),
          createElement('span', { className: 'text-gray-600' }, '·'),
          createElement('span', { className: 'text-xs text-gray-500' }, evt.location || 'Online')
        )
      ),
      createElement('div', { className: 'text-right flex-shrink-0' },
        createElement('p', { className: 'text-xs font-mono tabular-nums text-gray-300' }, formatTime(evt.start)),
        createElement('p', { className: 'text-xs text-gray-600' }, formatTime(evt.end))
      )
    );

    const badgeRow = createElement('div', { className: 'flex items-center gap-2 mt-2' },
      createElement('div', { className: `flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${icon.color}` },
        createElement('svg', { className: 'w-3 h-3', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' },
          createElement('path', { d: icon.path })
        ),
        evt.type.charAt(0).toUpperCase() + evt.type.slice(1)
      ),
      evt.reminder
        ? createElement('div', { className: `flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${evt.whatsappSent ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-500 bg-gray-800'}` },
            createElement('svg', { className: 'w-3 h-3', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' },
              createElement('path', { d: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z' })
            ),
            evt.whatsappSent ? 'Sent' : 'Pending'
          )
        : null
    );

    content.append(top, badgeRow);
    row.append(timelineCol, content);
    list.appendChild(row);
  });

  timeline.appendChild(list);
  section.append(header, timeline);
  container.appendChild(section);
}
