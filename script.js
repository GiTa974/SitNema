
function DisplayOneTopRatedMovie(apiUrl){
    let pathFilmsSortedByScore = '?sort_by=-imdb_score'
    fetch(apiUrl + pathFilmsSortedByScore).then(response => {
        return response.json();
      }).then(data => {
        current_div = document.getElementById('bestMovie');
        // current_div.innerHTML = data.results[0].title + '<BR>';
        let div = document.createElement("DIV");
        div.setAttribute("class", "titleOne");
        current_div.appendChild(div);
        div.innerHTML = data.results[0].title;
        src = data.results[0].image_url,
        img = document.createElement('img');
        let id = data.results[0].id + '';
        // console.log(id);
        img.addEventListener("click", function () {
            feed_modal(apiUrl, id)
          });
        img.src = src;
        current_div.appendChild(img)
            let btn = document.createElement("BUTTON");
            btn.innerHTML = "More Info"; 
    }).catch(err => {
        console.log('error', err);
    }); 
}

function DisplayCategory(apiUrl, filter, div){
    // let filter = '?sort_by=-imdb_score'
    fetch(apiUrl + filter).then(response => {
        return response.json();
      }).then(data => {
        // console.log(data);
        // console.log(data.results);
        listOfMovies = data.results;
        prepareData(listOfMovies, div)
        let apiUrlNextPage = data.next;
        if (apiUrlNextPage){
          fetch(apiUrlNextPage).then(response => {
            return response.json();
          }).then(data => {
            listOfMoviesNextPage = data.results;
            prepareData(listOfMoviesNextPage, div)
          }).catch(err => {
            // Do something for an error here
            console.log('error no next page', err);
        });
      };
        createButtons(div);
        placeButton(div);
    }).catch(err => {
        // log error
        console.log('error', err);
    }); 

};

function prepareData(listOfMovies, div){
  for (let i=0; i<listOfMovies.length;i++){
    current_div = document.getElementById(div)
    let contenaire = document.createElement("contenair");
    contenaire.setAttribute('class', 'contenair')
    current_div.appendChild(contenaire);
    // title
    let div_title = document.createElement("DIV");
    div_title.setAttribute("class", "titleSmall");
    contenaire.appendChild(div_title);
    div_title.innerHTML = listOfMovies[i].title;
    // image
    let div_img = document.createElement("DIV");
    contenaire.appendChild(div_img)
    let id = listOfMovies[i].id + '';
    // console.log(id);
    contenaire.addEventListener("click", function () {
        feed_modal(apiUrl, id);
      });
    if(i==10){
        contenaire.style.display = "none";
    }
    src = listOfMovies[i].image_url;
    img = document.createElement('img');
    img.src = src;
    div_img.appendChild(img);
}
};

function feed_modal(apiUrl, id) {
    fetch(apiUrl + id).then(response => {
        return response.json();
      }).then(data => {
          // console.log(data.long_description)
          // console.log(data)
          description_div = document.getElementById('description');
          // console.log(description_div);
          let head = document.getElementById('modal_header');
          //   head.replaceChild(img, head.lastChild);
          head.innerHTML = data.title + ' (' + data.year + ')';
          // informations
          let body = document.getElementById('modal_body');
          let sep = '<BR>';
          let genre = 'genre(s) : ' + data.genres + sep;
          let date = 'date de sortie : ' + data.year + sep;
          let rated = 'rated : ' + data.rated + sep;
          let score = 'imdb_score : ' + data.imdb_score + sep;
          let directors = 'realisateur(s) : ' + data.directors + sep;
          let actors = 'acteur(s) : ' + data.actors + sep;
          let duration = 'duree : ' + data.duration + " min" + sep;
          let countries = 'pays : ' + data.country + sep;
          let boxOffice = 'box office : ' + data.usa_gross_income + ' USD' + sep;
          let resume = 'Resume : ' + data.long_description + sep;
          infos = document.createElement('DIV');
          infos.setAttribute("class", "infosModal");
          body.innerHTML = ''; // erase default text in modal
          body.appendChild(infos);
          infos.innerHTML = genre+date+rated+score+directors+actors+duration+countries+
          boxOffice+resume;
          // image
          src = data.image_url;
          img = document.createElement('img');
          img.src = src;
          try {
            infos.replaceChild(img, body.img);
          } catch (error) {
            // console.error(error);
            infos.appendChild(img);
          };
        //   body.innerHTML = data.description;
        }).catch(err => {
            // Do something for an error here
            console.log('error', err);
        }); 
    openModal();
  };

