# Reflektion

**Vad har gått bra och vad har gått dåligt i arbetet.**

Jag tyckte att projektet gick över förväntan och med hjälp utav boken så fick vi bra hjälp om hur vi kunde strukturera upp våran "Thing"
Roligt att först pilla med breadborden och få ihop alla delar och lära känna vad en GPIO och en Ground var för något vilket var helt nytt för både mig och Adam

I början var det såklart lite kämpigt med många protokoll som snurrade runt i huvudet på oss och vi fick inte våran rasberry pi att fungera.
Men efter en återställning av pajen så fungerade allt som det ska.

Vi hade lite problem för när vi försökte nå våran paj genom skolans nätverk. Vi har förmodligen inte "Access" till att ansluta till våran paj på det viset.
Då valde vi att att gå på ett annat mönster som också beskrivs i boken. *Cloud integration* Vilket innebär att våran paj skickar "MQTT" protokoll via våran "Broker" som
i detta fall är [io.adafruit.com](https://io.adafruit.com/) som vi sedan kan få tag i data ifrån via deras API genom att använda HTTP-protokollet.

**Vad kunde gjorts bättre?**

Tycker vi strukturerade upp allting på ett väldigt bra sätt. Det som kan göras bättre är kanske att lägga upp fler routes för att få tillgång till ännu mer data som våran paj skickar.
Vi kunde ha använt oss av flera sensorer som har *actions* så vi kunde lägga till den funktionaliteten på våran "Thing".

**Vad har du lärt dig av projektet.**

* Hur webb of things fungerar, med allt ifrån hur man sätter ihop den rent tekniskt till att konfigurera den.
* Hur internet of things fungerar och med protokollen som används där som tex ZigBee
* Massor om protokoll som skickas via en rasberry pie, som tex MQTT.
* Att vi kan använda våran rasberry pie som en proxy och en server för att ansluta flera "things" som kan prata med varandra och dela information
* Hur vi på bästa sätt kan "hitta" våran paj globalt. Genom att använda oss av Linked Data, HATEOAS och JSON-LD.
* Intressant med messagePack som jag kan komma att ha nytta av i framtiden som innebär ett slags "snabbare" JSON.

**Tidsrapport där du tydligt visar hur många timmar du lagt på uppgiften**

| Date          | Task                                                                               | Hours |
|---------------|------------------------------------------------------------------------------------| -----:|
| 2020-03-02    | Setup, installation av hårdvara och få kontakt via ssh                             |     8 |
| 2020-03-03    | Fundera på protokoll och hur vi kan få hjälp av adafruit att agera som våran broker|    10 |
| 2020-03-04    | Sätta upp eget RESTful API                                                         |     8 |
| 2020-03-11    | Jobba med Routes på vårat Api samt börja med klienten                              |     4 |
| 2020-03-12    | Färdigställa klienten                                                              |     6 |
| **Total**     |                                                                                    |**36** |


**Vilka specifika delar har Du implementerat/jobbat med (om ni jobbat i grupp).**

Vi har under hela projektets gång suttit och jobbat tillsammans.