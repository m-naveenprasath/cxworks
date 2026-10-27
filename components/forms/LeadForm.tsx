'use client';

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type FormEvent } from 'react';
import { track } from '@/lib/analytics';
import { AUDITS, SERVICES } from '@/lib/data';
import { TOPICS } from '@/lib/links';
import { SITE } from '@/lib/site';
import { useUI } from '@/components/layout/UIProvider';
import { ui } from '@/components/ui/styles';

export type FormKind = 'scan' | 'book';

const noopSubscribe = () => () => {};

type Fields = Record<string, string>;
type Errors = Record<string, string | undefined>;

const PERSONAL_EMAIL =
  /@(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|msn|aol|icloud|me|mac|proton|protonmail|gmx|mail|zoho|yandex|rediffmail|qq|163)\.[a-z.]+$/;

const FIELDS: Record<
  FormKind,
  [name: string, label: string, type: string, placeholder: string, autoComplete: string][]
> = {
  scan: [
    ['name', 'Name', 'text', 'Jane Smith', 'name'],
    ['email', 'Work email', 'email', 'jane@company.com', 'email'],
    ['url', 'Website', 'text', 'company.com', 'url'],
  ],
  book: [
    ['name', 'Name', 'text', 'Jane Smith', 'name'],
    ['email', 'Work email', 'email', 'jane@company.com', 'email'],
    ['company', 'Company', 'text', 'Company name', 'organization'],
    ['url', 'Website (optional)', 'text', 'company.com', 'url'],
  ],
};
const DOORS = [
  ['sell', 'I sell online'],
  ['enq', 'I get enquiries online'],
] as const;
const DIAG_OPTS = ['Not sure yet', ...AUDITS.map((x) => x.name)];
const BUILD_OPTS = ['Not sure yet', ...SERVICES.map((x) => x.name)];

function validate(kind: FormKind, f: Fields): Errors {
  const err: Errors = {};
  if (!(f.name || '').trim()) err.name = 'Please enter your name';
  const em = (f.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) err.email = 'Enter a valid work email, like jane@company.com';
  else if (PERSONAL_EMAIL.test(em)) err.email = 'Please use your work email, not a personal one like Gmail';
  if (kind === 'scan' && !/[\w-]+\.[a-z]{2,}/i.test((f.url || '').trim()))
    err.url = 'Add your website, like company.com';
  if (kind === 'book' && !(f.company || '').trim()) err.company = 'Please enter your company';
  return err;
}

const label: CSSProperties = {
  fontFamily: "'Montserrat',sans-serif",
  fontSize: '13px',
  fontWeight: '500',
  color: 'var(--ink3)',
};
const field: CSSProperties = {
  borderRadius: '14px',
  border: '1px solid rgba(var(--ink-rgb),.14)',
  background: 'rgba(var(--bg-rgb),.5)',
  color: 'var(--ink)',
  fontFamily: 'inherit',
  fontSize: '16px',
};
const ghostBtn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  minHeight: '52px',
  padding: '0 24px',
  borderRadius: '999px',
  border: '1px solid rgba(var(--ink-rgb),.32)',
  color: 'var(--ink)',
  fontFamily: "'Montserrat',sans-serif",
  fontWeight: '500',
  fontSize: '15px',
  lineHeight: '1.2',
  textAlign: 'center',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'border-color .3s, background .3s',
};

/**
 * Lead form posted to SITE.formEndpoint (Formspree).
 *  - "scan": free AI scan request (name, work email, website, pain point)
 *  - "book": contact / booking enquiry (adds company + topic; `?topic=` preselects the topic)
 */
