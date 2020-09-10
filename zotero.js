zoteroAPI2 = function(url, counter) {
  var keyword, searchurl;
  //Deleting results of maybe earlier requests
  $('div#zoteroSearch-results').empty();
  //Adding ajax loader while waiting for the resulst
  $('div#zoteroSearch-results').append('<img id="ajaxloader" src="ajaxLoader.gif" height="42" width="42"/>');
  $("h1#emptyListHeader").remove();
  //Getting the keyyword for search request to zotero database
  keyword = $('input#zoteroSearch-keyword').val();
  
  //These variables has to be filled out
  apikey = ""
  usernumber = ""
  searchurl = url + keyword;

  if (next === false) {
    counter = 1;
  }
  return $.ajax({
    type: 'GET',
    url: searchurl,
    cache: false,
    dataType: 'json'
  }).done(function(data) {
    var accessed, archive, author, authorCount, authors, authorsDisp, blogTitle, bookTitle, callNumber, citation, counterDataSet, date, dateAdded, dates, editorsDisp, id, institution, itemType, j, len, len1, manuscriptType, meetingName, pages, place, publicationTitle, publisher, publishingPlace, reportType, section, series, seriesNumber, thesisType, title, university, volume, w;
    if (data.length > 0) {
      $('button#prev').removeAttr('style');
      $('button#next').removeAttr('style');
      counterDataSet = 0;
      for (j = 0, len = data.length; j < len; j++) {
        dates = data[j];
        id = "https://www.zotero.org/idiom_bibliography/items/" + data[counterDataSet]['data']['key'];
        authors = data[counterDataSet]['data']['creators'];
        title = data[counterDataSet]['data']['title'] + ". ";
        if (data[counterDataSet]['data']['date'].length === 0) {
          date = "";
        } else {
          date = " (" + data[counterDataSet]['data']['date'] + "): ";
        }
        itemType = data[counterDataSet]['data']['itemType'];
        authorsDisp = [];
        editorsDisp = [];
        authorCount = 0;
        for (w = 0, len1 = authors.length; w < len1; w++) {
          author = authors[w];
          if (authorCount === 0) {
            if (author.creatorType === "author" || author.creatorType === "cartographer" || author.creatorType === "contributor" || author.creatorType === "presenter") {
              authorsDisp.push(" " + author.lastName + ", " + author.firstName);
            }
            if (author.creatorType === "editor") {
              if (authorsDisp.length === 0) {
                editorsDisp.push(" " + author.lastName + ", " + author.firstName);
              }
            }
          } else {
            if (author.creatorType === "author") {
              authorsDisp.push(" " + author.firstName + " " + author.lastName);
            }
            if (author.creatorType === "editor") {
              editorsDisp.push(" " + author.firstName + " " + author.lastName);
            }
          }
          if (author.creatorType === "author") {
            authorCount++;
          }
        }
        if (itemType === "journalArticle") {
          if (data[counterDataSet]['data']['volume'].length === 0) {
            volume = "";
          } else {
            volume = data[counterDataSet]['data']['volume'] + ": ";
          }
          if (data[counterDataSet]['data']['publicationTitle'].length === 0) {
            publicationTitle = "";
          } else {
            publicationTitle = data[counterDataSet]['data']['publicationTitle'] + " ";
          }
          if (data[counterDataSet]['data']['pages'].length === 0) {
            pages = "";
          } else {
            pages = data[counterDataSet]['data']['pages'] + ". ";
          }
          citation = authorsDisp + date + title + publicationTitle + volume + pages;
        }
        if (itemType === "blogPost" || itemType === "encyclopediaArticle" || itemType === "webpage") {
          if (data[counterDataSet]['data']['url'].length === 0) {
            url = "";
          } else {
            url = data[counterDataSet]['data']['url'];
          }
          if (itemType === "blogPost") {
            if (data[counterDataSet]['data']['blogTitle'].length === 0) {
              blogTitle = "";
            } else {
              blogTitle = data[counterDataSet]['data']['blogTitle'] + ". ";
            }
          }
          if (data[counterDataSet]['data']['dateAdded'].length === 0) {
            accessed = "";
          } else {
            accessed = " [" + data[counterDataSet]['data']['dateAdded'] + "]";
          }
          citation = authorsDisp + date + title + "Electronic Document. " + url + accessed;
        }
        if (itemType === "book") {
          if (data[counterDataSet]['data']['publisher'].length === 0) {
            publisher === "";
          } else {
            publisher = data[counterDataSet]['data']['publisher'] + ", ";
          }
          if (data[counterDataSet]['data']['place'].length === 0) {
            publishingPlace = "";
          } else {
            publishingPlace = data[counterDataSet]['data']['place'] + ".";
          }
          if (data[counterDataSet]['data']['seriesNumber'].length === 0) {
            seriesNumber = "";
          } else {
            seriesNumber = " " + data[counterDataSet]['data']['seriesNumber'] + ". ";
          }
          if (seriesNumber.length === 3) {
            seriesNumber = "";
          }
          if (data[counterDataSet]['data']['series'].length === 0) {
            series = "";
          } else {
            series = data[counterDataSet]['data']['series'];
          }
          if (data[counterDataSet]['data']['volume'].length === 0) {
            volume = "";
          } else {
            volume = "(" + data[counterDataSet]['data']['volume'] + ").";
          }
          if (authorsDisp.length === 0) {
            authorsDisp = editorsDisp;
          }
          citation = authorsDisp + date + title + series + seriesNumber + volume + publisher + publishingPlace;
        }
        if (itemType === "bookSection") {
          if (data[counterDataSet]['data']['volume'].length === 0) {
            volume = "";
          } else {
            volume = ". Vol. " + data[counterDataSet]['data']['volume'];
          }
          if (data[counterDataSet]['data']['series'].length === 0) {
            series = "";
          } else {
            series = data[counterDataSet]['data']['series'];
          }
          if (data[counterDataSet]['data']['seriesNumber'].length === 0) {
            seriesNumber = "";
          } else {
            seriesNumber = " " + data[counterDataSet]['data']['seriesNumber'] + ". ";
          }
          if (data[counterDataSet]['data']['bookTitle'].length === 0) {
            bookTitle = "";
          } else {
            bookTitle = " In: " + data[counterDataSet]['data']['bookTitle'];
          }
          if (data[counterDataSet]['data']['pages'].length === 0) {
            pages = "";
          } else {
            pages = ", pp. " + data[counterDataSet]['data']['pages'] + ". ";
          }
          if (typeof publisher === "undefined") {
            publisher = "";
          } else {
            publisher = data[counterDataSet]['data']['publisher'] + ", ";
          }
          if (data[counterDataSet]['data']['place'].length === 0) {
            publishingPlace = "";
          } else {
            publishingPlace = data[counterDataSet]['data']['place'] + ".";
          }
          if (authorsDisp.length === 0) {
            authorsDisp = editorsDisp;
          }
          citation = authorsDisp + date + title + bookTitle + volume + ", edited by: " + editorsDisp + pages + series + seriesNumber + publisher + publishingPlace;
        }
        if (itemType === "manuscript") {
          if (data[counterDataSet]['data']['manuscriptType'].length === 0) {
            manuscriptType = "";
          } else {
            manuscriptType = data[counterDataSet]['data']['manuscriptType'] + ". ";
          }
          if (data[counterDataSet]['data']['callNumber'].length === 0) {
            callNumber = "";
          } else {
            callNumber = data[counterDataSet]['data']['callNumber'] + ".";
          }
          if (data[counterDataSet]['data']['archive'].length === 0) {
            archive = "";
          } else {
            archive = data[counterDataSet]['data']['archive'] + ". ";
          }
          citation = authorsDisp + date + title + manuscriptType + archive + callNumber;
        }
        if (itemType === "thesis") {
          if (data[counterDataSet]['data']['thesisType'].length === 0) {
            thesisType = "";
          } else {
            thesisType = data[counterDataSet]['data']['thesisType'] + ", ";
          }
          if (data[counterDataSet]['data']['place'].length === 0) {
            university = "";
          } else {
            university = data[counterDataSet]['data']['place'] + ". ";
          }
          if (data[counterDataSet]['data']['university'].length === 0) {
            place = "";
          } else {
            place = data[counterDataSet]['data']['university'] + ", ";
          }
          if (data[counterDataSet]['data']['url'].length === 0) {
            url = "";
          } else {
            url = data[counterDataSet]['data']['url'];
          }
          citation = authorsDisp + date + title + thesisType + place + university + url;
        }
        if (itemType === "magazineArticle") {
          if (data[counterDataSet]['data']['publicationTitle'].length === 0) {
            publicationTitle = "";
          } else {
            publicationTitle = data[counterDataSet]['data']['publicationTitle'] + " ";
          }
          if (data[counterDataSet]['data']['volume'].length === 0) {
            volume = "";
          } else {
            volume = data[counterDataSet]['data']['volume'] + ": ";
          }
          if (data[counterDataSet]['data']['pages'].length === 0) {
            pages = "";
          } else {
            pages = data[counterDataSet]['pages']['pages'] + ".";
          }
          citation = authorsDisp + date + title + publicationTitle + volume + pages;
        }
        if (itemType === "newspaperArticle") {
          if (data[counterDataSet]['data']['publicationTitle'].length === 0) {
            publicationTitle = "";
          } else {
            publicationTitle = data[counterDataSet]['data']['publicationTitle'] + " ";
          }
          if (data[counterDataSet]['data']['section'].length === 0) {
            section = "";
          } else {
            section = data[counterDataSet]['data']['section'] + ": ";
          }
          if (data[counterDataSet]['data']['pages'].length === 0) {
            pages = "";
          } else {
            pages = data[counterDataSet]['data']['pages'] + ".";
          }
          citation = authorsDisp + date + title + publicationTitle + section + pages;
        }
        if (itemType === "report") {
          if (data[counterDataSet]['data']['reportType'].length === 0) {
            reportType = "";
          } else {
            reportType = data[counterDataSet]['data']['reportType'] + ". ";
          }
          if (data[counterDataSet]['data']['institution'].length === 0) {
            institution = "";
          } else {
            institution = data[counterDataSet]['data']['institution'] + ", ";
          }
          if (data[counterDataSet]['data']['place'].length === 0) {
            place = "";
          } else {
            place = data[counterDataSet]['data']['place'] + ". ";
          }
          if (data[counterDataSet]['data']['url'].length === 0) {
            url = "";
          } else {
            url = data[counterDataSet]['data']['url'];
            if (url.length > 0) {
              dateAdded = data[counterDataSet]['data']['dateAdded'];
              url = " " + url + ". [" + data[counterDataSet]['data']['dateAdded'] + "]";
            }
          }
          citation = authorsDisp + date + title + reportType + institution + place + url;
        }
        if (itemType === "document") {
          if (data[counterDataSet]['data']['url'].length === 0) {
            url = "";
          } else {
            url = data[counterDataSet]['data']['url'];
          }
          if (url.length > 0) {
            dateAdded = data[counterDataSet]['data']['dateAdded'];
            url = " " + url + ". [" + data[counterDataSet]['data']['dateAdded'] + "]";
          }
          citation = authorsDisp + date + title + url;
        }
        if (itemType === "map") {
          if (data[counterDataSet]['data']['place'].length === 0) {
            place = "";
          } else {
            place = data[counterDataSet]['data']['place'] + ". ";
          }
          if (data[counterDataSet]['data']['url'].length === 0) {
            url = "";
          } else {
            url = data[counterDataSet]['data']['url'];
            if (url.length > 0) {
              dateAdded = data[counterDataSet]['data']['dateAdded'];
              url = " " + url + ". [" + data[counterDataSet]['data']['dateAdded'] + "]";
            }
          }
          if (data[counterDataSet]['data']['place'].length === 0) {
            publisher = "";
          } else {
            publisher = data[counterDataSet]['data']['publisher'] + ", ";
          }
          citation = authorsDisp + ": " + title + publisher + place + url;
        }
        if (itemType === "presentation") {
          if (data[counterDataSet]['data']['meetingName'].length === 0) {
            meetingName = "";
          } else {
            meetingName = data[counterDataSet]['data']['meetingName'];
          }
          citation = authorsDisp + date + title + meetingName;
        }
        if ($('div#zoteroSearch input[value="' + id + '"]').length) {
          return true;
        }
        $('img#ajaxloader').remove();
        $('div#zoteroSearch-results').append('<div class="radio"> <label> <input type="radio" name="zoteroSearch-radios" value="' + id + '"> <div class="bibcit"><strong>[' + counter + ']</strong>  ' + citation + ' </div></label> </div>');
        counterDataSet++;
        counter++;
        $("button#idiom_zoteroURISearch").prop('disabled', false);
        $("button#idiom_zoteroURISearch").text('Search');
      }
      $('button#next').unbind("click");
      $('button#next').click(function(e) {
        e.preventDefault();
        next = true;
        nextValue = nextValue + 40;
        return zoteroAPI2("zoteroSearch", "https://api.zotero.org/users/" + usernumber + "/items?sort=date&limit=40&start=" + nextValue + "&format=json&key=" + apikey + "&q=", counter);
      });
      $('button#prev').unbind("click");
      $('button#prev').click(function(e) {
        e.preventDefault();
        next = true;
        nextValue = nextValue - 40;
        counter = counter - 80;
        return zoteroAPI2("zoteroSearch", "https://api.zotero.org/users/" + usernumber + "/items?sort=date&limit=40&start=" + nextValue + "&format=json&key=" + apikey + "&q=", counter);
      });
    } else {
      $("button#zoteroURISearch").prop('disabled', false);
      $("button#zoteroURISearch").text('Search');
      $('img#ajaxloader').remove();
      $('div.modal-header').append('<h1 id="emptyListHeader">No Results</h1>');
    }
    $("div#idiom_zoteroURI button.close").click(function(e) {
      var nextPage;
      $("h1#emptyListHeader").remove();
      counter = 1;
      return nextPage = "";
    });
    $('button#set-zoteroSearchExt').unbind("click");
    return $('button#set-zoteroSearchExt').click(function(e) {
      var $this, bibCit, refId, sourcestoCheck, sourcestoCheckMainLayer, sourcetoCheckMainLayer;
      e.preventDefault();
      $this = currentField;
      refId = currentField.parent().parent().parent().parent().parent().parent().attr('id');
      sourcestoCheck = $("div#" + refId + " div.idiom\\:zoteroURI span.value").text();
      sourcetoCheckMainLayer = $("fieldset").first().children('div.dct\\:isReferencedBy').children().children('div.isReferencedBy').children().children('div.idiom\\:zoteroURI').children().children('span.value').text();
      if (typeof refId !== "undefined" && sourcestoCheck.match($('div#zoteroSearch-results input[name="zoteroSearch-radios"]:checked').val())) {
        alert("Source already given in this section. Please choose another source.");
      } else if (typeof refId === "undefined" && sourcetoCheckMainLayer.match($('div#zoteroSearch-results input[name="zoteroSearch-radios"]:checked').val())) {
        alert("Duplication on main layer. Please choose another source.");
      } else {
        $this = currentField;
        refId = currentField.parent().parent().attr('id');
        id = $('div#zoteroSearch-results input[name="zoteroSearch-radios"]:checked').val();
        bibCit = $('div#zoteroSearch-results input[value="' + id + '"]').next().text();
        bibCit = bibCit.substring((bibCit.search(/] /)) + 4, bibCit.length);
        if (id) {
          currentField.find('span.value + span').remove();
          currentField.find('span.value').text(id);
        }
        counter = 1;
        $("div#" + refId + " input#dct\\:bibliographicCitation").val(bibCit);
        nextValue = 0;
        counter = 1;
        $("h1#emptyListHeader").remove();
      }
      sourcestoCheck = "";
      return sourcestoCheckMainLayer = "";
    });
  });
};
