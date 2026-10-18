const fs = require('fs')
const path = require('path')
const dir = 'src/rules'
const ids = []
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.ts') || f === 'explain.ts' || f === 'alias.ts' || f === 'index.ts' || f === 'make.ts') continue
  const t = fs.readFileSync(path.join(dir, f), 'utf8')
  const re = /id: '([^']+)'|lesson\([^,]+,[^,]+, '([^']+)'/g
  for (const m of t.matchAll(re)) ids.push(m[1] || m[2])
}
const expPath = 'src/rules/explain.ts'
let exp = fs.readFileSync(expPath, 'utf8')
const keys = [...exp.matchAll(/^  '([^']+)':/gm)].map((m) => m[1])
const idSet = new Set(ids)
const extra = keys.filter((id) => !idSet.has(id))
const missing = ids.filter((id) => !keys.includes(id))
console.log('rules', ids.length, 'keys', keys.length)
console.log('MISSING', missing.join(', ') || '-')
console.log('EXTRA', extra.join(', ') || '-')

if (process.argv.includes('--strip') && extra.length) {
  for (const id of extra) {
    const block = new RegExp(`\\n  '${id.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}': \\{[\\s\\S]*?\\n  \\},`)
    if (!block.test(exp)) {
      console.log('no block', id)
      continue
    }
    exp = exp.replace(block, '')
  }
  fs.writeFileSync(expPath, exp)
  console.log('stripped', extra.length)
}
