import dynamic from 'next/dynamic'
import request from 'api'
import { connect } from 'react-redux'
import { setInfo } from 'utils/redux'
import Layout from 'components/layout'

const Blogs = dynamic({ loader: () => import('./Blogs') })

Blogs.getInitialProps = async ({ store, query }) => {
  try {
    const { categoryId, provinceId } = query
    const [info, category, province] = await Promise.all([
      request.getPageInfo('BLOG'),
      categoryId ? request.getCategory(categoryId) : Promise.resolve(),
      provinceId ? request.getProvince(provinceId) : Promise.resolve()
    ])
    store.dispatch(setInfo({ 'BLOG': info }))
    return { query, province, category }
  } catch (error) { }
}
Blogs.Layout = Layout

export default connect((state) => ({ pageInfo: state.info.BLOG }))(Blogs)