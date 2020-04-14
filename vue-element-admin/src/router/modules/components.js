import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentsDemo',
  meta: {
    title: 'Components',
    icon: 'component'
  },
  children: []
}

export default componentsRouter
