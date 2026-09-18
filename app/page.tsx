'use client'

import { useMemo, useState } from 'react'

export default function Home() {
  const [client, setClient] = useState('')
  const [os, setOs] = useState('')
  const [description, setDescription] = useState('')
  const [items, setItems] = useState([{ name: '', quantity: 1, unit: 0 }])
  const total = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.unit, 0), [items])
  const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return <main className="shell">
    <header className="header"><div><div className="brand">ROOTED ORÇAMENTOS IA</div><div className="muted">Criação, revisão e organização de orçamentos profissionais</div></div><span className="tag">MVP inicial</span></header>
    <section className="grid">
      <div className="panel"><h2>Dados do orçamento</h2>
        <div className="field"><label>Cliente</label><input value={client} onChange={e => setClient(e.target.value)} placeholder="Nome do cliente" /></div>
        <div className="field"><label>Ordem de serviço</label><input value={os} onChange={e => setOs(e.target.value)} placeholder="OS-0001" /></div>
        <div className="field"><label>Descrição do serviço</label><textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descreva o serviço, equipamentos, dificuldades e observações..." /></div>
        <h2>Itens</h2>{items.map((item, index) => <div className="panel" key={index} style={{padding:14,marginBottom:10}}><div className="field"><label>Produto ou serviço</label><input value={item.name} onChange={e => setItems(items.map((x,i)=>i===index?{...x,name:e.target.value}:x))} placeholder="Ex.: Câmera de segurança" /></div><div className="field"><label>Quantidade</label><input type="number" min="1" value={item.quantity} onChange={e => setItems(items.map((x,i)=>i===index?{...x,quantity:Math.max(1,Number(e.target.value))}:x))} /></div><div className="field"><label>Valor unitário (R$)</label><input type="number" min="0" step="0.01" value={item.unit} onChange={e => setItems(items.map((x,i)=>i===index?{...x,unit:Math.max(0,Number(e.target.value))}:x))} /></div></div>)}<button className="button" onClick={() => setItems([...items,{name:'',quantity:1,unit:0}])}>+ Adicionar item</button>
      </div>
      <aside className="panel"><h2>Resumo</h2><p><b>Cliente:</b> {client || 'Não informado'}</p><p><b>OS:</b> {os || 'Não informada'}</p><p><b>Descrição:</b> {description || 'Ainda não preenchida'}</p><div className="summary"><div className="muted">Total estimado</div><strong>{money(total)}</strong></div><p className="muted">Esta primeira versão prepara o formulário e o cálculo. A integração Gemini, o modelo PDF oficial, autenticação e histórico serão adicionados nas próximas etapas.</p></aside>
    </section>
  </main>
}
