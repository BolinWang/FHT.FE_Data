/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-05-31 20:56:53
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-05-31 21:58:39
 */

import { fetch } from '@/utils/fetch'

/* 获取城市列表 */
export function getCitysApi(params = {}) {
  return fetch('getCitys', params)
}

/* 获取组织列表 */
export function getOrgsApi(params = {}) {
  return fetch('getOrgs', params)
}

/* 注册数据导出 */
export function exportRegisterApi(params = {}) {
  return fetch('queryUserRegister', params)
}

/* 租客数据导出 */
export function exportCustomerApi(params = {}) {
  return fetch('queryTenants', params)
}

/* 短信数据导出 */
export function exportMsgApi(params = {}) {
  return fetch('queryHmsSmsSrl', params)
}

/* 房源数据导出 */
export function exportHouseApi(params = {}) {
  return fetch('queryHouseData', params)
}

/* 合同数据导出 */
export function exportContractApi(params = {}) {
  return fetch('queryLeaseContract', params)
}

/* 交易额数据导出 */
export function exportPayMoneyApi(params = {}) {
  return fetch('queryBillData', params)
}

/* 复恒公账数据导出 */
export function exportFhAccountApi(params = {}) {
  return fetch('queryFhtFeeData', params)
}

/* 门锁数据导出 */
export function exportGateLockApi(params = {}) {
  return fetch('getDeviceStatusList', params)
}
