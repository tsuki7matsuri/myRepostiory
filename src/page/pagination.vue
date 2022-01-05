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
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    },
    props: ['tableData'],
    //一般不用子组件直接调父组件，如果一定要快速的话，最快的话就是在父组件的生命周期里声明一个window全局变量指向这个父组件的this
    methods: {
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        console.log(`每页 ${pageSize} 条` + ' 查询条件为：' + this.pageSize);
        if(this.$parent.$route.path === '/home/user') {
          this.$parent.condition.pageSize = pageSize;
          this.$parent.getUserData(this.$parent.condition);
        }
         else {
          this.$parent.condition.pageSize = pageSize;
          this.$parent.getUserData(this.$parent.condition);
        }

      },
      handleCurrentChange(pageNum) {
        console.log(`当前页: ${pageNum}` + ' 查询条件为：' + this.$parent.searchText+ '-----' + this.$parent.$route.path);
        this.currentPage = pageNum;
        if(this.$parent.$route.path === '/home/user') {
          this.$parent.condition.pageNum = pageNum;
          this.$parent.getUserData(this.$parent.condition);
        }
        else {
          this.$parent.condition.pageNum = pageNum;
          this.$parent.getUserData(this.$parent.condition);
        }
      }
    },
    mounted() {
      let pMountedTimer = setInterval(() => {
        if (window.isMounted) {
          window.clearInterval(pMountedTimer)
          if(this.$parent.$route.path === '/home/user') {
            this.currentPage = this.$parent.tableData.pageNum;
            this.total = this.$parent.tableData.total;
          }
          else {
            this.currentPage = this.$parent.tableData.number + 1;
            this.total = this.$parent.tableData.totalElements;
          }
        }
      }, 500)
    },
    watch: {
      tableData: {
        handler(newVal, oldVal) {
          console.log(newVal)
          if(this.$parent.$route.path === '/home/user')
            this.total = this.tableData.total;
          else
            this.total = this.tableData.totalElements;
        },
        deep: true
      }
    }
  }
</script>
