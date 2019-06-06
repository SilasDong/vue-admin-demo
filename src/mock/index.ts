import core from './page/core'
import admin from './page/admin'
import sys from './page/sys'
import func from './page/func'
import user from './page/user'
import comm from './comm'


/**
 * 模拟数据mock
 * mock是否开启模拟数据拦截
 */
core({ mock: true })
admin({ mock: true })
sys({ mock: true })
func({ mock: true })
user({ mock: true })
comm({ mock: true })