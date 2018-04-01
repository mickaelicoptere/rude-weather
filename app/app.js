const Vue = require('nativescript-vue/dist/index')
const Geolocation = require("nativescript-geolocation");
const Accuracy = require("ui/enums");
const http = require("http");

// var lat = "37.422" ;
// var long = "-122.084" ;
var city = "Nice";

let app = new Vue({
    data: () => {
        return {
            city: 'My Location',
            summary: 'My Current Weather',
            currentTemperature: '',
            apparentTemperature: '',
            humidity: '',
            windSpeed: '',
            visibility: '',
            day: '',
            time: '',
            image: '',
            period: ''
        }
    },
    
    template: `
        <page>
        <grid-layout rows="auto,*">
            <stack-layout>
                <label class="bold" :text="city"></label>
                <label :text="summary"></label>
                <image height="150" class="weather-image" :src="image"></image>
                    
                <grid-layout class="weather-box" columns="1*,1*" rows="auto">
                        <label col="0" row="0" class="large" :text="currentTemperature"></label>
                        <stack-layout col="1" row="0">
                            <label class="small bold" text="On s'en branle:"></label>
                            <stack-layout class="hr-light tight"></stack-layout>
                            <label class="small" :text="apparentTemperature"></label>
                            <label class="small" :text="humidity"></label>
                            <label class="small" :text="windSpeed"></label>
                            <label class="small" :text="visibility"></label>
                        </stack-layout>                    
                </grid-layout>
            </stack-layout>
            
            <stack-layout row="1">

            <stack-layout class="hr-light"></stack-layout>
                
            <label :text="period"></label>
                
            <stack-layout class="hr-light"></stack-layout>                
                            
            </stack-layout>
         
        </grid-layout>
        
        </page>
    `,

    created() {
        // this.getMyWeather()
        this.getNiceWeather()
        var currentDate = new Date()
        var day = currentDate.getDay()
        var weekdays = new Array(7);
        weekdays[0] = "Dimanche";
        weekdays[1] = "Lundi";
        weekdays[2] = "Mardi";
        weekdays[3] = "Mercredi";
        weekdays[4] = "Jeudi";
        weekdays[5] = "Vendredi";
        weekdays[6] = "Samedi";
        var dayName = weekdays[day];
        var currentHours = currentDate.getHours()
        console.log(currentHours)
        var timeOfDay = (currentHours >= 12 ) ? "Après-midi" : "Matin"
        console.log(timeOfDay)
        this.day = dayName
        this.time = timeOfDay
        this.period = dayName+" "+timeOfDay;
        // this.city="Nice";
    },
    
    methods: { 
        getMyCity(){
            http.request({
                // url: "http://api.openweathermap.org/data/2.5/weather?lat=43.7&lon=7.25&appid=20557fcccb4d7e13eae1d1412da2d295", //coord @ Nice
                url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=20557fcccb4d7e13eae1d1412da2d295",
                method: "GET"
            }).then(response => {
                var obj = response.content.toJSON()
                console.log("(getMyCity() city:");
                console.log(obj.name);
                this.city=obj.name;
                console.log("obj :"+JSON.stringify(obj));
            }) 
        },
        setImage(icon) {
            console.log(icon);
            switch(icon) {
                case "partly-cloudy-day":
                  this.image = "~/images/cloudy.png";
                  break;
                case "partly-cloudy-night":
                  this.image = "~/images/cloudy.png";       
                  break;
                case "clear-day":
                  this.image = "~/images/sunny.png";        
                  break;
                case "sleet":
                  this.image = "~/images/foggy.png";        
                  break;
                case "snowy":
                  this.image = "~/images/foggy.png";        
                  break;
                case "wind":
                  this.image = "~/images/foggy.png";        
                  break;
                case "rain":
                  this.image = "~/images/rainy.png";        
                  break;
                case "lightning":
                  this.image = "~/images/rainy.png";        
                  break;
                case "cloudy":
                  this.image = "~/images/cloudy.png";        
                  break;
                case "fog":
                  this.image = "~/images/foggy.png";        
                  break;
                case "clear-night":
                  this.image = "~/images/sunny.png";        
                  break;
            }
        },
        /*getMyWeather() {
            console.log("Géolocalisation askip");
            Geolocation.enableLocationRequest();
            console.log("geo request envoyé");
            //handle, accept 'ok' push
            Geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, updateDistance: 0.1, timeout: 20000 })
            .then(loc => {
                if (loc) {
                    console.log("wéwéwé");
                    console.log("loc :"+loc.toString);
                    // this.getMyCity(loc.latitude,loc.longitude)
                    // console.log(loc.latitude + ' and ' + loc.longitude);
                    http.request({
                        // url: "https://api.forecast.io/forecast/c9002942b156fa5d0583934e2b1eced8/"+loc.latitude+","+loc.longitude,
                        url: "https://api.darksky.net/forecast/5742899752b7f0bb326e13143c7393ed/"+lat+","+long,
                        method: "GET"
                    }).then( response => {
                        console.log("réponse askip");
                        var obj = response.content.toJSON();
                        // this.summary = obj.currently.summary;
                        // console.log(JSON.stringify(obj.currently))
                        // this.humidity = 'humidity: '+obj.currently.humidity.toString()+'%';
                        // this.windSpeed = 'wind: '+obj.currently.windSpeed.toString()+' mph';
                        // this.apparentTemperature = 'feels like: '+Math.round(obj.currently.apparentTemperature).toString() + '°';
                        // this.visibility = 'visibility: '+obj.currently.visibility.toString()+' m';
                        // this.currentTemperature = Math.round(obj.currently.temperature).toString() + '°';
                        // this.setImage(obj.currently.icon.toString());
                    })                    
                }
            }, function(e) {
                console.log("Error: " + e.message);
                console.log("loc: "+loc);
                console.log("pas localisation");
            });
        },*/
        getNiceWeather(){
            http.request({
                // url: "https://api.forecast.io/forecast/c9002942b156fa5d0583934e2b1eced8/"+loc.latitude+","+loc.longitude,
                url: "https://api.darksky.net/forecast/5742899752b7f0bb326e13143c7393ed/43.7,7.27?lang=fr&units=si",
                method: "GET" 
            }).then(response => {
                console.log("réponse getniceweather -> darksky");
                var obj = response.content.toJSON();
                this.getMyCity();
                this.summary = obj.currently.summary;
                console.log(JSON.stringify(obj.currently))
                this.humidity = 'humidité: '+obj.currently.humidity.toString()+'%';
                this.windSpeed = 'Vent: '+obj.currently.windSpeed.toString()+' km/h';
                this.apparentTemperature = 'Ressenti: '+Math.round(obj.currently.apparentTemperature).toString() + '°C';
                this.visibility = 'Visibilité: '+obj.currently.visibility.toString()+' m';
                this.currentTemperature = Math.round(obj.currently.temperature).toString() + '°';
                this.setImage(obj.currently.icon.toString());
            })
        }
    }
})

app.$start()