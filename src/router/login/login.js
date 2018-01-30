const Login = (resolve) => {
  import('@/components/login/login').then((module) => {
    resolve(module)
  })
}
const Password = (resolve) => {
  import('@/components/login/Password').then((module) => {
    resolve(module)
  })
}
const Reg = (resolve) => {
  import('@/components/login/reg').then((module) => {
    resolve(module)
  })
}
const login = [{
  path: '/login',
  component: Login,
  name: 'login'
}, {
  path: '/password',
  component: Password,
  name: 'Password'
}, {
  path: '/reg',
  component: Reg,
  name: 'reg'
}]
export default login
