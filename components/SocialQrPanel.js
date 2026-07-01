import { useState } from 'react'

const socialLinks = [
  {
    name: '微信公众号',
    handle: '宝剑的 AI 产品笔记',
    kind: 'wechat',
    qrSrc: '/images/qrcodes/wechat-official.jpg'
  },
  {
    name: '小红书',
    handle: '宝剑',
    kind: 'xiaohongshu',
    href: 'https://xhslink.com/m/2VVYcYvNbnB'
  },
  {
    name: '抖音',
    handle: '@ 宝剑 Skyler',
    kind: 'douyin',
    href: 'https://v.douyin.com/oFIh9Po8Wk8/'
  },
  {
    name: 'B 站',
    handle: '宝剑Skyler',
    kind: 'bilibili',
    href: 'https://space.bilibili.com/1160700771'
  },
  {
    name: '个人主页',
    handle: 'swording-k.github.io',
    kind: 'site',
    href: 'https://swording-k.github.io/'
  }
]

function SocialIcon({ kind }) {
  if (kind === 'wechat') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true'>
        <path d='M9.2 5.3c-4.1 0-7.3 2.6-7.3 5.8 0 1.8 1 3.4 2.6 4.5l-.6 2.1 2.5-1.2c.8.2 1.7.4 2.8.4 4.1 0 7.3-2.6 7.3-5.8S13.3 5.3 9.2 5.3Zm-2.4 4.8a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm4.8 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z' />
        <path d='M15.2 10.5c3.8.3 6.8 2.7 6.8 5.7 0 1.6-.8 3-2.2 4l.5 1.8-2.2-1c-.8.2-1.6.3-2.5.3-3.8 0-6.9-2.3-7.3-5.2h.9c4.8 0 8.6-3 8.6-6.8 0-.2 0-.4-.1-.6Z' opacity='.72' />
      </svg>
    )
  }
  if (kind === 'xiaohongshu') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true'>
        <path d='M6.2 4.2h11.6c1 0 1.8.8 1.8 1.8v12c0 1-.8 1.8-1.8 1.8H6.2c-1 0-1.8-.8-1.8-1.8V6c0-1 .8-1.8 1.8-1.8Z' />
        <path d='M8 8.2h8M8 11.4h8M8 14.6h4.8' />
        <path d='M15.6 15.1l1.2 1.2 2.1-2.7' />
      </svg>
    )
  }
  if (kind === 'douyin') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true'>
        <path d='M14.2 4.3v9.2a4.7 4.7 0 1 1-4.7-4.7c.4 0 .8.1 1.2.2v2.9a2 2 0 1 0 .7 1.5V3.2h2.8c.4 2.1 1.8 3.6 4.1 4v3c-1.7-.1-3.1-.7-4.1-1.7Z' />
      </svg>
    )
  }
  if (kind === 'bilibili') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true'>
        <path d='M8 4.2 10 7h4l2-2.8M5.5 8h13A2.5 2.5 0 0 1 21 10.5v6A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-6A2.5 2.5 0 0 1 5.5 8Z' />
        <path d='M8.7 12.4v2.2M15.3 12.4v2.2M10 16h4' />
      </svg>
    )
  }
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z' />
      <path d='M3.8 12h16.4M12 3.8c2.1 2.3 3.2 5 3.2 8.2s-1.1 5.9-3.2 8.2M12 3.8C9.9 6.1 8.8 8.8 8.8 12s1.1 5.9 3.2 8.2' />
    </svg>
  )
}

export default function SocialQrPanel({ variant = 'simple', compact = false }) {
  const isEndspace = variant === 'endspace'
  const [wechatOpen, setWechatOpen] = useState(false)
  const wechat = socialLinks[0]

  const panelText = isEndspace
    ? 'text-[var(--endspace-text-primary)]'
    : 'text-gray-900 dark:text-gray-100'
  const mutedText = isEndspace
    ? 'text-[var(--endspace-text-muted)]'
    : 'text-gray-500 dark:text-gray-400'
  const cardClass = isEndspace
    ? 'border-[var(--endspace-border-base)] bg-[var(--endspace-bg-secondary)] hover:border-[var(--endspace-border-active)]'
    : 'rounded-lg border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 dark:hover:bg-gray-900'
  const iconClass = isEndspace
    ? 'border border-cyan-100/15 bg-cyan-50/[0.04] text-cyan-200/80 group-hover:border-cyan-200/40 group-hover:text-cyan-100'
    : 'border border-slate-200 bg-slate-50 text-slate-500 group-hover:border-cyan-300/50 group-hover:text-cyan-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:group-hover:text-cyan-300'

  return (
    <>
      <section
        className={`skyler-social-qrs mx-auto text-left ${
          compact ? 'max-w-full px-0' : 'max-w-5xl px-4'
        }`}>
        <div className={compact ? 'mb-3' : 'mb-4 text-center'}>
          <div className={`text-xs font-semibold uppercase tracking-[0.24em] ${mutedText}`}>
            Find Me
          </div>
          <h2 className={`mt-1 font-semibold ${compact ? 'text-sm' : 'text-xl'} ${panelText}`}>
            社交媒体入口
          </h2>
        </div>
        <div
          className={`grid ${
            compact
              ? 'grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1'
              : 'grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5'
          }`}>
          {socialLinks.map(item => {
            const content = (
              <>
                <span
                  className={`grid h-9 w-9 flex-none place-items-center rounded-lg transition [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[1.65] ${iconClass}`}>
                  <SocialIcon kind={item.kind} />
                </span>
                <span className='min-w-0'>
                  <span className={`block text-sm font-semibold leading-tight ${panelText}`}>
                    {item.name}
                  </span>
                  <span className={`mt-1 block truncate text-xs leading-snug ${mutedText}`}>
                    {item.handle}
                  </span>
                </span>
              </>
            )

            if (item.kind === 'wechat') {
              return (
                <button
                  className={`group flex w-full items-center gap-3 border p-3 text-left transition ${cardClass}`}
                  type='button'
                  key={item.name}
                  onClick={() => setWechatOpen(true)}>
                  {content}
                </button>
              )
            }

            return (
              <a
                className={`group flex items-center gap-3 border p-3 no-underline transition ${cardClass}`}
                href={item.href}
                target='_blank'
                rel='noreferrer'
                key={item.name}>
                {content}
              </a>
            )
          })}
        </div>
      </section>

      {wechatOpen && (
        <div
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-6'
          role='dialog'
          aria-modal='true'
          aria-label='微信公众号二维码'
          onClick={() => setWechatOpen(false)}>
          <div
            className='w-full max-w-sm rounded-xl bg-white p-4 shadow-2xl dark:bg-gray-950'
            onClick={event => event.stopPropagation()}>
            <div className='mb-3 flex items-center justify-between gap-4'>
              <div>
                <div className='text-sm font-semibold text-gray-900 dark:text-gray-100'>
                  {wechat.name}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>
                  手机微信扫码关注
                </div>
              </div>
              <button
                className='rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900'
                type='button'
                onClick={() => setWechatOpen(false)}>
                关闭
              </button>
            </div>
            <img
              className='mx-auto max-h-[70vh] w-auto max-w-full rounded-lg bg-white object-contain p-2'
              src={wechat.qrSrc}
              alt='微信公众号二维码'
            />
          </div>
        </div>
      )}
    </>
  )
}
