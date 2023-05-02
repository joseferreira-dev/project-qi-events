let map;
let marker;

let center = {lat: -6.888463202449027, lng: -38.558930105104125};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 14,
  });

  marker = new google.maps.Marker({
      map: map,
      position: center,
      draggable: true
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener('position_changed', ()=>{
      map.setCenter(marker.position);
  });

}

function addMarker(evt){
    marker.setPosition(evt.latLng);
}

function salvar(){

    const obj = {
        nome: document.getElementById('nome').value,
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    };

    fetch("http://localhost:3000/pontos",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response =>{alert('Salvo com sucesso')})
    .catch(error => alert('Falha ao salvar!'));    

}

async function listar(maps) {

  fetch('http://localhost:3000/pontos')
    .then((response) => response.json()).then((dados) => {
    const marcar = dados;
    const ul = document.getElementById('exibir');
    let infoWindow = new maps.InfoWindow();
    marcar.forEach(marcar => {
      const li = document.createElement('li');
      const h3 = document.createElement('h3');
      const p = document.createElement('p');
      ul.appendChild(li);
      li.appendChild(h3);
      li.appendChild(p);
      h3.textContent = marcar.nome;
      p.textContent = marcar.local;
      const latLng = new maps.LatLng(
        marcar.geometria.coordinates[1],
        marcar.geometria.coordinates[0]
      );
  
      let marker = new maps.Marker({
        position: latLng,
        map: map,
      });
  
      marker.addListener('click', () => {
        infoWindow.close();
        infoWindow.setContent(marcar.nome);
        infoWindow.open(marker.getMap(), marker);
      });
  
      map.addListener('click', () => {
        infoWindow.close();
      });
    });
  });
}

window.initMap = initMap;