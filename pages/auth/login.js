import dynamic from 'next/dynamic'
export default dynamic({ loader: () => import('app-modules/auth/login') })