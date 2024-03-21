<template>
    <!-- el-row 标签用于创建一个行容器，v-loading 属性用于控制加载状态，body 表示整个表单的加载状态 -->
    <el-row v-loading.body="listLoading" element-loading-text="正在提交，请稍后...">
        
        <!-- el-breadcrumb 是面包屑组件，用于显示当前页面在系统层级结构中的位置 -->
        <el-breadcrumb separator="/">
            <!-- el-breadcrumb-item 表示面包屑的每一项，:to="{ path: '../order' }" 用于设置导航到货单管理页面 -->
            <el-breadcrumb-item :to="{ path: '../order' }">货单管理</el-breadcrumb-item>
            <el-breadcrumb-item>创建货单</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- el-row 用于创建一个行容器，style="margin-top: 50px" 用于设置上边距 -->
        <el-row style="margin-top: 50px">
            <!-- el-form 是表单容器组件，:model="ruleForm" 表示表单数据模型，:rules="rules" 表示表单验证规则，ref="ruleForm" 用于表单的引用，label-width="150px" 用于设置标签的宽度，class="demo-ruleForm" 用于指定样式类名 -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <!-- el-row 用于创建一个行容器，style="width: 1200px" 用于设置行的宽度 -->
                <el-row style="width: 1200px">
                    <!-- el-col 用于创建一个列容器 -->
                    <el-col>
                        <el-row>
                            <el-col :span="8">
                                <!-- el-form-item 用于表单项，label 属性表示标签名称，prop 属性表示表单域 model 绑定的字段，:sendName 表示寄件人姓名字段，v-model="ruleForm.sendName" 表示数据双向绑定 -->
                                <el-form-item label="寄件人姓名" prop="sendName">
                                    <el-input v-model="ruleForm.sendName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="寄件人手机号" prop="sendPhone">
                                    <el-input v-model="ruleForm.sendPhone"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="寄件人地址" prop="sendAddrEx">
                                    <!-- el-cascader 是级联选择器组件，:options="options" 表示级联选择器的选项，v-model="ruleForm.sendAddrEx" 表示数据双向绑定，style="width: 100%;" 用于设置宽度 -->
                                    <el-cascader :options="options" v-model="ruleForm.sendAddrEx" style="width: 100%;"></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="寄件人详细地址" prop="sendAddrInfo">
                                    <!-- el-input 是输入框组件，type="textarea" 表示文本域类型，v-model="ruleForm.sendAddrInfo" 表示数据双向绑定，@blur="initMap" 监听文本域失去焦点事件，并执行 initMap 方法 -->
                                    <el-input type="textarea" v-model="ruleForm.sendAddrInfo" @blur="initMap"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="收件人姓名" prop="receiveName">
                                    <el-input v-model="ruleForm.receiveName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="收件人手机号" prop="receivePhone">
                                    <el-input v-model="ruleForm.receivePhone"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="收件人地址" prop="receiveAddrEx">
                                    <el-cascader :options="options" v-model="ruleForm.receiveAddrEx"
                                                 style="width: 100%;"></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="收件人详细地址" prop="receiveAddrInfo">
                                    <el-input type="textarea" v-model="ruleForm.receiveAddrInfo" @blur="initMap"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="配送方式" prop="dispatchingType">
                            <el-radio-group v-model="ruleForm.dispatchingType">
                                <el-radio class="radio" label="配送"></el-radio>
                                <el-radio class="radio" label="自提"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="预计发货日期" prop="sendTime">
                                    <el-date-picker type="date" placeholder="选择日期"
                                                    v-model="ruleForm.sendTime"
                                                    format="yyyy-MM-dd"
                                                    :editable="false"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="限时到达日期" prop="receiveTime">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.receiveTime" format="yyyy-MM-dd" :editable="false"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <!-- el-card 是卡片组件，class="box-card" 用于指定样式类名，style="margin: 50px" 用于设置外边距 -->
                <el-card class="box-card" style="margin: 50px">
                    <div slot="header">
                        <span style="line-height: 36px;">货物清单</span>
                        <el-button @click="addGoodsEx" icon="plus" type="info" style="float: right;">
                            新增货物
                        </el-button>
                    </div>
                    <!-- el-table 是表格组件，:data="ruleForm.goods" 表示表格数据源，border 表示表格有边框，:summary-method="getSummaries" 表示自定义合计行的方法，show-summary 表示显示合计行，style="width: 100%" 用于设置表格宽度 -->
                    <el-table :data="ruleForm.goods" border :summary-method="getSummaries" show-summary style="width: 100%">
                        <!-- el-table-column 是表格列组件，label 属性表示列标题 -->
                        <el-table-column label="货物名称">
                            <template scope="scope">
                                <!-- el-input 是输入框组件，v-model="scope.row.name" 表示数据双向绑定 -->
                                <el-input v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="货物重量(吨)">
                            <template scope="scope">
                                <el-input v-model="scope.row.weight"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="货物尺寸">
                            <template scope="scope">
                                <el-input v-model="scope.row.size"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            label="数量">
                            <template scope="scope">
                                <el-input v-model="scope.row.number"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="备注">
                            <template scope="scope">
                                <el-input v-model="scope.row.remark"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template scope="scope">
                                <el-button
                                    type="danger"
                                    @click="removeGoods(scope.$index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>

                <!-- el-card 表示卡片组件，class="box-card" 用于指定样式类名，style="margin: 50px" 用于设置外边距，v-loading.body="map.mapLoading" 用于控制加载状态，element-loading-text="正在规划路线，请稍后..." 用于设置加载状态的提示信息 -->
                <el-card class="box-card" style="margin: 50px"  v-loading.body="map.mapLoading" element-loading-text="正在规划路线，请稍后...">
                    <!-- el-alert 是警告提示组件，:title="map.infoText" 表示提示信息，:type="map.infoType" 表示提示类型，:closable="false" 表示不显示关闭按钮，show-icon 表示显示图标，style="width:300px;" 用于设置样式 -->
                    <el-alert :title="map.infoText" :type="map.infoType" :closable="false" show-icon style="width:300px;"/>
                    <el-row v-show="map.result" style="margin: 10px">
                        <p>规划路程总计：<el-tag type="danger">{{map.length}}</el-tag></p><br/>
                        <p>预计驾驶时间：<el-tag type="danger">{{map.time}}</el-tag></p>
                    </el-row>
                    <!-- el-amap 是高德地图组件，vid="amap" 表示地图组件的标识，:map-manager="amapManager" 表示地图管理器，style="width: 100%; height: 400px;" 用于设置地图的宽度和高度，:scrollWheel="false" 表示禁用鼠标滚轮缩放，:plugin="plugin" 表示地图插件 -->
                    <el-amap vid="amap" :map-manager="amapManager" style="width: 100%; height: 400px;" :scrollWheel="false" :plugin="plugin"></el-amap>
                </el-card>

                <!-- el-form-item 用于表单项，type="primary" 表示主要按钮，@click="submitForm('ruleForm')" 监听按钮点击事件，并执行 submitForm 方法，icon="upload" 表示上传图标 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" icon="upload">立即创建</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </el-row>
