import Announcement from './Announcement'
import Catalog from './Catalog'

/**
 * 侧边栏
 * @param {*} props
 * @returns
 */
export default function SideBar (props) {
  const { notice } = props
  return (<>

            <Catalog {...props} />

            <Announcement post={notice} />

    </>)
}
