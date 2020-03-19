# Personlig reflektion – Examination 3

Det har varit lärorikt och givande att testa på att konfigurera en web-thing, något som tidigare känts som en djungel men som har klarnat upp tack vare läsning ur kurslitteraturen.

I början var det en utmaning att förstå hur koppling av komponenterna skulle gå till, på vilken plats resistorer och kopplingstrådar skulle vara placerade. Vi började med att direkt försöka oss på att koppla temperatursensorn enligt bokens instruktioner, vilket visade sig vara att ta vatten över huvudet. Istället började vi om från början och följde bokens olika moment steg för steg varpå det första momentet var att koppla en lampa som skulle lysa på/av i intervaller. När vi kom till temperatursensorn föll alla bitar på plats och vi var redo att börja koda för att spara den data som sensorn rapporterar. Den initiala tanken var att använda MongoDB för att lagra data men efter att ha läst om Adafruit och dess möjligheter så föll valet på det. Vi öppnade upp en anslutning från vår Raspberry Pi till Adafruit via MQTT protokollet och skickade data till Adafruit i intervaller. I Adafruits gränssnitt kunde vi skapa flöden som uppdaterades live där vi tydligt kunde se att rapporteringen av temperatur och luftfuktighet fungerade.

Därefter funderade vi över hur vi skulle kunna skapa ett API för vår WoT-enhet och började skriva en del kod på enheten tills att vi skulle försöka nå enheten från våra datorer. På skolans nätverk var enheten uppkopplad via nätverksuttag och vi försökte ansluta till IP-adressen över WiFi, vilket inte fungerade. Vi läste oss till att vi behöver implementera ”port forwarding” vilket vi provade med en rad olika tjänster, något som inte heller fungerade. Slutligen insåg vi att det inte kommer gå att nå enheten över internet så länge enheten körs på skolans nätverk och därför beslutade vi oss för att köra Cloud-lösningen istället. I efterhand är jag glad över att vi stötte på dessa problem eftersom vi nu har säkrat upp vår enhet genom att den inte går att nå utifrån, den skickar endast data till Adafruit. Vi skapade en separat API-applikation som inte har någon direktkontakt med vår enhet utan den hämtar data från Adafruit. Utformandet av API:et gick smidigt, bokens instruktioner var tydliga att följa och det blev ännu lättare när vi kollade på hur bokens exempel på ett API var konstruerat. Klientapplikationen gick relativt smidigt att bygga. Vi använde oss av ramverket Svelte som vi båda har erfarenhet av sedan tidigare. Det som var en utmaning i klientapplikationen var att visa grafer med statistik över datan. 

Jag har lärt mig mycket tack vare boken, både om hur enheter som Raspberry Pi:s fungerar och om installation och konfiguration. Jag vet nu hur jag ska gå tillväga om jag skulle vilja använda en sådan enhet till andra syften. Jag vet att det finns tydliga standarder att förhålla sig till om man vill använda en sådan enhet som ett API. Jag vet vad man ska förhålla sig till om man vill göra sin enhet nåbar via internet. Jag har lärt mig om MQTT-protokollet och att en enhet kan prata med andra smarta enheter. Jag har lärt mig om ”The bootstrap problem”, hur enheten ska kunna hittas av andra. Dessutom har jag som bonus lärt mig att skapa grafer i JavaScript.

Jag och Niklas har arbetat lika mycket i uppgiften och med samma arbetsuppgifter. När vi har kodat så har vi parprogrammerat.

## Tidsrapport

| Datum | Uppgift | Timmar |
|---|---|---|
| 2020-03-02 | Installation och konfiguration av operativsystem, sensorer och ansluta till enheten över SSH | 8 |
| 2020-03-03 | Fundera på protokoll och hur vi kan få hjälp av adafruit att agera som vår broker | 10 |
| 2020-03-04 | Sätta upp eget RESTFul API | 8 |
| 2020-03-11 | Arbeta med routes på API:et samt börja med klienten | 4 |
| 2020-03-12 | Färdigställa klienten | 6 |
| **Total**| |**36** |
