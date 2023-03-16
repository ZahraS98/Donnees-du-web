<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:param name="param_ref_type" select="AO"/>
	
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
		<li>
			<li><xsl:value-of select = "$param_ref_type" /></li>
			<xsl:value-of select="//country[country_codes/*='$param_ref_type']/country_name/common_name"/>.
  		</li>
	</xsl:template>
</xsl:stylesheet>