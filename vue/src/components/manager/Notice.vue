<template>
  <div>
    <div class="search">
      <el-input v-model="title" placeholder="请输入标题查询" style="width: 200px"></el-input>
      <el-button type="primary" plain style="margin-left: 10px" @click="load(1)">查询</el-button>
      <el-button type="warning" plain style="margin-left: 10px" @click="reset">重置</el-button>
    </div>

    <div class="operation">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>

    <div class="table">
      <el-table :data="tableData" :row-key="row => row.id" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="80" sortable></el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
        <el-table-column prop="time" label="创建时间"></el-table-column>
        <el-table-column prop="user" label="创建人"></el-table-column>

        <el-table-column label="操作" width="180">
          <template v-slot="{ row }">
            <el-button type="primary" @click="handleEdit(row)" size="small">编辑</el-button>
            <el-button type="danger" @click="del(row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
            v-model="pageNum"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>

    <el-dialog v-model="fromVisible" title="信息" width="40%" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" style="padding-right: 50px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <el-input type="textarea" :rows="5" v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="fromVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {ElMessage} from "element-plus";

export default {
  name: "Notice",
  data() {
    return {
      tableData: [],  // 所有的数据
      pageNum: 1,   // 当前的页码
      pageSize: 5,  // 每页显示的个数
      total: 0,
      title: '',
      fromVisible: false,
      form: {},
      user: JSON.parse(localStorage.getItem("authorize") || sessionStorage.getItem("authorize")),
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'},
        ]
      },
      ids: []
    }
  },
  created() {
    this.load(1)
  },
  methods: {
    handleAdd() {   // 新增数据
      this.form = {}  // 新增数据的时候清空数据
      this.fromVisible = true   // 打开弹窗
    },
    handleEdit(row) {   // 编辑数据
      this.form = JSON.parse(JSON.stringify(row))  // 给form对象赋值  注意要深拷贝数据
      this.fromVisible = true   // 打开弹窗
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$request({
            url: this.form.id ? '/notice/update' : '/notice/add',
            method: this.form.id ? 'PUT' : 'POST',
            data: this.form
          }).then(res => {
            if (res.code === 200) {  // 表示成功保存
              ElMessage.success('保存成功')
              this.load(1)
              this.fromVisible = false
            } else {
              ElMessage.error('保存失败')  // 弹出错误的信息
            }
          })
        }
      })
    },
    del(id) {   // 单个删除
      this.$confirm('您确定删除吗？', '确认删除', {type: "warning"}).then(() => {
        this.$request.delete('/notice/delete/' + id).then(res => {
          if (res.code === 200) {   // 表示操作成功
            ElMessage.success('删除成功')
            this.load(1)
          } else {
            ElMessage.error('删除失败')  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.id)   //  [1,2]
    },
    delBatch() {   // 批量删除
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确定批量删除这些数据吗？', '确认删除', {type: "warning"}).then(() => {
        this.$request.delete('/notice/delete/batch', {data: this.ids}).then(res => {
          if (res.code === 200) {   // 表示操作成功
            ElMessage.success('批量删除成功')
            this.load(1)
          } else {
            ElMessage.error("批量删除失败")  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    load(pageNum) {  // 分页查询
      if (pageNum) this.pageNum = pageNum
      this.$request.get('/notice/selectPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.title,
        }
      }).then(res => {
        this.tableData = res.data.list;
        this.total = res.data.total;
      })
    },
    reset() {
      this.title = null
      this.load(1)
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
  }
}
</script>

<style scoped>

</style>
