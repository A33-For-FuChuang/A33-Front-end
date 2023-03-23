<template>

  <div>
      <h3>营业规则</h3>
    <el-button type="primary" @click="addRule">新增规则</el-button>
    <el-table :data="rules" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editRule(scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteRule(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible">
      <el-form ref="ruleForm" :model="rule" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="rule.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="rule.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRule">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: [
        { id: 1, name: '规则1', description: '这是规则1的描述' },
        { id: 2, name: '规则2', description: '这是规则2的描述' },
        { id: 3, name: '规则3', description: '这是规则3的描述' },
      ],
      rule: {},
      dialogVisible: false,
    };
  },
  methods: {
    addRule() {
      this.rule = {};
      this.dialogVisible = true;
    },
    editRule(row) {
      this.rule = Object.assign({}, row);
      this.dialogVisible = true;
    },
    saveRule() {
      if (this.rule.id) {
        // update rule
        const index = this.rules.findIndex((r) => r.id === this.rule.id);
        this.$set(this.rules, index, this.rule);
      } else {
        // add rule
        const newId = this.rules.length + 1;
        this.rule.id = newId;
        this.rules.push(this.rule);
      }
      this.dialogVisible = false;
    },
    deleteRule(row) {
      const index = this.rules.findIndex((r) => r.id === row.id);
      this.rules.splice(index, 1);
    },
  },
};
</script>
