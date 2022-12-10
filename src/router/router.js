export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'clerk': () => import('@/views/basic/clerk'),

  'qualifications': () => import('@/views/preBid/qualifications'),
  'scoringCriteria': () => import('@/views/preBid/scoringCriteria'),
  'extract': () => import('@/views/preBid/extract'),

  'project': () => import('@/views/extension/project'),
  'expert': () => import('@/views/basic/expert'),
  'procure': () => import('@/views/basic/procure'),
  'srm': () => import('@/views/basic/srm'),
  'fileTemplate': () => import('@/views/basic/fileTemplate'),

  'notice': () => import('@/views/business/notice'),

  'bond': () => import('@/views/tender/bond'),
  'enroll': () => import('@/views/tender/enroll'),

  'rosca': () => import('@/views/bidEvaluation/rosca'),

  'agentSalesSummary': () => import('@/views/dataReport/agentSalesSummary'),
  'registrationSheet': () => import('@/views/dataReport/registrationSheet'),
  'summary': () => import('@/views/dataReport/summary'),
  'projectArchive': () => import('@/views/documentation/projectArchive'),

  'winTheBidding': () => import('@/views/winningTheBid/winTheBidding'),
  'bidWinningAnnouncement': () => import('@/views/winningTheBid/bidWinningAnnouncement'),
  'abandonedBid': () => import('@/views/winningTheBid/abandonedBid'),
  'AnnulmentAnnouncement': () => import('@/views/winningTheBid/annulmentAnnouncement'),
  'return': () => import('@/views/winningTheBid/return'),

  'users': () => import('@/views/system/users'),
  'department': () => import('@/views/system/department'),
  'about': () => import('@/views/system/about')
}
