function PT(path, callback) {
    fetch('https://'+localStorage.getItem('domain')+'/api/client/'+path, {
        headers: {
            authorization: 'Bearer '+localStorage.getItem('key')
        }
    }).then(async e => {
        callback()
    })
}
