<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Tue Mar 07 17:05:41 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="country_code" />
	<xsl:output method="html"/>
	
	<xsl:template match="/">
    <html>
        <body style="background-color:white;">
        <element_a_recuperer>
            <table style="background-color:beige;" border="2" width="24%" align="center">  <!-- I THINK THESE VARIABLES NEED TO BE CHANGED -->
                <tbody>

                <tr>
                <td>Name:</td>
                <td><xsl:value-of select= "//country[country_codes/*=$country_code]/country_name/common_name"/></td>
                </tr>

                <tr>
                <td>Capital:</td>
                <td><xsl:value-of select= "//country[country_codes/*=$country_code]/capital"/></td>
                </tr>

                <tr>
                <td>Spoken languages:</td>
                <td><xsl:for-each select= "//country[country_codes/*=$country_code]/languages/*">
					<xsl:value-of select= "text()"/>
					<xsl:if test= "position() !=last()">
						,							
					</xsl:if>
				</xsl:for-each>
                </td>
                </tr>

                <tr>
                <td>Flag:</td>
                <td><img src="http://www.geonames.org/flags/x/{translate(//country[country_codes/*=$country_code]/country_codes/cca2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}.gif" height="40" width="60"/></td>
                </tr>
                
                </tbody>
            </table>
            </element_a_recuperer>
		</body>



    </html>
    </xsl:template>

</xsl:stylesheet>