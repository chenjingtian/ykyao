<template>
  <div class="total-wrap">
    <div class="header">
        <div class="start-time timer">
          <span class="label-text">开始时间</span>
          <el-date-picker
            v-model="start"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>

        <div class="end-time timer">
          <span class="label-text">结束时间</span>
          <el-date-picker
            v-model="end"
             value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>

        <div class="switch">
          <el-switch
            v-model="online"
            active-text="在线"
            inactive-text="下线"
            @change="cut">
          </el-switch>
        </div>

        <div class="search">
          <el-button type="primary" @click="search">查询</el-button>
        </div>
    </div>

    <div class="content">
      <el-table
        :data="listData"
        border
        height="100%"
        :summary-method="getSummaries"
        show-summary
        style="width: 100%; margin-top: 20px">
        <el-table-column
          prop="date"
          :formatter="formatDate"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ticketCount"
          label="已出票">
        </el-table-column>
        <el-table-column
          prop="ticketTotalMoney"
          label="已出票金额（元）">
        </el-table-column>
        <el-table-column
          prop="ticketTotalWinMoney"
          label="当天派奖金额（元）">
        </el-table-column>
        <el-table-column
          prop="onlineSecond"
          :formatter="formatSeconds"
          label="累计在线时间">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { toLocaleString, formatSecond, getBeforeDate } from '@/assets/js/common2'
// import httpUrl from '@/assets/js/http'e
export default {
  data () {
    return {
      start: '',    // 开始时间
      end: '',      // 结束时间
      online: true, // 在线
      listData: [
          {
              date:1532361600000,
              onlineSecond:33614,
              ticketCount: 213,
              ticketTotalMoney: 234,
              ticketTotalWinMoney: 123
          },
          {
              date:1532361600000,
              onlineSecond:33621,
              ticketCount: 213,
              ticketTotalMoney: 234,
              ticketTotalWinMoney: 123
          }
      ], // 列表数据
      toDay: ''     // 今天
    }
  },
  created () {
      let httpUrl = 'https://www.baidu.com'
    // this.currentDay()

    // 前15天
    let startTime = getBeforeDate(15),
        endTime = this.toDay;
    this.getList(startTime, endTime)
  },
  methods: {
    // 获取当天
    currentDay () {
      let oDate = new Date()
      let oY = oDate.getFullYear();
      let oMonth = oDate.getMonth() + 1;
      let oDay = oDate.getDate()
      let curD = oY + "-" + (oMonth < 10 ? ('0'+oMonth) : oMonth) + "-" + (oDay < 10?('0'+ oDay) : oDay);
      this.toDay = curD
    },

    // 调用统计
    getList (startTime, endTime) {
      // let httpUrl = 'http://local.order.lybainuo.cn';
      this.$axios.get(httpUrl + `/stat/station-stat-list?from=${startTime}&to=${endTime}`)
      .then((res) => {
        if (res.data.errno === 200) {
          // this.listData = res.data.data
        }
      })
    },

    // 转换时间戳
    formatDate (row) {
      return toLocaleString(row.date)
    },

    // 转换秒
    formatSeconds (row) {
      return formatSecond(row.onlineSecond)
    },

    // 计算总数
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '汇总';
          return;
        }

        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += '';
          sums[4] = formatSecond(sums[4])
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },

    // 开关切换
    cut () {
      if (!this.online) {
        // 下线
        this.$axios.post(httpUrl + '/merchant/offline')
          .then((res) => {
            if (res.data.errno === 200) {
              this.online = false
            }
          })
      } else {
        // 上线
        this.$axios.post(httpUrl + '/merchant/online')
          .then((res) => {
            if (res.data.errno === 200) {
              this.online = true
            }
          })
      }
    },

    // 查询
    search () {
      console.log(this.start)
      let start = this.start,
          end = this.end;
      if (this.start !== '' && this.end !== '') {
        this.getList(start, end)
      }      
    }
  }
}
</script>

<style scoped>
.timer, .switch, .search {
  display: inline-block;
}
.label-text {
  margin-right: 10px;
}
.start-time, .switch {
  margin-left: 50px;
}
.end-time {
  margin-left: 50px;
}
.search {
  margin-left: 200px;
}
.content {
  margin-top: 50px;
}
</style>


