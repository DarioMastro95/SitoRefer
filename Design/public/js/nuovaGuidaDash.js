var counter = 0;

function validateTitle(campo) {
  return new Promise(function (resolve, reject){
    if(campo==''){
      alert("Inserire titolo");
      resolve(false);
    }
    else{
      $.get(
        '/guideTech/'+campo,
        function(response) {
          if (response) {
            console.log('titolo trovato '+response.anteprima.titolo);
            resolve(true);
          }
          else {
            console.log('titolo non trovato');
            alert("Titolo non corretto o non inserito");
            $('#titolo').val('');
            resolve(false);
          }
        }
      );
    }
  });
}

$(document).ready(function () {
  var titolo = '';
  var introduzione = '';
  var prodotti =[];
  $('#LoadGuida').click(function (event) {
    event.preventDefault();
    titolo = $('#titolo').val();
    introduzione = $('#introduzione').val();
    validateTitle(titolo).then(function(result,err) {
      console.log(result);
      if (result) {
        for (var i = 0; i < counter; i++) {
          prodotti.push({posizione:i,nome:$('#nomeP'+i).val(),link:$('#linkP'+i).val(),descrizione:$('#descrizioneP'+i).val(),immagine:$('#immagineP'+i).val()})
        }
        console.log(titolo);
        console.log(prodotti);
      }
    });
  });

  $('#AggiungiProdotto').click(function (event) {
    event.preventDefault();
    $('#Prodotti').append('<div class="separate"><h5>Prodotto ' + (counter + 1) + '</h5></div><div class="row"><div class="col-lg-6"><div class="form-group"><label for="immagineP' + counter + '">Immagine</label><input type="text" class="form-control" id="immagineP' + counter + '" aria-describedby="" placeholder="Url immagine prodotto"></div><div class="form-group"><label for="nomeP' + counter + '">Nome</label><input type="text" class="form-control" id="nomeP' + counter + '" aria-describedby="" placeholder="Nome prodotto"></div><div class="form-group"><label for="linkP' + counter + '">Link amazon</label><input type="text" class="form-control" id="linkP' + counter + '" aria-describedby="" placeholder="Url amazon"></div></div><div class="col-lg-6"><textarea class="form-control guidaDescrizioneP" id="descrizioneP' + counter + '" rows="10" placeholder="descrizione prodotto"></textarea></div></div>');
    counter = counter + 1;
    console.log(counter);
  });

  $('#bold').click(function (event) {
    $('#introduzione').val($('#introduzione').val() + ('<b></b>'));
  });
  $('#italic').click(function (event) {
    $('#introduzione').val($('#introduzione').val() + ('<i></i>'));
  });
  $('#puntato').click(function (event) {
    $('#introduzione').val($('#introduzione').val() + ('<ul><li></li></ul>'));
  });

});
