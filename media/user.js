function loadPage(name, data) {
  fetch(`/user/${name}?${new URLSearchParams(data).toString()}`)
    .then(res => res.text())
    .then(res => {
      document.querySelector('main').innerHTML = res.match(/<main>([^¬]|¬)*?<\/main>/)[0];
    })
}