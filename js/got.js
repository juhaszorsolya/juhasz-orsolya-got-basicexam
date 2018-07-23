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
