<template>
    <el-dialog class="dialog" :title="title" @open="initPage"
    :visible.sync="dialogVisible"
    :before-close="closeDialog">
        <div class="device-wrap">
            <div class="form-data">
                <el-checkbox v-model="isAddManus" @change="changEditManus">是否编辑厂商信息</el-checkbox>
                <ul class="form-items">
                    <li class="form-item">
                        <label class="label-name">厂商</label>
                        <el-select v-if="!isAddManus" class="item-select" placeholder="请选择厂商名称" 
                            v-model="params.manu.name"
                            @change="chnageManus">
                            <el-option
                            v-for="item in ManusData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-else class="item-input" placeholder="请输厂商" v-model="params.manu.name" ></el-input>
                    </li>
                    <li class="form-item">
                        <label class="label-name">规格</label>
                        <el-select class="item-select" placeholder="请选择规格型号" v-model="params.spec.specification" @change="changeSpecs">
                            <el-option
                            v-for="item in SpecsData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="form-item">
                        <label class="label-name">型号</label>
                        <el-input class="item-input" v-model="params.model.specModel" placeholder="请输型号"></el-input>
                    </li>
                </ul>
            </div>
            <div class="upload-img">
                <el-upload
                    class="avatar-uploader"
                    :action="upload.url"
                    :headers="upload.headers"
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    :on-progress="uploadProgress"
                    :on-success="uploadSuccess"
                    :on-error="uploadError">
                    <img v-if="params.model.imageUrl" :src="params.model.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">只能上传jpg或png文件，且不超过2兆(M)</div>
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
    SaveDataAPI,
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
        isAdd: {
            type: Boolean,
            default: false
        },
        entity: {
            type: Object,
        }
    },
    data () {
        return {
            manusValue: '',
            specsValue: '',
            specModel: '',
            imageUrl: '',
            upload: {
                url: 'nmr/api/filesUpload?modelId=' + this.entity.id,
                progress: 0,
                status: '',
                notes: '',
            },
            params: {
                manu: {
                    id: '',
                    name: ''
                },
                spec: {
                    id: '',
                    specification: ''
                },
                model: {
                    id: '',
                    imageUrl: '',
                    specModel: '',
                }
            },
            isAddManus: false,
            dialogVisible: false
        }
    },
    computed: {
        ...mapState('common', [
            'SpecsData',
            'ManusData',
            'BaseUrl'
        ])
    },
    methods: {
        // 初始化页面
        initPage () {
            this.isAddManus = this.isAdd
            if (this.isAdd) {
                this.params = {
                    manu: {
                        id: '',
                        name: ''
                    },
                    spec: {
                        id: '',
                        specification: ''
                    },
                    model: {
                        imageUrl: '',
                        specModel: '',
                    }
                }
            } else {
                this.params = {
                    manu: {
                        id: this.entity.manuId,
                        name: this.entity.manuName
                    },
                    spec: {
                        id: this.entity.specId,
                        specification: this.entity.specification
                    },
                    model: {
                        id: this.entity.id,
                        imageUrl: '',
                        specModel: this.entity.specModel,
                    }
                }
            }
        },
        saveData () {
            if (this.isAdd) {
                debugger
                if (!this.params.manu.name) {
                    this.$message.warning('厂商信息不能为空！')
                    return
                }
                if (!this.params.spec.id) {
                    this.$message.warning('规格信息不能为空！')
                    return
                }
                if (!this.params.model.specModel) {
                    this.$message.warning('型号信息不能为空！')
                    return
                }
            }
            SaveDataAPI(this.params).then(res => {
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
        beforeUpload(file) {
            // 大于4M禁止上传
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
        // 上传进度
        uploadProgress () {
            this.upload.progress = event.percent
            this.upload.notes = '文件上传中...'
        },
        // 上传成功
        uploadSuccess(res, file) {
            debugger
            // this.imageUrl = URL.createObjectURL(file.raw);
            if (res.code === 1) {
                // 文件上传成功 this.BaseUrl +
                this.params.model.imageUrl = res.data &&  res.data.imgURL
            } else {
                this.uploadError(response)
            }
        },
        // 上传出错
        uploadError (err, file, fileList) {
            this.upload.notes = '文件上传失败'
            this.upload.status = 'exception'

            // 提示信息
            if (typeof err === 'object') {
                this.$notify.error({
                    title: '提示',
                    message: err.msg
                })
            }
        },
        // 厂商change
        chnageManus (id) {
            this.params.manu.id = id
        },
        // 规格change
        changeSpecs (id) {
            this.params.spec.id = id
        },
        changEditManus (flag) {
            this.manusValue = this.entity.manuName
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
    width: 60%;
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

