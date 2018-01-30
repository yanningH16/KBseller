const auditOrder = (resolve) => {
  import('@/components/order/auditOrder').then((module) => {
    resolve(module)
  })
}
const editEvlate = (resolve) => {
  import('@/components/order/editEvlate').then((module) => {
    resolve(module)
  })
}
const appraiseOrder = (resolve) => {
  import('@/components/order/appraiseOrder').then((module) => {
    resolve(module)
  })
}
const allege = (resolve) => {
  import('@/components/order/allege').then((module) => {
    resolve(module)
  })
}
const order = [{
  path: 'order/auditOrder',
  component: auditOrder,
  name: 'auditOrder',
  meta: { title: '批量发货' }
},
{
  path: 'order/editEvlate',
  component: editEvlate,
  name: 'editEvlate',
  meta: { title: '任务列表' }
},
{
  path: 'order/appraiseOrder',
  component: appraiseOrder,
  name: 'appraiseOrder',
  meta: { title: '快递单列表' }
},
{
  path: 'order/allege',
  component: allege,
  name: 'allege',
  meta: { title: '订单管理-申述' }
}
]
export default order
