<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Tue Mar 07 17:05:41 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html"/>
	
	<xsl:template match="/">
	<html>
		<head>
			<title>
			Countries of the world
			</title>
		</head>
		
		<body style="background-color:white;">
		
			<h1>Information about the countries</h1>
			<div style="color:green">
			<center>Objectif : Données pour illuster le TP du module Données du Web, 3IF, Département Informatique INSA de Lyon </center>
			</div><br/>
 			Styled by: Isabelle Bryans, Omkar Bahiwal, Zahra Saremi (B3600)
			<hr/>
			<hr/>
		<!--xsl:apply-templates/-->
		<p>Countries where more than 2 langauges are spoken:</p>
		<xsl:for-each select="//country[languages[count(*)>2]]">
        <ul>
			<li><xsl:value-of select="country_name/common_name"/> :  <xsl:value-of select="languages"/> 
			<!-- <xsl:for-each select="languages"> -->
			<!-- </xsl:for-each> -->
			<!-- <xsl:value-of select="languages"/> -->
			</li>
		</ul>
      </xsl:for-each>
	  
	  	<p>Countries having the most neighbours:</p>
		<hr/>

		<!--Americas-->
		<h3>Pays du continent : Americas par sous-régions :</h3>
		<h4>Caribbean (27 pays)</h4>
		<table border="3" width="100%" align="center">
		<tbody>
			<tr>
			<th>N°</th>
			<th>Name</th>\
			<th>Capital</th>
			<th>Coordinates</th>
			<th>Neigbors</th>
			<th>Flag</th>
			<th>Spoken languages</th>

			</tr>
		<tbody>
		</table>
		<h4>South America (15 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Central America (7 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Northern America (7 pays)</h4>
		<table border="3" width="100%" align="center"></table>

		<!--Asia-->
		<h3>Pays du continent : Asia par sous-régions :</h3>
		<h4>Southern Asia (9 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Western Asia (17 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>South-Eastern Asia (11 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Eastern Asia (8 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Central Asia (5 pays)</h4>
		<table border="3" width="100%" align="center"></table>

		<!--Africa-->
		<h3>Pays du continent : Africa par sous-régions :</h3>
		<h4>Middle Africa (10 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Eastern Africa (20 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Western Africa (16 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Southern Africa (5 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Northern Africa (7 pays)</h4>
		<table border="3" width="100%" align="center"></table>

		<!--Europe-->
		<h3>Pays du continent : Europe par sous-régions :</h3>
		<h4>Northern Europe (16 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Southern Europe (16 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Central Europe (5 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Western Europe (8 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Eastern Europe (8 pays)</h4>
		<table border="3" width="100%" align="center"></table>

		<!--Oceania-->
		<h3>Pays du continent : Oceania par sous-régions :</h3>
		<h4>Polynesia (10 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Australia and New Zealand (5 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Melanesia (5 pays)</h4>
		<table border="3" width="100%" align="center"></table>
		<h4>Micronesia (7 pays)</h4>
		<table border="3" width="100%" align="center"></table>

		</body>
	</html>
	</xsl:template>

</xsl:stylesheet>


