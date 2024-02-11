// Functions
function PT(path, callback, method = 'GET', body = '') {
  fetch('https://api.fsh.plus/pt?url=https://'+localStorage.getItem('domain')+'/api/client/'+path+'&key='+localStorage.getItem('key')+'&method='+method+'&body='+body).then(async e => {
    e = await e.json();
    callback(e)
  })
}
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
}
function __PRI__edr(er,tr) {
  if (er == 0) {
    return '';
  } else {
    return er+tr+' '
  }
}
function time_gud(time) {
  return `${__PRI__edr(Math.floor(time / 31536000),'Y')}${__PRI__edr(Math.floor(time % 31536000 / 604800),'W')}${__PRI__edr(Math.floor(time / 86400) % 7,'d')}${__PRI__edr(Math.floor(time / 3600) % 24,'h')}${__PRI__edr(Math.floor(time / 60) % 60,'m')}${__PRI__edr(time % 60,'s')}`
}

// Checks
if (location.pathname != '/') {
  if (!localStorage.getItem('key')) {
    location.pathname == '/';
  }
}
