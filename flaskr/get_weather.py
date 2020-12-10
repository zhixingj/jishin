import requests
api_key="10c6f58d531d60f41d64ad7e7d1a33ff"
addr = "Providence"
def get_weather():
    res = requests.get("http://api.openweathermap.org/data/2.5/weather",
    params={"appid":api_key, "q":addr})
    if res.status_code != 200 :
        raise Exception("ERROR: API request unsuccessful.")
    data = res.json()
    return data["weather"][0].get("description"), data["main"].get("feels_like"), data["main"].get("humidity")