<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:param name="param_ref_type" select="toto"/>
	
	<xsl:template match="/">
		<HTML>
			<BODY bgcolor="#FFFFCC">
				<H1>Pay</H1>
				<element_a_recuperer>
					<ul>
						<xsl:apply-templates select="//countries"/>
					</ul>
				</element_a_recuperer>
			</BODY>
		</HTML>
	</xsl:template>
	<xsl:template match="//countries">
		<LI>
			<xsl:value-of select="./country/country_codes[contains(text(),'$param_ref_type')]/text()"/>.
  		</LI>
	</xsl:template>
</xsl:stylesheet>
