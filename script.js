// Write your JavaScript code here!
window.addEventListener("load", function(){
   const form = document.querySelector("form");
   const pilot = document.querySelector("input[name=pilotName]");
   const copilot = document.querySelector("input[name=copilotName]");
   const fuel = document.querySelector("input[name=fuelLevel]");
   const cargo = document.querySelector("input[name=cargoMass]");
   const faultyItems = document.getElementById("faultyItems");
   const launchStatus = document.getElementById("launchStatus");
   const pilotStatus = document.getElementById("pilotStatus");
   const copilotStatus = document.getElementById("copilotStatus");
   const fuelStatus = document.getElementById("fuelStatus");
   const cargoStatus = document.getElementById("cargoStatus");
   let startFuel = fuelStatus.innerHTML;
   let startCargo = cargoStatus.innerHTML;   

   form.addEventListener("submit", function(event){
      if(pilot.value === "" || copilot.value === "" || fuel.value === "" || cargo.value === ""){
         alert("All fields must be completed!")
      } else if(!isNaN(pilot.value) || !isNaN(copilot.value) || isNaN(fuel.value) || isNaN(cargo.value)){
         alert("Make sure to enter valid information for each field!")
      }
   });

   form.addEventListener("submit", function(_event){
      _event.preventDefault();      
      faultyItems.style.visibility = "visible";
      pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch.`;
      copilotStatus.innerHTML = `CoPilot ${copilot.value} is ready for launch.`;

      if(fuel.value < 10000){
         fuelStatus.innerHTML = "Fuel level too low for launch."
      } else {
         fuelStatus.innerHTML = startFuel
      }
      
      if(cargo.value > 10000){
         cargoStatus.innerHTML = "Cargo mass too high for launch."
      } else {
         cargoStatus.innerHTML = startCargo
      }
      
      if (fuel.value < 10000 || cargo.value > 10000){
         launchStatus.innerHTML = "Shuttle not ready for launch."
         launchStatus.style.color = "red"
      } else {
         launchStatus.innerHTML = "Shuttle ready for launch."
         launchStatus.style.color = "black"
      }
   });

   form.addEventListener("submit", function(_event){
      _event.preventDefault();
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
         response.json().then(function(json){
            const planet = json[Math.floor(Math.random()*6)];
            const div = document.getElementById("missionTarget");
            div.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${planet.name}</li>
               <li>Diameter: ${planet.diameter}</li>
               <li>Star: ${planet.star}</li>
               <li>Distance from Earth: ${planet.distance}</li>
               <li>Number of Moons: ${planet.moons}</li>
            </ol>
            <img src="${planet.image}">
            `
         })
      })
   });
});



/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
