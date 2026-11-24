/*
 * BDD accessibility helpers — progressive enhancement shared by every page.
 *
 *   1. Flags that JavaScript is available (html.bdd-js) so the menu button only appears when it works.
 *   2. Collapsible site navigation on narrow screens (button with aria-expanded; Escape closes it).
 *   3. Makes horizontally scrollable table wrappers keyboard-reachable and labelled.
 *   4. Moves focus to the target of in-page links (skip link, charter anchor) so keyboard and
 *      screen reader users land where the page scrolls.
 */
(function () {
    'use strict';

    document.documentElement.classList.add('bdd-js');

    /* ---------- 2. Navigation menu ---------- */
    function initNav() {
        var toggle = document.querySelector('.bdd-nav__toggle');
        var list = document.getElementById('bdd-nav-list');
        if (!toggle || !list || !window.matchMedia) { return; }

        var mq = window.matchMedia('(max-width: 860px)');

        function setOpen(open) {
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            list.hidden = !open;
        }

        function sync() {
            if (mq.matches) {
                setOpen(false);
            } else {
                toggle.setAttribute('aria-expanded', 'false');
                list.hidden = false;
            }
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mq.matches && toggle.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
                toggle.focus();
            }
        });

        if (mq.addEventListener) { mq.addEventListener('change', sync); } else { mq.addListener(sync); }
        sync();
    }

    /* ---------- 3. Scrollable table wrappers ---------- */
    function initScrollRegions() {
        var wraps = document.querySelectorAll('.bdd-table-wrap');
        if (!wraps.length) { return; }

        function update() {
            Array.prototype.forEach.call(wraps, function (wrap) {
                var overflows = wrap.scrollWidth > wrap.clientWidth + 1;
                if (overflows) {
                    var caption = wrap.querySelector('caption');
                    wrap.setAttribute('tabindex', '0');
                    wrap.setAttribute('role', 'region');
                    wrap.setAttribute('aria-label',
                        (wrap.getAttribute('data-label') || (caption && caption.textContent.trim()) || 'Table') +
                        ' (scrollable)');
                } else {
                    wrap.removeAttribute('tabindex');
                    wrap.removeAttribute('role');
                    wrap.removeAttribute('aria-label');
                }
            });
        }

        update();
        window.addEventListener('resize', update);
        window.addEventListener('load', update);
    }

    /* ---------- 4. Focus the target of in-page links ---------- */
    function focusTarget(id) {
        var el = id && document.getElementById(id);
        if (!el) { return; }
        var hadTabindex = el.hasAttribute('tabindex');
        if (!hadTabindex) { el.setAttribute('tabindex', '-1'); }
        el.focus({ preventScroll: false });
        if (!hadTabindex) {
            el.addEventListener('blur', function once() {
                el.removeAttribute('tabindex');
                el.removeEventListener('blur', once);
            });
        }
    }

    function initAnchors() {
        document.addEventListener('click', function (e) {
            var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
            if (!a || a.getAttribute('href').length < 2) { return; }
            focusTarget(decodeURIComponent(a.getAttribute('href').slice(1)));
        });
        // Arriving from another page with a fragment (for example about.html#accessibility-charter).
        if (location.hash.length > 1) {
            window.addEventListener('load', function () {
                focusTarget(decodeURIComponent(location.hash.slice(1)));
            });
        }
    }

    function init() {
        initNav();
        initScrollRegions();
        initAnchors();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
