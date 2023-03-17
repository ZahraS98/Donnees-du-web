// Globals

const COUNTRIES_RESTAPI = "https://restcountries.com/v2/alpha/"
var country_names_set = new Array();
var countries_dataset = new Object();
var language_dataset = new Object();
var selected_country = "";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function recupererPremierEnfantDeTypeElement(n) {
    var x = n.firstChild;
    while (x.nodeType != 1) { // Test if x is an element node (and not a text node or other)
        x = x.nextSibling;
    }
    return x;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'�lement avec l'id "nom" avec la chaine de caract�res en param�tre	  
function setNom(nom) {
    var elementHtmlARemplir = window.document.getElementById("id_nom_a_remplacer");
    elementHtmlARemplir.innerHTML = nom;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//charge le fichier XML se trouvant � l'URL relative donn� dans le param�treet le retourne
function chargerHttpXML(xmlDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    //chargement du fichier XML � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Charge le fichier JSON se trouvant � l'URL donn�e en param�tre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier JSON � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton2_ajaxEmployees(xmlDocumentUrl) {


    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    //extraction des noms � partir du document XML (avec une feuille de style ou en javascript)
    var lesNoms = xmlDocument.getElementsByTagName("LastName");

    // Parcours de la liste des noms avec une boucle for et 
    // construction d'une chaine de charact�res contenant les noms s�par�s par des espaces 
    // Pour avoir la longueur d'une liste : attribut 'length'
    // Acc�s au texte d'un noeud "LastName" : NOM_NOEUD.firstChild.nodeValue
    var chaineDesNoms = "";
    for (i = 0; i < lesNoms.length; i++) {
        if (i > 0) {
            chaineDesNoms = chaineDesNoms + ", ";
        }
        chaineDesNoms = chaineDesNoms + lesNoms[i].firstChild.nodeValue + " ";
    }


    // Appel (ou recopie) de la fonction setNom(...) ou bien autre fa�on de modifier le texte de l'�l�ment "span"
    setNom(chaineDesNoms);



}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton3_ajaxBibliographie(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer) {

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

	//cr�ation d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_ajaxBibliographieAvecParametres(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer, paramXSL_type_reference) {

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

	//cr�ation d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
	
	//passage du param�tre � la feuille de style
	xsltProcessor.setParameter("", "param_ref_type", paramXSL_type_reference);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
	

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_ajaxEmployeesTableau(xmlDocumentUrl, xslDocumentUrl) {
    //commenter la ligne suivante qui affiche la bo�te de dialogue!
    alert("Fonction � compl�ter...");
}

function changeBg(){
    document.body.style.backgroundColor = "blue";
    document.body.style.color = "white";
}

function resetBg(){
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
}

// var userCountryEntry = document.getElementById("countrycode");
// userCountryEntry.addEventListener('change', cherchePays(userCountryEntry.value));

function cherchePays(val){
    
    var xslDocument = chargerHttpXML('/Users/ombahiwal/Desktop/INSABioSciences/DonneesDuWeb/LabStatementTP/fichiers/ajax/cherchePays.xsl') ;
    var xsltProcessor = new XSLTProcessor();
    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

	//passage du param�tre � la feuille de style 
	xsltProcessor.setParameter(null, "param_ref_type", val.toUpperCase());

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML('/Users/ombahiwal/Desktop/INSABioSciences/DonneesDuWeb/LabStatementTP/fichiers/countriesTP.xml');

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    // var elementHtmlParent = window.document.getElementById("show_cherche_result");
	// ins�rer l'�lement transform� dans la page html
    // elementHtmlParent.ariaPlaceholder = newXmlDocument.getElementsByTagName('element_a_recuperer')[0].textContent;
    var result =  newXmlDocument.getElementsByTagName('element_a_recuperer')[0];
    window.document.getElementById("show_cherche_result_pretty").innerHTML = result.innerHTML;
    // console.log(newXmlDocument.getElementsByTagName('element_a_recuperer')[0].innerHTML);
    
    // selected country 
    selected_country =result.innerText;
    
}
var svg_title;
function loadSVG(path){
    var svg = chargerHttpXML('/Users/ombahiwal/Desktop/INSABioSciences/DonneesDuWeb/LabStatementTP/fichiers/ajax/'+path);
    var serializer = new XMLSerializer();
    svg_title = svg.title;
    var str = serializer.serializeToString(svg);
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    elementHtmlParent.innerHTML = str;
}
function replaceSVG(event){
    console.log(event.target.value, svg_title);
    // var svg = chargerHttpXML('/Users/ombahiwal/Desktop/INSABioSciences/DonneesDuWeb/LabStatementTP/fichiers/ajax/exemple.svg');
}
function makeClickableShapes(){
    // second child of svg is the <g> tag and the child nodes of <g> tag are the shapes with specific ID.
    var formes = document.getElementById("lesFormes").children;
    formes = formes[0];
    for (var form  of formes.childNodes){
        if(form.nodeName !== "#text"){
            form.addEventListener("click", (event)=>{
                alert(event.target.getAttribute("title"));
            });
        }
    }   
}

function getCountryNodeList(){
    var countries = document.getElementsByTagName("g")[0].childNodes;
    console.log(countries);
    var countries_array = new Array();
    for (var country of countries){
        if(country.nodeName !== "#text") countries_array.push(country);            
    }
    return countries_array
}

// Button 7 
function makeClickableMap(){
    var countries = getCountryNodeList();
    for (var country of countries){
        // event on
        country.addEventListener('click', (event)=>{
            console.log(event.target.getAttribute("id"));
            alert(event.target.getAttribute("countryname"))
        });
    }
}
// 
function enableMapHover(){
    var countries = getCountryNodeList();
    for (var country of countries){
        // event on
        country.addEventListener('mouseover', (event)=>{
            var country_code = event.target.getAttribute("id");
            event.target.getAttribute("id");
            // code to show the details in table.
            event.target.setAttribute('class', 'land_onhover');
            // document.getElementById('country_info_table').innerHTML = event.target.getAttribute("countryname");
            infoPays(country_code);
            // countryLang(country_code);
            // console.log(getCurrencyfromCode(event.target.id));
        });
        country.addEventListener('mouseleave', (event)=>{
            console.log('leave');
            event.target.setAttribute('class', 'land');
            window.document.getElementById("country_info_table").innerHTML = "";
            // code to show the details in table.
        });
    }
    // Init
    generateDatalist();
    document.getElementById('countrycode').addEventListener('input', autocompleteCountryText);
    flying_div();
}

function flying_div(){
    document.addEventListener('mousemove', function(event) {        
        let table = document.getElementById('country_info_table');
        var x = event.clientX + 100;
        var y = event.clientY +100;
        table.style.left = x + "px";
        table.style.top = y + "px";
      });
}
// country table on hover
function infoPays(country_code){

    var xslDocument = chargerHttpXML('/Users/ombahiwal/Desktop/INSABioSciences/DonneesDuWeb/LabStatementTP/fichiers/ajax/countryTable.xsl') ;
    var xsltProcessor = new XSLTProcessor();
    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

	//passage du param�tre � la feuille de style
	xsltProcessor.setParameter(null, "country_code", country_code);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML('/Users/ombahiwal/Desktop/INSABioSciences/DonneesDuWeb/LabStatementTP/fichiers/countriesTP.xml');

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("country_info_table");
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML = newXmlDocument.getElementsByTagName('element_a_recuperer')[0].innerHTML;
    console.log(newXmlDocument.getElementsByTagName('element_a_recuperer')[0].innerHTML);
 
}

// API request code
function getCurrencyfromCode(country_code){

    var theUrl = COUNTRIES_RESTAPI + country_code.toLowerCase();
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    // xmlHttp.setRequestHeader("Access-Control-Allow-Origin","*");
    // xmlHttp.setRequestHeader("Access-Control-Allow-Credentials", "false");
    // xmlHttp.setRequestHeader("Access-Control-Allow-Methods", "GET, PUT, POST");
    // xmlHttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // xmlHttp.send( null );
    // return xmlHttp.responseText;

    fetch(theUrl, {mode: 'cors', headers: {
        'Access-Control-Allow-Origin':'*'
      }})
        .then(function(res) {
            // handle the response
            console.log(res);
        })
        .catch(function() {
            // handle the error
        });
}

// datalist generation for countries and codes
function generateDatalist(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Parse the XML response
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
        var data = []; // country name
        var data2 = []; // country code
        var data3 = []; // country languages string
        /* Datalist for cca2 */
        // Traverse the DOM tree to extract the data you need
        var items = xmlDoc.getElementsByTagName("country");
        var lang_str = "";
        for (var i = 0; i < items.length; i++) {
            lang_str = "";
            try{
                // console.log(items[i].children[0].children[0].textContent, items[i].children[2].children[0].textContent)
                
                // data.push(items[i].children[0].children[0].textContent);
                for(var language of items[i].getElementsByTagName("languages")[0].children){
                     lang_str += language.nodeName +",";
                }
                data2.push(lang_str += items[i].children[2].children[0].textContent);
                data.push(items[i].children[0].children[0].textContent);
                // data3.push(lang_str);
                
            }catch(e){console.log(e)}
        }

        // Create a datalist element and add it to the DOM
        var datalist = document.createElement("datalist");
        datalist.id = "country_common_names";
        document.body.appendChild(datalist);

        // Populate the datalist element with options based on the extracted data
        for (var i = 0; i < data.length; i++) {
            var option = document.createElement("option");
            option.value = data2[i];
            option.innerText = data[i];
            datalist.appendChild(option);
        }
        // console.log(datalist);
        countries_dataset = document.getElementById("country_common_names");
    }
    };
    xhttp.open("GET", "/Users/ombahiwal/Desktop/INSABioSciences/DonneesDuWeb/LabStatementTP/fichiers/countriesTP.xml", true);
    xhttp.send();
}
// check if selected country has similar languages, color
function resetLanguageColors(){
    for(var path of document.getElementsByTagName('path')){
        path.setAttribute("class", "land");
    }
}
function checkLanguages(lang_str){
    // console.log(lang_str)
    var check_arr = lang_str.slice(0,-2).split(",");
    var colorLand = "land";
    for(var option of countries_dataset.options){
        try{
            for(var check of check_arr){
                console.log(check)
            
                if(check && option.value.slice(0,-2).includes(check)){
                    colorLand = option.value.slice(-2);
                    console.log(option, colorLand);
                    document.getElementById(colorLand).setAttribute("class", "land_green")
                }else{
                    colorLand = "land";
                }
                // console.log(option.value.slice(-2), option.value.slice(0,-2),option.value.slice(0,-2).includes(check_str));
                // document.getElementById(option.value.slice(-2)).setAttribute("class", colorLand);
            }
        }catch(e){

        }
    }

}


// ### Solution 9
function autocompleteCountryText(event){

    var inputValue = event.target.value.toLowerCase();
    if(inputValue.length >=2){
        var matches;
        // Filter the options in the datalist to find matches
        var options = countries_dataset.options;
        var matches = Array.prototype.filter.call(options, function(option) {
            return option.innerText.toLowerCase().indexOf(inputValue) !== -1;
        });

        // Clear the datalist and add the matching options show_autocomplete_result_pretty
        
        document.getElementById('show_autocomplete_result_pretty_ul').innerHTML = "";
        console.log(matches);
        matches.forEach(function(match) {
            console.log(match)
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(match.innerText));
            document.getElementById('show_autocomplete_result_pretty_ul').appendChild(li);

        });

        if(matches.length == 1){
            selected_country = matches[0].innerText;
            console.log(selected_country);
            checkLanguages(matches[0].value)
        }else{
            selected_country = "";
            resetLanguageColors();
        }
    }
    
}

