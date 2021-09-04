<template>
	<div>
		<div class="sell-header">
			<!---- HEADER ---->
			<h4 class="bdr-line-bottom">TRANSACTION HISTORY</h4>
		</div>
        <div class="history">
            <div class="content pt-3" v-for="(date,index) in groupedDates" :key="index">
                <h5> {{formatDate(index)}}</h5>
                <div class="details" v-for="(details ,key,  x) in date" :key="x">
                    <div class="time-format">
                        <!-- top vertical line it detemines if key index is first item -->
                        <div :class="key!=0 ? 'vl-top' : 'vl-top-fade'"></div>

                        <p class="time mb-0 mt-2 mb-2">{{formatTime(details.date)}}</p>

                        <!-- bottom vertical line it detemines if key index is last item in the array -->
                        <div :class="(key != (Object.keys(date).length - 1)) ? 'vl-bot' : 'vl-bot-fade'"></div>
                    </div>
                    <div class="imgs">
                        <img src="../../assets/weapons/weapon2.png" alt="">
                    </div>
                    <p class="desc mb-0">Weapon #{{details.id}} has been {{details.status}} for <span>{{details.skill}} SKILL</span></p>
                </div>
            </div>
            
        </div>

	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment';

export default Vue.extend({
	name: 'SellMyListings',
	data() {
		return {

            //SAMPLE DATA
			transactions:[
                {
                    date : "2021-09-04T03:02:15.06",
                    id: 3000312,
                    skill: 10,
                    status: 'sold'
                },
                {
                    date : "2021-09-04T03:02:15.06",
                    id: 3000313,
                    skill: 7.4,
                    status: 'listed'
                },
                {
                    date : "2021-08-14T03:02:15.0",
                    id: 3000316,
                    skill: 9.8,
                    status: 'sold'
                },
                {
                    date : "2021-08-14T03:05:30.0",
                    id: 3000316,
                    skill: 9.8,
                    status: 'sold'
                },
                {
                    date : "2021-08-15T03:02:15.064",
                    id: 3000319,
                    skill: 10,
                    status: 'listed'
                },
                {
                    date : "2021-08-15T03:02:15.064",
                    id: 3000318,
                    skill: 15.6,
                    status: 'sold'
                },
                {
                    date : "2021-08-15T03:02:20.064",
                    id: 3000318,
                    skill: 15.6,
                    status: 'sold'
                },
                {
                    date : "2021-08-16T03:02:15.064",
                    id: 3000317,
                    skill:5,
                    status: 'sold'
                },
            ]
		}
	},
    computed:{
        // To Group Dates
        groupedDates() {
          var dates = {} as any;
          this.transactions.forEach((item)=>{
                if(dates[this.dateFormat(item.date)]==undefined){
                    dates[this.dateFormat(item.date)]=[];
                    dates[this.dateFormat(item.date)].push(item)
                }else{
                    dates[this.dateFormat(item.date)].push(item);
                }
           });
         
           return dates;
      }
    },
    methods:{
        dateFormat(value:string){
            return moment(String(value)).format('MM-DD-YYYY')
        },
        formatDate(value:string){
            var currentDate = new Date()
            if(this.dateFormat(value) == this.dateFormat(currentDate.toString())){
               // If value of date is equal to current date return TODAY
               return (moment().calendar()).substring(0,5)
            }else{

                // If value of date is not equal to current date retuen WORDED DATE
                return moment(String(value)).format('MMMM DD, YYYY')
            }
        },
        formatTime(value:string){
            return moment(String(value)).format('hh:mm')
        },
    }
})
</script>

<style scoped>
.tab-list {
	margin: 1em 10px;
}

.tab-list button {
	padding: 2em 1em;

	text-transform: uppercase;
	color: #fff;
	font-weight: 700;
	font-size: 14px;
}

.tab-list .cstm-btn {
	background-color: #253148 !important;
}

.tab-list .cstm-btn:hover {
	background-color: #1168d0 !important;
	transition: background-color 0.3s;
}

.tab-list button:not(:last-child) {
	margin-right: 1em;
}

.sell-header {
	color: white;
}

.sell-header h4 {
	padding-bottom: 15px;
	margin: 1em 10px;
}

.bar-label{
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
}

.list-items {
	margin-left: 10px !important;
	margin-right: 10px !important;
}
</style>
