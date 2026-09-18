'use client'

import { useMemo, useState } from 'react'

type Item = { name: string; quantity: number; unit: number; source: 'rooted' | 'client'; kind: 'equipment' | 'service' }
const warranty = 'Materiais fornecidos pela Rooted Informática possuem garantia conforme as condições do fabricante e a legislação aplicável.\nA mão de obra possui garantia legal de 90 dias sobre a execução do serviço, observadas as condições legais aplicáveis.\nMateriais fornecidos pelo cliente permanecem sujeitos às condições de garantia do respectivo fabricante ou fornecedor, sem prejuízo das responsabilidades legais relativas aos serviços prestados.'
const emptyItem = (): Item => ({ name: '', quantity: 1, unit: 0, source: 'rooted', kind: 'equipment' })

export default function Home() {
  const [client, setClient] = useState('')
  const [os, setOs] = useState('')
  const [responsible, setResponsible] = useState('Roberto Jean Martins')
  const [phone, setPhone] = useState('')
  const [payment, setPayment] = useState('PIX / Mercado Pago')
  const [description, setDescription] = useState('')
  const [markup, setMarkup] = useState(30)
  const [travel, setTravel] = useState(0)
  const [items, setItems] = useState<Item[]>([emptyItem()])
  const [status, setStatus] = useState('Rascunho')
  const [saved, setSaved] = useState(false)
  const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.unit, 0), [items])
  const total = subtotal + travel
  const equipment = useMemo(() => items.filter(i => i.kind === 'equipment').reduce((s, i) => s + i.quantity * i.unit, 0), [items])
  const labor = useMemo(() => items.filter(i => i.kind === 'service').reduce((s, i) => s + i.quantity * i.unit, 0), [items])
  const update = (index: number, patch: Partial<Item>) => setItems(current => current.map((item, i) => i === index ? { ...item, ...patch } : item))
  const payload = () => ({ client, os, responsible, phone, payment, description, markup, travel, items, total, warranty, status, updatedAt: new Date().toISOString() })
  const saveDraft = () => { localStorage.setItem('rooted-orcamento-draft', JSON.stringify(payload())); setSaved(true); setStatus('Salvo localmente') }
  const exportText = () => { const text = `ROOTED INFORMÁTICA\nORÇAMENTO ${os || 'SEM OS'}\nCliente: ${client}\nTelefone: ${phone}\nResponsável: ${responsible}\nDescrição: ${description}\n\nITENS\n${items.map(i => `${i.quantity}x ${i.name} | ${money(i.unit)} | ${i.source === 'client' ? 'Cliente' : 'Rooted'}`).join('\n')}\n\nEquipamentos: ${money(equipment)}\nMão de obra/serviços: ${money(labor)}\nDeslocamento: ${money(travel)}\nTotal geral: ${money(total)}\nForma de pagamento: ${payment}\n\n${warranty}`; const blob = new Blob([text], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `orcamento-${os || 'sem-os'}.txt`; a.click(); URL.revokeObjectURL(url) }
  const reset = () => { setClient(''); setOs(''); setPhone(''); setDescription(''); setTravel(0); setItems([emptyItem()]); setSaved(false); setStatus('Rascunho') }
  return <main className="shell">
    <header className="header"><div><div className="brand">ROOTED <span>ORÇAMENTOS IA</span></div><div className="muted">Engenharia de propostas • controle, revisão e emissão</div></div><div className="header-actions"><span className="tag">{status}</span><button className="button secondary" onClick={saveDraft}>Salvar rascunho</button></div></header>
    <div className="notice">Modo operacional local ativo. Os dados deste rascunho ficam no navegador; a sincronização com Supabase e o PDF oficial dependem da configuração das credenciais e do arquivo-base.</div>
    <section className="grid">
      <div className="panel"><div className="section-heading"><h2>Dados do orçamento</h2><span className="step">01</span></div>
        <div className="form-grid"><div className="field"><label>Cliente</label><input value={client} onChange={e => setClient(e.target.value)} placeholder="Nome ou empresa" /></div><div className="field"><label>Ordem de serviço</label><input value={os} onChange={e => setOs(e.target.value)} placeholder="OS-0001" /></div><div className="field"><label>Telefone</label><input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(41) 99999-9999" /></div><div className="field"><label>Responsável técnico</label><input value={responsible} onChange={e => setResponsible(e.target.value)} /></div></div>
        <div className="field"><label>Descrição do serviço</label><textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descreva diagnóstico, escopo, condições e observações..." /></div>
        <div className="section-heading"><h2>Itens orçados</h2><span className="step">02</span></div>
        {items.map((item, index) => <div className="item" key={index}><div className="item-top"><b>Item {index + 1}</b><span>{money(item.quantity * item.unit)}</span></div><div className="field"><label>Produto ou serviço</label><input value={item.name} onChange={e => update(index, { name: e.target.value })} placeholder="Ex.: Câmera de segurança" /></div><div className="item-grid"><div className="field"><label>Quantidade</label><input type="number" min="1" value={item.quantity} onChange={e => update(index, { quantity: Math.max(1, Number(e.target.value) || 1) })} /></div><div className="field"><label>Valor unitário (R$)</label><input type="number" min="0" step="0.01" value={item.unit} onChange={e => update(index, { unit: Math.max(0, Number(e.target.value) || 0) })} /></div><div className="field"><label>Origem</label><select value={item.source} onChange={e => update(index, { source: e.target.value as Item['source'] })}><option value="rooted">Rooted</option><option value="client">Cliente</option></select></div><div className="field"><label>Categoria</label><select value={item.kind} onChange={e => update(index, { kind: e.target.value as Item['kind'] })}><option value="equipment">Equipamento/material</option><option value="service">Serviço</option></select></div></div></div>)}
        <div className="actions"><button className="button" onClick={() => setItems(current => [...current, emptyItem()])}>+ Adicionar item</button><button className="button secondary" onClick={() => setItems(current => current.length > 1 ? current.slice(0, -1) : current)}>Remover último</button></div>
        <div className="form-grid"><div className="field"><label>Deslocamento (R$)</label><input type="number" min="0" step="0.01" value={travel} onChange={e => setTravel(Math.max(0, Number(e.target.value) || 0))} /></div><div className="field"><label>Forma de pagamento</label><select value={payment} onChange={e => setPayment(e.target.value)}><option>PIX / Mercado Pago</option><option>À vista</option><option>Cartão</option><option>Boleto</option><option>A combinar</option></select></div><div className="field"><label>Markup informativo (%)</label><input type="number" min="0" value={markup} onChange={e => setMarkup(Math.max(0, Number(e.target.value) || 0))} /></div></div>
        <div className="actions"><button className="button" onClick={exportText}>Exportar TXT</button><button className="button secondary" onClick={() => window.print()}>Imprimir / PDF</button><button className="button secondary" onClick={reset}>Limpar</button></div>
      </div>
      <aside className="panel preview"><div className="section-heading"><h2>Prévia profissional</h2><span className="step">03</span></div><div className="preview-head"><b>ROOTED INFORMÁTICA</b><span>{os || 'OS não informada'}</span></div><p><b>Cliente:</b> {client || 'Não informado'}</p><p><b>Responsável:</b> {responsible || 'Não informado'}</p><p><b>Descrição:</b> {description || 'Ainda não preenchida'}</p><div className="summary"><div className="muted">Total geral</div><strong>{money(total)}</strong><div className="line"><span>Equipamentos e materiais</span><b>{money(equipment)}</b></div><div className="line"><span>Mão de obra e serviços</span><b>{money(labor)}</b></div><div className="line"><span>Deslocamento</span><b>{money(travel)}</b></div><div className="line"><span>Markup informado</span><b>{markup}%</b></div></div><h3>Itens incluídos</h3>{items.filter(i => i.name).map((item, index) => <div className="line" key={index}><span>{item.quantity}x {item.name}</span><b>{money(item.quantity * item.unit)}</b></div>)}<h3>Garantia</h3><p className="small preserve">{warranty}</p><div className="notice">{saved ? 'Rascunho salvo neste navegador.' : 'Revise todos os campos antes de emitir o documento oficial.'}</div></aside>
    </section>
    <footer className="footer">ROOTED INFORMÁTICA • Sistema de orçamentos • versão de trabalho</footer>
  </main>
}
