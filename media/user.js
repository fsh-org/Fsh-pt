let query = new URLSearchParams(location.search);

window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector('nav').innerHTML = `<button onclick="loadPage('servers')">Servers</button>
<button onclick="loadPage('search')">Search</button>
<details>
  <summary><button onclick="loadPage('account')">Account</button></summary>
  <button onclick="loadPage('activity')">Activity</button>
</details>
<hr>
<button onclick="localStorage.removeItem('key');location.pathname='/'">Log out</button>`;
});

function loadPage(name, data) {
  // Load page
  fetch(`/user/${name}`)
    .then(res => res.text())
    .then(res => {
      // Push state
      history.pushState({}, '', `${location.origin}/user/${name}?${new URLSearchParams(data).toString()}`);
      query = new URLSearchParams(location.search);
      // Set title
      document.title = res.match(/<title>.*?<\/title>/)[0].slice(7, -8);
      function change() {
        // Get & set main content
        let con = res.match(/<main>([^¬]|¬)*?<\/main>/)[0];
        document.querySelector('main').outerHTML = con;
        // Run scripts (scary eval)
        con.match(/<script>([^¬]|¬)*?<\/script>/g)
          .map(s=>s.replaceAll(/<script>|<\/script>/g, ''))
          .forEach(s=>window.eval(s));
        con.match(/<script.+?src=".+?".*?><\/script>/g)
          .map(s=>s.match(/src=".+?"/, '')[0].split('"')[1])
          .forEach(s=>fetch(s).then(r=>r.text()).then(r=>window.eval(r)));
      }
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          change();
        });
      } else {
        change();
      }
    })
    .catch(err => {
      document.querySelector('main').innerHTML = `<p>There was an error getting this page</p><pre><code>${err}</code></pre>`;
    })
}