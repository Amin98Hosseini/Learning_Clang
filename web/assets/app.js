/* Learning C — site behaviour: mobile menu, lesson filter, copy buttons. */
(function () {
  'use strict';

  var body = document.body;

  /* Mobile sidebar */
  var menuBtn = document.getElementById('menu-btn');
  var scrim = document.getElementById('scrim');

  function setMenu(open) {
    body.classList.toggle('nav-open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (scrim) scrim.hidden = !open;
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      setMenu(!body.classList.contains('nav-open'));
    });
  }
  if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* Lesson filter in the sidebar */
  var search = document.getElementById('lesson-search');
  var empty = document.getElementById('side-empty');

  if (search) {
    var groups = Array.prototype.slice.call(document.querySelectorAll('.side-group'));

    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var anyVisible = false;

      groups.forEach(function (group) {
        var links = Array.prototype.slice.call(group.querySelectorAll('.side-link'));
        var visible = 0;

        links.forEach(function (link) {
          var match = !q || link.textContent.toLowerCase().indexOf(q) !== -1;
          link.parentNode.hidden = !match;
          if (match) visible++;
        });

        group.hidden = visible === 0;
        if (q && visible > 0) group.open = true;
        if (visible > 0) anyVisible = true;
      });

      if (empty) empty.hidden = anyVisible;
    });

    search.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        search.value = '';
        search.dispatchEvent(new Event('input'));
        search.blur();
      }
    });
  }

  /* Copy buttons on every code block */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.copy-btn') : null;
    if (!btn) return;

    var block = btn.closest('.code-block');
    var code = block ? block.querySelector('code') : null;
    if (!code) return;

    var text = code.innerText;

    function done() {
      var original = btn.textContent;
      btn.textContent = 'Copied';
      btn.classList.add('done');
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove('done');
      }, 1600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {});
    } else {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); done(); } catch (err) { /* ignore */ }
      document.body.removeChild(area);
    }
  });
})();
