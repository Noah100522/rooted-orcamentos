'use client'

import { useMemo, useState } from 'react'

type Item = { name: string; quantity: number; unit: number; source: 'rooted' | 'client'; kind: 'equipment' | 'service' }

const warranty = 'Materiais fornecidos pela Rooted Informática possuem garantia conforme as condições do fabricante e a legislação aplicável.\nA mão de obra possui garantia legal de 90 dias sobre a execução do serviço, observadas as condições legais aplicáveis.\nMateriais fornecidos pelo cliente permanecem sujeitos às condições de garantia do respectivo fabricante ou fornecedor, sem prejuízo das responsabilidades legais relativas aos serviços prestados.'

export default function Home() {
  const [client, setClient] = useState('')
  const [os, setOs] = useState('')
  const [responsible, setResponsible] = useState('')
  const [payment, setPayment] = useState('PIX / Mercado Pago')
  const [description, setDescription] = useState('')
  const [markup, setMarkup] = useState(30)
  const [travel, setTravel] = useState(0)
  const [items, setItems] = useState<Item[]>([{ name: '', quantity: 1, unit: 0, source: 'rooted', kind: 'equipment' }])
  const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.unit, 0), [items])
  const total = subtotal + travel
  const update = (index: number, patch: Partial<Item>) => setItems(items.map((item, i) => i === index ? { ...item, ...patch } : item))
  const exportText = () => {
    const text = `ROOTED INFORMÁTICA\nORÇAMENTO ${os}\nCliente: ${client}\nResponsável: ${responsible}\nDescrição: ${description}\n\nITENS\n${items.map(i => `${i.quantity}x ${i.name} | ${money(i.unit)} | ${i.source === 'client' ? 'Fornecido pelo cliente' : 'Fornecido pela Rooted'}`).join('\n')}\n\nDeslocamento: ${money(travel)}\nTotal geral: ${money(total)}\nForma de pagamento: ${payment}\n\n${warranty}`
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `orcamento-${os || 'sem-os'}.txt`; a.click(); URL.revokeObjectURL(url)
  }
  return <main className="shell">
    <header className="header"><div><div className="brand">ROOTED ORÇAMENTOS IA</div><div className="muted">Orçamentos profissionais • formulário, cálculo e revisão</div></div><span className="tag">Base funcional</span></header>
    <section className="grid">
      <div className="panel"><h2>Dados do orçamento</h2>
        <div className="field"><label>Cliente</label><input value={client} onChange={e => setClient(e.target.value)} placeholder="Nome do cliente" /></div>
        <div className="field"><label>Ordem de serviço</label><input value={os} onChange={e => setOs(e.target.value)} placeholder="OS-0001" /></div>
        <div className="field"><label>Responsável técnico</label><input value={responsible} onChange={e => setResponsible(e.target.value)} placeholder="Nome do técnico" /></div>
        <div className="field"><label>Descrição do serviço</label><textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descreva o problema, serviço, observações e condições..." /></div>
        <h2>Itens orçados</h2>
        {items.map((item, index) => <div className="item" key={index}><div className="item-grid"><div className="field"><label>Produto ou serviço</label><input value={item.name} onChange={e => update(index, { name: e.target.value })} placeholder="Ex.: Câmera de segurança" /></div><div className="field"><label>Qtd.</label><input type="number" min="1" value={item.quantity} onChange={e => update(index, { quantity: Math.max(1, Number(e.target.value) || 1) })} /></div><div className="field"><label>Valor unitário (R$)</label><input type="number" min="0" step="0.01" value={item.unit} onChange={e => update(index, { unit: Math.max(0, Number(e.target.value) || 0) })} /></div></div><div className="item-grid"><div className="field"><label>Origem</label><select value={item.source} onChange={e => update(index, { source: e.target.value as Item['source'] })}><option value="rooted">Fornecido pela Rooted</option><option value="client">Fornecido pelo cliente</option></select></div><div className="field"><label>Tipo</label><select value={item.kind} onChange={e => update(index, { kind: e.target.value as Item['kind'] })}><option value="equipment">Equipamento/material</option><option value="service">Serviço</option></select></div><div className="field"><label>Total</label><input value={money(item.quantity * item.unit)} readOnly /></div></div></div>)}
        <div className="actions"><button className="button" onClick={() => setItems([...items, { name: '', quantity: 1, unit: 0, source: 'rooted', kind: 'equipment' }])}>+ Adicionar item</button><button className="button secondary" onClick={() => setItems(items.slice(0, -1).length ? items.slice(0, -1) : items)}>Remover último</button></div>
        <div className="field"><label>Deslocamento (R$)</label><input type="number" min="0" step="0.01" value={travel} onChange={e => setTravel(Math.max(0, Number(e.target.value) || 0))} /></div>
        <div className="field"><label>Forma de pagamento</label><select value={payment} onChange={e => setPayment(e.target.value)}><option>PIX / Mercado Pago</option><option>À vista</option><option>Cartão</option><option>Boleto</option><option>A combinar</option></select></div>
        <div className="field"><label>Markup informativo (%)</label><input type="number" min="0" value={markup} onChange={e => setMarkup(Math.max(0, Number(e.target.value) || 0))} /></div>
        <div className="actions"><button className="button" onClick={exportText}>Exportar resumo TXT</button><button className="button secondary" onClick={() => window.print()}>Imprimir / salvar PDF</button></div>
      </div>
      <aside className="panel"><h2>Prévia e resumo</h2><p><b>Cliente:</b> {client || 'Não informado'}</p><p><b>OS:</b> {os || 'Não informada'}</p><p><b>Responsável:</b> {responsible || 'Não informado'}</p><p><b>Descrição:</b> {description || 'Ainda não preenchida'}</p><div className="summary"><div className="muted">Total geral</div><strong>{money(total)}</strong><div className="line"><span>Itens</span><b>{money(subtotal)}</b></div><div className="line"><span>Deslocamento</span><b>{money(travel)}</b></div><div className="line"><span>Markup informado</span><b>{markup}%</b></div></div><div className="notice">O PDF oficial será aplicado por sobreposição quando o arquivo-base estiver disponível. Até lá, use a impressão do navegador para revisão.</div><h2 style={{marginTop:24}}>Garantia</h2><p style={{whiteSpace:'pre-line',fontSize:13,lineHeight:1.6}}>{warranty}</p><h2 style={{marginTop:24}}>Itens por origem</h2>{items.filter(i => i.name).map((item, index) => <div className="line" key={index}><span>{item.name}</span><small>{item.source === 'client' ? 'Cliente' : 'Rooted'}</small></div>)}</aside>
    </section>
  </main>
}
