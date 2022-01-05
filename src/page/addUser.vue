<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input
          type="text"
          size="mini"
          style="width: 70%"
          show-word-limit
          placeholder="请输入用户名"
          v-model="user.username"
          clearable/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          size="mini"
          style="width: 70%"
          placeholder="请输入密码"
          v-model="user.password"
          show-password
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="user.sex" label="男"/>
        <el-radio v-model="user.sex" label="女"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          show-word-limit
          v-model="user.email"
          clearable/>
      </el-form-item>
      <el-form-item label="地址">
        <el-cascader
          v-model="user.city"
          placeholder="请选择地区"
          :options="user.citys"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"/>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="user.tag" multiple placeholder="请选择">
          <el-option
            v-for="item in user.tags"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="大会员">
        <el-switch
          v-model="user.value"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="user.dateTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <!--<el-form-item label="日期">
        <el-transfer v-model="leftOptions" :data="rightOptions"></el-transfer>
      </el-form-item>-->
      <el-form-item label="头像">
        <el-upload
          class="upload"
          drag
          preview-src-list
          action="http://localhost:8080/addUser"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
  export default {
    name: "addUser",
    data() {
      return {
        user: {
          username: '',
          password: '',
          city: ' ',
          citys: [
            {
              value: '1',
              label: '上海',
            },
            {
              value: '2',
              label: '福建',
              children: [{
                value: '21',
                label: '福州',
                children: [{
                  value: '211',
                  label: '台江区'
                }, {
                  value: '212',
                  label: '鼓楼区'
                }]
              }]
            },
            {
              value: '3',
              label: '北京'
            },
            {
              value: '4',
              label: '山西',
              children: [{
                value: '41',
                label: '晋城',
                children: [{
                  value: '411',
                  label: '泽州'
                }, {
                  value: '412',
                  label: '巴公'
                }]
              }]
            }
          ],
          num: 1,
          tags: [
            {
              value: '二次元',
              label: '二次元'
            },
            {
              value: '科技',
              label: '科技'
            },
            {
              value: '娱乐',
              label: '娱乐'
            },
            {
              value: '游戏',
              label: '游戏'
            },
            {
              value: '体育',
              label: '体育'
            },
            {
              value: '生活',
              label: '生活'
            }
          ],
          tag: '',
          leftOptions: [
            {
              key: 1,
              label: 'a'
            },
            {
              key: 2,
              label: 'b'
            }
          ],
          rightOptions: [
            {
              key: 1,
              label: 'a'
            },
            {
              key: 2,
              label: 'b'
            },
            {
              key: 3,
              label: 'c'
            }
          ],
          value: true,
          dateTime: ''
        }
      }
    },
    methods: {
      handleChange(city) {
        console.log(city)
      }
    }
  }
</script>

<style scoped>

</style>
