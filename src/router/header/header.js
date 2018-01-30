const OverView = (resolve) => {
  import('@/components/header/overView').then((module) => {
    resolve(module)
  })
}
const header = [{
  path: 'header/overView',
  component: OverView,
  name: 'overView',
  meta: { title: '首页-总览' }
}]
export default header
