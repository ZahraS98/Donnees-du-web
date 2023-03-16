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
		<xsl:for-each select="//country/infosContinent/continent[not(text()=preceding::continent/text())]">
			<xsl:if test="current() !=''">
				<h3>Pays du continent : <xsl:value-of select="current()"/> par sous-régions :</h3>
				<xsl:for-each select="//country/infosContinent[continent=current()]/subregion[not(text()=preceding::subregion/text())]">
					<h4> <xsl:value-of select="current()"/> (<xsl:value-of select="count(//country/infosContinent[subregion=current() and continent = current()/../continent])"/>)</h4>

					<table border="3" width="100%" align="center">
					<tbody>
						<tr>
							<th>N°</th>
							<th>Name</th>
							<th>Capital</th>
							<th>Coordinates</th>
							<th>Neigbors</th>
							<th>Flag</th>
							<th>Spoken languages</th>
						</tr>

					<xsl:for-each select="//country/infosContinent[continent=current()/../continent and subregion=current()]">
						<tr>
							<td><xsl:number level="any"/></td>
							<td>
								<span style="color:green"><xsl:value-of select="../country_name/offic_name"/></span> (<xsl:value-of select="../country_name/offic_name"/>) <span style="color:blue"><xsl:value-of select="../country_name/native_name[@lang = 'fra']/offic_name"/> </span>
							</td>
							<td><xsl:value-of select="../capital"/></td>
							<td>Latitude :<xsl:value-of select="../coordinates/@lat"/> 
								Longitude :<xsl:value-of select="../coordinates/@lat"/>
							</td>
							<td> 
								<xsl:for-each select="../borders/neighbour"> 
									<xsl:value-of select="//country[country_codes/*=current()]/country_name/common_name"/> 
									<xsl:if test= "position() !=last()">
										,							
									</xsl:if>
								</xsl:for-each>
							</td>
							<td><img src="http://www.geonames.org/flags/x/fr.gif" height="40" width="60"/></td>
							<td>
								<xsl:for-each select= "../languages/*">
									<xsl:value-of select= "text()"/>
									<xsl:if test= "position() !=last()">
										,							
									</xsl:if>
								</xsl:for-each>
							</td>
						</tr>
					</xsl:for-each>
					</tbody>
					</table>
				</xsl:for-each>
			</xsl:if>
		</xsl:for-each>

		

		</body>
	</html>
	</xsl:template>

</xsl:stylesheet>
