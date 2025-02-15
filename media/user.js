const query = new URLSearchParams(location.search);

document.querySelector('nav').innerHTML = `<button onclick="loadPage('servers')">Servers</button>
<button onclick="loadPage('search')">Search</button>
<details>
  <summary><button onclick="loadPage('account')">Account</button></summary>
  <button onclick="loadPage('activity')">Activity</button>
</details>
<hr>
<button onclick="localStorage.removeItem('key');location.pathname='/'">Log out</button>`;

function loadPage(name, data) {
  // Load page
  fetch(`/user/${name}`)
    .then(res => res.text())
    .then(res => {
      // Push state
      history.pushState({}, '', `${location.origin}/user/${name}?${new URLSearchParams(data).toString()}`);
      // Set title
      document.title = res.match(/<title>.*?<\/title>/)[0].slice(7, -8);
      // Get main content
      let con = res.match(/<main>([^¬]|¬)*?<\/main>/)[0];
      // Run scripts
      con.match(/<script>([^¬]|¬)*?<\/script>/g)
        .map(s=>s.replaceAll(/<script>|<\/script>/g, ''))
        .forEach(s=>eval(s)); // Scarry!!!!
      // Set main content
      document.querySelector('main').outerHTML = con;
    })
    .catch(err => {
      document.querySelector('main').innerHTML = `<p>There was an error getting this page</p><pre><code>${err}</code></pre>`;
    })
}