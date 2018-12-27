import dynamic from 'next/dynamic'
import { setInfo } from 'utils/redux'
import request from 'api'
import Layout from 'components/layout'

const Homepage = dynamic({ loader: () => import('app-modules/home') })

Homepage.getInitialProps = async ({ store, isServer }) => {
  try {
    const info = await request.getPageInfo('HOME')
    if (isServer) store.dispatch(setInfo({ 'HOME': info }))
  } catch (error) { }
  return
}

Homepage.Layout = Layout
export default Homepage