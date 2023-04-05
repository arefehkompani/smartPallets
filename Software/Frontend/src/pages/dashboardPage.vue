<template>
    
    <div uk-grid>
        <!-- Projects -->
        <div class="uk-width-3-5">
            <div class="uk-flex uk-flex-between uk-margin-medium-bottom">
                <div class="head content-title">
                    <h3>لیست پروژه‌ها</h3>
                </div>
                <div>
                    <button class="uk-button head uk-button-primary" @click="btn_project_store_modal()">پروژه جدید</button>
                </div>
            </div>
        
            <div class="uk-card uk-card-default uk-card-body">
                <div class="uk-overflow-auto">
                    <table class="uk-table uk-table-striped uk-table-hover custom-table">
                        <thead>
                            <tr>
                                <th>شماره رهگیری</th>
                                <th style="width: 50px;">دما</th>
                                <th style="width: 50px;">رطوبت</th>
                                <!-- <th style="width: 200px;">نام پروژه</th> -->
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="project in form_table" >
                                <td><router-link :to="`/project/${project.id_project}`">{{project.id_project}}</router-link></td>
                                <td>{{project.temperature}}</td>
                                <td>{{project.humidity}}</td>
                                <td>{{project.situation}}</td>
                                <td> 
                                    <p class="uk-text-center" uk-margin>
                                        <button class="uk-button uk-button-primary uk-button-small linearicon-button uk-margin-small-right" @click="btn_add_work_modal(project._id)" uk-tooltip="کار"><i class="lnr lnr-list"></i></button>
                                        <button class="uk-button uk-button-primary uk-button-small linearicon-button uk-margin-small-right" @click="btn_project_update_modal(project._id)" uk-tooltip="ویرایش"><i class="lnr lnr-pencil"></i></button>
                                        <button class="uk-button uk-button-danger uk-button-small linearicon-button uk-margin-small-right" @click="btn_delete(project._id)" uk-tooltip="حذف"><i class="lnr lnr-trash"></i></button>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

        <!-- Alerts -->
        <div class="uk-width-1-5">
            <div class="uk-flex uk-flex-between uk-margin-medium-bottom">
                <div class="head content-title">
                    <h3>هشدار دما</h3>
                </div>
            </div>

            <div class="uk-card uk-card-default uk-card-body">
                <div class="uk-overflow-auto">
                    <table class="uk-table uk-table-striped uk-table-hover custom-table">
                        <thead>
                            <tr>
                                <th style="width: 10px;">رهگیری</th>
                                <th style="width: 10px;">دما</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="t in form_notif.temperature" >
                                <td>{{t.id_project}}</td>
                                <td style="color: red;">{{t.realTemp}}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        <div class="uk-width-1-5">
            <div class="uk-flex uk-flex-between uk-margin-medium-bottom">
                <div class="head content-title">
                    <h3>هشدار رطوبت</h3>
                </div>
            </div>

            <div class="uk-card uk-card-default uk-card-body">
                <div class="uk-overflow-auto">
                    <table class="uk-table uk-table-striped uk-table-hover custom-table">
                        <thead>
                            <tr>
                                <th style="width: 10px;">رهگیری</th>
                                <th style="width: 10px;">رطوبت</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="h in form_notif.humidity" >
                                <td>{{h.id_project}}</td>
                                <td style="color: red;">{{h.realHum}}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>

    <!-- Update project -->
    <div id="modal-update" uk-modal="bg-close: false;">
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div class="uk-modal-header">
                <h3>ثبت پروژه جدید</h3>
            </div>
            <div class="uk-modal-body">
                <form>
                    <div class="uk-child-width-1-2@m" uk-grid>
                        <div>
                            <div class="uk-margin">
                                <label class="uk-form-label">شماره رهگیری</label>
                                <div class="uk-form-controls">
                                    <input class="uk-input uk-text-center" v-model="form_store.id_project" type="tel" dir="ltr">
                                </div>
                            </div>
                        </div>           
                        <div>
                            <div class="uk-margin">
                                <label class="uk-form-label">دما</label>
                                <div class="uk-form-controls">
                                    <input class="uk-input uk-text-center" v-model="form_store.temperature" type="text" dir="ltr">
                                </div>
                            </div>
                        </div> 
                        <div>
                            <div class="uk-margin">
                                <label class="uk-form-label">رطوبت</label>
                                <div class="uk-form-controls">
                                    <input class="uk-input uk-text-center" v-model="form_store.humidity" type="text" dir="ltr">
                                </div>
                            </div>
                        </div> 
                        

                    </div>
                </form>
            </div>
            <div class="uk-modal-footer uk-text-left">
                <a class="uk-button uk-button-primary" @click="btn_update()">ثبت</a>
            </div>
        </div>
    </div>

    <!-- Create project -->
    <div id="modal-store" uk-modal="bg-close: false;">
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div class="uk-modal-header">
                <h3>ثبت پروژه جدید</h3>
            </div>
            <div class="uk-modal-body">
                <form>
                    <div class="uk-child-width-1-2@m" uk-grid>
                        <div>
                            <div class="uk-margin">
                                <label class="uk-form-label">شماره رهگیری</label>
                                <div class="uk-form-controls">
                                    <input class="uk-input uk-text-center" v-model="form_store.id_project" type="tel" dir="ltr">
                                </div>
                            </div>
                        </div>           
                        <div>
                            <div class="uk-margin">
                                <label class="uk-form-label">دما</label>
                                <div class="uk-form-controls">
                                    <input class="uk-input uk-text-center" v-model="form_store.temperature" type="text" dir="ltr">
                                </div>
                            </div>
                        </div> 
                        <div>
                            <div class="uk-margin">
                                <label class="uk-form-label">رطوبت</label>
                                <div class="uk-form-controls">
                                    <input class="uk-input uk-text-center" v-model="form_store.humidity" type="text" dir="ltr">
                                </div>
                            </div>
                        </div> 
                        

                    </div>
                </form>
            </div>
            <div class="uk-modal-footer uk-text-left">
                <a class="uk-button uk-button-primary" @click="btn_create()">ثبت</a>
            </div>
        </div>
    </div>

    <!-- Create workFlow -->
    <div id="modal-work" uk-modal="bg-close: false;">
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div class="uk-modal-header">
                <h3>ثبت ایستگاه جدید</h3>
            </div>
            <div class="uk-modal-body">
                <div class="uk-overflow-auto">
                    <table class="uk-table uk-table-striped uk-table-hover custom-table">

                        <thead>
                            <tr>
                                <th>کد ایستگاه</th>
                                <th>نام ایستگاه</th>
                                <th>انتخاب</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="rows in stations" :key="rows._id">
                                <td>{{rows.id}}</td>
                                <td>{{rows.name}}</td>
                                <td><input class="uk-radio" type="radio" v-model="work" :value="rows.id"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
                
            <div class="uk-modal-footer uk-text-left">
                <a class="uk-button uk-button-primary" @click="btn_create_work()">ثبت</a>
            </div>
        </div>
    </div>
