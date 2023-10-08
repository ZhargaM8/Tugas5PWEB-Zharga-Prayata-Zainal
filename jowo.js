var first=true;
$(document).ready(function() {
    $('#Pick').change(function() {
        $('.selectbtn').removeClass("active");
        $('.firstbtn').addClass("active");
        if ($(this).val() != "Pilih daerah") {
            $("#bodycardthingamajig").show().css('opacity', '1');
        }
  });
});
$(document).ready(function() {
    $('.selectbtn').click(function() {
        $(".selectbtn").removeClass("active"); 
        $(this).addClass("active"); 
    });
  });
$.ajax({
    url: 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaTimur.xml',
    type: 'GET',
    dataType: 'xml',
    success: function(data) {
        $(data).find('forecast').each(function(){
            const time= $(this).find('issue');
            const year=time.find('year').text();
            const month=time.find('month').text();
            const day=time.find('day').text();
            const hour=time.find('hour').text();
            let d = new Date(year,month,day,hour);
            for (let index = 0; index <=66; index+=6) {
                $('#hour'+String(index)).text(selecttext(d, index));
            }
        });
        $(data).find('area').each(function(){
            let id=$(this).attr('id');
            if (id!=1200076) {
                let name=$(this).find('name[xml\\:lang="id_ID"]').text();
                $('#Pick').append("<option value="+String(id)+">"+name+"</option>")
            }
        });
    },
    error: function(error) {
        console.log(error);
    }
});

function CtoF(celcius) {
    return (celcius*9/5)+32;
}
function selecttext(d, num) {
    let localdate = new Date(d.getTime());
    localdate.setHours(localdate.getHours() + num);
    if (localdate.getHours()<10) {
        return String("0"+localdate.getHours()+".00 "+localdate.getDate()+'-'+localdate.getMonth()+'-'+localdate.getFullYear());
    } else {
        return String(localdate.getHours()+".00 "+localdate.getDate()+'-'+localdate.getMonth()+'-'+localdate.getFullYear());
    }
}

