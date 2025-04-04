// Checks
if (location.pathname != '/') {
  if (!localStorage.getItem('key')) {
    location.pathname = '/';
  }
}

// Functions
function PT(path, callback, method = 'GET', body = '', mime = '') {
  let opts = {
    method: method,
    headers: {
      authorization: `Bearer ${localStorage.getItem('key')}`,
      accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  if (body) opts.body = body;
  if (mime) opts.mime = mime;
  fetch('https://api.fsh.plus/request?url='+encodeURIComponent(`https://${localStorage.getItem('domain')}/api/${{client:'client',app:'application'}[localStorage.getItem('type')]}/${path}`), {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(opts)
  })
    .then(res=>res.json())
    .then(res=>{
      if (res.err) {
        alert(res.msg);
        return;
      }
      if (res.status === 204) {
        callback();
        return;
      }
      let con = res.content;
      if (!res.headers['content-type']?.includes('text/')) {
        con = JSON.parse(con);
        if (con.errors) {
          alert(con.errors[0].detail);
          return;
        }
      }
      callback(con, res.alt);
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

function time_gud(time) {
  function __PRI__edr(er,tr) {
    if (er == 0) {
      return '';
    } else {
      return er+tr+' '
    }
  }
  return `${__PRI__edr(Math.floor(time / 31536000),'Y')}${__PRI__edr(Math.floor(time % 31536000 / 604800),'W')}${__PRI__edr(Math.floor(time / 86400) % 7,'d')}${__PRI__edr(Math.floor(time / 3600) % 24,'h')}${__PRI__edr(Math.floor(time / 60) % 60,'m')}${__PRI__edr(time % 60,'s')}`
}

function file_type(mime, name) {
  if (['zip','7z','tar','gz'].includes(name.split('.')[1])) {
    return '<i class="fa-solid fa-file-zipper"></i>'
  } else if (name.includes('.css')) {
    return `<svg height="16" version="1.1" viewBox="0 0 518.13 512" xmlns="http://www.w3.org/2000/svg"><g transform="translate(16 74.498)"><g fill="#fff" stroke-dasharray="" stroke-miterlimit="10" style="mix-blend-mode:normal" data-paper-data='{"isPaintingLayer":true}'><path d="m443.23 277.5h34.9c8.8 0 16 7.2 16 16s-7.2 16-16 16h-34.9c-7.2 0-13.1 5.9-13.1 13.1 0 5.2 3 9.9 7.8 12l37.4 16.6c16.3 7.2 26.8 23.4 26.8 41.2 0 24.9-20.2 45.1-45.1 45.1h-42.9c-8.8 0-16-7.2-16-16s7.2-16 16-16h42.9c7.2 0 13.1-5.9 13.1-13.1 0-5.2-3-9.9-7.8-12l-37.4-16.6c-16.3-7.2-26.8-23.4-26.8-41.2 0-24.9 20.2-45.1 45.1-45.1z"/><path d="m-16-10.498c0-35.3 28.7-64 64-64h160v128c0 17.7 14.3 32 32 32h128v144h-208c-35.3 0-64 28.7-64 64v144h-48c-35.3 0-64-28.7-64-64zm384 64h-128v-128zm-184 224h16c22.1 0 40 17.9 40 40v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-8c0-8.8 7.2-16 16-16s16 7.2 16 16v8c0 22.1-17.9 40-40 40h-16c-22.1 0-40-17.9-40-40v-80c0-22.1 17.9-40 40-40zm133.1 0h34.9c8.8 0 16 7.2 16 16s-7.2 16-16 16h-34.9c-7.2 0-13.1 5.9-13.1 13.1 0 5.2 3 9.9 7.8 12l37.4 16.6c16.3 7.2 26.8 23.4 26.8 41.2 0 24.9-20.2 45.1-45.1 45.1h-42.9c-8.8 0-16-7.2-16-16s7.2-16 16-16h42.9c7.2 0 13.1-5.9 13.1-13.1 0-5.2-3-9.9-7.8-12l-37.4-16.6c-16.3-7.2-26.8-23.4-26.8-41.2 0-24.9 20.2-45.1 45.1-45.1z"/></g></g></svg>`;
  } else if (name.includes('.json')) {
    return `<svg height="16" version="1.1" viewBox="0 0 602.15 514.66" xmlns="http://www.w3.org/2000/svg"><g transform="translate(16,76)"><g fill="#fff" stroke-dasharray="" stroke-miterlimit="10" style="mix-blend-mode:normal" data-paper-data='{"isPaintingLayer":true}'><path d="m-16-12c0-35.3 28.7-64 64-64h160v128c0 17.7 14.3 32 32 32h128v144h-208c-35.3 0-64 28.7-64 64v144h-48c-35.3 0-64-28.7-64-64zm384 64h-128v-128z"/><path d="m174.83 283.89h37.724v82.665c0 17.361-1.2234 30.577-3.6751 39.644-2.4668 9.0384-7.4204 16.729-14.866 23.033-7.4505 6.2699-17.002 9.4274-28.604 9.4274-12.299 0-21.815-2.0918-28.548-6.2361-6.7686-4.1499-11.978-10.206-15.658-18.212-3.6851-7.9727-5.8611-17.857-6.5129-29.619l35.848-6.0951c0.05515 6.659 0.53648 11.621 1.4089 14.846 0.88242 3.259 2.3815 5.847 4.5124 7.8656 1.439 1.3137 3.4796 1.9509 6.1419 1.9509 4.2116 0 7.3101-1.9509 9.2905-5.847 1.9554-3.9018 2.9431-10.487 2.9431-19.734v-93.682zm46.03 101.87 35.683-2.8023c0.77211 7.2228 2.3515 12.754 4.733 16.509 3.8806 6.1346 9.3958 9.2131 16.591 9.2131 5.3547 0 9.4911-1.5562 12.374-4.7137 2.913-3.1462 4.362-6.8055 4.362-10.944 0-3.93-1.3587-7.4765-4.1113-10.595-2.7425-3.118-9.1401-6.0218-19.193-8.8241-16.49-4.6066-28.212-10.769-35.227-18.46-7.0794-7.6513-10.619-17.434-10.619-29.337 0-7.7979 1.81-15.162 5.4399-22.108 3.62-6.9803 9.0599-12.438 16.34-16.402 7.28-3.9694 17.247-5.9542 29.907-5.9542 15.543 0 27.385 3.6142 35.538 10.876 8.1624 7.2228 12.996 18.742 14.56 34.547l-35.347 2.6219c-0.93757-6.907-2.913-11.937-5.9213-15.055-3.0333-3.1575-7.1948-4.7137-12.484-4.7137-4.367 0-7.6761 1.1672-9.8922 3.4733-2.2061 2.3061-3.3041 5.1422-3.3041 8.4689 0 2.4076 0.9075 4.5728 2.6924 6.5236 1.7298 2.0242 5.9162 3.8623 12.544 5.5989 16.42 4.4318 28.177 8.9312 35.252 13.459 7.1095 4.5389 12.294 10.138 15.523 16.87 3.2289 6.6984 4.8433 14.209 4.8433 22.531 0 9.7488-2.1559 18.742-6.4577 27.002-4.3269 8.2208-10.333 14.491-18.09 18.742-7.7262 4.2514-17.473 6.377-29.245 6.377-20.677 0-35.001-4.9956-42.958-14.953-7.9619-9.9518-12.459-22.604-13.517-37.946zm115.7-25.655c0-24.837 5.5252-44.183 16.591-58.002 11.075-13.854 26.483-20.761 46.247-20.761 20.246 0 35.848 6.8055 46.798 20.372 10.96 13.605 16.43 32.669 16.43 57.156 0 17.784-2.3815 32.342-7.1697 43.72-4.7831 11.378-11.717 20.236-20.757 26.574-9.0599 6.3376-20.331 9.4951-33.833 9.4951-13.703 0-25.064-2.7234-34.064-8.187-8.9847-5.4918-16.29-14.135-21.87-25.97-5.5803-11.796-8.383-26.608-8.383-44.397zm37.548 0.10713c0 15.342 2.2913 26.393 6.8588 33.086 4.5776 6.6984 10.815 10.065 18.681 10.065 8.0722 0 14.364-3.2928 18.777-9.8503 4.4472-6.5856 6.6583-18.347 6.6583-35.392 0-14.316-2.3214-24.764-6.939-31.355-4.6427-6.6308-10.905-9.9236-18.832-9.9236-7.5858 0-13.708 3.3661-18.295 10.065-4.6177 6.6984-6.909 17.823-6.909 33.306zm95.819-76.321h35.091l45.615 84.04v-84.04h35.513v152.21h-35.513l-45.365-83.584v83.584h-35.342z" fill-rule="evenodd"/></g></g></svg>`;
  } else if (name.includes('.csv')) {
    return '<i class="fa-solid fa-file-csv"></i>';
  } else if (mime.startsWith('image/')) {
    return '<i class="fa-solid fa-file-image"></i>';
  } else if (mime.startsWith('text/')) {
    if (['js','ts','tsx','py','c','h','cs','java','php','vb','swift'].includes(name.split('.')[1])) return '<i class="fa-solid fa-file-code"></i>';
    return '<i class="fa-solid fa-file-lines"></i>';
  } else if (mime.startsWith('video/')) {
    if (name.includes('.mp3')) return '<i class="fa-solid fa-file-audio"></i>';
    return '<i class="fa-solid fa-file-video"></i>';
  } else if (mime.startsWith('audio/')) {
    return '<i class="fa-solid fa-file-audio"></i>';
  } else {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M156.333 15.0465C156.333 11.4829 160.642 9.69822 163.162 12.2181L216.505 65.5612C219.025 68.0811 217.24 72.3896 213.677 72.3896H166.333C160.811 72.3896 156.333 67.9125 156.333 62.3896V15.0465Z"/><path d="M52.2895 5C41.6362 5 33 13.6362 33 24.2895V232.616C33 243.269 41.6362 251.905 52.2895 251.905H204.033C214.687 251.905 223.323 243.269 223.323 232.616V94.1579C223.323 87.5305 217.95 82.1579 211.323 82.1579H165.454C154.801 82.1579 146.165 73.5217 146.165 62.8684V17C146.165 10.3726 140.792 5 134.165 5H52.2895Z"/></svg>';
  }
}

function ActivityText(event, data, extra, strings) {
  let sep = event.split(':');
  let sel = strings[sep[0]];
  sep = sep[1].split('.');
  sel = sel[sep[0]];
 if (extra && data.files) {
    sep[1] += (data.files.length > 1 ? '_other' : '_one');
  }
  if (sep[1]) sel = sel[sep[1]]
  return sel.replaceAll(/\{\{.+?\}\}/g, function(match){return data[match.replaceAll('{{','').replaceAll('}}','')]});
}