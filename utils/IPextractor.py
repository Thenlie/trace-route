import re
import requests
from requests.models import Response
from subprocess import run
import sys

URL = sys.argv[1]

result = run(['tracert', URL], capture_output=True, text=True)
s = (result.stdout)

ip = re.findall( r'[0-9]+(?:\.[0-9]+){3}', s )

def getLocation():
    for i in range(len(ip)):
        response = requests.get("http://ip-api.com/json/" + ip[i])
        data = response.json()
        status = data['status']
        if status == 'success':
            location = data['city'] + ', ' + data['regionName'] + '. ' + data['country']
            lat = str(data['lat'])
            lon = str(data['lon'])
            print('[' + lon + ', ' + lat + ']')
            print(location)
        else:
            continue        

getLocation()  
