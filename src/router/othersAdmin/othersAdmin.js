const pushAdmin = (resolve) => {
  import('@/components/othersAdmin/pushAdmin').then((module) => {
    resolve(module)
  })
}
const report = (resolve) => {
  import('@/components/othersAdmin/report').then((module) => {
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
    meta: { title: '其它管理-推广赚金' }
  },
  {
    path: 'othersAdmin/report',
    component: report,
    name: 'report',
    meta: { title: '其它管理-举报' }
  },
  {
    path: 'othersAdmin/myReport',
    component: myReport,
    name: 'myReport',
    meta: { title: '其它管理-我的举报' }
  }
]
export default othersAdmin
