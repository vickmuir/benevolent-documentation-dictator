/*
 * BDD components — the shared accessible image viewer.
 *
 * Any button with the data-bdd-viewer attribute opens the viewer:
 *
 *   <button type="button" class="bdd-viewer-trigger" data-bdd-viewer
 *           data-viewer-title="Master Bob" data-viewer-desc="Sage of the Scroll Repository">
 *     <img src="funny/MasterBob.png" alt="Master Bob in flowing azure robes ...">
 *     <span class="bdd-sr-only">Open enlarged portrait</span>
 *   </button>
 *
 * Optional: data-viewer-src (a larger image than the thumbnail), and data-viewer-native +
 * data-viewer-native-lang (for example "밥 도사" and "ko") so a non-English name is announced in
 * the right language: it is shown before the English title inside a lang-tagged span.
 *
 * Behaviour (native <dialog> + showModal()):
 *   - Role "dialog", aria-modal, accessible name from the title, description from the caption.
 *   - Focus moves to the Close button; Tab/Shift+Tab stay inside the dialog; the page behind is inert.
 *   - Escape, the Close button, or a click outside the image closes it.
 *   - Focus returns to the control that opened it.
 *   - Page scrolling is locked while open; the dialog itself scrolls on small screens and at high zoom.
 */
(function () {
    'use strict';

    var dialog, img, titleEl, descEl, closeBtn;
    var opener = null;
    var built = false;
    var uid = 'bdd-viewer';

    function build() {
        if (built) { return; }
        built = true;

        dialog = document.createElement('dialog');
        dialog.className = 'bdd-dialog';
        dialog.setAttribute('aria-labelledby', uid + '-title');
        dialog.setAttribute('aria-describedby', uid + '-desc');

        var panel = document.createElement('div');
        panel.className = 'bdd-dialog__panel';

        closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'bdd-dialog__close';
        closeBtn.setAttribute('aria-label', 'Close enlarged image');
        closeBtn.autofocus = true;
        closeBtn.innerHTML = '<span aria-hidden="true">&times;</span>';

        img = document.createElement('img');
        img.className = 'bdd-dialog__img';
        img.alt = '';

        var caption = document.createElement('div');
        caption.className = 'bdd-dialog__caption';

        titleEl = document.createElement('div');
        titleEl.className = 'bdd-dialog__title';
        titleEl.id = uid + '-title';

        descEl = document.createElement('p');
        descEl.className = 'bdd-dialog__desc';
        descEl.id = uid + '-desc';

        caption.appendChild(titleEl);
        caption.appendChild(descEl);
        panel.appendChild(closeBtn);
        panel.appendChild(img);
        panel.appendChild(caption);
        dialog.appendChild(panel);
        document.body.appendChild(dialog);

        closeBtn.addEventListener('click', function () { dialog.close(); });

        // A click on the dialog element itself is a click on the backdrop area.
        dialog.addEventListener('click', function (e) {
            if (e.target === dialog) { dialog.close(); }
        });

        dialog.addEventListener('close', onClose);
    }

    function onClose() {
        document.documentElement.classList.remove('bdd-modal-open');
        // Release the (possibly large) image once the dialog is gone.
        img.removeAttribute('src');
        img.alt = '';
        var target = opener;
        opener = null;
        if (target && document.contains(target) && typeof target.focus === 'function') {
            target.focus();
        } else {
            var main = document.getElementById('main-content');
            if (main) { main.focus(); }
        }
    }

    function openFrom(trigger) {
        build();
        var thumb = trigger.querySelector('img') || (trigger.tagName === 'IMG' ? trigger : null);
        if (!thumb) { return; }

        var title = trigger.getAttribute('data-viewer-title') || '';
        var desc = trigger.getAttribute('data-viewer-desc') || '';

        opener = trigger;
        img.src = trigger.getAttribute('data-viewer-src') || thumb.currentSrc || thumb.src;
        img.alt = thumb.getAttribute('alt') || '';
        var nativeName = trigger.getAttribute('data-viewer-native');
        titleEl.textContent = '';
        if (nativeName) {
            var span = document.createElement('span');
            span.textContent = nativeName;
            span.lang = trigger.getAttribute('data-viewer-native-lang') || '';
            titleEl.appendChild(span);
            titleEl.appendChild(document.createTextNode(title ? ' \u00b7 ' + title : ''));
        } else {
            titleEl.textContent = title || 'Enlarged image';
        }
        descEl.textContent = desc;

        document.documentElement.classList.add('bdd-modal-open');
        if (typeof dialog.showModal === 'function') {
            dialog.showModal();
        } else {
            // Very old browsers: fall back to a non-modal open state.
            dialog.setAttribute('open', '');
            closeBtn.focus();
        }
    }

    function init() {
        document.addEventListener('click', function (e) {
            var trigger = e.target.closest ? e.target.closest('[data-bdd-viewer]') : null;
            if (!trigger) { return; }
            e.preventDefault();
            openFrom(trigger);
        });
        // <button> elements activate on Enter and Space natively, so no key handlers are needed.
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.BDD = window.BDD || {};
    window.BDD.viewer = { open: openFrom };
}());
