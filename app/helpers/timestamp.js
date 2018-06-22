exports.get_current_date = function(){
  return new Date(Date.now);
}

exports.date_to_timestamp = function(date){
  year = date.getUTCFullYear().toString();
  month = date.getUTCMonth().toString();
  day = date.getUTCDate().toString();
  hour = date.getUTCHours().toString();
  minute = date.getUTCMinutes().toString();
  second = date.getUTCSeconds().toString();

  return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
}

exports.timestamp_to_date = function(timestamp){
	return new Date(timestamp);
}
