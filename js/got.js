function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // itt a json content, benne a data változóban
  var userDatas = JSON.parse(xhttp.responseText);
  console.log(userDatas);
  /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG!

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
  doSpliceDeadCharacters(userDatas);
  sortByName(userDatas);
  doDisplayCharacters(userDatas);
  getSearchTextFromInputField();
  doDisplayCharactersByClick();
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

// Halott karakterek eltávolítása a tömbből
function doSpliceDeadCharacters(paramArray) {
  for (var i = 0; i < paramArray.length; i++) {
    if (paramArray[i].dead === 'true') {
      paramArray.splice(i, 1);
      i--;
    }
  }
  return paramArray;
}

// Név szerint ABC sorrendbe rendezése az objektumoknak
function sortByName(paramArray) {
  paramArray.sort(function (a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  return paramArray;
}

// Karakterek megjelenítése az oldalon
function doDisplayCharacters(paramArray) {
  for (var i = 0; i < paramArray.length; i++) {
    var mainDiv = document.querySelector('.main-div');
    var charDiv = document.createElement('div');
    charDiv.className = 'char-div';
    charDiv.datas = paramArray[i];
    var picSrc = paramArray[i].portrait;
    var charName = paramArray[i].name;
    charDiv.innerHTML = '<img src=' + picSrc + '>' + '<br>' + charName;
    mainDiv.appendChild(charDiv);
  }
}

// Keresés keresőmezővel
function getSearchTextFromInputField() {
  var searchButton = document.querySelector('#search-button');
  var paramString = '';
  searchButton.addEventListener('click', function () {
    document.querySelector('.display-div').innerHTML = '';
    paramString = document.querySelector('#search-text').value;
    var paramArray = document.querySelectorAll('.char-div');
    var found = searchForCharacterName(paramString, paramArray);
    addCharacterToSideDiv(found);
  });
}

function searchForCharacterName(paramString, paramArray) {
  for (var i = 0; i < paramArray.length; i++) {
    var found = {};
    if (paramArray[i].datas.name.toLowerCase().indexOf(paramString.toLowerCase()) > -1) {
      found = paramArray[i].datas;
      i = paramArray.length;
    }
  }
  return found;
}

function addCharacterToSideDiv(paramObject) {
  var displayDiv = document.querySelector('.display-div');
  var filmPic = document.createElement('div');
  filmPic.className = 'film-pic';
  var sideCharDiv = document.createElement('div');
  var filmPicSrc = paramObject.picture;
  if (paramObject.house !== '') {
    var housePicSrc = '<img src="/assets/houses/' + paramObject.house + '.png"';
    sideCharDiv.innerHTML = '<div class= "name-span">' + paramObject.name + '</div> <div class= "housepic-span">' + housePicSrc + '</div><div class ="bio-div">' + paramObject.bio + '</div>';
  } else {
    sideCharDiv.innerHTML = '<div class= "name-span">' + paramObject.name + '</div><div class ="bio-div">' + paramObject.bio + '</div>';
  }
  filmPic.innerHTML = `<img src=${filmPicSrc} alt="">`;
  displayDiv.appendChild(filmPic);
  displayDiv.appendChild(sideCharDiv);
}

// További információk megjelenítése a karakterről kattintással
function doDisplayCharactersByClick() {
  document.addEventListener('click', function (event) {
    document.querySelector('.display-div').innerHTML = '';
    if (event.target.className === 'char-div') {
      var paramObject = event.target.datas;
      addCharacterToSideDiv(paramObject);
    }
  });
}

document.addEventListener('click', function (event) {
  if (event.target.tagName == 'BUTTON') {
    alert('BUTTON CLICKED');
  }
});
