import React from 'react'
import { FB_APP_ID } from 'consts'

const ShareButton = ({ url }) => (
    <iframe src={`https://www.facebook.com/plugins/like.php?href=${encodeURI(url)}&width=450&layout=standard&action=like&size=large&show_faces=true&share=true&height=80&appId=${FB_APP_ID}`}
        width="450"
        height="80"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media">
    </iframe>)

export default ShareButton