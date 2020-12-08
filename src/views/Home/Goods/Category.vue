<template>
  <div class="category_wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>物品管理</b></el-breadcrumb-item>
          <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="category_main">
        <!-- 添加分类信息 -->
        <el-button
          type="danger"
          icon="el-icon-plus"
          size="small"
          @click="insertCateDialogVisible = true"
          >一级分类</el-button
        >
        <!-- 添加一级分类对话框 -->
        <el-dialog
          title="添加一级分类"
          :visible.sync="insertCateDialogVisible"
          width="50%"
          top="20px"
        >
          <el-form
            :model="insertCateForm"
            :rules="insertCateFormRules"
            ref="insertCateFormRef"
            label-width="100px"
          >
            <el-form-item label="一级分类" prop="name">
              <el-input v-model="insertCateForm.name"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="insertCateDialogVisible = false"
              >取 消</el-button
            >
            <el-button type="primary" @click="insertCategory()"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="showAddSecondTypeDialog"
          >二级分类</el-button
        >
        <!-- 添加二级分类对话框 -->
        <el-dialog
          title="添加二级分类"
          :visible.sync="insertCateSecDialogVisible"
          width="50%"
          top="20px"
        >
          <el-form
            :model="insertSecCateForm"
            :rules="insertSecCateFormRules"
            ref="insertSecCateFormRef"
            label-width="100px"
          >
            <el-form-item label="一级分类" prop="typeId">
              <el-select
                v-model="insertSecCateForm.typeId"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in cateFirstDataList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="typeId">
              <el-input v-model="insertSecCateForm.secondName"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="insertCateSecDialogVisible = false"
              >取 消</el-button
            >
            <el-button type="primary" @click="insertSecCategory()"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <!-- 显示分类数据表格 -->
        <el-table
          :data="cateDataList"
          stripe
          style="width: 100%"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >>
          <el-table-column type="index" width="100"> </el-table-column>
          <el-table-column prop="name" label="分类名称" width="250" sortable>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="300"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="修改时间"
            width="300"
            sortable
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                round
                size="small"
                @click="showUpdateTypeDialog(scope.row)"
                >修改</el-button
              >
              <!-- 修改分类数据对话框 -->
              <el-dialog
                title="修改分类"
                :visible.sync="updateCateDialogVisible"
                append-to-body
                width="50%"
                top="20px"
              >
                <el-form
                  :model="updateCateForm"
                  :rules="updateCateFormRules"
                  ref="updateCateFormRef"
                  label-width="100px"
                >
                  <el-form-item label="分类名称" prop="name">
                    <el-input v-model="updateCateForm.name"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="updateCateDialogVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="updateCateType"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 保存分类表格数据
      cateDataList: [],
      // 保存一级分类数据
      cateFirstDataList: [],
      // 是否显示添加一级分类对话框
      insertCateDialogVisible: false,
      // 是否显示添加二级分类对话框
      insertCateSecDialogVisible: false,

      // 添加一级分类表单数据
      insertCateForm: {
        name: "",
        id: "",
      },
      insertCateFormRules: {
        name: [
          {
            required: true,
            message: "请输入要添加的分类名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "分类名称在2 - 10 字符之间",
            trigger: "blur",
          },
        ],
      },
      // 添加二级分类表单数据
      insertSecCateForm: {
        id: "",
        secondName: "",
        typeId: "",
      },
      insertSecCateFormRules: {
        typeId: [
          {
            required: true,
            message: "请选择要添加二级分类的一级分类",
            trigger: "blur",
          },
        ],
        secondName: [
          { required: true, message: "请输入二级分类名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "分类名称在2 - 10 字符之间",
            trigger: "blur",
          },
        ],
      },
      updateCateDialogVisible: false,
      updateCateForm: {
        id: "",
        name: "",
      },
      updateCateFormRules: {
        name: [
          {
            required: true,
            message: "请输入修改后的分类名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "分类名称在2 - 10个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    // 获取分类数据
    async getCategory() {
      const { data: res } = await this.$http.request({
        url: "back/goods_type/showGoodsType",
        method: "post",
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.cateDataList = [];
      res.data.forEach(async (item) => {
        let obj = {};
        obj.id = item.id;
        obj.name = item.name;
        obj.secondName = item.secondName;
        obj.createTime = item.createTime;
        obj.updateTime = item.updateTime;
        let arr = await this.getSecondCategory(obj.id);
        if (arr.length !== 0) {
          obj.children = [];
          arr.forEach((item2) => {
            let objChild = {};
            objChild.id = item2.id + 1000;
            objChild.name = item2.secondName;
            objChild.createTime = item2.createTime;
            objChild.updateTime = item2.updateTime;
            obj.children.push(objChild);
          });
        }
        this.cateDataList.push(obj);
      });
    },

    // 获取二级分类数据
    async getSecondCategory(id) {
      const { data: res } = await this.$http.request({
        url: "back//goods_type/showGoodsSecondType",
        method: "post",
        data: {
          id,
        },
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      return res.data;
    },

    // 添加一级分类数据
    insertCategory() {
      this.$refs.insertCateFormRef.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.request({
            url: "back/goods_type/addGoodsType",
            method: "post",
            data: this.insertCateForm,
          });
          if (res.code !== 200) {
            return this.$message.error(res.message);
          }
          this.$message.success("添加一级分类成功");
          this.insertCateDialogVisible = false;
          this.getCategory();
        }
      });
    },

    // 显示添加二级分类对话框
    showAddSecondTypeDialog() {
      this.insertCateSecDialogVisible = true;
      // 获取所有一级分类数据
      this.cateFirstDataList = [];
      this.cateDataList.forEach((item) => {
        let obj = {};
        obj.id = item.id;
        obj.name = item.name;
        this.cateFirstDataList.push(obj);
      });
    },

    // 添加二级分类
    insertSecCategory() {
      this.$refs.insertSecCateFormRef.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.request({
            url: "back/goods_type/addGoodsSecondType",
            method: "post",
            data: {
              id: "",
              secondName: this.insertSecCateForm.secondName,
              typeId: this.insertSecCateForm.typeId - 1000,
            },
          });
          if (res.code !== 200) {
            return this.$message.error(res.message);
          }
          this.$message.success("添加二级分类成功");
          this.insertCateSecDialogVisible = false;
          this.getCategory();
        }
      });
    },

    // 显示修改分类对话框
    showUpdateTypeDialog(cate) {
      this.updateCateDialogVisible = true;
      this.updateCateForm.id = cate.id;
      this.updateCateForm.name = cate.name;
    },

    // 修改分类数据
    updateCateType() {
      this.$refs.updateCateFormRef.validate(async (valid) => {
        if (valid) {
          const {data: res} = await this.$http.request({
            url: "back/goods_type/upDataGoodsType",
            method: "post",
            data: {
              id: this.updateCateForm.id,
              name: this.updateCateForm.name,
            },
          });
          if (res.code !== 200) {
            return this.$message.error(res.message);
          }
          this.$message.success("修改分类数据成功");
          this.updateCateDialogVisible = false;
          this.getCategory();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  height: 610px;

  .category_main {
    .el-button {
      margin-right: 10px;
    }
    .el-table {
      margin: 0 auto;
    }
  }
}
</style>
