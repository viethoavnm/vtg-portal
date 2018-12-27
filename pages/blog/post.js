import request from 'api'
import Layout from 'components/layout'
import Post from 'app-modules/blog/post'

Post.getInitialProps = async ({ query: { postId }, asPath }) => {
    if (!postId) return { error: { status: 404 } }
    try {
        const post = await request.getPost(postId) || {}
        return { post: { ...post, url: asPath } }
    } catch (error) { throw error }
}

Post.Layout = Layout
export default Post