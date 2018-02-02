const pushAdmin = (resolve) => {
  import('@/components/othersAdmin/pushAdmin').then((module) => {
    resolve(module)
  })
}
const myReport = (resolve) => {
  import('@/components/othersAdmin/myReport').then((module) => {
    resolve(module)
  })
}
const othersAdmin = [
  {
    path: 'othersAdmin/pushAdmin',
    component: pushAdmin,
    name: 'pushAdmin',
    meta: { title: '其它管理-申请底单' }
  },
  {
    path: 'othersAdmin/myReport',
    component: myReport,
    name: 'myReport',
    meta: { title: '其它管理-公告' }
  }
]
export default othersAdmin
