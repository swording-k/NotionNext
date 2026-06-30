import Announcement from './Announcement'
import Catalog from './Catalog'
import SocialQrPanel from '@/components/SocialQrPanel'

/**
 * 侧边栏
 * @param {*} props
 * @returns
 */
export default function SideBar (props) {
  const { notice } = props
  return (<>

            <Catalog {...props} />

            <SocialQrPanel compact />

            <Announcement post={notice} />

    </>)
}
