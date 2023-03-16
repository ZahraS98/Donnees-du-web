// Globals

var COUNTRIES_RESTAPI = "https://restcountries.com/v2/alpha/"

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
    console.log(val)
	xsltProcessor.setParameter(null, "param_ref_type", val);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML('/Users/ombahiwal/Desktop/INSABioSciences/DonneesDuWeb/LabStatementTP/fichiers/countriesTP.xml');

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML = newXmlDocument.getElementsByTagName('element_a_recuperer')[0].innerHTML;
    console.log(newXmlDocument.getElementsByTagName('element_a_recuperer')[0].innerHTML);

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
            // console.log(getCurrencyfromCode(event.target.id));
        });
        country.addEventListener('mouseleave', (event)=>{
            console.log('leave');
            event.target.setAttribute('class', 'land');
            // code to show the details in table.
        });
    }
}

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

