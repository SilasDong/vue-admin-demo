import * as comm from './comm'
import * as admin from './page/admin'
import * as core from './page/core'
import * as func from './page/func'
import * as logs from './page/logs'
import * as sys from './page/sys'
import * as user from './page/user'
export default class Api {
  public comm = comm
  public admin = admin
  public core = core
  public func = func
  public logs = logs
  public sys = sys
  public user = user
}