// CARROUSEL
sequence = [0,1,2];

function displayItemsFromSequence(arrayOfItems, sequence_to){
  // let bestMovieSection = document.getElementById('categorie01Section');
  // let content = bestMovieSection.children;

  for (let i=0; i<arrayOfItems.length; i++){
    console.log(sequence_to);
    if (sequence_to.indexOf(i) > -1) {
      arrayOfItems[i].style.display = '';
      console.log('child n ' + i + ' show');
    } else {
      arrayOfItems[i].style.display = 'none';
      console.log('child n ' + i + ' hide');
    }
  }
};

function placeButton(sectionName){
  //TODO with class 
  console.log('section name = ' + sectionName);
  let mydiv = document.getElementById(sectionName);
  let button_previous = mydiv.nextSibling;
  let button_next = mydiv.nextSibling.nextSibling;
  // console.log('NS NS' + button);
  let witdh_button_next = button_next.offsetWidth;
  let height_button_next = button_next.offsetHeight;
  let displayX = document.body.offsetWidth;
  let witdh_button_previous = button_previous.offsetWidth;
  let height_button_previous = button_previous.offsetHeight;
  // let displayY = document.body.offsetHeight;
  let positionXButtonNext = displayX - witdh_button_next;
  let positionYButtonNext = 318/2 + height_button_next/2;
  button_next.style.marginLeft  = positionXButtonNext;
  let positionXButtonPrevious = 0;
  let positionYButtonPrevious = 318/2 + height_button_previous/2;;
  // button.style.marginTop  = '-200px';
  button_next.style.position  = 'absolute';
  button_next.style.marginTop  = '-' + positionYButtonNext;
  
  console.log(button_previous);
  // let height_button_previous = button_previous.offsetHeight;
  // displayY = document.body.offsetHeight;
  button_previous.style.marginLeft  = positionXButtonPrevious;
  // button.style.marginTop  = '-200px';
  button_previous.style.position  = 'absolute';
  button_previous.style.marginTop  = '-' + positionYButtonPrevious;
};

function previous(sectionName){
  console.log('previous');
  let divToImpact = document.getElementById(sectionName);
  let elementToReplace = divToImpact.removeChild(divToImpact.lastChild);
  console.log(elementToReplace);
  divToImpact.insertBefore(elementToReplace, divToImpact.firstChild);
};
function next(sectionName){
  console.log('next ' + sectionName);
  let divToImpact = document.getElementById(sectionName);
  console.log(divToImpact);
  let elementToReplace;
  if(divToImpact.firstChild.textContent == '\n'){
    divToImpact.firstChild.remove();
    // elementToReplace = divToImpact.removeChild(divToImpact.firstChild.nextSibling);
    elementToReplace = divToImpact.removeChild(divToImpact.firstChild);
    console.log('element foireux detected');
  } else {
    elementToReplace = divToImpact.removeChild(divToImpact.firstChild);
  };
  console.log(elementToReplace);
  // divToImpact.insertBefore(elementToReplace, divToImpact.lastChild.nextSibling);
  divToImpact.appendChild(elementToReplace);
};

function createButtons(sectionName){
  // button next 
  button_next = document.createElement("button");
  section = document.getElementById(sectionName);
  section.append(button_next);
  button_next.setAttribute('id', 'button_next_' + sectionName);
  button_next.setAttribute('class', 'button_next');
  button_next.addEventListener('click', function() {next(sectionName);})
  button_next.textContent = ''
  section.parentNode.insertBefore(button_next, section.nextSibling);
  // button previous
  button_previous = document.createElement("button");
  section = document.getElementById(sectionName);
  section.append(button_previous);
  button_previous.setAttribute('id', 'button_previous' + sectionName);
  button_previous.setAttribute('class', 'button_previous');
  button_previous.addEventListener('click', function() {previous(sectionName);})
  button_previous.textContent = ''
  section.parentNode.insertBefore(button_previous, section.nextSibling);
  // return {button_next, button_previous};
};