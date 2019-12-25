function getQueryString(params) {
  var esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
}

function request(params) {
  var method = params.method || 'GET';
  var qs = '';
  var body;
  var headers = params.headers || {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (['GET', 'DELETE'].indexOf(method) > -1)
    qs = '?' + getQueryString(params.qs);
  else // POST or PUT
    body = JSON.stringify(params.data);

  var url = params.url + qs;

  return fetch(url, { method, headers, body });
}

class Redmine {
  constructor(key) {
    this.apiKey = key;
    this.baseUrl = 'https://redmine.netpeak.net'
  }

  _request(path, opts) {
    return request({
      url: path,
      ...opts,
    }).then(res => res.json());
  }


  request(method, path, params) {
    var isUpload = method == '/uploads.json';
    var opts = {
      method: method,
      qs: method === 'GET' ? params : undefined,
      body: method === 'PUT' || method === 'POST' ? params : undefined,
      headers: {
        'Content-Type': 'application/json'
      },
      // auth: { user: this.username, pass: this.password },
      json: !isUpload
    };

    // impersonate to a login user
    if (this.impersonate) {
      opts.headers['X-Redmine-Switch-User'] = this.impersonate;
    }

    if (this.apiKey) {
      opts.headers['X-Redmine-API-Key'] = this.apiKey;
    } else if (this.username && this.password) {
      opts.auth = { username: this.username, password: this.password };
    } else {
      throw new Error('Neither api key nor username/password provided !');
    }

    return this._request(path, opts).then((body) => body).catch(e => e);
  };


  issues(params) {
    return this.request('GET', '/issues.json', params);
  };

  get_issue_by_id(id, params) {
    if (typeof id !== 'number') throw new Error('Issue ID must be an integer above 0 !');

    return this.request('GET', '/issues/' + id + '.json', params);
  }
}

export default Redmine;