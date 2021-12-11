<template>
  <div id="table">
    <div style="margin-top: 20px">
      <el-button @click="addUser">新建</el-button>
      <el-input
        style="width: 30%"
        placeholder="请输入搜索关键字"
        v-model="input"
        clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>

    <el-table
      :data="tableData.list"
      style="width: 100%">
      <el-table-column type="index" style="width: 50%" />
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
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div ref="aaa"></div>
    <pagination/>
  </div>

</template>
<script>
  import axios from "axios";
  import editUser from '@/page/editUser'
  import pagination from '@/page/pagination';
  import addUser from '@/page/addUser'

  export default {
    data () {
      return {
        tableData: {},
        input: '',
        key: 1,
      };
    },
    components: {editUser, pagination, addUser},
    methods : {
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
              axios.post('http://localhost:8080/updateUser', instance.$children[this.key].user)
                .then((response)=>{
                  if(response.data.msg === '操作成功' && response.status === 200) {
                    this.$message({
                      message: '修改成功!',
                      type: 'success'
                    });
                    this.getUserData(window.pageNum, window.pageSize);
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
              axios.post('http://localhost:8080/saveUser', instance.$children[this.key].user)
                .then((response)=>{
                  if(response.data.msg === '操作成功' && response.status === 200) {
                    this.$message({
                      message: '添加成功!',
                      type: 'success'
                    });
                    this.getUserData(window.pageNum, window.pageSize);
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
      create() {
        window.isMouted = false;
      },
      getUserData(pageNum ,pageSize) {
        axios.post('http://localhost:8080/getForm', 'page='+ pageNum +'&limit='+ pageSize)
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
      this.getUserData(1, 10);
      window.index = 1;
      window.isMounted = true;
    }
  }
</script>
