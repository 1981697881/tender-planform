export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'commodity': () => import('@/views/basic/commodity'),
  'agent': () => import('@/views/basic/agent'),
  'clerk': () => import('@/views/basic/clerk'),
  'store': () => import('@/views/basic/store'),

  'qualifications': () => import('@/views/preBid/qualifications'),
  'scoringCriteria': () => import('@/views/preBid/scoringCriteria'),
  'extract': () => import('@/views/preBid/extract'),

  'project': () => import('@/views/extension/project'),
  'expert': () => import('@/views/distribution/expert'),

  'notice': () => import('@/views/business/notice'),

  'bond': () => import('@/views/tender/bond'),
  'enroll': () => import('@/views/tender/enroll'),

  'rosca': () => import('@/views/bidEvaluation/rosca'),

  'agentSalesSummary': () => import('@/views/dataReport/agentSalesSummary'),
  'projectArchive': () => import('@/views/documentation/projectArchive'),

  'winTheBidding': () => import('@/views/winningTheBid/winTheBidding'),
  'bidWinningAnnouncement': () => import('@/views/winningTheBid/bidWinningAnnouncement'),
  'abandonedBid': () => import('@/views/winningTheBid/abandonedBid'),
  'AnnulmentAnnouncement': () => import('@/views/winningTheBid/annulmentAnnouncement'),
  'return': () => import('@/views/winningTheBid/return'),

  'procure': () => import('@/views/purchase/procure'),
  'users': () => import('@/views/system/users'),
  'department': () => import('@/views/system/department'),
  'about': () => import('@/views/system/about')
}
