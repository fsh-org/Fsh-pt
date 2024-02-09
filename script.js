function PT(path, callback) {
  fetch('https://api.fsh.plus/pt?url=https://'+localStorage.getItem('domain')+'/api/client/'+path+'&key='+localStorage.getItem('key')).then(async e => {
    e = await e.json();
    callback(e)
  })
}
