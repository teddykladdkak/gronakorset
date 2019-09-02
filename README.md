# Gröna korset
Projekt som ämnar digitalisera och tillgängliggöra Gröna korset konceptet, för att mäta olika fokus ämnen på vårdavdelning.

Projektet kan användas på: https://www.gronakorset.teddyprojekt.se/

Vidare läsning om konceptet kan göras på: https://sas.vgregion.se/om-sodra-alvsborgs-sjukhus/utvecklingsarbete/grona-korset/

Korset är uppdelad i flera rutor, som alla representerar en dag. Korset har även ett tema, vilken man dagligen graderar med färger hur bra eller dåligt det varit. Detta projektet ger möjlighet för all vårdpersonal att själva påverka vilken färg som slutligen kommer vara för dagen. Genom att räkna ut medianen från dagen och översätta till en färg.

## Installation
Denna kod drivs för tillfället via en webbserver (https://www.gronakorset.teddyprojekt.se/), vilket ger möjlighet att använda detta projektet utan egen server. Men ifall man trotts allt vill köra detta själv behöver följande steg genomföras.

Börja med att installera NodeJS och Npm.

1. Börja med att ladda ner filerna till önskat ställe.
2. Installera moduler via terminalen (npm i)
3. Vid behov ändra i "index.js" till önskad port.
4. Starta servern i terminalen (node .)
5. Du kommer nu tillfrågas efter följande första gången servern startas:
	1. Port servern ska lyssna på.
	2. Domännamn som kommer användas.
	3. Övrig info till mailet som skickas ut till användare när de skapar nytt ID.
	4. Gmail konto, som kommer användas för att skicka ut ID via mail.
	5. Lösenord till gmail-kontot ovan.
6. Lokal adress presenteras.

För installation av extern server, får ni hitta guider på annan plats.

## Att göra
1. Fixa bättre dokumentation.
2. Tydligare och mer designad startsida.
3. Stresstesta.