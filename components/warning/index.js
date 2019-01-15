import { Modal } from 'antd';

export default function showWarning() {
  Modal.warning({
    title: 'Nhà phát triển',
    content: 'Tính năng này đang được phát triển. Xin các bạn hay thử lại sau !'
  })
}