# Decisiones de producto y arquitectura

| ID | Fecha | Decisión | Motivo |
|---|---|---|---|
| ADR-001 | 2026-10-26 | Portal **solo informativo**, nunca permite apuestas ni dinero real. | Mandato del proyecto; separar investigación del juego operativo. |
| ADR-002 | 2026-10-26 | Escenarios de demostración claramente ficticios. | Evitar publicar datos inventados como información deportiva actual. |
| ADR-003 | 2026-10-26 | Next.js + TypeScript para el MVP. | SEO, interfaz responsive y endpoints iniciales. |
| ADR-004 | 2026-10-26 | Reservar Python y PostgreSQL para fase de datos. | Motor de modelos reproducibles y trazabilidad. No simular integraciones inexistentes. |
| ADR-005 | 2026-10-26 | Separar popularidad, cuotas y probabilidad matemática. | El movimiento de precio no demuestra volumen popular. |
| ADR-006 | 2026-10-26 | GitHub nuevo, sin tocar repositorios ajenos. | Preservar independencia, historial y seguridad del proyecto. |
| ADR-007 | 2026-10-26 | Futuro cliente móvil Expo sobre API central. | Evitar duplicación de modelos y fuentes. |
| ADR-008 | 2026-10-26 | Integrar **únicamente fuentes gratuitas** con derechos comprobados; prohibidas suscripciones de datos y pruebas temporales. | Presupuesto de datos 0 USD; evita dependencia y automatización indebida. |
| ADR-009 | 2026-10-26 | Piloto técnico NFL con nflverse + NWS; The Odds API Starter sujeta a 500 créditos/mes. | Licencias y cobertura libre más claras para comenzar; separar cuotas de splits. |

| ADR-010 | 2026-10-26 | Investigación **market-first**: líneas y tendencias verificables antes del contraste deportivo. | El mercado define qué evento merece estudio; las estadísticas validan o refutan la línea. |
| ADR-011 | 2026-10-26 | Síntesis pública de **300 caracteres máximo**, con «Sugerencia:» obligatoria y control automático. | Lectura breve, concreta, verificable y apta para móviles. |

| ADR-012 | 2026-10-27 | Navegación pública sin metodología interna ni bitácora; Observatorio, Investigación de líneas y Resultados solamente. | Evitar exposición interna en la web. GitHub público requiere política de privacidad separada. |
