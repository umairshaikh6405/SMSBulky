import React, { Component } from 'react';

const GlobalFun = {
    getTime : (time) => {
		let currentDate = new Date();
		if (time){
			 currentDate = new Date(time);
		}
		

		let hours = currentDate.getHours();
		let minutes = currentDate.getMinutes();
		let seconds = currentDate.getSeconds();
		let day = currentDate.getDate();
		let month = currentDate.getMonth() + 1;

		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		if (day < 10) {
			day = '0' + day;
		}
		if (month < 10) {
			month = '0' + month;
		}
		return currentDate.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	},
	sToTime:(sec_num) =>{
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
	
		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		return hours+':'+minutes+':'+seconds;
	  },
	convertStamptToDate : (timeStamp) => {
		let currentDate = new Date(timeStamp);

		let hours = currentDate.getHours();
		let minutes = currentDate.getMinutes();
		let seconds = currentDate.getSeconds();
		let day = currentDate.getDate();
		let month = currentDate.getMonth() + 1;

		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		if (day < 10) {
			day = '0' + day;
		}
		if (month < 10) {
			month = '0' + month;
		}
		return currentDate.getFullYear() + '-' + month + '-' + day;
	},
	getStringTime : (timeStamp) => {
		let  mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
		let currentDate = null
		if(timeStamp){
		 currentDate = new Date(timeStamp);
		}else{
		 currentDate = new Date();
		}
		let hours = currentDate.getHours();
		let minutes = currentDate.getMinutes();
		let day = currentDate.getDate();
		let month = currentDate.getMonth() + 1;
		let timeP = "AM"

		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (day < 10) {
			day = '0' + day;
		}

		if (hours >= 12) {
			hours = hours - 12;
			timeP = "PM";
		  }
		  if (hours == 0) {
			hours = 12;
		  }
		return day + ' ' + mS[month] + ' - ' + hours + ':' + minutes+" "+timeP;
	}
    };
    
    export default GlobalFun;