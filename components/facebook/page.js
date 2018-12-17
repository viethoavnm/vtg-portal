import React from 'react'
import { FB_APP_ID } from 'consts'

const Fanpage = ({ info = defaultPage }) =>
    (<iframe
        src={`https://www.facebook.com/plugins/page.php?href=${encodeURI(info.url)}&tabs=${info.tabs}&width=270&height=180&small_header=${info.smallHeader}&adapt_container_width=${info.adaptContainerWidth}&hide_cover=${info.hideCover}&show_facepile=${info.showFacepile}&appId=${FB_APP_ID}`}
        style={{
            border: 'none',
            overflow: 'hidden',
            width: '100%',
            height: 180
        }}
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media">
    </iframe>)

export default Fanpage

const defaultPage = {
    url: 'https://www.facebook.com/Viettrago.ungdungdulichvietnam',
    smallHeader: false,
    adaptContainerWidth: false,
    hideCover: false,
    showFacepile: true,
    appId: '1763996870388920',
    tabs: ''
}