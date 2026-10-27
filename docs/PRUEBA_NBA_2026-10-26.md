# Prueba NBA: lunes 26 de octubre de 2026

**Radar Deportivo · Laboratorio v0.1.3 · No publicar como pronósticos propios**

**Corte de mercado:** 2026-10-26 13:05, Santo Domingo (DunkAPI, líneas atribuidas a FanDuel). **Corte oficial de lesiones:** 2026-10-26 12:45, Santo Domingo (NBA). **Probabilidades externas:** numberFire publicadas por FanDuel Research; la hora exacta de generación del modelo externo no fue informada.

## Verificaciones

- Nueve encuentros programados de NBA con horario local UTC-4; ambos husos (EDT y Santo Domingo) coinciden el 26 de octubre de 2026.
- Mercado: ganador (moneyline), hándicap y total; referencia puntual FanDuel publicada en una página agregadora, **no API conectada ni oferta de precios en vivo**.
- Reportes NBA: MIN, IND, OKC, MEM y UTA aparecen con informes pendientes en el PDF consultado. Otros equipos muestran bajas y estados de duda; **no inferir que equipo sin nombres listados tiene plantilla íntegra**.
- Últimos registros disponibles: entre dos y tres partidos de temporada 2026-27 por equipo, muestra extremadamente pequeña. Comparación auxiliar: net rating 2025-26 de Keel Stats y 2026-27 de BoxScore Lab.
- Todos los encuentros se juegan bajo techo. No aplicar directamente lluvia, viento o temperatura exterior.
- Fuente de distribución de boletos y dinero: VSiN página pública dice «No splits data available for Monday, Oct 26». Popularidad **no verificable**.

## Cuadro completo de contrastación

| Hora RD | Evento | Favorito por numberFire | P externa | Moneyline FanDuel* | P implícita bruta | P mercado sin margen** | EV hipotético*** | Estado |
|---|---|---|---:|---:|---:|---:|---:|---|
| 19:00 | WAS @ CHA | CHA | 87.34% | -144 | 59.02% | 56.71% | +47.99% | ANOMALÍA: brecha modelo-mercado extrema |
| 19:00 | MIN @ CLE | CLE | 69.75% | -210 | 67.74% | 65.15% | +2.96% | Bajas MIN no entregadas, candidato solo a revisión |
| 19:30 | CHI @ BOS | BOS | 83.36% | -720 | 87.80% | 84.48% | -5.06% | Favorito deportivo, precio desfavorable según tercero |
| 19:30 | DAL @ MIA | MIA | 81.20% | -295 | 74.68% | 71.75% | +8.73% | Flagg cuestionable; MIA 0-3; revisar modelo |
| 20:00 | IND @ MIL | MIL | 66.90% | +142 | 41.32% | 39.73% | +61.90% | ANOMALÍA: tercero y mercado favorecen equipos opuestos |
| 20:00 | PHX @ OKC | OKC | 70.50% | -390 | 79.59% | 76.54% | -11.42% | Ganador probable del mercado, EV hipotético negativo |
| 20:30 | ATL @ HOU | HOU | 67.46% | -198 | 66.44% | 63.86% | +1.53% | Ventaja extremadamente pequeña, sin robustez demostrada |
| 21:00 | MEM @ UTA | UTA | 54.85% | -116 | 53.70% | 51.54% | +2.13% | Ambos reportes pendientes, alta variabilidad |
| 22:00 | GSW @ DEN | DEN | 71.19% | -240 | 70.59% | 67.78% | +0.85% | Mínima ventaja aparente, sin valor robusto |

\* El precio representa el equipo de la columna «favorito por numberFire»; todos proceden de un solo corte de FanDuel atribuido por DunkAPI.

\** Calculada con los dos precios moneyline FanDuel del mismo juego y corte, dividiendo la probabilidad implícita de la selección por la suma de probabilidades implícitas de ambas alternativas.

\*** EV = P externa × cuota decimal – 1. **No es la estimación independiente de Radar Deportivo**; no se ha comprobado su calibración histórica, ni fecha de actualización de las probabilidades, ni ajustes de lesión. Un EV positivo de esta tabla NO autoriza recomendaciones.

