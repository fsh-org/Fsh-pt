let query = new URLSearchParams(location.search);
document.startViewTransition ??= (r)=>{r()};

window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector('nav').innerHTML = `<a data-page="servers"><button>Servers</button></a>
<a data-page="search"><button>Search</button></a>
<details>
  <summary><a data-page="account"><button>Account</button></a></summary>
  <a data-page="activity"><button>Activity</button></a>
</details>
<hr>
<button onclick="localStorage.removeItem('key');location.pathname='/'">Log out</button>`;
  Array.from(document.querySelectorAll('nav a[data-page]'))
    .forEach(link=>{
      let page = link.getAttribute('data-page');
      softLink(link, `/user/${page}`, page, {});
    });
});

function loadPage(name, data) {
  // If a special closer function provided run it
  if (window.closer) {
    try {
      window.closer();
    } catch(err) {
      // Ignore error, allowing changing page more important than correctly closing?
    }
    delete window.closer;
  }
  // Load page
  fetch(`/user/${name}`)
    .then(res=>res.text())
    .then(res=>{
      // Push state
      history.pushState({}, '', `${location.origin}/user/${name}?${new URLSearchParams(data).toString()}`);
      query = new URLSearchParams(location.search);
      // Set title
      document.title = res.match(/<title>.*?<\/title>/)[0].slice(7, -8);
      function change() {
        // Get & set main content
        let content = res.match(/<main>([^¬]|¬)*?<\/main>/)[0];
        document.querySelector('main').outerHTML = content;
        // Run scripts (scary eval)
        let scripts = content.match(/<script.*?>([^¬]|¬)*?<\/script>/g);
        scripts.forEach(script=>{
          if (script.includes('<script src="')) {
            let sl = script.match(/<script src=".+?"/g);
            sl
              .map(s=>s.split('"')[1])
              .forEach(async(s)=>{
                s = await fetch(s);
                s = await s.text();
                try {
                  window.eval(s);
                } catch(err) {
                  // Ignore :3
                }
              })
          } else {
            try {
              window.eval(script.replaceAll(/<script>|<\/script>/g, ''));
            } catch(err) {
              // Ignore :3
            }
          }
        });
      }
      document.startViewTransition(change);
    })
    .catch(err=>{
      document.querySelector('main').innerHTML = `<p>There was an error getting this page</p><pre><code>${err}</code></pre>`;
    })
}

// Make an <a> do soft navigation with normal link behaviours
function softLink(a, url, ...params) {
  a.href = url;
  a.onclick = function(event){
    event.preventDefault();
    loadPage(...params);
  };
}