import requests
from bottle import route, request, run, static_file, template


@route('/')
def index():
    return template('index.tpl', root='.')

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')


do_url = 'RU-MOW'

@route('/covid')
def covid():
    global do_url
    do_url = list(request.query)[0] or do_url

    url = 'https://xn--80aesfpebagmfblc0a.xn--p1ai/covid_data.json?do=region_stats&code=' + do_url
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/87.0.4280.88 Safari/537.36'}
    data = requests.get(url, headers=headers)
    return data

run(host='localhost', port=80, )
