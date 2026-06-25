import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

export const BlogItem = props => {
  const { post } = props
  const { NOTION_CONFIG } = useGlobal()
  const showPageCover = siteConfig('SIMPLE_POST_COVER_ENABLE', false, CONFIG)
  const showPreview =
    siteConfig('POST_LIST_PREVIEW', false, NOTION_CONFIG) && post.blockMap

  return (
    <div key={post.id} className='skyler-post-card group my-8'>
      {/* 文章标题 */}

      <div className='skyler-post-layout'>
        <div className='article-cover'>
          {/* 图片封面 */}
          {showPageCover && (
            <div className='skyler-post-cover overflow-hidden'>
              <SmartLink href={post.href} passHref legacyBehavior>
                <LazyImage
                  src={post?.pageCoverThumbnail}
                  className='h-full w-full object-cover object-center duration-500 group-hover:scale-105'
                />
              </SmartLink>
            </div>
          )}
        </div>

        <article className='skyler-post-body article-info'>
          <h2 className='skyler-post-title-wrap'>
            <SmartLink
              href={post.href}
              className='blog-item-title'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon icon={post.pageIcon} />
              )}
              {post.title}
            </SmartLink>
          </h2>

          {/* 文章信息 */}
          <header className='skyler-post-meta'>
            <div className='skyler-post-meta-row'>
              <span className='skyler-meta-chip'>
                <a
                  href={siteConfig('SIMPLE_AUTHOR_LINK', null, CONFIG)}
                  className='transition-all duration-200 hover:text-cyan-600'>
                  <i className='fa-regular fa-user'></i> {siteConfig('AUTHOR')}
                </a>
              </span>
              <span className='skyler-meta-chip'>
                <SmartLink
                  className='transition-all duration-200 hover:text-cyan-600'
                  href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}>
                  <i className='fa-regular fa-clock' />{' '}
                  {post.date?.start_date || post.createdTime}
                </SmartLink>
              </span>
              <span className='skyler-meta-chip'>
                <TwikooCommentCount post={post} />
              </span>

              {post.category && (
                <SmartLink
                  href={`/category/${post.category}`}
                  className='skyler-meta-chip'>
                  <span className='transition-all duration-200 hover:text-cyan-600'>
                    <i className='fa-regular fa-folder mr-0.5' />
                    {post.category}
                  </span>
                </SmartLink>
              )}
              {post?.tags &&
                post?.tags?.length > 0 &&
                post?.tags.map(t => (
                  <SmartLink
                    key={t}
                    href={`/tag/${t}`}
                    className='skyler-meta-chip transition-all duration-200 hover:text-cyan-600'>
                    <span>{t}</span>
                  </SmartLink>
                ))}
            </div>
          </header>

          <main className='skyler-post-summary'>
            {!showPreview && (
              <>
                {post.summary}
                {post.summary && <span>...</span>}
              </>
            )}
            {showPreview && post?.blockMap && (
              <div className='overflow-ellipsis truncate'>
                <NotionPage post={post} />
                <hr className='border-dashed py-4' />
              </div>
            )}
          </main>

          <div className='skyler-post-action'>
            <SmartLink
              href={post.href}
              className='skyler-read-more inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold transition-all duration-200'>
              阅读全文{' '}
              <i className='fa-solid fa-angle-right align-middle'></i>
            </SmartLink>
          </div>
        </article>
      </div>
    </div>
  )
}
