// 便捷的操作store
const getters = {
  // 从app模块中获取store数据
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  // 从permission中获取
  permission_routes: state => state.permission.routes,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  // 从 user中获取
  token: state => state.user.token,
  roles: state => state.user.roles
}

export default getters
