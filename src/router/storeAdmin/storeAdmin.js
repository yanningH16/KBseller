const shopAdmin = (resolve) => {
  import('@/components/storeAdmin/shopAdmin').then((module) => {
    resolve(module)
  })
}
const shopAdminList = (resolve) => {
  import('@/components/storeAdmin/shopAdminList').then((module) => {
    resolve(module)
  })
}
const changeShop = (resolve) => {
  import('@/components/storeAdmin/changeShop').then((module) => {
    resolve(module)
  })
}
const storeAdmin = [{
  path: 'storeAdmin/shopAdminList',
  component: shopAdminList,
  name: 'shopAdminList',
  meta: { title: '店铺列表' }
},
{
  path: 'storeAdmin/changeShop',
  component: changeShop,
  name: 'changeShop',
  meta: { title: '修改店铺' }
},
{
  path: 'storeAdmin/shopAdmin',
  component: shopAdmin,
  name: 'shopAdmin',
  meta: { title: '添加地址' }
}
]
export default storeAdmin
