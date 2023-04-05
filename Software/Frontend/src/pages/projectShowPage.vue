<template>
    <div uk-grid>
        <!-- Projects -->
        <div class="uk-width">
            <div class="uk-flex uk-flex-between uk-margin-medium-bottom">
                <div class="head content-title">
                    <h3>پروژه {{form_table.project.id_project}}</h3>
                </div>
            </div>
        
            <div class="uk-card uk-card-default uk-card-body">
                <div class="uk-overflow-auto">
                    <table class="uk-table uk-table-striped uk-table-hover custom-table">
                        <thead>
                            <tr>
                                <th style="width: 50px;">وضعیت</th>
                                <th style="width: 100px;">ثبت شده</th>
                                <th style="width: 100px;">انجام شده</th>
                                <th style="width: 100px;">زمان شروع</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="s, i in form_table.stations" >

                                <td v-if="form_table.work[i].id == s.id">{{i+1}}</td>
                                <td v-else style="background: #F48484;">{{i+1}}</td>
                                <td>{{form_table.work[i].name}}</td>
                                <td>{{s.name}}</td>
                                <td>{{s.time}}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
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
            }
        },
        created() {
            this.get_list()
        },
        mounted() {
        },

        methods: {
            get_list() {
                const id = this.$route.params.id;
                const router = useRouter()

                axiosMain.get(`project/${id}`)
                .then(res => {
                    this.form_table = res.data.data;
                })
                .catch(err => {
                    router.push('/')
                })
            
            },
            
        }
    }
</script>