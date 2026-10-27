import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=(p)=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('seis deportes sin hípica en tipos, SQL, ejemplos y vista estática',()=>{
  const paths=['lib/models.ts','packages/shared/src/contracts.ts','database/schema.sql','lib/scenarios.ts','config/demo-briefs.json','config/fuentes-gratuitas.json','preview/demo.js','preview/standalone.html'];
  for(const path of paths)assert.doesNotMatch(read(path),/h[ií]pica|equibase/i,path);
  for(const name of ['NBA','NFL','MLB','NHL','MMA','Boxeo'])assert.match(read('lib/models.ts'),new RegExp('"'+name+'"'));
  assert.equal(Object.keys(JSON.parse(read('config/demo-briefs.json'))).length,6);
});
test('directorio oficial cubre todas las disciplinas y URLs de consulta',()=>{
  const catalog=JSON.parse(read('config/portales-oficiales.json'));
  assert.deepEqual(catalog.disciplines.map(x=>x.sport),['NBA','NFL','MLB','NHL','MMA','Boxeo']);
  for(const sport of catalog.disciplines){
    assert.ok(sport.websites.length>0);
    for(const site of sport.websites)assert.match(site.url,/^https?:\/\//);
    assert.equal(sport.ingestion,'not_connected');
  }
});
test('casas investigadas no tienen ingesta automática y están fuera de UI',()=>{
  const catalog=JSON.parse(read('config/casas-observacion.json'));
  assert.equal(catalog.automatic_ingestion_enabled,false);
  assert.equal(catalog.providers.length,7);
  for(const provider of catalog.providers){
    assert.equal(provider.automated_feed_approved,false);
    assert.match(provider.url,/^https:\/\//);
  }
  for(const path of ['components/dashboard.tsx','preview/index.html','preview/demo.js','preview/standalone.html']){
    assert.doesNotMatch(read(path),/sportsbook\.draftkings|sportsbook\.fanduel|sportsbook\.caesars|bet365\.com|circasports\.com|betrivers\.com/);
  }
});
test('standalone incluye demostración funcional y los seis deportes',()=>{
  const html=read('preview/standalone.html');
  assert.match(html,/const sports = \['Todos','NBA','NFL','MLB','NHL','MMA','Boxeo'\]/);
  assert.match(html,/:root\{--bg:/);
  assert.match(html,/const examples =/);
  assert.match(html,/demostraci[oó]n/i);
  assert.doesNotMatch(html,/src="demo\.js"|href="\.\.\/app\/globals\.css"/);
});