</template>

<script>
    import {regionData, CodeToText} from 'element-china-area-data'
    import {addOrder} from '@/api/order'
    import {AMapManager} from 'vue-amap'

    export default {
        data() {
            return {
                map:{
                    infoType:'info',
                    infoText:'等待规划路线',
                    result:false,
                    time:'',
                    length:'',
                    mapLoading:false,
                },
                amapManager: new AMapManager(),
                plugin:['Scale','ToolBar'],
                CodeToText: CodeToText,
                options: regionData,
                dialogFormVisible: false,
                listLoading: false,
                companyList:null,
                goodForm:{
                    name: '',
                    size: 0,
                    weight: 0,
                    number: 0,
                    freight: 0,
                    remark: ''
                },
                goodRules:{
                    name: [
                        {required: true, message: '请输入货物名称'},
                    ],
                    number: [
                        {required: true, message: '数量不能为空'},
                    ],
                    freight: [
                        {required: true, message: '运费不能为空'},
                    ]
                },
                ruleForm: {
                    sendName: '',
                    sendPhone: '',
                    sendAddr: '',
                    sendAddrEx: [],
                    sendAddrInfo: '',
                    receiveName: '',
                    receivePhone: '',
                    receiveAddr: '',
                    receiveAddrEx: [],
                    receiveAddrInfo: '',
                    dispatchingType: '',
                    sendTime: '',
                    receiveTime: '',
                    goods: [],
                    isCompany:false,
                    //fkWantCompanyId:null,
                    token: localStorage.getItem('token'),
                },
                rules: {
                    sendName: [
                        {required: true, message: '请输姓名'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符'}
                    ],
                    sendPhone: [
                        {required: true, message: '请填写手机号码'}
                    ],
                    sendTime: [
                        {type: 'date', required: true, message: '请选择日期'}
                    ],
                    sendAddrEx: [
                        {required: true, message: '请输入地址'}
                    ],
                    sendAddrInfo: [
                        {required: true, message: '请输入详细地址'}
                    ],
                    receiveName: [
                        {required: true, message: '请输姓名'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符'}
                    ],
                    receivePhone: [
                        {required: true, message: '请填写手机号码'}
                    ],
                    receiveTime: [
                        {type: 'date', required: true, message: '请选择日期'}
                    ],
                    receiveAddrEx: [
                        {required: true, message: '请输入地址'}
                    ],
                    receiveAddrInfo: [
                        {required: true, message: '请输入详细地址'}
                    ],
                    dispatchingType:[
                        {required: true, message: '请选择配送方式'}
                    ],
                    // fkWantCompanyId:[
                    //     {required: true, message: '请选择物流公司'}
                    // ]
                }
            };
        },
        created(){
            this.initWeb();
        },
        methods: {
            initWeb(){
                // CompanyInfoListSelect().then(response => {
                //     this.companyList = response.data;
                //     console.log(this.companyList);
                // });
            },
            //删除货物
            removeGoods(index) {
                if (index !== -1) {
                    this.ruleForm.goods.splice(index, 1)
                }
            },
            //添加货物
            addGoods(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                        this.ruleForm.goods.push(this.goodForm);
                        this.goodForm = {
                            name: "",
                            size: 0,
                            weight: 0,
                            number: 0,
                            freight: 0,
                            remark: ""
                        };
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //添加货物
            addGoodsEx() {
                this.ruleForm.goods.push({
                    name: "",
                    size: 0,
                    weight: 0,
                    number: 0,
                    freight: 0,
                    remark: ""
                });
                console.log(this.amapManager.getMap());
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        this.submitConfig();
                        addOrder(this.ruleForm).then(response => {
                                this.listLoading = false;
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.$router.push('/home/order');
                            },
                            error =>{
                                this.listLoading = false;
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm.goods = [];
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                var count_freight = 0;
                var count_weight = 0;
                data.forEach((colum,index) =>{
                    count_freight += parseFloat(colum.freight);
                    count_weight += parseFloat(colum.weight);
                });
                sums[0] = '合计';
                sums[1] = count_weight + '吨';
                return sums;
            },
            submitConfig(){
                //地址转换
                this.ruleForm.receiveAddr = '';
                this.ruleForm.sendAddr = '';
                for(var i=0; i<3; i++){
                    this.ruleForm.receiveAddr += CodeToText[this.ruleForm.receiveAddrEx[i]];
                    this.ruleForm.sendAddr += CodeToText[this.ruleForm.sendAddrEx[i]];
                    if(i!=2){
                        this.ruleForm.sendAddr +='/';
                        this.ruleForm.receiveAddr +='/';
                    }
                }
                //时间转换
                // this.ruleForm.sendTime = parseTime(this.ruleForm.sendTimeEx);
                // this.ruleForm.receiveTime = parseTime(this.ruleForm.receiveTimeEx);
            },
            //地图回执路线
            initMap(){
                //地址转换
                var mapReceiveAddr = "";
                var mapSendAddr = "";
                for(var i=0; i<3; i++){
                    if(this.ruleForm.receiveAddrEx[i] == null)
                        return;
                    mapReceiveAddr += CodeToText[this.ruleForm.receiveAddrEx[i]];
                    mapSendAddr += CodeToText[this.ruleForm.sendAddrEx[i]];
                }
                mapReceiveAddr += this.ruleForm.receiveAddrInfo;
                mapSendAddr += this.ruleForm.sendAddrInfo;
                mapReceiveAddr = mapReceiveAddr.replace("市辖区","");
                mapSendAddr = mapSendAddr.replace("市辖区","");

                var map = this.amapManager.getMap();
                map.clearMap();
                var _this = this;
                AMap.service('AMap.Driving',function(){//回调函数
                    //实例化Driving
                    var driving = new AMap.Driving({
                        map: map,
                    });
                    driving.search([{keyword:mapSendAddr},{keyword:mapReceiveAddr}], function(status, result){
                        if(status === 'complete' && result.info === 'OK') {
                            _this.map.result = true;
                            _this.map.infoText = "路线规划成功";
                            _this.map.infoType = "success";
                            _this.map.time = (result.routes[0].time/3600).toFixed(1) + "小时";
                            _this.map.length = result.routes[0].distance/1000 + "公里";
                            console.log(result.routes[0]);
                        }else{
                            _this.map.result = false;
                            _this.map.infoText = "路线规划出错";
                            _this.map.infoType = "warning";
                        }
                    });
                })
            },
        }
    }
</script>


