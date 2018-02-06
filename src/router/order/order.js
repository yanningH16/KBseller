const BatchOrder = (resolve) => {
  import('@/components/order/batchOrder').then((module) => {
    resolve(module)
  })
}
const TaskList = (resolve) => {
  import('@/components/order/taskList').then((module) => {
    resolve(module)
  })
}
const CourierList = (resolve) => {
  import('@/components/order/courierList').then((module) => {
    resolve(module)
  })
}
const Pay = (resolve) => {
  import('@/components/order/pay').then((module) => {
    resolve(module)
  })
}
const TaskListDetails = (resolve) => {
  import('@/components/order/waitingPay').then((module) => {
    resolve(module)
  })
}
const order = [{
  path: 'order/batchOrder',
  component: BatchOrder,
  name: 'batchOrder',
  meta: { title: '批量发货' }
},
{
  path: 'order/taskList',
  component: TaskList,
  name: 'taskList',
  meta: { title: '任务列表' }
},
{
  path: 'order/waitingPay',
  component: TaskListDetails,
  name: 'waitingPay',
  meta: { title: '待支付详情' }
},
{
  path: 'order/courierList',
  component: CourierList,
  name: 'courierList',
  meta: { title: '快递单列表' }
},
{
  path: 'order/batchOrder/pay',
  component: Pay,
  name: 'pay',
  meta: { title: '支付' }
}
]
export default order
