/*
 * Runtime config. Points the DC runtime at the local copies of React so the
 * site works offline and from file:// (no CDN needed). Partner logos are read
 * from assets/partners/<slug>.png by js/app.js.
 */
window.__resources = {
  'https://unpkg.com/react@18.3.1/umd/react.production.min.js': 'js/vendor/react.production.min.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js': 'js/vendor/react-dom.production.min.js'
};
