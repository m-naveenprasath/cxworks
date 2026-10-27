/*
 * Hands the app logic in js/app.js to the DC runtime.
 * The runtime reads its logic from <script type="text/x-dc" data-dc-script> as source
 * text, so we copy the body of window.CXApp into that tag before the page finishes
 * loading. This lets app.js stay a normal .js file you can edit and lint.
 */
(function () {
  var el = document.querySelector('script[data-dc-script]');
  if (!el || typeof window.CXApp !== 'function') {
    console.error('[boot] js/app.js did not load or the logic tag is missing.');
    return;
  }
  var src = String(window.CXApp);
  el.textContent = src.slice(src.indexOf('{') + 1, src.lastIndexOf('}'));
})();
