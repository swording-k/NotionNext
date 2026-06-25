import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import SocialButton from './SocialButton'

/**
 * 网站顶部
 * @returns
 */
export default function Header(props) {
  const { siteInfo } = props

  return (
    <header className='skyler-blog-hero relative z-10 overflow-hidden px-6'>
      <div className='skyler-blog-hero-bg' aria-hidden='true' />
      <div className='skyler-blog-hero-inner mx-auto flex max-w-6xl flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20'>
        <SmartLink href='/'>
          <div className='flex max-w-3xl flex-col gap-6 md:flex-row md:items-center'>
            <div className='skyler-avatar-wrap'>
              <LazyImage
                priority={true}
                src='/skyler-avatar.jpg'
                className='skyler-avatar rounded-full'
                width={116}
                height={116}
                alt={siteConfig('AUTHOR')}
              />
            </div>

            <div className='flex flex-col gap-4'>
              <div className='skyler-kicker'>Skyler Yang / AI Product Notes</div>
              <h1 className='skyler-blog-title'>
                {siteInfo?.title || siteConfig('AUTHOR')}
              </h1>
              <div
                className='skyler-blog-description'
                dangerouslySetInnerHTML={{
                  __html: siteConfig('SIMPLE_LOGO_DESCRIPTION', null, CONFIG)
                }}
              />
              <p className='skyler-blog-summary'>
                {siteInfo?.description || siteConfig('DESCRIPTION')}
              </p>
            </div>
          </div>
        </SmartLink>

        <div className='skyler-hero-side'>
          <div className='skyler-hero-pill'>Notion 写作 · NotionNext 发布</div>
          <div className='flex justify-start md:justify-end'>
            <SocialButton />
          </div>
        </div>
      </div>
    </header>
  )
}
