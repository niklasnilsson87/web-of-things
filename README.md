# Web of Things Project

Sammarbete tillsammans med [Adam Bergman](https://github.com/WPUtvecklare)

## Länkar

API: [https://rpi-weather-station.herokuapp.com/](https://rpi-weather-station.herokuapp.com/)

Klient: [http://weather-kalmar.surge.sh/](http://weather-kalmar.surge.sh/)

## API

Vår web-thing mäter temperatur och luftfuktighet och rapporterar data var sjätte sekund till tjänsten Adafruit.


URL: [https://rpi-weather-station.herokuapp.com/](https://rpi-weather-station.herokuapp.com/)

En motivering kring hur din/er implementering stödjer sig på teorierna kring web of things. Använd de termer som tas upp i litteraturen så som integration pattern och de olika lagren i arkitekturmodellen.

Vi har använt oss av Cloud integration pattern genom att enheten inte är direkt nåbar via en IP-adress eller URL, istället skickar vår enhet data direkt tjänsten Adafruit (broker) via MQTT-protokollet som vi sedan kan anropa deras API för att hämta data via HTTP-protokollet. 

Vi har byggt ett API som är baserat på REST där vi hämtar data från Adafruit och presenterar i HTML och JSON-format baserat på besökarens `Accept` header. API:et har implementerat följande sökvägar med GET requests:

```
/model
/properties
/properties/temperature
/properties/temperature/chart
/properties/humidity
/properties/humidity/chart
```

Eftersom vår enhet inte har stöd för `actions` eller `things` så har vi inte inkluderat någon av dessa sökvägar.

HATEOAS är delvis implementerat eftersom vi anger en root-URL där vi finner beskrivning och dokumentation av enheten. Även vid sökvägar så ger vi länkar, exempelvis om användaren besöker `/properties` så ges länkar till respektive property (temperature och humidity).

De teknologier vi har använt för den symantiska webben är HTML (Microformat) JSON, JSON-LD och RDFa (Open Graph) för att lättare kunna nås av sökmotorer.

Vi har byggt en enkel klientapplikation där vi presenterar data hämtat från API:et på följande URL: [http://weather-kalmar.surge.sh/](http://weather-kalmar.surge.sh/)
