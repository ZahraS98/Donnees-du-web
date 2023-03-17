<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:param name="county_code"/>
	<xsl:output method="html"/>	
	
	<xsl:template match="/">
	
		<HTML>
			<BODY bgcolor="#FFFFCC">
				<H1>Pay same</H1>
				<element_a_recuperer><xsl:apply-templates select="//countries"/></element_a_recuperer>
			</BODY>
		</HTML>
	</xsl:template>
	
	 <xsl:template match="//countries">
	<xsl:for-each select= "//country[country_codes/*=$country_code]/languages/*">
        	<!-- <xsl:value-of select= "//country[languages/*=$country_code]/country_codes/cca2"/> -->
    	</xsl:for-each> 
		
	</xsl:template>
</xsl:stylesheet>