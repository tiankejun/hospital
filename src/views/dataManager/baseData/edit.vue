<template>
    <el-dialog class="dialog" :title="title" @open="initPage"
    :visible.sync="dialogVisible"
    :before-close="closeDialog">
        <div class="device-wrap">
            <div class="form-data">
                <el-checkbox v-model="isEditManus" @change="changEditManus">是否编辑厂商信息</el-checkbox>
                <ul class="form-items">
                    <li class="form-item">
                        <label class="label-name">厂商</label>
                        <el-select v-if="!isEditManus" class="item-select" v-model="manusValue" placeholder="请选择厂商名称">
                            <el-option
                            v-for="item in ManusData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-else class="item-input" v-model="manusValue" placeholder="请输厂商"></el-input>
                    </li>
                    <li class="form-item">
                        <label class="label-name">规格</label>
                        <el-select class="item-select" v-model="specsValue" placeholder="请选择规格型号">
                            <el-option
                            v-for="item in SpecsData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="form-item">
                        <!-- <MyInput lable="型号" v-model="specModel"/> -->
                        <label class="label-name">型号</label>
                        <el-input class="item-input" v-model="specModel" placeholder="请输型号"></el-input>
                    </li>
                </ul>
            </div>
            <div class="upload-img">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="saveData">保 存</el-button>
        </span>
    </el-dialog>
</template>
<script>
import MyInput from '@/components/input.vue'
import { mapState, mapActions } from 'vuex'
import {
    AddDataAPI,
 } from '@/api'

export default {
    name: 'Edit',
    components: {
        MyInput
    },
    props: {
        title: {
            type: String,
            default: '提示'
        },
        entity: {
            type: Object,
        }
    },
    data () {
        return {
            specsValue: '',
            manusValue: '',
            specModel: '',
            imageUrl: '',
            isEditManus: false,
            dialogVisible: false
        }
    },
    computed: {
        ...mapState('common', [
            'SpecsData',
            'ManusData',
        ])
    },
    methods: {
        saveData () {
            AddDataAPI(this.entity).then(res => {
                console.log(res.data)
                if (res.data.code) {
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    })
                } else {
                    this.$message.error('保存失败！');
                }
            }).catch(res => {
                console.log(res)
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        initPage () {
        },
        changEditManus (flag) {
            if (flag) {
                this.manusValue = this.entity.manuName
            } else {
                this.manusValue = ''
            }
        },
        showDialog () {
            this.dialogVisible = true
        },
        closeDialog () {
            this.$confirm('确认关闭？').then(_ => {
                this.dialogVisible = false
            }).catch(_ => {});
        }
    }
}
</script>
<style >
.dialog {
    overflow: hidden;
}
.el-dialog { 
    width: 80%;
    max-height: 480px;
    overflow: auto;
}
.device-wrap {
    display: flex;
    flex-direction: row;
    overflow: auto;
}
.form-data {
    flex: 1;
}
.form-items {
    display: block;
}
.form-item {
    display: flex;
    margin-top: 10px;
}
.label-name {
    padding: 0 5px;
    font-size: 16px;
    line-height: 40px;
}
.item-select, .item-input {
    flex: 1;
}
.upload-img {
    flex: 1;
}
.items {
    float: left;
    height: 40px;
    line-height: 40px;
    margin: 5px 0px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

