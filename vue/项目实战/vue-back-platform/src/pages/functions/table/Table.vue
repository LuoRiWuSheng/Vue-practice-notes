<template>
    <el-row :gutter='20' style="margin-top: 20px;">
        <el-col :xs='24' :md='24' :lg='24'>
            <el-card shadow='hover'>
                <el-form :inline='true' :model='formInline' :rules='rules' class='demo-form-inline'>
                    <el-form-item label='名字:' prop='name'>
                        <el-input v-model='formInline.namme' placeholder="条件1"></el-input>
                    </el-form-item>
                    <el-form-item label='地址:' prop='address'>
                        <el-select v-model='formInline.address' placeholder="条件2">
                            <el-option label='选项1' value='item1'></el-option>
                            <el-option label='选项2' value='item2'></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'Table',
    data () {
        return {
            formInline: {
                    name: '',
                    address: {}
            }, 
            rules: {
                name: [
                    {required: true, message: '请输入姓名!', trigger: 'blur'},
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                address: {required: true, message: '请选择一个地址', trigger: 'change'}
            }
        }
    }
}
</script>
