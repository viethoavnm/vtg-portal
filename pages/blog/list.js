import dynamic from 'next/dynamic'
import { requester } from 'api'
import { connect } from 'react-redux'
import { setInfo } from 'utils/redux'
import Layout from 'components/layout'

const Blogs = dynamic({ loader: () => import('app-modules/blog/list') })

Blogs.getInitialProps = async ({ store, query, isServer }) => {
  try {
    const { categoryId, provinceId } = query
    const [info, category, province] = await Promise.all([
      requester.getPageInfo('BLOG'),
      categoryId ? requester.getCategory(categoryId) : Promise.resolve(),
      provinceId ? requester.getProvince(provinceId) : Promise.resolve()
    ])
    if (isServer) store.dispatch(setInfo({ 'BLOG': info }))
    return { query, province, category }
  } catch (error) { }
}
Blogs.Layout = Layout

export default connect((state) => ({ pageInfo: state.info.BLOG }))(Blogs)