## Conclusión editorial

**SIN APUESTA RECOMENDABLE** bajo criterios matemáticos exigentes, porque aún no existe un modelo propio ajustado por participantes y validado fuera de muestra. Esta prueba demuestra que sí se pueden recuperar eventos, líneas gratuitas, lesiones, estadísticas y proyectar sus implicaciones, pero también demuestra por qué filtrar modelos incompatibles es esencial.

### Lectura deportiva provisional (no recomendaciones de mercado)

1. **Miami sobre Dallas**: favorito en la línea; las bajas confirmadas de Dallas (Aldama, Lively II, Marshall, Biberovic) y Cooper Flagg cuestionable refuerzan la hipótesis. En contra: Miami 0-3 y net rating temprano -14.6, además del precio alto.
2. **Boston sobre Chicago**: mayor respaldo del diferencial de eficiencia 2025-26 (+7.9 vs -5.0) y ausencia de Nic Claxton en Chicago; sin embargo, el modelo externo publicado paga negativamente al precio observado.
3. **Houston sobre Atlanta**: Houston 3-0 y net rating del año anterior +5.3 frente a +2.3 de Atlanta; los equipos se enfrentaron dos días antes con victoria 121-114 para Houston. La diferencia esperada frente al precio es minúscula.
4. **Denver sobre Golden State**: GSW 0-3, Jimmy Butler III, Moses Moody y Kristaps Porzingis fuera; Denver local, aunque también presenta bajas/dudas. Hay ventaja deportiva, no de precio demostrable.
5. **Cleveland sobre Minnesota**: Cleveland local, Minnesota con segundo juego consecutivo tras ganar a Toronto el domingo; MIN empezó 3-0, con net rating +22.4 en muestra breve, y su reporte oficial todavía faltaba al corte. Selección poco firme.

### Descartes prioritarios

- **CHA vs WAS**: alerta de modelo 87.34% frente a precio equivalente a 59.02% bruto, con bajas relevantes en Charlotte y Washington. No utilizar el aparente EV +47.99%.
- **IND vs MIL**: modelo de tercero 66.90% a Milwaukee, pero mercado coloca a Indiana como favorito por 4.5 puntos y Bucks 0-3. No utilizar el aparente EV +61.90%.
- **OKC vs PHX**: ambos indicios de favorito Oklahoma City, pero el precio supera la probabilidad externa publicada; no se recomienda por valor matemático.
- **MEM vs UTA**: informes sin entregar y poco historial actual; no recomendar una ventaja aparente pequeña.

## Fuentes verificadas, consulta 2026-10-26

1. NBA oficial, PDF 12:45 ET: https://ak-static.cms.nba.com/referee/injury/Injury-Report_2026-10-26_12_45PM.pdf
2. NBA, serie de reportes actualizados: https://official.nba.com/nba-injury-report-2026-27-season/
3. FanDuel Research / numberFire, pronósticos publicados para 26 oct: https://www.fanduel.com/research/nba-predictions-odds-10-26-2026
4. DunkAPI, moneylines FanDuel y otras casas, corte 13:05 ET: https://dunkapi.com/odds
5. Keel Stats, temporada 2025-26: https://keelstats.com/es/teams?season=2026
6. BoxScore Lab, muestra 2026-27: https://boxscorelab.com/seasons/2026-27/
7. VSiN, calendario y PPG/PPA del año actual: https://data.vsin.com/nba/?gamedate=2026-10-26
8. VSiN, distribución de boletos/dinero (no disponible en el corte): https://data.vsin.com/betting-splits/?source=DK&sport=NBA

## Reproducibilidad

- Captura manual: `research/nba/2026-10-26-snapshot.json`.
- Cálculos auditables: `node scripts/evaluate-nba-snapshot.mjs`.
- Pruebas: `npm test`; ninguna prueba equivale a calibración deportiva.
- No existen pronósticos propios sellados en el historial. No se utilizarán resultados posteriores para modificar este reporte.