export function LeadForm({ kind, title, id = 'cx-form' }: { kind: FormKind; title: string; id?: string }) {
  const { showThanks } = useUI();
  const [f, setF] = useState<Fields>({});
  const [err, setErr] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [door, setDoor] = useState<'sell' | 'enq'>('sell');
  const [picked, setTopic] = useState<string | null>(null);
  const [open, setOpen] = useState<'diag' | 'build' | null>(null);

  // `?topic=` preselects the topic (server render has no query string, so it starts at the default).
  const search = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => '',
  );
  const urlTopic = new URLSearchParams(search).get('topic');
  const topic = picked ?? (urlTopic ? (TOPICS.includes(urlTopic) ? urlTopic : 'General') : 'DCX Audit');

  // Close the custom dropdowns on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !(e.target as Element).closest?.('[data-dd]') && setOpen(null);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const set = (k: string, v: string) => {
    setF((s) => ({ ...s, [k]: v }));
    setErr((s) => ({ ...s, [k]: undefined }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errors = validate(kind, f);
    if (Object.keys(errors).length) return setErr(errors);
    if (f._gotcha) return; // honeypot: bots fill hidden fields
    setStatus('loading');
    const lbl = kind === 'scan' ? 'Free AI scan request' : 'Contact / booking enquiry';
    try {
      const r = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'CXWorks website: ' + lbl + ' from ' + (f.name || '').trim(),
          _replyto: (f.email || '').trim(),
          form_type: lbl,
          type: kind,
          door,
          topic,
          diagnose: f.diag || 'Not sure yet',
          build: f.build || 'Not sure yet',
          ...f,
          page: window.location.href,
          submitted_at: new Date().toISOString(),
        }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setStatus('ok');
      track('generate_lead', { form_type: kind, topic });
      showThanks();
    } catch {
      setStatus('err');
    }
  }

  const busy = status === 'loading';
  const scan = kind === 'scan';

  const dropdown = (k: 'diag' | 'build', heading: string, opts: string[]) => {
    const v = f[k] || 'Not sure yet';
    const on = open === k;
    return (
      <div data-dd="" style={ui.stack8}>
        <span style={label}>{heading}</span>
        <span style={{ position: 'relative', display: 'block' }}>
          <button
            className="hv-7f8fefb"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={on}
            onClick={() => setOpen(on ? null : k)}
            style={{
              width: '100%',
              minHeight: '52px',
              padding: '0 44px 0 16px',
              borderRadius: '14px',
              border: `1px solid ${on ? 'rgba(var(--acc-rgb),.6)' : 'rgba(var(--ink-rgb),.14)'}`,
              background: 'linear-gradient(140deg, rgba(var(--glass),.07), rgba(var(--glass),.02))',
              backdropFilter: 'blur(18px) saturate(150%)',
              WebkitBackdropFilter: 'blur(18px) saturate(150%)',
              color: 'var(--ink)',
              fontFamily: 'inherit',
              fontSize: '16px',
              textAlign: 'left',
              cursor: 'pointer',
              position: 'relative',
              transition: 'border-color .3s, background .3s',
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {v}
            </span>
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                marginTop: '-7px',
                transform: on ? 'rotate(180deg)' : 'none',
                transition: 'transform .3s',
              }}
            >
              <path
                d="M3 5.5 L7 9.5 L11 5.5"
                fill="none"
                stroke="var(--acc)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {on && (
            <div
              role="listbox"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '0',
                right: '0',
                zIndex: '40',
                maxHeight: '280px',
                overflow: 'auto',
                overscrollBehavior: 'contain',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(var(--acc-rgb),.45) transparent',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                borderRadius: '18px',
                border: '1px solid rgba(var(--glass),.16)',
                background: 'linear-gradient(160deg, rgba(var(--acc-rgb),.08), rgba(var(--bg-rgb),.78) 40%)',
                backdropFilter: 'blur(28px) saturate(170%)',
                WebkitBackdropFilter: 'blur(28px) saturate(170%)',
                boxShadow: 'inset 0 1px 0 rgba(var(--glass),.18), 0 24px 50px -24px rgba(0,0,0,.75)',
                animation: 'cxFade .22s ease-out',
              }}
            >
              {opts.map((l) => {
                const sel = l === v;
                return (
                  <button
                    key={l}
                    className="hv-2fe54be"
                    type="button"
                    role="option"
                    aria-selected={sel}
                    onClick={() => {
                      set(k, l);
                      setOpen(null);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      minHeight: '42px',
                      padding: '0 12px',
                      border: '0',
                      borderRadius: '12px',
                      background: sel ? 'rgba(var(--acc-rgb),.12)' : 'transparent',
                      color: sel ? 'var(--ink)' : 'var(--ink3)',
                      fontFamily: 'inherit',
                      fontSize: '15px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background .2s',
                    }}
                  >
                    <span>{l}</span>
                    {sel && (
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
                        <path
                          d="M2.5 7.5 L5.5 10.5 L11.5 3.5"
                          fill="none"
                          stroke="var(--acc)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </span>
      </div>
    );
  };

  return (
    <div
      id={id}
      style={{
        ...ui.glass,
        borderRadius: '22px',
        padding: 'clamp(22px,3vw,36px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}
    >
      {status === 'ok' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '12px 0' }}>
          <span
            aria-hidden="true"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'var(--acc)',
              color: 'var(--on-acc)',
              display: 'grid',
              placeItems: 'center',
              fontSize: '24px',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
              <path d="M12 2.5c.7 4.6 3.4 7.3 8 8-4.6.7-7.3 3.4-8 8-.7-4.6-3.4-7.3-8-8 4.6-.7 7.3-3.4 8-8z" />
            </svg>
          </span>
          <h3 style={{ ...ui.h3, fontSize: '26px' }}>{scan ? 'Your scan is on its way.' : 'Thanks, we have it.'}</h3>
          <p style={ui.body}>
            {scan
              ? 'AI agents are checking all nine gates now. An expert adds a short note and you will get your Nine Gate score within about 48 hours.'
              : 'We will reply within one business day to set up a 30-minute call.'}
          </p>
          <button
            className="hv-a3fdaa4"
            onClick={() => {
              setStatus('idle');
              setF({});
              setErr({});
            }}
            style={{ ...ghostBtn, alignSelf: 'flex-start' }}
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ ...ui.h3, fontSize: '24px' }}>{title}</h3>
          {FIELDS[kind].map(([name, l, type, ph, ac]) => (
            <label key={name} style={ui.stack8}>
              <span style={label}>{l}</span>
              <input
                type={type}
                name={name}
                value={f[name] || ''}
                onChange={(e) => set(name, e.target.value)}
                placeholder={ph}
                autoComplete={ac}
                aria-invalid={!!err[name]}
                style={{
                  ...field,
                  minHeight: '52px',
                  padding: '0 16px',
                  border: `1px solid ${err[name] ? '#E77A6A' : 'rgba(var(--ink-rgb),.14)'}`,
                  outline: 'none',
                }}
              />
              {err[name] && (
                <span role="alert" style={{ fontSize: '13px', color: '#F09A8A' }}>
                  {err[name]}
                </span>
              )}
            </label>
          ))}
          {/* Honeypot: hidden from people, filled in by spam bots. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={f._gotcha || ''}
            onChange={(e) => set('_gotcha', e.target.value)}
            style={{ display: 'none' }}
          />
          {scan && (
            <div style={ui.stack8}>
              <span style={label}>Which describes you?</span>
              <div
                role="radiogroup"
                data-doorgrp=""
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}
              >
                {DOORS.map(([k, l]) => {
                  const on = door === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setDoor(k)}
                      style={{
                        minHeight: '52px',
                        padding: '0 14px',
                        borderRadius: '14px',
                        border: `1px solid ${on ? 'var(--acc)' : 'rgba(var(--ink-rgb),.14)'}`,
                        background: on ? 'rgba(var(--acc-rgb),.14)' : 'rgba(var(--bg-rgb),.5)',
                        color: on ? 'var(--ink)' : 'var(--muted)',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        cursor: 'pointer',
                      }}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '14px',
            }}
          >
            {dropdown('diag', 'Diagnose (optional)', DIAG_OPTS)}
            {dropdown('build', 'Build (optional)', BUILD_OPTS)}
          </div>
          {scan ? (
            <label style={ui.stack8}>
              <span style={label}>Your biggest pain point, or anything you&apos;d like us to know</span>
              <textarea
                name="pain"
                value={f.pain || ''}
                onChange={(e) => set('pain', e.target.value)}
                rows={4}
                placeholder="e.g. Organic traffic fell 30% since March, or: please focus on our mobile checkout."
                style={{ ...field, padding: '14px 16px', lineHeight: '1.5', resize: 'vertical' }}
              />
            </label>
          ) : (
            <>
              <label style={ui.stack8}>
                <span style={label}>What do you need?</span>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  style={{ ...field, minHeight: '52px', padding: '0 14px' }}
                >
                  {TOPICS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
              <label style={ui.stack8}>
                <span style={label}>Your biggest pain point, or anything you&apos;d like us to know (optional)</span>
                <textarea
                  name="message"
                  value={f.message || ''}
                  onChange={(e) => set('message', e.target.value)}
                  rows={3}
                  placeholder="Your pain points: where customers drop off, what changed, your top goal."
                  style={{ ...field, padding: '14px 16px', resize: 'vertical' }}
                />
              </label>
            </>
          )}
          {status === 'err' && (
            <p role="alert" style={{ margin: '0', fontSize: '14px', color: '#F09A8A' }}>
              Something went wrong. Please try again, or email {SITE.email}.
            </p>
          )}
          <button
            className="hv-7760e51"
            type="submit"
            disabled={busy}
            style={{ ...ui.btnPrimary, width: '100%', minHeight: '56px', opacity: busy ? 0.75 : 1 }}
          >
            {busy ? 'Sending…' : 'Reach out to us'}{' '}
            <span
              aria-hidden="true"
              style={{ display: 'inline-block', animation: busy ? 'cxSpin 1s linear infinite' : 'none' }}
            >
              {busy ? '◌' : '→'}
            </span>
          </button>
          <p style={{ margin: '0', fontSize: '13px', lineHeight: '1.5', color: 'var(--muted2)' }}>
            We only use your details to reply. No spam.
          </p>
        </form>
      )}
    </div>
  );
}
