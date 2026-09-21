'use client'

import { useMemo, useState } from 'react'

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function PropostaPage() {
  const [client, setClient] = useState('Ecco Cleaner')
  const [contact, setContact] = useState('')
  const [date, setDate] = useState(new Date().toLocaleDateString('pt-BR'))
  const [notes, setNotes] = useState('')
  const website = 4000
  const entry = 2000
  const final = 2000
  const support = 700
  const totalInitial = useMemo(() => entry + final, [])

  return (
    <main className="proposal-page">
      <div className="proposal-toolbar no-print">
        <div>
          <div className="toolbar-title">ROOTED <span>PROPOSTA COMERCIAL</span></div>
          <p>Preencha os dados, revise e utilize “Gerar PDF” para imprimir ou salvar em PDF.</p>
        </div>
        <div className="toolbar-actions">
          <button className="btn btn-light" onClick={() => window.print()}>Gerar PDF / Imprimir</button>
          <button className="btn btn-lime" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Voltar ao topo ↑</button>
        </div>
      </div>

      <section className="proposal-sheet">
        <header className="proposal-header">
          <div className="rooted-brand" aria-label="Rooted Informática">
            <span className="rooted-symbol">R</span>
            <span><strong>ROOTED</strong><small>INFORMÁTICA</small></span>
          </div>
          <div className="proposal-meta">
            <span>PROPOSTA COMERCIAL</span>
            <strong>Site + Suporte de TI</strong>
            <small>Data: {date || '—'}</small>
          </div>
        </header>

        <div className="accent-line" />

        <section className="intro-section">
          <div>
            <p className="eyebrow">SOLUÇÃO DIGITAL E CONTINUIDADE OPERACIONAL</p>
            <h1>Uma estrutura digital mais profissional para a sua empresa.</h1>
            <p className="intro-copy">Esta proposta reúne o desenvolvimento do site institucional e o suporte técnico de TI para apoiar a operação da empresa com organização, segurança e atendimento contínuo.</p>
          </div>
          <div className="intro-stamp"><span>ROOTED</span><strong>TI</strong><small>TECNOLOGIA COM PROPÓSITO</small></div>
        </section>

        <section className="form-strip no-print">
          <label>Cliente / empresa<input value={client} onChange={e => setClient(e.target.value)} placeholder="Nome da empresa" /></label>
          <label>Contato<input value={contact} onChange={e => setContact(e.target.value)} placeholder="Nome, telefone ou e-mail" /></label>
          <label>Data<input value={date} onChange={e => setDate(e.target.value)} placeholder="DD/MM/AAAA" /></label>
        </section>
        <section className="print-client print-only">
          <b>Cliente:</b> {client || '—'} <span>•</span> <b>Contato:</b> {contact || '—'} <span>•</span> <b>Data:</b> {date || '—'}
        </section>

        <section className="section-block">
          <div className="section-number">01</div>
          <div className="section-content">
            <p className="eyebrow">DESENVOLVIMENTO</p>
            <h2>Site institucional</h2>
            <p>Criação e entrega de um site profissional para apresentar a empresa, seus serviços, diferenciais e canais de contato, com layout responsivo para computador e celular.</p>
            <div className="two-columns">
              <ul>
                <li>Estrutura visual alinhada à identidade da empresa.</li>
                <li>Layout adaptado para celular, tablet e computador.</li>
                <li>Seções institucionais e apresentação dos serviços.</li>
              </ul>
              <ul>
                <li>Organização dos conteúdos fornecidos pelo cliente.</li>
                <li>Publicação e ajustes finais conforme escopo alinhado.</li>
                <li>Orientação básica para utilização e atualização.</li>
              </ul>
            </div>
            <div className="price-card">
              <div><span>Investimento do site</span><strong>{money(website)}</strong></div>
              <div className="payment-pill">Entrada + conclusão</div>
            </div>
            <div className="payment-grid">
              <div><span>01 · Entrada</span><strong>{money(entry)}</strong><small>Na aprovação da proposta e início do projeto.</small></div>
              <div><span>02 · Finalização</span><strong>{money(final)}</strong><small>Na conclusão e entrega do site.</small></div>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-number">02</div>
          <div className="section-content">
            <p className="eyebrow">CONTINUIDADE E PREVENÇÃO</p>
            <h2>Suporte de TI mensal</h2>
            <p>Atendimento técnico para acompanhar o ambiente de tecnologia existente na empresa, buscando manter os equipamentos e serviços atuais organizados, disponíveis e funcionando de forma adequada.</p>
            <div className="support-grid">
              <article><b>Computadores e usuários</b><span>Orientações, ajustes, diagnóstico e suporte aos computadores existentes.</span></article>
              <article><b>Servidor e configurações atuais</b><span>Acompanhamento do servidor, configurações existentes e apoio na resolução de falhas.</span></article>
              <article><b>Câmeras e segurança</b><span>Suporte relacionado ao sistema de câmeras e aos recursos de segurança já instalados.</span></article>
              <article><b>Rede e conectividade</b><span>Diagnóstico de problemas de rede, acesso e conectividade dentro do ambiente existente.</span></article>
            </div>
            <div className="price-card monthly"><div><span>Mensalidade de suporte de TI</span><strong>{money(support)}<small>/mês</small></strong></div><div className="payment-pill">Recorrente</div></div>
          </div>
        </section>

        <section className="section-block terms-block">
          <div className="section-number">03</div>
          <div className="section-content">
            <p className="eyebrow">CONDIÇÕES DO ATENDIMENTO</p>
            <h2>Escopo, limites e responsabilidades</h2>
            <div className="terms-list">
              <div><b>Infraestrutura existente</b><p>O suporte considera os equipamentos, cabeamento, rede, servidor, câmeras e demais recursos que já estejam instalados na empresa no momento da contratação.</p></div>
              <div><b>Serviços e materiais adicionais</b><p>Qualquer infraestrutura nova ou adicional, incluindo cabos, conectores, equipamentos, pontos de rede, expansão de Wi-Fi, substituições, instalações físicas, licenças e serviços de terceiros, será avaliada e cobrada separadamente mediante aprovação.</p></div>
              <div><b>Mensalidade</b><p>A mensalidade de R$ 700,00 é devida mensalmente, mesmo quando não houver chamados, visitas ou ocorrências no período, pois mantém a disponibilidade do atendimento e o acompanhamento do ambiente.</p></div>
              <div><b>Fora do escopo automático</b><p>Projetos novos, ampliações, mudanças estruturais, desenvolvimento de sistemas, marketing, tráfego pago, CRM e demandas não descritas nesta proposta não estão incluídos e poderão ser orçados à parte.</p></div>
              <div><b>Agendamento e atendimento</b><p>Atendimentos presenciais, intervenções fora do horário comercial e demandas urgentes serão combinados conforme disponibilidade e complexidade, podendo gerar cobrança adicional quando aplicável.</p></div>
            </div>
          </div>
        </section>

        <section className="investment-section">
          <div><p className="eyebrow">RESUMO FINANCEIRO</p><h2>Investimento da proposta</h2><p>O site é pago em duas etapas. O suporte de TI é uma contratação mensal separada.</p></div>
          <div className="investment-table">
            <div><span>Site institucional</span><b>{money(website)}</b></div>
            <div><span>Entrada do site</span><b>{money(entry)}</b></div>
            <div><span>Saldo na finalização</span><b>{money(final)}</b></div>
            <div><span>Suporte de TI mensal</span><b>{money(support)} / mês</b></div>
            <div className="grand-total"><span>Total do projeto do site</span><strong>{money(totalInitial)}</strong></div>
          </div>
        </section>

        <section className="approval-section">
          <div><p className="eyebrow">PRÓXIMO PASSO</p><h2>Vamos colocar a proposta em prática?</h2><p>A aprovação inicia o alinhamento dos conteúdos do site e a organização do atendimento de suporte de TI.</p></div>
          <div className="approval-box"><b>APROVAÇÃO</b><span>Cliente: {client || '—'}</span><span>Responsável: Roberto Jean Martins</span><div className="signature-line" /></div>
        </section>

        <section className="notes-section no-print">
          <label>Observações adicionais (opcional)<textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Inclua alguma observação específica para esta proposta..." /></label>
        </section>
        {notes && <section className="notes-print print-only"><b>Observações:</b><p>{notes}</p></section>}

        <footer className="proposal-footer">
          <div><b>ROOTED INFORMÁTICA</b><span>Suporte técnico • Desenvolvimento • Segurança</span></div>
          <div><span>(41) 9750-3631</span><span>contato@rooted.com.br</span><span>www.rooted.com.br</span></div>
        </footer>
      </section>

      <style jsx global>{`
        :root { --ink:#101820; --dark:#071017; --lime:#dbe51c; --muted:#667078; --paper:#fff; --line:#e5e9e8; }
        * { box-sizing:border-box; }
        body { margin:0; background:#edf0ef; color:var(--ink); font-family:Arial, Helvetica, sans-serif; }
        button,input,textarea { font:inherit; }
        .proposal-page { min-height:100vh; padding:28px; }
        .proposal-toolbar { max-width:1120px; margin:0 auto 20px; display:flex; align-items:center; justify-content:space-between; gap:24px; background:var(--dark); color:white; border-radius:18px; padding:20px 24px; box-shadow:0 14px 36px #07101722; }
        .toolbar-title { font-size:18px; font-weight:900; letter-spacing:2px; }.toolbar-title span { color:var(--lime); font-size:11px; letter-spacing:1px; margin-left:10px; }.proposal-toolbar p { margin:6px 0 0; color:#b9c2c6; font-size:12px; }.toolbar-actions { display:flex; gap:10px; flex-wrap:wrap; }
        .btn { border:0; border-radius:999px; padding:12px 17px; font-weight:800; cursor:pointer; }.btn-light { background:white; color:var(--dark); }.btn-lime { background:var(--lime); color:var(--dark); }
        .proposal-sheet { max-width:1120px; margin:0 auto; background:var(--paper); box-shadow:0 16px 55px #07101718; overflow:hidden; }
        .proposal-header { display:flex; justify-content:space-between; align-items:center; padding:42px 52px 30px; background:var(--dark); color:white; }.rooted-brand { display:flex; align-items:center; gap:13px; }.rooted-symbol { display:grid; place-items:center; width:64px; height:64px; background:var(--lime); color:var(--dark); font-size:42px; font-weight:900; clip-path:polygon(0 0,100% 0,100% 28%,72% 28%,72% 100%,48% 100%,48% 47%,0 47%); }.rooted-brand strong { display:block; font-size:28px; letter-spacing:5px; }.rooted-brand small { display:block; color:#b8c2c5; letter-spacing:3px; font-size:10px; margin-top:5px; }.proposal-meta { text-align:right; }.proposal-meta span { display:block; color:var(--lime); font-size:10px; letter-spacing:2px; font-weight:900; }.proposal-meta strong { display:block; font-size:22px; margin:7px 0; }.proposal-meta small { color:#b8c2c5; font-size:12px; }.accent-line { height:9px; background:var(--lime); }
        .intro-section { display:grid; grid-template-columns:1fr 180px; gap:30px; padding:42px 52px 32px; }.eyebrow { margin:0 0 10px; font-size:10px; font-weight:900; letter-spacing:2px; color:#6c777d; }.intro-section h1 { margin:0; max-width:730px; font-size:42px; line-height:1.08; letter-spacing:-1.5px; }.intro-copy { color:#526067; max-width:720px; line-height:1.65; font-size:14px; }.intro-stamp { align-self:center; border:1px solid #dfe5e3; border-radius:50%; width:160px; height:160px; display:grid; place-content:center; text-align:center; transform:rotate(-8deg); }.intro-stamp span { font-size:11px; letter-spacing:3px; }.intro-stamp strong { font-size:54px; line-height:1; letter-spacing:4px; }.intro-stamp small { font-size:7px; letter-spacing:1px; margin-top:8px; }
        .form-strip { margin:0 52px 30px; padding:18px; background:#f4f6f5; border:1px solid var(--line); display:grid; grid-template-columns:1.4fr 1fr .6fr; gap:14px; }.form-strip label,.notes-section label { display:grid; gap:7px; color:#59666c; font-size:11px; font-weight:800; }.form-strip input,.notes-section textarea { width:100%; border:1px solid #d6dedb; border-radius:8px; padding:11px; background:white; color:var(--ink); }.print-client { margin:0 52px 28px; font-size:12px; color:#48545a; }.print-client span { margin:0 8px; color:#a0aaa9; }
        .section-block { display:grid; grid-template-columns:64px 1fr; gap:20px; padding:36px 52px; border-top:1px solid var(--line); }.section-number { width:46px; height:46px; display:grid; place-items:center; background:var(--dark); color:var(--lime); font-size:13px; font-weight:900; }.section-content h2,.investment-section h2,.approval-section h2 { margin:0 0 12px; font-size:30px; letter-spacing:-.8px; }.section-content > p:not(.eyebrow),.investment-section p:not(.eyebrow),.approval-section p:not(.eyebrow) { color:#59676d; line-height:1.65; font-size:13px; max-width:820px; }.two-columns { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin:24px 0; }.two-columns ul { margin:0; padding-left:18px; color:#48565d; font-size:12px; line-height:2; }.price-card { display:flex; align-items:center; justify-content:space-between; gap:15px; padding:20px 22px; background:var(--dark); color:white; margin-top:24px; }.price-card span { display:block; color:#b8c2c5; font-size:11px; }.price-card strong { display:block; color:white; font-size:31px; margin-top:5px; }.payment-pill { background:var(--lime); color:var(--dark); padding:8px 12px; border-radius:999px; font-size:10px; font-weight:900; white-space:nowrap; }.payment-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:14px; }.payment-grid > div { border:1px solid var(--line); padding:17px; }.payment-grid span { display:block; font-size:10px; font-weight:900; letter-spacing:1px; color:#647176; }.payment-grid strong { display:block; font-size:25px; margin:8px 0; }.payment-grid small { color:#778287; font-size:11px; line-height:1.5; }.support-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:22px; }.support-grid article { border-left:4px solid var(--lime); background:#f5f7f6; padding:16px; }.support-grid b { display:block; font-size:13px; }.support-grid span { display:block; margin-top:7px; color:#617077; font-size:12px; line-height:1.5; }.monthly { margin-top:20px; }.monthly strong small { font-size:12px; color:#b8c2c5; margin-left:5px; }.terms-block { background:#fbfcfb; }.terms-list { display:grid; gap:15px; margin-top:22px; }.terms-list > div { padding-bottom:14px; border-bottom:1px solid var(--line); }.terms-list b { font-size:12px; }.terms-list p { margin:6px 0 0; color:#627078; font-size:12px; line-height:1.6; }
        .investment-section { display:grid; grid-template-columns:1fr 1fr; gap:36px; padding:38px 52px; background:var(--dark); color:white; }.investment-section .eyebrow { color:#b8c2c5; }.investment-section h2 { color:white; }.investment-section p { color:#b8c2c5!important; }.investment-table { border:1px solid #324047; }.investment-table > div { display:flex; justify-content:space-between; gap:15px; padding:14px 17px; border-bottom:1px solid #324047; font-size:12px; }.investment-table > div:last-child { border-bottom:0; }.investment-table b { color:var(--lime); }.investment-table .grand-total { background:#17252b; align-items:center; }.investment-table .grand-total strong { font-size:25px; color:white; }.approval-section { display:grid; grid-template-columns:1fr 1fr; gap:36px; padding:38px 52px; }.approval-box { border:1px solid var(--line); padding:20px; display:grid; gap:12px; font-size:12px; }.approval-box b { color:#758187; font-size:10px; letter-spacing:2px; }.approval-box span { color:#536168; }.signature-line { height:35px; border-bottom:1px solid #8b969a; margin-top:18px; }.notes-section { margin:0 52px 35px; padding-top:25px; border-top:1px solid var(--line); }.notes-section textarea { min-height:80px; resize:vertical; }.notes-print { margin:0 52px 30px; padding:18px; background:#f5f7f6; font-size:12px; }.notes-print p { white-space:pre-wrap; color:#59676d; }.proposal-footer { display:flex; justify-content:space-between; gap:20px; padding:24px 52px; background:var(--lime); color:var(--dark); }.proposal-footer div:last-child { text-align:right; }.proposal-footer b,.proposal-footer span { display:block; font-size:10px; margin:4px 0; }.proposal-footer b { letter-spacing:1px; }
        .print-only { display:none; }
        @media (max-width:800px) { .proposal-page { padding:10px; }.proposal-toolbar,.proposal-header,.intro-section,.investment-section,.approval-section { display:block; }.toolbar-actions { margin-top:15px; }.proposal-header { padding:28px 24px; }.proposal-meta { text-align:left; margin-top:25px; }.intro-section,.section-block,.investment-section,.approval-section { padding:28px 24px; }.intro-section h1 { font-size:31px; }.intro-stamp { margin:25px auto 0; }.form-strip { margin:0 24px 24px; grid-template-columns:1fr; }.section-block { grid-template-columns:1fr; gap:12px; }.two-columns,.payment-grid,.support-grid { grid-template-columns:1fr; }.price-card { align-items:flex-start; flex-direction:column; }.proposal-footer { padding:22px 24px; display:block; }.proposal-footer div:last-child { text-align:left; margin-top:18px; } }
        @media print { @page { size:A4; margin:0; } body { background:white; }.no-print { display:none!important; }.print-only { display:block; }.proposal-page { padding:0; }.proposal-sheet { max-width:none; box-shadow:none; }.proposal-header { padding:30px 38px 22px; }.intro-section { padding:28px 38px 20px; }.intro-section h1 { font-size:32px; }.section-block { padding:24px 38px; break-inside:avoid; }.form-strip { display:none; }.print-client { margin:0 38px 20px; }.investment-section { padding:28px 38px; }.approval-section { padding:28px 38px; break-inside:avoid; }.proposal-footer { padding:18px 38px; }.support-grid,.two-columns { gap:10px; }.section-content h2 { font-size:24px; }.price-card strong { font-size:26px; } }
      `}</style>
    </main>
  )
}
