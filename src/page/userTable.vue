<template>
  <div id="table" style="width: 100%">
    <div style="margin-top: 10px">
      <el-button @click="addUser">新建</el-button>
      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--left"></i>
        <el-input
          style="width: 300px"
          placeholder="请输入搜索关键字"
          v-model="searchText"
          v-on:click="focusSearch"
          class="el-dropdown-link"
          clearable>
      </el-input>

      </span>
        <el-dropdown-menu style="width: 300px" slot="dropdown">
          <el-dropdown-item v-for="item in tableData.list" :key="item.username">{{item.username}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>

        <!--<span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
        </span>-->

    </div>
    <el-table
      :data="tableData.list"
      style="width: 100%">
      <el-table-column type="index" style="width: 50%"/>
      <el-table-column
        label="性别"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="电话"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>电话: {{ scope.row.phone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.phone}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>邮箱: {{ scope.row.email }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.email }}</el-tag>
            </div>
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
        showCustomer: false,
        showloading: false,
        customerList: [
          {
            'username': 123
          },
          {
            'username': 222
          }
        ],
        tableData: {},
        searchText: '',
        key: 1,
        dialogVisible: true,
        condition: {
          pageNum: 1,
          pageSize: 10,
          lowPrice: 0,
          highPrice: 0,
          searchText: '',
        },
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
                    this.getUserData(this.condition);
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
      search(e) {
        console.log(this.searchText);
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
                    this.getUserData(this.condition);
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
            message: "<span style='font-color:#F56C6C'>是否确认删除</span>",
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
                      this.getUserData(this.condition);
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
      focusSearch() {
        console.log("xxx")
        /*this.customerList = [{
          'username': 123
        }];*/
        this.showCustomer = true;
      },
      chooseCustomer(value) {
      },
      getUserData(condition) {
        const qs = require('qs');
        axios.post('/springboot/getForm',
          condition
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
      console.log('------' + this.$parent.id)
      this.getUserData(this.condition);
      window.index = 1;
      window.isMounted = true;
    }
  }
</script>、

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
