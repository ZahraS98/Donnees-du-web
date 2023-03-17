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
        <ul style="line-height:1;">
			<li ><xsl:value-of select="country_name/common_name"/> :  
				<xsl:for-each select="languages/*"> 
					<xsl:value-of select="text()"/> (<xsl:value-of select="name()"/>) 
					<xsl:if test= "position() !=last()">
						,							
					</xsl:if>
				</xsl:for-each>
				
			</li>
			
		</ul>
      </xsl:for-each>
	  	
		<xsl:variable name="my-variable" select="//element/@attribute"/>
	  	
		 Countries having the most neighbours: <xsl:variable name="maxNeighbors">
        <xsl:for-each select="//country">
            <xsl:sort select="count(borders/neighbour)" data-type="number" order="descending"/>
            <xsl:if test="position() = 1">
            <xsl:value-of select="count(borders/neighbour)"/>
            </xsl:if>
        </xsl:for-each>
        </xsl:variable>
	

        <!-- Output the names of all countries with the maximum number of neighbors -->
        <xsl:for-each select="//country">
        <xsl:if test="count(borders/neighbour) = $maxNeighbors">
            <xsl:value-of select="country_name/common_name"/>
            <xsl:text>, </xsl:text>
        </xsl:if>
        </xsl:for-each> nb de voisins : <xsl:value-of select="$maxNeighbors"/>

		
		<hr/>

		<!--Americas-->
		<xsl:for-each select="//country/infosContinent/continent[not(text()=preceding::continent/text())]">
			<xsl:if test="current() !=''">
				<h3>Pays du continent : <xsl:value-of select="current()"/> par sous-régions :</h3>
				<xsl:for-each select="//country/infosContinent[continent=current()]/subregion[not(text()=preceding::subregion/text())]">
					<h4> <xsl:value-of select="current()"/> (<xsl:value-of select="count(//country/infosContinent[subregion=current() and continent = current()/../continent])"/> pays)</h4>

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
							<td><xsl:value-of select="position()"/></td>
							<td>
								<tr><span style="color:green"><xsl:value-of select="../country_name/offic_name"/></span> (<xsl:value-of select="../country_name/offic_name"/>)</tr> 
								<tr><span style="color:blue"> 
									<xsl:choose>
										<xsl:when test="../country_name/native_name[@lang = 'fra']/offic_name">
											Nom francais: <xsl:value-of select="../country_name/native_name[@lang = 'fra']/offic_name"/> 
										</xsl:when>
									</xsl:choose>
								</span></tr>
							</td>
							<td><xsl:value-of select="../capital"/></td>
							<td><tr>Latitude :<xsl:value-of select="../coordinates/@lat"/> </tr>
								<tr>Longitude :<xsl:value-of select="../coordinates/@long"/> </tr>
							</td>
							<td> 
								<xsl:choose>
									<xsl:when test="../borders/neighbour">
										<xsl:for-each select="../borders/neighbour"> 
											<xsl:value-of select="//country[country_codes/*=current()]/country_name/common_name"/> 
											<xsl:if test= "position() !=last()">
												,							
											</xsl:if>
										</xsl:for-each>
									</xsl:when>
									<xsl:otherwise>
											Island
									</xsl:otherwise>
								</xsl:choose>
							</td>
							<td><img src="http://www.geonames.org/flags/x/{translate(../country_codes/cca2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}.gif" height="40" width="60"/></td>
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