function doit() {
$.ajax({
    url: 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaTimur.xml',
    type: 'GET',
    dataType: 'xml',
    success: function(data) {
        $(data).find('forecast').each(function(){
            const pick= $("#Pick").val();
            const thing= $(this).find('area[id="'+pick+'"]');
            const city = thing.find('name[xml\\:lang="id_ID"]').text();
            $('#cityname').text(city);
            const time= $(this).find('issue');
            const year=time.find('year').text();
            const month=time.find('month').text();
            const day=time.find('day').text();
            const hour=time.find('hour').text();
            let d = new Date(year,month,day,hour);
            $('#timeshow').text(selecttext(d,0));
            let weather=[];
            thing.find('parameter[id="weather"]').find('timerange').each(function(){
               weather.push($(this).find('value').text()) 
            });
            if (weather[0]==0) {
                $('#weathertext').text('Cerah');
                $('#weatherimg').attr("src","icons8-sun-96.png");
            }
            else if (weather[0]==1||weather[0]==2) {
                $('#weathertext').text('Cerah Berawan');
                $('#weatherimg').attr("src","icons8-partly-cloudy-day-96.png");
            }
            else if (weather[0]==3||weather[0]==4) {
                $('#weathertext').text('Berawan');
                $('#weatherimg').attr("src","icons8-clouds-96.png");
            }
            else if (weather[0]==5) {
                $('#weathertext').text('Udara Kabur');
                $('#weatherimg').attr("src","icons8-haze-96.png");
            }
            else if (weather[0]==10) {
                $('#weathertext').text('Asap');
                $('#weatherimg').attr("src","icons8-fog-96.png");
            }
            else if (weather[0]==45) {
                $('#weathertext').text('Kabut');
                $('#weatherimg').attr("src","icons8-fog-96.png");
            }
            else if (weather[0]==60||weather[0]==80) {
                $('#weathertext').text('Hujan Ringan');
                $('#weatherimg').attr("src","icons8-light-rain-96.png");
            }
            else if (weather[0]==61) {
                $('#weathertext').text('Hujan Sedang');
                $('#weatherimg').attr("src","icons8-Moderate-rain-96.png");
            }
            else if (weather[0]==63) {
                $('#weathertext').text('Hujan Lebat');
                $('#weatherimg').attr("src","icons8-heavy-rain-96.png");
            }
            else if (weather[0]==95 ||weather[0]==97) {
                $('#weathertext').text('Hujan Petir');
                $('#weatherimg').attr("src","icons8-storm-with-heavy-rain-96.png");
            }

            let humidity=[];
            thing.find('parameter[id="hu"]').find('timerange').each(function(){
                humidity.push($(this).find('value').text()) 
            });
            $('#humidity').text(humidity[0]+"%");
            let temprature=[]
            thing.find('parameter[id="t"]').find('timerange').each(function(){
                temprature.push($(this).find('value[unit="C"]').text()) 
            });
            $('#tempratureC').text(temprature[0]+" C");
            $('#tempratureF').text(CtoF(temprature[0])+" F");
            
        });
    },
    error: function(error) {
        console.log(error);
    }
});
}
function changetime(num) {
  $.ajax({
    url: 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaTimur.xml',
    type: 'GET',
    dataType: 'xml',
    success: function(data) {
        $(data).find('forecast').each(function(){
            const pick= $("#Pick").val();
            const thing= $(this).find('area[id="'+pick+'"]');
            const city = thing.find('name[xml\\:lang="id_ID"]').text();
            $('#cityname').text(city);
            const time= $(this).find('issue');
            const year=time.find('year').text();
            const month=time.find('month').text();
            const day=time.find('day').text();
            const hour=time.find('hour').text();
            let d = new Date(year,month,day,hour);
            $('#timeshow').text(selecttext(d,num*6));
            
            let weather=[];
            thing.find('parameter[id="weather"]').find('timerange').each(function(){
               weather.push($(this).find('value').text()) 
            });
            if (weather[num]==0) {
                $('#weathertext').text('Cerah');
                $('#weatherimg').attr("src","icons8-sun-96.png");
            }
            else if (weather[num]==1||weather[num]==2) {
                $('#weathertext').text('Cerah Berawan');
                $('#weatherimg').attr("src","icons8-partly-cloudy-day-96.png");
            }
            else if (weather[num]==3||weather[num]==4) {
                $('#weathertext').text('Berawan');
                $('#weatherimg').attr("src","icons8-clouds-96.png");
            }
            else if (weather[num]==5) {
                $('#weathertext').text('Udara Kabur');
                $('#weatherimg').attr("src","icons8-haze-96.png");
            }
            else if (weather[num]==10) {
                $('#weathertext').text('Asap');
                $('#weatherimg').attr("src","icons8-haze-96.png");
            }
            else if (weather[num]==45) {
                $('#weathertext').text('Kabut');
                $('#weatherimg').attr("src","icons8-haze-96.png");
            }
            else if (weather[num]==60||weather[num]==80) {
                $('#weathertext').text('Hujan Ringan');
                $('#weatherimg').attr("src","icons8-light-rain-96.png");
            }
            else if (weather[num]==61) {
                $('#weathertext').text('Hujan Sedang');
                $('#weatherimg').attr("src","icons8-Moderate-rain-96.png");
            }
            else if (weather[num]==63) {
                $('#weathertext').text('Hujan Lebat');
                $('#weatherimg').attr("src","icons8-heavy-rain-96.png");
            }
            else if (weather[num]==95 ||weather[num]==97) {
                $('#weathertext').text('Hujan Petir');
                $('#weatherimg').attr("src","icons8-storm-with-heavy-rain-96.png");
            }

            let humidity=[];
            thing.find('parameter[id="hu"]').find('timerange').each(function(){
                humidity.push($(this).find('value').text()) 
            });
            $('#humidity').text(humidity[num]+"%");
            let temprature=[]
            thing.find('parameter[id="t"]').find('timerange').each(function(){
                temprature.push($(this).find('value[unit="C"]').text()) 
            });
            $('#tempratureC').text(temprature[num]+" C");
            $('#tempratureF').text(CtoF(temprature[num])+" F");
            
        });
    },
    error: function(error) {
        console.log(error);
    }
});  
}