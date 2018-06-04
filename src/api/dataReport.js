/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-05-31 20:56:53
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-06-04 13:40:26
 */

import { fetch } from '@/utils/fetch'

/* 获取城市列表 */
export function getCitysApi(params = {}) {
  return fetch('tongji/data/getCitys', params)
}

/* 获取组织列表 */
export function getOrgsApi(params = {}) {
  return fetch('tongji/data/getOrgs', params)
}

/* 注册数据导出 */
export function exportRegisterApi(params = {}) {
  return fetch('tongji/data/queryUserRegister', params)
}

/* 租客数据导出 */
export function exportCustomerApi(params = {}) {
  return fetch('tongji/data/queryTenants', params)
}

/* 短信数据导出 */
export function exportMsgApi(params = {}) {
  return fetch('tongji/data/queryHmsSmsSrl', params)
}

/* 房源数据导出 */
export function exportHouseApi(params = {}) {
  return fetch('tongji/data/queryHouseData', params)
}

/* 合同数据导出 */
export function exportContractApi(params = {}) {
  return fetch('tongji/data/queryLeaseContract', params)
}

/* 交易额数据导出 */
export function exportPayMoneyApi(params = {}) {
  return fetch('tongji/data/queryBillData', params)
}

/* 复恒公账数据导出 */
export function exportFhAccountApi(params = {}) {
  return fetch('tongji/data/queryFhtFeeData', params)
}

/* 门锁数据导出 */
export function exportGateLockApi(params = {}) {
  return fetch('tongji/data/getDeviceStatusList', params)
}
