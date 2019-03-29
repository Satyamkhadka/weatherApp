window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
           long = position.coords.longitude;
           lat=position.coords.latitude; 
        const proxy= 'http://cors-anywhere.herokuapp.com/';
           const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            //fetch(request, {mode: 'cors'});
            fetch(api).then(response=>{
		    console.log(api);
               return response.json();
           }).then(data=>{
            console.log(data);
            var {temperature,summary,icon}= data.currently;
            temperature=Math.round((temperature-32)/1.8).toFixed(2);
            //setting to dom
            temperatureDegree.textContent=temperature;
            temperatureDescription.textContent=summary;
            locationTimezone.textContent=data.timezone;
            //setting icon
            setIcon(icon,document.querySelector(".icon"));
           });
        });
    }else{
        h1.textContent="Hey please allow location ";
    }

    function setIcon(icon,iconID){
        const skycons = new Skycons({color:"white"});
        const currIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currIcon]);


    }
});

