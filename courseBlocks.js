import { createElement } from '../utils/renderer.js';

export function renderCourseBlocks(container, courses) {
  const section = createElement('section', { className: 'mb-8' });

  const header = createElement('div', { className: 'flex items-center justify-between mb-5' },
    createElement('div', null,
      createElement('h2', { className: 'text-xl font-semibold' }, 'My Courses'),
      createElement('p', { className: 'text-sm text-gray-500 mt-0.5' }, `${courses.length} active courses this semester`)
    ),
    createElement('button', { className: 'btn-primary' }, '+ Enroll Course')
  );

  const grid = createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' });

  courses.forEach(course => {
    const card = createElement('div', { className: 'glass-panel-hover overflow-hidden' });

    const gradientBar = createElement('div', { className: `h-1 bg-gradient-to-r ${course.color}` });

    const body = createElement('div', { className: 'p-5' });

    const topRow = createElement('div', { className: 'flex items-start justify-between mb-3' },
      createElement('div', null,
        createElement('div', { className: 'flex items-center gap-2 mb-1' },
          createElement('span', { className: 'text-xs font-mono text-gray-500 bg-gray-800 px-2 py-0.5 rounded' }, course.code),
          createElement('span', { className: `badge ${course.progress >= 70 ? 'bg-emerald-500/10 text-emerald-400' : course.progress >= 40 ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'}` }, `${course.progress}%`),
        ),
        createElement('h3', { className: 'font-semibold text-base leading-snug' }, course.name),
        createElement('p', { className: 'text-xs text-gray-500 mt-0.5' }, course.instructor)
      ),
      createElement('button', { className: 'btn-ghost p-1.5', title: 'More options' },
        createElement('svg', { className: 'w-4 h-4', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' },
          createElement('circle', { cx: '12', cy: '5', r: '1' }),
          createElement('circle', { cx: '12', cy: '12', r: '1' }),
          createElement('circle', { cx: '12', cy: '19', r: '1' })
        )
      )
    );

    const progressBar = createElement('div', { className: 'progress-bar mb-4' },
      createElement('div', { className: `progress-fill bg-gradient-to-r ${course.color}`, style: `width: ${course.progress}%` })
    );

    const metaGrid = createElement('div', { className: 'grid grid-cols-2 gap-3 mb-4' },
      createElement('div', { className: 'flex items-center gap-2 text-xs text-gray-400' },
        createElement('svg', { className: 'w-3.5 h-3.5 text-gray-500', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' },
          createElement('path', { d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }),
          createElement('polyline', { points: '14 2 14 8 20 8' })
        ),
        createElement('span', null, `${course.materials.filter(m => m.downloaded).length}/${course.materials.length} files`)
      ),
      createElement('div', { className: 'flex items-center gap-2 text-xs text-gray-400 justify-end' },
        createElement('svg', { className: 'w-3.5 h-3.5 text-gray-500', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' },
          createElement('path', { d: 'M9 11l3 3L22 4' }),
          createElement('path', { d: 'M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' })
        ),
        createElement('span', null, `${course.assignments.filter(a => a.status === 'graded').length} graded`)
      )
    );

    const nextLecture = createElement('div', { className: 'flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-800' },
      createElement('div', { className: 'w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0' },
        createElement('svg', { className: 'w-4 h-4 text-indigo-400', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' },
          createElement('path', { d: 'M12 6v6l4 2' }),
          createElement('circle', { cx: '12', cy: '12', r: '10' })
        )
      ),
      createElement('div', { className: 'flex-1 min-w-0' },
        createElement('p', { className: 'text-xs text-gray-500' }, 'Next Lecture'),
        createElement('p', { className: 'text-sm font-medium truncate' }, course.nextLecture.title),
        createElement('p', { className: 'text-xs text-gray-400' },
          `${new Date(course.nextLecture.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} · ${course.nextLecture.room}`
        )
      )
    );

    body.append(topRow, progressBar, metaGrid, nextLecture);
    card.append(gradientBar, body);
    grid.appendChild(card);
  });

  section.append(header, grid);
  container.appendChild(section);
}
