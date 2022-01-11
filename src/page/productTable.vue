<template>
  <div id="table">
    <div style="margin-top: 20px">
      <el-button @click="addUser">新建</el-button>
      <el-input
        style="width: 30%"
        placeholder="请输入搜索关键字"
        v-model="condition.searchText"
        clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-input-number v-model="condition.lowPrice" :step="100" step-strictly :min="0" label="描述文字"></el-input-number>
      <el-input-number v-model="condition.highPrice" :step="100" step-strictly :min="0" label="描述文字"></el-input-number>
    </div>

    <el-table
      :data="tableData.content"
      style="width: 100%">
      <el-table-column type="index" style="width: 50%"/>
      <el-table-column
        label="产品类型"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.productType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品名称"
        width="680">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>name: {{ scope.row.productName }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.productName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="产品价格"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>price: ￥{{ scope.row.productPrice }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">￥{{ scope.row.productPrice}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="产品图片"
        width="380">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="标题"
            width="200"
            trigger="hover">
            <el-image  style="width: 500px; height: 500px" :src=scope.row.productDescription />
            <el-image  slot="reference" style="width: 100px; height: 100px" :src=scope.row.productDescription />
          </el-popover>

        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="button"
            @click.prevent="handleEdit(scope.row.id, $event)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div ref="aaa"></div>
    <pagination :tableData="tableData"/>
  </div>

</template>
<script>
  import axios from "axios";
  import editUser from '@/page/editUser'
  import pagination from '@/page/pagination';
  import addUser from '@/page/addUser'

  export default {
    data() {
      return {
        tableData: {},
        condition: {
          pageNum: 1,
          pageSize: 10,
          lowPrice: 0,
          highPrice: 0,
          searchText: '',
        },
        key: 1,
        dialogVisible: true,

      };
    },
    components: {editUser, pagination, addUser},
    methods: {
      //编辑用户信息
      handleEdit(id, e) {         //触发编辑事件后再挂载子组件editUser会更好吗？前端好像不太用去考虑资源问题吧？
        const h = this.$createElement;
        this.$msgbox({
          title: '编辑用户界面',
          //创建子组件并添加
          message: h(editUser, {key: this.key++}),
          data: {
            id: id,
          },
          showConfirmButton: '确定',
          showCancelButton: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              console.log(instance)
              axios.post('/springboot/updateUser', instance.$children[this.key].user)
                .then((response) => {
                  if (response.data.msg === '操作成功' && response.status === 200) {
                    this.$message({
                      message: '修改成功!',
                      type: 'success'
                    });
                    this.getUserData(this.condition.pageNum, this.condition.pageSize, this.condition.searchText);
                  }
                })
                .catch((error) => {
                  console.log(error)
                  this.$message({
                    message: '修改失败!',
                    type: 'warning'
                  });
                })
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 1000);
            } else {
              done();
            }
          },
        });
      },
      search() {
        console.log(this.condition + '' + this.condition.pageNum + '' + this.condition.pageSize);
        this.getUserData(this.condition)
      },
      addUser() {
        const h = this.$createElement;
        this.$msgbox({
          title: '注册用户界面',
          //创建子组件并添加
          message: h(addUser, {key: this.key++}),
          data: {},
          showConfirmButton: '确定',
          showCancelButton: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              console.log(instance)
              axios.post('/springboot/saveUser', instance.$children[this.key].user)
                .then((response) => {
                  if (response.data.msg === '操作成功' && response.status === 200) {
                    this.$message({
                      message: '添加成功!',
                      type: 'success'
                    });
                    this.getUserData(window.pageNum, window.pageSize, this.searchText);
                  }
                })
                .catch((error) => {
                  console.log(error)
                  this.$message({
                    message: '添加失败!',
                    type: 'warning'
                  });
                })
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 1000);
            } else {
              done();
            }
          },
        }, '', '');
      },
      handleDelete(id, e) {
        this.$msgbox({
            message: "<span style='font-color:#f56c6c'>是否确认删除</span>",
            dangerouslyUseHTMLString: true,
            showConfirmButton: '确定',
            showCancelButton: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                axios.post('/springboot/deleteUser', 'id=' + id)
                  .then((response) => {
                    if (response.data.msg === '操作成功' && response.status === 200) {
                      this.$message({
                        message: '删除成功!',
                        type: 'success'
                      });
                      this.getUserData(window.pageNum, window.pageSize, this.searchText);
                    }
                    done();
                  })
                  .catch((error) => {
                    console.log(error)
                    this.$message({
                      message: '修改失败!',
                      type: 'warning'
                    });
                  })
                setTimeout(() => {
                  done();
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, 1000);
              } else done();
            }
          }
        )


      },
      create() {
        window.isMouted = false;
      },
      picHover(src) {

      },
      getUserData(condition) {
        const qs = require('qs');
        axios.post('/springboot/getProductList', condition
        )
          .then((response) => {
            this.tableData = response.data.data;
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    },
    mounted() {
      this.getUserData(this.condition);
      window.index = 1;
      window.isMounted = true;
    }
  }
</script>
