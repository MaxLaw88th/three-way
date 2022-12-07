# Three Way

Three way è un gioco "matematico" in cui risolvere una griglia di numeri 4x4, che chiameremo "campo da gioco",
arrivando ad avere una serie ordinata da 1 a 16 tramite l'aggiunta di a delle caselle intorno al campo di gioco, che chiameremo "modificatori".

Dato il campo di gioco disposto schematicamente come:

<table>
   <tbody>
      <tr>
         <td>1</td>
         <td>2</td>
         <td>3</td>
         <td>4</td>
      </tr>
      <tr>
         <td>5</td>
         <td>6</td>
         <td>7</td>
         <td>8</td>
      </tr>
      <tr>
         <td>9</td>
         <td>10</td>
         <td>11</td>
         <td>12</td>
      </tr>
      <tr>
         <td>13</td>
         <td>14</td>
         <td>15</td>
         <td>16</td>
      </tr>
   </tbody>
</table>

i modificatori si disporranno nei pressi delle righe/colonne/diagonali del campo da gioco che andranno a modificare

<table>
   <tbody>
      <tr style="color: red">
         <td></td>
         <td>cl</td>
         <td>cl</td>
         <td>cl</td>
         <td>cl</td>
         <td></td>
      </tr>
      <tr>
         <td style="color: red">ri</td>
         <td>1</td>
         <td>2</td>
         <td>3</td>
         <td>4</td>
         <td></td>
      </tr>
      <tr>
         <td style="color: red">ri</td>
         <td>5</td>
         <td>6</td>
         <td>7</td>
         <td>8</td>
         <td style="color: red">di</td>
      </tr>
      <tr>
         <td style="color: red">ri</td>
         <td>9</td>
         <td>10</td>
         <td>11</td>
         <td>12</td>
         <td style="color: red">di</td>
      </tr>
      <tr>
         <td style="color: red">ri</td>
         <td>13</td>
         <td>14</td>
         <td>15</td>
         <td>16</td>
         <td style="color: red">di</td>
      </tr>
      <tr style="color: red">
         <td></td>
         <td></td>
         <td>di</td>
         <td>di</td>
         <td>di</td>
         <td>di</td>
      </tr>
   </tbody>
</table>

Ogni numero nel campo da gioco sommerà il proprio numero di partenza (della serie da 1 a 16) a quello del proprio modificatore della stessa riga, della stessa colonna e della stessa diagonale

Ad esempio il numero di partenza 1 se dovesse avere sulla riga un 3, sulla colonna un -5 e sulla diagonale un 8 sarebbe segnato come 1+3-5+8=7

<table>
   <tbody>
      <tr style="color: red">
         <td></td>
         <td style="color: green">0</td>
         <td>0</td>
         <td>0</td>
         <td>0</td>
         <td></td>
      </tr>
      <tr>
         <td style="color: green">0</td>
         <td style="color: green">7</td>
         <td style="color: green">5</td>
         <td style="color: green">6</td>
         <td style="color: green">7</td>
         <td></td>
      </tr>
      <tr>
         <td style="color: red">0</td>
         <td style="color: green">0</td>
         <td style="color: green">14</td>
         <td>7</td>
         <td>8</td>
         <td style="color: red">0</td>
      </tr>
      <tr>
         <td style="color: red">0</td>
         <td style="color: green">4</td>
         <td>10</td>
         <td style="color: green">19</td>
         <td>12</td>
         <td style="color: red">0</td>
      </tr>
      <tr>
         <td style="color: red">0</td>
         <td style="color: green">8</td>
         <td>14</td>
         <td>15</td>
         <td style="color: green">24</td>
         <td style="color: red">0</td>
      </tr>
      <tr style="color: red">
         <td></td>
         <td></td>
         <td>0</td>
         <td>0</td>
         <td>0</td>
         <td style="color: green">0</td>
      </tr>
   </tbody>
</table>

Come si può notare sul campo di gioco non è solo a cambiare la posizione 1.
Questo perchè un'aggiunta ad un modificatore cambia tutte le posizioni di riferimento.

Perciò non basta ottenere 1 in prima posizione (infatti si potrebbe ottenere con tante configurazioni diverse dei modificatori)
ma utilizzare la combinazione giusta per ottenere in contemporanea tutti i numeri nella posizione esatta sul campo di gioco.

Ad esempio:
Sommando -3 alla prima riga, 5 alla prima colonna e -8 alla quarta diagonale,
il campo da gioco otterrebbe tutta la serie nella posizione esatta
<table>
   <tbody>
      <tr style="color: red">
         <td></td>
         <td style="color: green">5</td>
         <td>0</td>
         <td>0</td>
         <td>0</td>
         <td></td>
      </tr>
      <tr>
         <td style="color: green">-3</td>
         <td style="color: green">1</td>
         <td style="color: green">2</td>
         <td style="color: green">3</td>
         <td style="color: green">4</td>
         <td></td>
      </tr>
      <tr>
         <td style="color: red">0</td>
         <td style="color: green">5</td>
         <td style="color: green">6</td>
         <td>7</td>
         <td>8</td>
         <td style="color: red">0</td>
      </tr>
      <tr>
         <td style="color: red">0</td>
         <td style="color: green">9</td>
         <td>10</td>
         <td style="color: green">11</td>
         <td>12</td>
         <td style="color: red">0</td>
      </tr>
      <tr>
         <td style="color: red">0</td>
         <td style="color: green">13</td>
         <td>14</td>
         <td>15</td>
         <td style="color: green">16</td>
         <td style="color: red">0</td>
      </tr>
      <tr style="color: red">
         <td></td>
         <td></td>
         <td>0</td>
         <td>0</td>
         <td>0</td>
         <td style="color: green">-8</td>
      </tr>
   </tbody>
</table>

Il gioco si svolge con i seguanti passaggi:

- Ai modificatori viene assegnato un valore da -9 a 9 che andrà a cambiare i valori sul campo da gioco.
- I modificatori vengono impostati a 0 in modo da nascondere il valore reale
- Il giocatore procede assegnando ad ogni modificatore quello che ritiene sia il valore necessario a riportate la serie al suo stato iniziale
- Il gioco termina quando il campo da gioco avrà la serie in ordine da 1 a 16
- Condizione ulteriore è che i modificatori abbiano a fine gioco un valore tra -9 e 9


L'interfaccia necessità di:
- campo da gioco e modificatori
- tastiera da cui scegliere i valori da -9 a 9
- alternativa alla tastiera completa può essere una tastiera da 1 a 9 con un tasto "-" per fare il toggle tra valori positivi e negativi
- un tasto reset per il singolo modificatore (riportandolo a 0)
- un tasto reset per tutti i modificatori (riportandoli tutti a 0)
