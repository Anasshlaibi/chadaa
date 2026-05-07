const https = require('https');

function followRedirect(url) {
    https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            // console.log('Redirecting to:', res.headers.location);
            followRedirect(res.headers.location);
        } else {
            console.log('FINAL_URL:' + url);
        }
    }).on('error', (err) => {
        console.error('Error:', err.message);
    });
}

followRedirect('https://maps.app.goo.gl/KGQawziY2WkLeEWr6');
