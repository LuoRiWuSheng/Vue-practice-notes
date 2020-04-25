<template>
  <el-table :data="data" style="width: 100%;">
    <el-table-column label="订单号" prop="order-no" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.orderNo | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="价格" prop="price" align="center">
      <template slot-scope="scope">
        ￥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="状态" prop="status" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'
export default {
  name: 'TransactionTable',
  filters: {
    statusFilter (status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }

      return statusMap[status]
    },
    orderNoFilter (orderStr) {
      return orderStr.substring(0, 30)
    }
  },
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      transactionList().then(res => {
        this.data = res.data.items.slice(0, 8)
      })
    }
  }
}
</script>

<style>
</style>