</template>

<script>
    import axiosMain from '../axiosMain'
    import { useRouter } from 'vue-router'

    export default {

        data() {
            return {
                form_table: [],
                form_store: {
                    _id: "",
                    id_project: "",
                    temperature: "",
                    humidity: "",
                },
                work: "",
                stations: [],
                form_notif: [],
                timer: null,
            }
        },
        created() {
            this.get_list()
        },
        mounted() {
            this.timer = setInterval(() => {
                this.countDown()
            }, 2000)
        },

        methods: {
            get_list() {
                axiosMain.get("/project")
                .then(res => {
                    this.form_table = res.data.data.project;
                    this.stations = res.data.data.stations;
                })
                .catch(err => {
                    console.log(err)
                })
            },

            countDown() {
                axiosMain.get('/countdown')
                .then(res => {
                    this.form_notif = res.data;
                })
                .catch(err => {
                    console.log(err)
                })
            },

            btn_create() {
                axiosMain.post("/project/store", {
                    id_project : this.form_store.id_project,
                    temperature: this.form_store.temperature,
                    humidity: this.form_store.humidity
                })
                .then(res => {
                    UIkit.modal(document.querySelector("#modal-store")).hide();
                    this.get_list()
                    UIkit.notification(res.data.message, {status: 'success'});
                })
                .catch(err => {
                    console.log("got error")
                    console.log(err)
                    UIkit.notification(err.response.data.message, {status: 'danger'});
                })
            },

            btn_project_store_modal() {
                this.form_store = {}
                UIkit.modal(document.querySelector("#modal-store")).show();
            },
            
            btn_delete(_id) {
                axiosMain.post("/project/delete",{
                    _id : _id
                })
                .then(res => {
                    this.get_list()
                    UIkit.notification(res.data.message, {status: 'success'});
                })
                .catch(err => {
                    UIkit.notification(err.response.data.message, {status: 'danger'});
                })
            },

            btn_project_update_modal(_id) {
                UIkit.modal(document.querySelector("#modal-update")).show();
                let data = this.form_table.filter(rows => rows._id == _id)
                this.form_store = {
                    _id: data[0]._id,
                    id_project: data[0].id_project,
                    temperature: data[0].temperature,
                    humidity: data[0].humidity,
                }
            },

            btn_update() {
                axiosMain.post("project/update", {
                    "_id" : this.form_store._id,
                    "temperature" : this.form_store.temperature,
                    "humidity": this.form_store.humidity,
                })
                .then(res => {
                    this.get_list()
                    this.form_store._id = ""
                    this.form_store.temperature = ""
                    this.form_store.humidity = ""
                    this.form_store.skill_degree = ""
                    UIkit.modal(document.querySelector("#modal-update")).hide();
                    UIkit.notification(res.data.message, {status: 'success'});
                })
                .catch(err => {
                    console.log(err)
                    UIkit.notification(err.response.data.message, {status: 'danger'});
                })
            },

            btn_add_work_modal(_id) {
                UIkit.modal(document.querySelector("#modal-work")).show();
                let data = this.form_table.filter(rows => rows._id == _id)
                this.form_store = {
                    _id: data[0]._id,
                }
            },

            btn_create_work() {
                console.log(this.work, this.form_store._id)
                axiosMain.post("project/work", {
                    "_id" : this.form_store._id,
                    "work" : this.work
                })
                .then(res => {
                    this.get_list()
                    this.work = ""
                    UIkit.notification(res.data.message, {status: 'success'});
                })
                .catch(err => {
                    console.log(err)
                    UIkit.notification(err.response.data.message, {status: 'danger'});
                })
            },


        }
    }
</script>
