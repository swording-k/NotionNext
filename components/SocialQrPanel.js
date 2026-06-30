/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

const socialQrs = [
  {
    name: '微信公众号',
    handle: '宝剑的 AI 产品笔记',
    src: '/images/qrcodes/wechat-official.jpg'
  },
  {
    name: '小红书',
    handle: '宝剑',
    src: '/images/qrcodes/xiaohongshu.jpg'
  },
  {
    name: '抖音',
    handle: '@ 宝剑 Skyler',
    src: '/images/qrcodes/douyin.jpg'
  },
  {
    name: 'B 站',
    handle: '宝剑Skyler',
    src: '/images/qrcodes/bilibili.png'
  },
  {
    name: '个人主页',
    handle: 'swording-k.github.io',
    src: '/images/qrcodes/personal-site.png'
  }
].map(item => ({
  ...item,
  fileName: item.src.split('/').pop()
}))

export default function SocialQrPanel({ variant = 'simple', compact = false }) {
  const isEndspace = variant === 'endspace'
  const [activeQr, setActiveQr] = useState(null)

  const closeLightbox = () => setActiveQr(null)

  return (
    <>
      <section
        className={`skyler-social-qrs mx-auto text-left ${
          compact ? 'max-w-full px-0' : 'max-w-5xl px-4'
        } ${isEndspace ? '' : ''}`}>
        <div className={compact ? 'mb-3' : 'mb-4 text-center'}>
          <div
            className={`text-xs font-semibold uppercase tracking-[0.24em] ${
              isEndspace ? 'text-[var(--endspace-text-muted)]' : 'text-gray-400 dark:text-gray-500'
            }`}>
            Find Me
          </div>
          <h2
            className={`mt-1 font-semibold ${
              compact
                ? isEndspace
                  ? 'text-sm text-[var(--endspace-text-primary)]'
                  : 'text-base text-gray-900 dark:text-gray-100'
                : 'text-xl text-gray-900 dark:text-gray-100'
            }`}>
            社交媒体二维码
          </h2>
        </div>
        <div
          className={`grid ${
            compact
              ? 'grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5'
              : 'grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5'
          }`}>
          {socialQrs.map(item => (
            <article
              className={`border p-2 text-center ${
                isEndspace
                  ? 'border-[var(--endspace-border-base)] bg-[var(--endspace-bg-secondary)]'
                  : 'rounded-lg border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'
              }`}
              key={item.name}>
              <button
                className='block w-full cursor-zoom-in'
                type='button'
                onClick={() => setActiveQr(item)}
                aria-label={`查看${item.name}二维码原图`}>
                <img
                  className={`mx-auto bg-white object-contain ${
                    compact ? 'h-24 w-full' : 'aspect-square w-full'
                  } ${
                    isEndspace ? 'rounded-sm p-1' : 'rounded-md p-1'
                  }`}
                  src={item.src}
                  alt={`${item.name}二维码`}
                  loading='eager'
                />
              </button>
              <div
                className={`mt-2 text-xs ${
                  isEndspace ? 'text-[var(--endspace-text-muted)]' : 'text-gray-500 dark:text-gray-400'
                }`}>
                {item.name}
              </div>
              <div
                className={`mt-0.5 break-words text-xs font-semibold leading-snug ${
                  isEndspace ? 'text-[var(--endspace-text-primary)]' : 'text-gray-900 dark:text-gray-100'
                }`}>
                {item.handle}
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeQr && (
        <div
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-6'
          role='dialog'
          aria-modal='true'
          aria-label={`${activeQr.name}二维码原图`}
          onClick={closeLightbox}>
          <div
            className='w-full max-w-xl rounded-xl bg-white p-4 shadow-2xl dark:bg-gray-950'
            onClick={event => event.stopPropagation()}>
            <div className='mb-3 flex items-center justify-between gap-4'>
              <div>
                <div className='text-sm font-semibold text-gray-900 dark:text-gray-100'>
                  {activeQr.name}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>
                  {activeQr.handle}
                </div>
              </div>
              <button
                className='rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900'
                type='button'
                onClick={closeLightbox}>
                关闭
              </button>
            </div>
            <img
              className='mx-auto max-h-[70vh] w-auto max-w-full rounded-lg bg-white object-contain p-2'
              src={activeQr.src}
              alt={`${activeQr.name}二维码原图`}
            />
            <div className='mt-4 flex flex-wrap justify-end gap-2'>
              <a
                className='rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900'
                href={activeQr.src}
                target='_blank'
                rel='noreferrer'>
                打开原图
              </a>
              <a
                className='rounded-full bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200'
                href={activeQr.src}
                download={activeQr.fileName}>
                下载图片
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
