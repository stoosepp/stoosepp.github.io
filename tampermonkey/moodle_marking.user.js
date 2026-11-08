// ==UserScript==
// @name         Moodle Submissions Table Enhancer
// @namespace    https://learning.monash.edu
// @version      1.0.3
// @description  Column chooser + workflow overview pills for Moodle assignment submissions table
// @match        */mod/assign/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
  'use strict';

  /* =========================
     Configuration
  ========================== */

  const STORAGE_KEY = 'moodle.submissions.visibleColumns';

  /* =========================
     Utilities
  ========================== */

  function isVisibleColumns(value) {
    return Array.isArray(value) && value.every(key => typeof key === 'string');
  }

  function loadVisibleColumns(defaultVisible) {
    let saved;
    try {
      saved = GM_getValue(STORAGE_KEY);
    } catch (error) {
      console.error('Could not read saved Moodle column preferences:', error);
      return defaultVisible;
    }

    if (saved !== undefined) {
      if (isVisibleColumns(saved)) return saved;
      console.error('Saved Moodle column preferences are invalid:', saved);
      return defaultVisible;
    }

    try {
      const legacy = localStorage.getItem(STORAGE_KEY);
      if (legacy === null) return defaultVisible;

      saved = JSON.parse(legacy);
      if (!isVisibleColumns(saved)) {
        console.error('Previous Moodle column preferences are invalid:', saved);
        return defaultVisible;
      }

      saveVisibleColumns(saved);
      return saved;
    } catch (error) {
      console.error('Could not read previous Moodle column preferences:', error);
      return defaultVisible;
    }
  }

  function saveVisibleColumns(visibleKeys) {
    try {
      GM_setValue(STORAGE_KEY, visibleKeys);
    } catch (error) {
      console.error('Could not save Moodle column preferences:', error);
    }
  }

  function normaliseKey(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^\w_]/g, '');
  }

  function getSubmissionsTable() {
    return document.querySelector('table.generaltable');
  }

  function getColumnLabel(th, index) {
    const header = th.cloneNode(true);
    header.querySelectorAll(
      '.sr-only, .visually-hidden, .accesshide, .selectall, input, select, button, svg'
    ).forEach(element => element.remove());

    return header.textContent.replace(/\s+/g, ' ').trim() ||
      th.dataset.column || `Column ${index + 1}`;
  }

  function getColumns(table) {
    const headers = [...table.querySelectorAll('thead th')];

    return headers.map((th, index) => {
      const key =
        th.dataset.column ||
        normaliseKey(th.textContent || `column_${index}`);

      return {
        index,
        key,
        label: getColumnLabel(th, index),
        th
      };
    });
  }

  function applyColumnVisibility(table, visibleKeys) {
    const headers = [...table.querySelectorAll('thead th')];
    const rows = [...table.querySelectorAll('tr')];

    rows.forEach(row => {
      [...row.children].forEach((cell, index) => {
        const header = headers[index];
        if (!header) return;

        const key =
          header.dataset.column ||
          normaliseKey(header.textContent || `column_${index}`);

        cell.style.display = visibleKeys.includes(key) ? '' : 'none';
      });
    });
  }

  /* =========================
     Column chooser UI
  ========================== */

  function injectColumnChooser(table) {
    const columns = getColumns(table);

    const defaultVisible = columns.map(c => c.key);
    const savedVisible = loadVisibleColumns(defaultVisible);

    const container = document.createElement('div');
    container.style.margin = '1em 0';

    container.innerHTML = `
      <details style="max-width: 100%;">
        <summary style="cursor:pointer;font-weight:600;">
          ⚙️ Table columns
        </summary>
        <div style="padding:0.25em 0;display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 300px), 1fr));gap:0.25em 0em;"></div>
      </details>
    `;

    const list = container.querySelector('div');

    columns.forEach(col => {
      const label = document.createElement('label');
      label.style.display = 'block';
      label.style.cursor = 'pointer';
      label.style.overflowWrap = 'anywhere';
      label.style.marginBottom = '0px';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = savedVisible.includes(col.key);
      checkbox.style.marginRight = '0.5em';

      checkbox.addEventListener('change', () => {
        const updatedVisible = columns
          .filter((_, i) => {
            const input = list.children[i].querySelector('input');
            return input.checked;
          })
          .map(c => c.key);

        saveVisibleColumns(updatedVisible);

        applyColumnVisibility(table, updatedVisible);
      });

      label.appendChild(checkbox);
      label.append(col.label);
      list.appendChild(label);
    });

    table.parentElement.prepend(container);
    applyColumnVisibility(table, savedVisible);
  }

  /* =========================
     Workflow status pills
  ========================== */

function countSubmissionInfoStatuses(table) {
  const counts = {};
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(row => {
    const info = row.querySelector('.submissioninfo');
    if (!info) return;

    const statusDivs = info.querySelectorAll('div[class]');

    statusDivs.forEach(div => {
      const statusClass = [...div.classList].find(cls =>
        ![
          'w-100',
          'latesubmission'// ✅ EXCLUDED
        ].includes(cls) &&
        !cls.startsWith('d-') &&
        !cls.startsWith('text-')
      );

      if (!statusClass) return;

      const label = div.textContent.trim();

      if (!counts[statusClass]) {
        counts[statusClass] = {
          label,
          count: 0
        };
      }

      counts[statusClass].count++;
    });
  });

  return counts;
}


function statusBootstrapClass(statusClass) {
  if (statusClass.includes('readyforreview')) return 'badge-success';
  if (statusClass.includes('submitted')) return 'badge-primary';
  if (statusClass.includes('draft')) return 'badge-secondary';
  if (statusClass.includes('not')) return 'badge-danger';

  return 'badge-info';
}



  function injectStatusPills(table) {
  const statusCounts = countSubmissionInfoStatuses(table);
  if (!Object.keys(statusCounts).length) return;

  const bar = document.createElement('div');
      bar.style.display = "flex";
      bar.style.flexDirection="column";



Object.entries(statusCounts).forEach(([statusClass, data]) => {

          const pill = document.createElement('span');
      pill.style.marginBottom = "3px";
    pill.style.borderRadius = "3px";

  pill.className = `badge ${statusBootstrapClass(statusClass)}`;
  pill.textContent = `${data.label}: ${data.count}`;

  bar.appendChild(pill);


});

  // Insert after <div class="navitem"><h2>Submissions</h2></div>
  const navItem = [...document.querySelectorAll('div.navitem')]
    .find(div =>
      div.querySelector('h2') &&
      div.querySelector('h2').textContent.trim().toLowerCase() === 'submissions'
    );

  if (navItem) {
    navItem.insertAdjacentElement('afterend', bar);
  } else {
    table.parentElement.prepend(bar);
  }
}


  /* =========================
     Initialise
  ========================== */

  const table = getSubmissionsTable();
  if (!table) return;

  injectColumnChooser(table);
  injectStatusPills(table);



})();