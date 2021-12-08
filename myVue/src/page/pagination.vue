<template>
  <div id="pagination">
    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentPage: 0,
        pageSize: 10,
        total: 0
      }
    },
    //一般不用子组件直接调父组件，如果一定要快速的话，最快的话就是在父组件的生命周期里声明一个window全局变量指向这个父组件的this
    methods: {
      handleSizeChange(pageSize) {
        console.log(`每页 ${pageSize} 条` +  this.pageSize );
        this.pageSize = pageSize;
        this.$parent.getUserData(this.currentPage, this.pageSize);
      },
      handleCurrentChange(pageNum) {
        console.log(`当前页: ${pageNum}`);
        this.pageNum = pageNum;
        this.$parent.getUserData(this.pageNum, this.pageSize);
      }
    },
    mounted() {
      let pMountedTimer = setInterval(() => {
        if (window.parentMounted ) {
          window.clearInterval(pMountedTimer)
          this.currentPage = this.$parent.tableData.pageNum;
          this.total = this.$parent.tableData.total;
        }
      }, 500)


    }
  }
</script>
