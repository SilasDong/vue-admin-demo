<template>
  <div>
    <basic-container>
      <div v-if="option.data[0].count < 50" style="margin: 0 15px">
        <el-alert title="短信数量不足，请及时联系管理员" type="warning" show-icon> </el-alert>
      </div>
      <avue-data-tabs :option="option"></avue-data-tabs>
    </basic-container>
    <basic-container>
      <avue-data-display :option="option1"></avue-data-display>
    </basic-container>

  </div>
</template>

<script lang='ts'>
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'


@Component
export default class Wel extends Mixins(BaseMixin) {
  @Getter('menu') private menu: any
  private option = {
    data: [{
                title: '短信剩余数量',
                subtitle: '实时',
                count: 0,
                allcount: 0,
                text: '已使用短信数量',
                color: 'rgb(230, 71, 88)',
                key: '短',
                href: './#/smsHistory/index'
            },
            {
                title: '附件统计',
                subtitle: '实时',
                count: 3112,
                allcount: 10222,
                text: '当前上传的附件数',
                color: 'rgb(27, 201, 142)',
                key: '附',
                href: 'https://avue.top',
                target: '_blank'
            },
            {
                title: '文章统计',
                subtitle: '实时',
                count: 908,
                allcount: 10222,
                text: '评论次数',
                color: 'rgb(178, 159, 255)',
                key: '评',
                href: 'https://avue.top',
                target: '_blank'
            }]}

  private option1 = {
    data: [{
        count: '0',
        title: '今日进货单数'
      },
      {
        count: '0',
        title: '今日进货总额'
      },
      {
        count: '0',
        title: '今天调货单数'
      },
      {
        count: '0',
        title: '总未发货单数'
      }]
    }

  protected created() {
    this.$api.admin.indexCount({}).then((res: any) => {
      const data = res.data
      this.option.data[0].count = data.sms[0].smsCount || 0
      this.option.data[0].allcount = data.sms[0].useSmsCount || 0
    })
  }
}
</script>

<style scoped="scoped" lang="scss">
.info {
  padding: 21px 0;
  .img-border {
    width: 64px;
    height: 65px;
    position: relative;
    vertical-align: middle;
    display: inline-block;
  }
  .img-v {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 22px;
    height: 22px;
  }
  .img {
    border-radius: 5px;
    width: 64px;
    height: 64px;
    display: inline-block;
    overflow: hidden;
    img {
      display: block;
      max-width: none;
      height: 64px;
      opacity: 1;
      width: 64px;
      margin-left: 0px;
      margin-top: 0px;
    }
  }
  .user {
    margin-left: 20px;
    display: inline-block;
    color: rgb(153, 153, 153);
    vertical-align: middle;
  }
  .user-title {
    font-size: 18px;
    color: rgb(102, 102, 102);
    margin-right: 5px;
    display: inline-block;
    max-width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .user-subtitle {
    display: inline-block;
    width: 40px;
    height: 16px;
    line-height: 16px;
    border-radius: 2px;
    padding: 0px 5px;
    margin-left: 10px;
    font-size: 12px;
    text-align: center;
    color: rgb(255, 44, 84);
    background-color: rgb(255, 242, 244);
    white-space: nowrap;
  }
  .user-item {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
