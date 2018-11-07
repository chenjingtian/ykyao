<template>
    <div class="city-select">
        <select v-model="selectedProvince" name="province">
            <option v-for="(item, index) in provinces"
                    v-if="item.level === 1"
                    :value="item">
                {{ item.name }}
            </option>
        </select>
        <select v-model="selectedCity" name="city">
            <option
                v-for="(item, index) in cities"
                :value="item">
                {{ item.name }}
            </option>
        </select>
        <select v-model="selectedBlock" name="block">
            <option
                v-for="(item, index) in blocks"
                :value="item">
                {{ item.name }}
            </option>
        </select>
    </div>
</template>
<script>
    /**
     *  省 市 区/县城  三联动选择器
     */
    import provinces from '../assets/js/provinces'
    import Vue from 'vue'
    export default {
        data() {
            return {
                selectedProvince: provinces[0],
                selectedCity: 0,
                selectedBlock: 0,
                cities: 0,
                provinces,
                blocks: 0,
                cenchen:'eee'
            }
        },
        name: 'app',
        created() {
            // 数据初始化,默认选中北京市,默认选中第一个;北京市数据为总数据的前18个
            let beijing = this.provinces.slice(0, 19)
            this.cities = beijing.filter(item => {
                if (item.level === 2) {
                    return true
                }
            })
            this.selectedCity = this.cities[0]
            this.blocks = beijing.filter(item => {
                if (item.level === 3) {
                    return true
                }
            })
            this.selectedBlock = this.blocks[0]
        },
        watch: {
            selectedProvince(newVal, oldVal) {
                console.log(newVal,oldVal)
                // 港澳台数据只有一级,特殊处理
                if (newVal.sheng === '71' || newVal.sheng === '81' || newVal.sheng === '82') {
                    this.cities = [newVal]
                    this.blocks = [newVal]
                } else {
                    this.cities = this.provinces.filter(item => {
                        if (item.level === 2 && item.sheng && newVal.sheng === item.sheng) {
                            return true
                        }
                    })
                }
                // 此时在渲染DOM,渲染结束之后再选中第一个
                this.selectedCity = this.cities[0]
                // this.$emit('input', this.info)
                // Vue.nextTick(() => {
                //     this.selectedCity = this.cities[0]
                //     this.$emit('input', this.info)
                // })
            },
            selectedBlock() {
                Vue.nextTick(() => {
                    // this.$emit('input', this.info)
                })
            },
            selectedCity(newVal) {
                // 选择了一个市,要选择区了 di是城市的代表,sheng
                if (newVal.sheng === '71' || newVal.sheng === '81' || newVal.sheng === '82') {
                    this.blocks = [newVal]
                    this.cities = [newVal]
                } else {
                    this.blocks = this.provinces.filter(item => {
                        if (item.level === 3 && item.sheng && item.sheng == newVal.sheng && item.di === newVal.di && item.name !== '市辖区') {
                            return true
                        }
                    })
                }
                Vue.nextTick(() => {
                    this.selectedBlock = this.blocks[0]
                    // 触发与 v-model相关的 input事件
                    // this.$emit('input', this.info)
                })
            }
        },
        computed: {
            info() {
                return {
                    province: this.selectedProvince,
                    city: this.selectedCity,
                    block: this.selectedBlock
                }
            }
        },
        methods:{

        }

    }
</script>





<!--<template>-->
    <!--<div id="app">-->
        <!--&lt;!&ndash;<h5>vue 省市区三联动 demo</h5>&ndash;&gt;-->
        <!--<city-select v-model="cityInfo"></city-select>-->
        <!--&lt;!&ndash;<h6>v-model的值是 <code>{{ cityInfo }}</code></h6>&ndash;&gt;-->
        <!--&lt;!&ndash;<h6>从v-model得知,你选择了 <i>{{ cityName }}</i></h6>&ndash;&gt;-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--import CitySelect from './address'-->
    <!--export default {-->
        <!--data() {-->
            <!--return {-->
                <!--cityInfo: '',-->
            <!--}-->
        <!--},-->
        <!--components: {-->
            <!--CitySelect-->
        <!--},-->
        <!--computed: {-->
            <!--cityName() {-->
                <!--const names = [];-->
                <!--this.cityInfo.province && names.push(this.cityInfo.province.name + ' ')-->
                <!--this.cityInfo.city     && names.push(this.cityInfo.city.name + ' ')-->
                <!--this.cityInfo.block    && names.push(this.cityInfo.block.name + ' ')-->
                <!--return names.join('')-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->
