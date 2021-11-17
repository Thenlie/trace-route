import re
import requests
from requests.models import Response
from subprocess import run
import sys

URL = sys.argv[1]

result = run(['tracert', URL], capture_output=True, text=True)
output = (result.stdout)
ip = re.findall( r'[0-9]+(?:\.[0-9]+){3}', output )
time = re.findall( r'[0-9]+\sms', output )
avgTime = []

for i in range(int(len(time)/3)):
    targetTime = (time[(i)*3] + ' ' + time[((i)*3)-1] + ' ' + time[((i)*3)-2])
    timeArr = [int(s) for s in targetTime.split() if s.isdigit()]
    avgTime.append(str(round((sum(timeArr)/3), 1)))
    
def getLocation():
    for i in range(0, len(ip)-1):
        response = requests.get("http://ip-api.com/json/" + ip[i])
        data = response.json()
        status = data['status']
        if status == 'success':
            location = data['city'] + ', ' + data['regionName'] + '. ' + data['country']
            lat = str(data['lat'])
            lon = str(data['lon'])
            print('[' + lon + ', ' + lat + ']')
            print(location + ' (' + data['query'] + ') RTT: ' + avgTime[i] + 'ms')
        else:
            continue        

getLocation()  
