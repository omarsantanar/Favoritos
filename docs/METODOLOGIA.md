# Metodología y criterios editoriales

## Orden de investigación y formato obligatorio

1. **Mercado primero:** identificar líneas deportivas del día (ganador, hándicap, totales), evento, selección, cuota, casa, fuente y hora de captura.
2. **Tendencia documentada:** priorizar las apuestas más populares solo si existen datos gratuitos y verificables de boletos, volumen o dinero. No confundir cambios de cuota con popularidad.
3. **Contraste deportivo:** para cada línea relevante, revisar rendimiento, alineaciones, lesiones, calendario, forma reciente y clima cuando aplique.
4. **Juicio del analista:** estimar aproximadamente el desenlace y la incertidumbre; no inventar probabilidades ni llamar valor esperado a una simple opinión.
5. **Publicación breve:** un único análisis por selección, **máximo 300 caracteres**, que mencione la línea, el factor decisivo y cierre con «Sugerencia: [selección o no seleccionar]». Sin garantías.

El titular, deporte, fecha, fuente, cuota, hora y metadatos pueden mostrarse en campos separados; el **análisis editorial**, incluida la sugerencia, no puede superar 300 caracteres (conteo Unicode). Si faltan datos decisivos, sugerir «sin selección respaldada». Los justificantes se guardan para auditoría interna, no como narración pública extensa.

## Capas diferentes

1. **Hecho verificado:** hora, participantes, alineación confirmada, resultados y fuente original.
2. **Hipótesis:** consecuencia probable de un hecho (p.ej. viento fuerte sobre patadas largas). No se confunde con causalidad demostrada.
3. **Probabilidad calculada:** porcentaje de un modelo ejecutado, con datos de corte, versión y evaluación fuera de muestra.
4. **Precio de mercado:** cuota tomada de una fuente/casa concreta con fecha y hora.
5. **Popularidad documentada:** participación o volumen en una muestra explícita, nunca deducida de línea cambiante.

## Métricas

- Probabilidad implícita bruta: `1 / cuota decimal`.
- Valor esperado por unidad: `p × cuota decimal − 1`.
- Para un mercado exhaustivo, probabilidad ajustada por margen proporcional: `(1/cuota_i) / Σ_j (1/cuota_j)`. Requiere todos los resultados del mercado, mismo proveedor y momento.
- Alta probabilidad de victoria no implica EV positivo ni sugerencia respaldada.
- Un EV positivo solo merece mención cuando `p` proviene de un procedimiento reproducible y el margen de error lo permite.

## Promoción de investigación a pronóstico

Exigir fuente original del evento, disponibilidad de participantes, cuotas y horario, modelo documentado y contraargumentos. Si un dato esencial falta: **SIN SELECCIÓN RESPALDADA**. El registro del pronóstico debe ser inmutable tras la publicación.

## Evaluación

Backtesting temporal con evitar *look-ahead bias*, Brier score, curvas de calibración, precisión, rentabilidad hipotética a unidad fija y contrastes por disciplina/mercado. No modificar pronósticos pasados ni elegir retroactivamente solo casos acertados.
