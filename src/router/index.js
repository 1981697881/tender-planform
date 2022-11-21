import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import notpage from '@/views/404'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const StaticRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'dashboard',
      affix: true
    }
  }]
}, {
  path: '/extension',
  component: Layout,
  name: 'Extension',
  meta: {
    title: '立项管理',
    icon: 'component'
  },
  children: [{
    path: 'project',
    component: () => import('@/views/extension/project/index'),
    name: 'Project',
    meta: {
      title: '项目管理'
    }
  }]
},{
  path: '/tender',
  component: Layout,
  name: 'Tender',
  meta: {
    title: '投标管理',
    icon: 'component'
  },
  children: [{
    path: 'enroll',
    component: () => import('@/views/tender/enroll/index'),
    name: 'Enroll',
    meta: {
      title: '投标报名'
    }
  }, {
    path: 'bond',
    component: () => import('@/views/tender/bond/index'),
    name: 'Bond',
    meta: {
      title: '保证金确认'
    }
  }]
},/* {
  path: '/business',
  component: Layout,
  name: 'Business',
  meta: {
    title: '招标管理',
    icon: 'component'
  },
  children: [
    {
      path: 'notice',
      component: () => import('@/views/business/notice/index'),
      name: 'Notice',
      meta: {
        title: '招标公告'
      }
    }]
},  {
  path: '/preBid',
  component: Layout,
  name: 'PreBid',
  meta: {
    title: '标前管理',
    icon: 'component'
  },
  children: [{
    path: 'extract',
    component: () => import('@/views/preBid/extract/index'),
    name: 'Extract',
    meta: {
      title: '专家抽取'
    }
  }
  ]
}, {
  path: '/bidEvaluation',
  component: Layout,
  name: 'BidEvaluation',
  meta: {
    title: '评标管理',
    icon: 'component'
  },
  children: [{
    path: 'rosca',
    component: () => import('@/views/bidEvaluation/rosca/index'),
    name: 'Rosca',
    meta: {
      title: '开标会'
    }
  }
  ]
}, {
  path: '/winningTheBid',
  component: Layout,
  name: 'WinningTheBid',
  meta: {
    title: '中标管理',
    icon: 'component'
  },
  children: [
    {
      path: 'winTheBidding',
      component: () => import('@/views/winningTheBid/winTheBidding/index'),
      name: 'WinTheBidding',
      meta: {
        title: '中标登记'
      }
    }, {
      path: 'bidWinningAnnouncement',
      component: () => import('@/views/winningTheBid/bidWinningAnnouncement/index'),
      name: 'BidWinningAnnouncement',
      meta: {
        title: '中标公告'
      }
    },{
      path: 'return',
      component: () => import('@/views/winningTheBid/return/index'),
      name: 'Return',
      meta: {
        title: '保证金归还'
      }
    }, {
      path: 'abandonedBid',
      component: () => import('@/views/winningTheBid/abandonedBid/index'),
      name: 'AbandonedBid',
      meta: {
        title: '废标'
      }
    }, {
      path: 'annulmentAnnouncement',
      component: () => import('@/views/winningTheBid/annulmentAnnouncement/index'),
      name: 'AnnulmentAnnouncement',
      meta: {
        title: '废标公告'
      }
    },
  ]
}, {
  path: '/documentation',
  component: Layout,
  name: 'Documentation',
  meta: {
    title: '项目归档',
    icon: 'component'
  },
  children: [{
    path: 'projectArchive',
    component: () => import('@/views/documentation/projectArchive/index'),
    name: 'ProjectArchive',
    meta: {
      title: '项目归档'
    }
  }]
}, {
  path: '/basic',
  component: Layout,
  name: 'Basic',
  meta: {
    title: '基础资料',
    icon: 'component'
  },
  children: [
    {
      path: 'expert',
      component: () => import('@/views/basic/expert/index'),
      name: 'Expert',
      meta: {
        title: '专家信息'
      }
    },{
      path: 'srm',
      component: () => import('@/views/basic/srm/index'),
      name: 'Srm',
      meta: {
        title: '供应商管理'
      }
    },{
      path: 'procure',
      component: () => import('@/views/basic/procure/index'),
      name: 'Procure',
      meta: {
        title: '采购单位管理'
      }
    }, {
      path: 'fileTemplate',
      component: () => import('@/views/basic/fileTemplate/index'),
      name: 'FileTemplate',
      meta: {
        title: '采购文件模板'
      }
    }]
}, {
  path: '/supplier',
  component: Layout,
  name: 'Supplier',
  meta: {
    title: '供应商管理',
    icon: 'component'
  },
  children: [{
    path: 'srm',
    component: () => import('@/views/supplier/srm/index'),
    name: 'Srm',
    meta: {
      title: '供应商管理'
    }
  }
  ]
}, {
  path: '/purchase',
  component: Layout,
  name: 'Purchase',
  meta: {
    title: '采购管理',
    icon: 'component'
  },
  children: [{
    path: 'procure',
    component: () => import('@/views/purchase/procure/index'),
    name: 'Procure',
    meta: {
      title: '采购单位管理'
    }
  }
  ]
}, {
  path: '/dataReport',
  component: Layout,
  name: 'DataReport',
  meta: {
    title: '统计分析',
    icon: 'component'
  },
  children: [
    {
      path: 'agentSalesSummary',
      component: () => import('@/views/dataReport/agentSalesSummary/index'),
      name: 'AgentSalesSummary',
      meta: {
        title: '项目季度统计'
      }
    }]
}, {
  path: '/system',
  component: Layout,
  name: 'System',
  meta: {
    title: '系统设置',
    icon: 'component'
  },
  children: [{
    path: 'users',
    component: () => import('@/views/system/users/index'),
    name: 'Users',
    meta: {
      title: '用户管理'
    }
  }, {
    path: 'department',
    component: () => import('@/views/system/department/index'),
    name: 'Department',
    meta: {
      title: '部门管理'
    }
  }, {
    path: 'about',
    component: () => import('@/views/system/about/index'),
    name: 'About',
    meta: {
      title: '用户协议'
    }
  ]
}}*/
  /* {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '开发文档', icon: 'link', roles: ['admin', 'editor'] } // 设置该路由进入的权限，支持多个权限叠加}
      }
    ]
  }, */

  // 404 page must be placed at the end !!!
  /* {
    path: '*',
    redirect: '/404',
    hidden: true
  } */
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})
