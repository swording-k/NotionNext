/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    
  // 底色
  body {
      background:
        radial-gradient(circle at top left, rgba(125, 211, 252, 0.18), transparent 32rem),
        radial-gradient(circle at 88% 8%, rgba(231, 191, 120, 0.12), transparent 28rem),
        #f8fafc;
  }

  .dark body{
      background:
        radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 32rem),
        radial-gradient(circle at 88% 8%, rgba(231, 191, 120, 0.1), transparent 28rem),
        #05070b;
  }
  // 文本不可选取
    .forbid-copy {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
  
  #theme-simple {
    --skyler-ink: #111827;
    --skyler-muted: #64748b;
    --skyler-line: rgba(15, 23, 42, 0.1);
    --skyler-cyan: #0891b2;
    --skyler-gold: #c0842b;
  }

  .dark #theme-simple {
    --skyler-ink: #f8fafc;
    --skyler-muted: #94a3b8;
    --skyler-line: rgba(248, 250, 252, 0.13);
    --skyler-cyan: #67e8f9;
    --skyler-gold: #e7bf78;
  }

  #theme-simple #container-wrapper {
    max-width: 1180px;
    padding-top: 2.5rem;
  }

  #theme-simple .skyler-blog-hero {
    min-height: 420px;
    color: white;
    background: #07111c;
  }

  #theme-simple .skyler-blog-hero-bg {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(4, 7, 13, 0.92), rgba(4, 7, 13, 0.66), rgba(4, 7, 13, 0.34)),
      url('/skyler-blog-cover.png') center / cover no-repeat;
    transform: scale(1.02);
  }

  #theme-simple .skyler-blog-hero::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 46%;
    background: linear-gradient(to bottom, transparent, rgba(248, 250, 252, 0.98));
    pointer-events: none;
  }

  .dark #theme-simple .skyler-blog-hero::after {
    background: linear-gradient(to bottom, transparent, rgba(5, 7, 11, 0.98));
  }

  #theme-simple .skyler-blog-hero-inner {
    position: relative;
    z-index: 1;
  }

  #theme-simple .skyler-avatar-wrap {
    display: grid;
    width: 128px;
    height: 128px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 22px 70px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(18px);
  }

  #theme-simple .skyler-avatar {
    width: 116px;
    height: 116px;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.75);
  }

  #theme-simple .skyler-kicker,
  #theme-simple .skyler-hero-pill {
    color: #67e8f9;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  #theme-simple .skyler-blog-title {
    max-width: 720px;
    margin: 0;
    color: #fff;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.7rem, 7vw, 5.6rem);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.03em;
  }

  #theme-simple .skyler-blog-description {
    max-width: 640px;
    color: rgba(255, 255, 255, 0.88);
    font-size: 1.05rem;
    line-height: 1.7;
  }

  #theme-simple .skyler-blog-summary {
    max-width: 720px;
    margin: 0;
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.98rem;
    line-height: 1.7;
  }

  #theme-simple .skyler-hero-side {
    display: grid;
    gap: 1rem;
    color: white;
  }

  #theme-simple .skyler-hero-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    padding: 0 14px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(14px);
  }

  #theme-simple #announcement-content {
    /* background-color: #f6f6f6; */
  }
  
  #theme-simple .blog-item-title {
    display: block;
    color: var(--skyler-ink);
    font-size: clamp(1.65rem, 3.2vw, 2.45rem);
    font-weight: 760;
    line-height: 1.12;
    text-decoration: none;
  }
  
  .dark #theme-simple .blog-item-title {
    color: var(--skyler-ink);
  }

  #theme-simple .blog-item-title:hover {
    color: var(--skyler-cyan);
  }

  #theme-simple .skyler-post-card {
    overflow: hidden;
    padding: 0;
    border: 1px solid var(--skyler-line);
    border-radius: 1.15rem;
    background: rgba(255, 255, 255, 0.76);
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
    backdrop-filter: blur(20px);
  }

  .dark #theme-simple .skyler-post-card {
    background: rgba(15, 23, 42, 0.68);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
  }

  #theme-simple .skyler-post-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  #theme-simple .skyler-post-cover {
    width: 100%;
    height: clamp(15rem, 30vw, 21rem);
    border-radius: 0;
    background: rgba(15, 23, 42, 0.08);
  }

  #theme-simple .skyler-post-body {
    display: grid;
    gap: 1rem;
    min-width: 0;
    padding: clamp(1.25rem, 2.8vw, 2rem);
  }

  #theme-simple .skyler-post-title-wrap {
    margin: 0;
    max-width: 48rem;
  }

  #theme-simple .skyler-post-meta,
  #theme-simple .skyler-post-summary {
    color: var(--skyler-muted);
  }

  #theme-simple .skyler-post-meta {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.35;
  }

  #theme-simple .skyler-post-meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  #theme-simple .skyler-meta-chip {
    display: inline-flex;
    max-width: 100%;
    min-height: 2rem;
    align-items: center;
    gap: 0.35rem;
    border: 1px solid var(--skyler-line);
    border-radius: 999px;
    padding: 0.35rem 0.75rem;
    color: var(--skyler-muted);
    background: rgba(248, 250, 252, 0.78);
    white-space: nowrap;
  }

  .dark #theme-simple .skyler-meta-chip {
    background: rgba(15, 23, 42, 0.72);
  }

  #theme-simple .skyler-post-summary {
    display: -webkit-box;
    max-width: 46rem;
    margin: 0;
    overflow: hidden;
    font-size: 1rem;
    line-height: 1.75;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  #theme-simple .skyler-post-action {
    margin-top: 0.35rem;
  }

  #theme-simple .skyler-read-more {
    border: 1px solid rgba(8, 145, 178, 0.28);
    color: var(--skyler-cyan);
    background: rgba(8, 145, 178, 0.08);
  }

  #theme-simple .skyler-read-more:hover {
    border-color: rgba(8, 145, 178, 0.5);
    color: #fff;
    background: #0891b2;
  }
  
  .notion {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  
  
  /*  菜单下划线动画 */
  #theme-simple .menu-link {
      text-decoration: none;
      background-image: linear-gradient(var(--skyler-cyan), var(--skyler-cyan));
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 0 2px;
      transition: background-size 100ms ease-in-out;
  }
   
  #theme-simple .menu-link:hover {
      background-size: 100% 2px;
      color: var(--skyler-cyan);
      cursor: pointer;
  }

  @media (max-width: 768px) {
    #theme-simple .skyler-blog-hero {
      min-height: 540px;
    }

    #theme-simple .skyler-blog-title {
      font-size: clamp(2.35rem, 13vw, 4rem);
    }

    #theme-simple .skyler-post-cover {
      width: 100%;
      height: 14rem;
    }

    #theme-simple .skyler-post-body {
      padding: 1.15rem;
    }

    #theme-simple .blog-item-title {
      font-size: 1.55rem;
      line-height: 1.18;
    }

    #theme-simple .skyler-post-meta-row {
      gap: 0.4rem;
    }

    #theme-simple .skyler-meta-chip {
      min-height: 1.85rem;
      padding: 0.3rem 0.62rem;
      font-size: 0.78rem;
    }

    #theme-simple .skyler-post-summary {
      font-size: 0.95rem;
      -webkit-line-clamp: 4;
    }
  }
  
  

  `}</style>
}

export { Style }
