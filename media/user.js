let query = new URLSearchParams(location.search);
document.startViewTransition ??= (r)=>{r()};

const icons = {
  server: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M236 26C247.046 26 256 34.9543 256 46V97.0225C256 108.068 247.046 117.022 236 117.022H20C8.95446 117.022 0.000246531 108.068 0 97.0225V46C0 34.9543 8.95431 26 20 26H236ZM169.529 54.4434C160.104 54.4434 152.462 62.0851 152.462 71.5107C152.462 80.9363 160.104 88.5771 169.529 88.5771C178.955 88.5769 186.596 80.9361 186.596 71.5107C186.596 62.0852 178.955 54.4436 169.529 54.4434ZM217.315 54.4434C207.89 54.4435 200.249 62.0852 200.249 71.5107C200.249 80.9362 207.89 88.577 217.315 88.5771C226.741 88.5771 234.383 80.9363 234.383 71.5107C234.383 62.0851 226.741 54.4434 217.315 54.4434Z"/><path d="M236 138.641C247.046 138.641 256 147.595 256 158.641V209.663C256 220.709 247.046 229.663 236 229.663H20C8.95446 229.663 0.000246531 220.709 0 209.663V158.641C0 147.595 8.95431 138.641 20 138.641H236ZM169.529 167.084C160.104 167.084 152.462 174.726 152.462 184.151C152.462 193.577 160.104 201.218 169.529 201.218C178.955 201.218 186.596 193.577 186.596 184.151C186.596 174.726 178.955 167.084 169.529 167.084ZM217.315 167.084C207.89 167.084 200.249 174.726 200.249 184.151C200.249 193.577 207.89 201.218 217.315 201.218C226.741 201.218 234.383 193.577 234.383 184.151C234.383 174.726 226.741 167.084 217.315 167.084Z"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill-rule="evenodd" clip-rule="evenodd" d="M165 100C165 135.899 135.899 165 100 165C64.1015 165 35 135.899 35 100C35 64.1015 64.1015 35 100 35C135.899 35 165 64.1015 165 100ZM155.148 183.432C139.339 193.902 120.382 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100C200 120.382 193.902 139.339 183.432 155.148L249.866 221.582C257.676 229.392 257.676 242.055 249.866 249.866C242.055 257.676 229.392 257.676 221.582 249.866L155.148 183.432Z"/></svg>',
  user: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill-rule="evenodd" clip-rule="evenodd" d="M128 128C163.346 128 192 99.3462 192 64C192 28.6538 163.346 0 128 0C92.6538 0 64 28.6538 64 64C64 99.3462 92.6538 128 128 128ZM151 146H148H108H105C49.7715 146 5 190.772 5 246V256H108H148H251V246C251 190.772 206.228 146 151 146Z"></path></svg>'
};

window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector('nav').innerHTML = `<a data-page="servers"><button>${icons.server} Servers</button></a>
<a data-page="search"><button>${icons.search} Search</button></a>
<a data-page="account"><button>${icons.user} Account</button></a>
<div data-parent="account">
  <a data-page="account/activity"><button>Activity</button></a>
</div>
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
  // Update nav
  document.querySelectorAll('nav div').forEach(d=>d.style.maxHeight='');
  if (document.querySelector(`nav div[data-parent="${name}"]`)) document.querySelector(`nav div[data-parent="${name}"]`).style.maxHeight = '10dvh';
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